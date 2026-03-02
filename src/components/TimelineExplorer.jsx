import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { IconSlider, IconHazard } from './Icons';

const stages = ['IF', 'ID', 'EX', 'MEM', 'WB'];

// Before scheduling timeline (with stalls)
const beforeTimeline = {
    'lw x1': [1, 2, 3, 4, 5],
    'add x2': [2, 3, 0, 0, 4, 5, 6],  // stalls at cycles 4,5 → shifted
    'sub x4': [3, 4, 0, 0, 5, 6, 7],
    'lw x6': [4, 5, 6, 7, 8],
    'and x7': [5, 6, 7, 0, 8, 9, 10],
};
const afterTimeline = {
    'lw x1': [1, 2, 3, 4, 5],
    'lw x6': [2, 3, 4, 5, 6],
    'add x2': [3, 4, 5, 6, 7],
    'and x7': [4, 5, 6, 7, 8],
    'sub x4': [5, 6, 7, 8, 9],
};

function getStateAtCycle(timeline, cycle) {
    const result = [];
    Object.entries(timeline).forEach(([instr, cycles]) => {
        // Find which stage this instruction is at during this cycle
        let stageIdx = -1;
        let actualStageCount = 0;
        for (let i = 0; i < cycles.length; i++) {
            if (cycles[i] === 0) continue; // stall
            if (cycles[i] === cycle) { stageIdx = actualStageCount; break; }
            actualStageCount++;
        }
        // Check if this cycle is a stall for this instruction
        const isStall = cycles.some((c, idx) => {
            if (c !== 0) return false;
            const prevNonZero = cycles.slice(0, idx).filter(x => x !== 0);
            const nextNonZero = cycles.slice(idx).find(x => x !== 0);
            return nextNonZero === cycle;
        });

        const stage = stageIdx >= 0 && stageIdx < stages.length ? stages[stageIdx] : null;
        result.push({ instr, stage, isStall: !stage && isStallCycle(cycles, cycle) });
    });
    return result;
}

function isStallCycle(cycles, cycle) {
    for (let i = 0; i < cycles.length; i++) {
        if (cycles[i] === 0) {
            // Check if surrounding non-zero values bracket this cycle
            const prev = cycles.slice(0, i).filter(x => x > 0);
            const next = cycles.slice(i + 1).find(x => x > 0);
            if (prev.length > 0 && next && cycle >= prev[prev.length - 1] + 1 && cycle <= next) return true;
        }
    }
    return false;
}

export default function TimelineExplorer() {
    const [ref, isVisible] = useScrollReveal(0.15);
    const [cycle, setCycle] = useState(1);
    const [mode, setMode] = useState('before');
    const timeline = mode === 'before' ? beforeTimeline : afterTimeline;
    const maxCycle = mode === 'before' ? 10 : 9;

    // Simplified: show what stage each instr is at for this cycle
    const instrEntries = Object.entries(timeline);

    const getStageForInstr = (cycles, targetCycle) => {
        let idx = 0;
        for (let i = 0; i < cycles.length; i++) {
            if (cycles[i] === 0) {
                if (idx > 0 && targetCycle === cycles[i - 1] + 1) return 'STALL';
                continue;
            }
            if (cycles[i] === targetCycle) return stages[idx] || null;
            if (cycles[i] !== 0) idx++;
        }
        return null;
    };

    return (
        <section className="section" id="timeline-explorer" ref={ref}>
            <div className={`section-inner reveal ${isVisible ? 'visible' : ''}`}>
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                    <span className="text-sm" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                        <IconSlider style={{ width: 16, height: 16 }} /> Micro-Level Analysis
                    </span>
                    <h2 className="heading-section">Cycle-by-Cycle Timeline Explorer</h2>
                    <p className="text-body" style={{ margin: '0 auto', textAlign: 'center' }}>
                        Scrub through individual clock cycles to observe which pipeline stage each instruction
                        occupies. Compare how scheduling eliminates stalls at specific cycles.
                    </p>
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
                    <div className="toggle-tabs">
                        <button className={`toggle-tab ${mode === 'before' ? 'active' : ''}`} onClick={() => { setMode('before'); setCycle(1); }}>
                            Before Scheduling
                        </button>
                        <button className={`toggle-tab ${mode === 'after' ? 'active' : ''}`} onClick={() => { setMode('after'); setCycle(1); }}>
                            After Scheduling
                        </button>
                    </div>
                </div>

                {/* Slider */}
                <div className="clay-card" style={{ padding: 32 }}>
                    <div className="cycle-slider-wrap">
                        <span className="cycle-label">Cycle t = {cycle}</span>
                        <input
                            type="range"
                            className="cycle-slider"
                            min={1}
                            max={maxCycle}
                            value={cycle}
                            onChange={(e) => setCycle(Number(e.target.value))}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: 600 }}>
                            <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>Cycle 1</span>
                            <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>Cycle {maxCycle}</span>
                        </div>
                    </div>

                    {/* Instruction states at this cycle */}
                    <div className="cycle-cells" style={{ marginTop: 24 }}>
                        {instrEntries.map(([instr, cycles]) => {
                            const stage = getStageForInstr(cycles, cycle);
                            const isActive = !!stage;
                            const isStall = stage === 'STALL';
                            return (
                                <div key={instr} className="cycle-instr-card" style={{
                                    borderLeft: isStall ? '3px solid var(--accent-alt)' : isActive ? '3px solid var(--emerald)' : '3px solid transparent',
                                    opacity: isActive || isStall ? 1 : 0.4,
                                }}>
                                    <span className="instr-name" style={{ fontFamily: "'Courier New', monospace" }}>{instr}</span>
                                    {isStall ? (
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--accent-alt)', fontWeight: 800, fontSize: 12 }}>
                                            <IconHazard style={{ width: 14, height: 14 }} /> STALL
                                        </span>
                                    ) : stage ? (
                                        <div className={`timing-cell t-${stage}`} style={{ width: 40, height: 24, fontSize: 10, borderRadius: 8 }}>
                                            {stage}
                                        </div>
                                    ) : (
                                        <span style={{ fontSize: 12, color: 'var(--fg-light)' }}>Inactive</span>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Cycle explanation */}
                    {mode === 'before' && cycle >= 4 && cycle <= 5 && (
                        <div style={{ marginTop: 16, padding: '12px 16px', borderRadius: 'var(--r-xs)', background: 'rgba(219,39,119,0.08)', borderLeft: '3px solid var(--accent-alt)' }}>
                            <p style={{ margin: 0, fontSize: 13, color: 'var(--accent-alt)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                                <IconHazard style={{ width: 16, height: 16 }} />
                                RAW hazard at cycle {cycle}: add x2 depends on x1 from the preceding lw instruction, but the result is not yet available.
                            </p>
                        </div>
                    )}
                    {mode === 'after' && (
                        <div style={{ marginTop: 16, padding: '12px 16px', borderRadius: 'var(--r-xs)', background: 'rgba(16,185,129,0.08)', borderLeft: '3px solid var(--emerald)' }}>
                            <p style={{ margin: 0, fontSize: 13, color: 'var(--emerald)', fontWeight: 600 }}>
                                No stall cycles present — independent instructions fill all gaps.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
