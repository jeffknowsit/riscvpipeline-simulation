import React from 'react';

export default function PipelineDiagram({ visual }) {
    const stages = visual.stages || ['IF', 'ID', 'EX', 'MEM', 'WB'];

    // Timing diagram variant
    if (visual.variant === 'timingDiagram') {
        return <TimingDiagram visual={visual} />;
    }

    return (
        <div className="pipeline">
            {stages.map((stage, i) => (
                <React.Fragment key={stage}>
                    <div className={`pipeline-stage ${stage}`}>
                        {stage}
                        {visual.showToken && i === 0 && <span className="pipeline-token" />}
                    </div>
                    {i < stages.length - 1 && <span className="pipeline-arrow">→</span>}
                </React.Fragment>
            ))}
            {visual.showBubble && (
                <>
                    <span className="pipeline-arrow">→</span>
                    <div className="pipeline-bubble">STALL</div>
                </>
            )}
        </div>
    );
}

function TimingDiagram({ visual }) {
    const stageNames = ['IF', 'ID', 'EX', 'MEM', 'WB'];
    const instructions = visual.instructions || ['lw', 'add', 'sub', 'lw', 'and'];
    const hasBubbles = visual.showBubbles;
    const fewerBubbles = visual.showFewerBubbles;

    // Generate timing rows
    const rows = instructions.map((instr, idx) => {
        const cells = [];
        let offset = idx;

        // Insert bubbles for hazard scenarios
        if (hasBubbles && idx > 0 && (idx === 1 || idx === 4)) {
            offset = idx + (idx === 1 ? 1 : 2);
        } else if (hasBubbles && idx >= 2) {
            offset = idx + 1;
            if (idx >= 4) offset = idx + 2;
        }

        if (fewerBubbles) {
            offset = idx; // no extra offset for scheduled code
        }

        // Empty cells before this instruction starts
        for (let i = 0; i < offset; i++) {
            cells.push({ stage: '', type: 'empty' });
        }

        // Pipeline stages
        stageNames.forEach((stage) => {
            cells.push({ stage, type: `${stage}-cell` });
        });

        // Bubble insertion for before-scheduling
        if (hasBubbles && (idx === 0)) {
            // After IF of instr 0, insert a bubble before instr 1
            // Actually let's just add bubble markers between certain instructions
        }

        return { instr, cells };
    });

    // Insert bubble rows for "before" view
    const finalRows = [];
    rows.forEach((row, idx) => {
        finalRows.push(row);
        if (hasBubbles && (idx === 0 || idx === 3)) {
            finalRows.push({
                instr: '···',
                cells: Array(idx + 1).fill({ stage: '', type: 'empty' }).concat(
                    [{ stage: 'NOP', type: 'bubble-cell' }],
                    [{ stage: 'NOP', type: 'bubble-cell' }]
                ),
                isBubble: true,
            });
        }
    });

    const displayRows = hasBubbles ? finalRows : rows;
    const maxCols = Math.max(...displayRows.map(r => r.cells.length), 10);

    return (
        <div className="timing-diagram">
            {/* Header */}
            <div className="timing-row">
                <span className="timing-label">Cycle→</span>
                {Array.from({ length: maxCols }, (_, i) => (
                    <div key={i} className="timing-cell empty" style={{ color: 'var(--text-muted)', background: 'transparent', fontWeight: 600 }}>
                        {i + 1}
                    </div>
                ))}
            </div>
            {/* Instruction rows */}
            {displayRows.map((row, i) => (
                <div key={i} className="timing-row" style={{ animationDelay: `${i * 0.1}s` }}>
                    <span className="timing-label" style={row.isBubble ? { color: 'var(--danger)' } : {}}>
                        {row.instr}
                    </span>
                    {row.cells.map((cell, j) => (
                        <div
                            key={j}
                            className={`timing-cell ${cell.type}`}
                            style={{ animationDelay: `${(i * maxCols + j) * 0.03}s` }}
                        >
                            {cell.stage}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
