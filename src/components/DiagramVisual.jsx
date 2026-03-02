import React, { useState } from 'react';

export default function DiagramVisual({ visual, toggleState }) {
    if (visual.variant === 'beforeAfterSpeed') return <BeforeAfterSpeed labels={visual.labels} />;
    if (visual.variant === 'sequenceCompare') return <SequenceCompare sequences={visual.sequences} toggleState={toggleState} />;
    if (visual.variant === 'flow') return <FlowDiagram steps={visual.steps} />;
    return null;
}

function BeforeAfterSpeed({ labels }) {
    return (
        <div className="before-after-speed">
            <div className="speed-card slow">
                <span className="speed-icon">🐢</span>
                <span>{labels?.[0] || 'Before'}</span>
                <svg width="80" height="40" viewBox="0 0 80 40">
                    <rect x="0" y="10" width="15" height="20" rx="3" fill="#EF4444" opacity="0.7" />
                    <rect x="20" y="5" width="15" height="30" rx="3" fill="#EF4444" opacity="0.5" />
                    <rect x="40" y="0" width="15" height="40" rx="3" fill="#EF4444" opacity="0.8" />
                    <rect x="60" y="15" width="15" height="15" rx="3" fill="#EF4444" opacity="0.4" />
                </svg>
            </div>
            <div className="speed-card fast">
                <span className="speed-icon">🚀</span>
                <span>{labels?.[1] || 'After'}</span>
                <svg width="80" height="40" viewBox="0 0 80 40">
                    <rect x="0" y="20" width="15" height="15" rx="3" fill="#10B981" opacity="0.5" />
                    <rect x="20" y="15" width="15" height="20" rx="3" fill="#10B981" opacity="0.6" />
                    <rect x="40" y="25" width="15" height="10" rx="3" fill="#10B981" opacity="0.7" />
                    <rect x="60" y="28" width="15" height="8" rx="3" fill="#10B981" opacity="0.4" />
                </svg>
            </div>
        </div>
    );
}

function SequenceCompare({ sequences, toggleState }) {
    const originalCode = [
        { instr: 'lw   x1, 0(x10)', dep: 'hazard' },
        { instr: 'add  x2, x1, x3', dep: 'hazard' },
        { instr: 'sub  x4, x2, x5', dep: 'hazard' },
        { instr: 'lw   x6, 4(x10)', dep: 'safe' },
        { instr: 'and  x7, x6, x8', dep: 'hazard' },
    ];
    const scheduledCode = [
        { instr: 'lw   x1, 0(x10)', dep: 'safe' },
        { instr: 'lw   x6, 4(x10)', dep: 'safe' },
        { instr: 'add  x2, x1, x3', dep: 'safe' },
        { instr: 'and  x7, x6, x8', dep: 'safe' },
        { instr: 'sub  x4, x2, x5', dep: 'safe' },
    ];

    const activeIdx = toggleState === 'scheduled' ? 1 : 0;

    return (
        <div className="sequence-compare">
            <div className={`sequence-box ${activeIdx === 0 ? 'active' : ''}`}>
                <div className="seq-title">{sequences?.[0] || 'Original'}</div>
                {originalCode.map((line, i) => (
                    <div key={i} className="seq-instr">
                        <span className={`dep-marker ${line.dep}`} />
                        {line.instr}
                    </div>
                ))}
            </div>
            <div className={`sequence-box ${activeIdx === 1 ? 'active' : ''}`}>
                <div className="seq-title">{sequences?.[1] || 'Scheduled'}</div>
                {scheduledCode.map((line, i) => (
                    <div key={i} className="seq-instr">
                        <span className={`dep-marker ${line.dep}`} />
                        {line.instr}
                    </div>
                ))}
            </div>
        </div>
    );
}

function FlowDiagram({ steps }) {
    return (
        <div className="flow-diagram">
            {(steps || []).map((step, i) => (
                <React.Fragment key={i}>
                    <div className="flow-step" style={{ animationDelay: `${i * 0.12}s` }}>{step}</div>
                    {i < steps.length - 1 && <span className="flow-arrow">→</span>}
                </React.Fragment>
            ))}
        </div>
    );
}
