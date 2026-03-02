import React, { useState, useRef, useLayoutEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { IconSchedule, IconHazard, IconCheck } from './Icons';

const beforeCode = [
    { text: 'lw   x1, 0(x10)', comment: '# Load word', dep: 'safe' },
    { text: 'add  x2, x1, x3', comment: '# RAW hazard on x1', dep: 'hazard' },
    { text: 'sub  x4, x2, x5', comment: '# RAW hazard on x2', dep: 'hazard' },
    { text: 'lw   x6, 4(x10)', comment: '# Load word', dep: 'safe' },
    { text: 'and  x7, x6, x8', comment: '# RAW hazard on x6', dep: 'hazard' },
];
const afterCode = [
    { text: 'lw   x1, 0(x10)', comment: '# Load word', dep: 'safe' },
    { text: 'lw   x6, 4(x10)', comment: '# Moved up (independent)', dep: 'moved' },
    { text: 'add  x2, x1, x3', comment: '# x1 now ready', dep: 'safe' },
    { text: 'and  x7, x6, x8', comment: '# x6 now ready', dep: 'safe' },
    { text: 'sub  x4, x2, x5', comment: '# x2 now ready', dep: 'safe' },
];

// Unique instruction IDs for FLIP animation tracking
const instrIds = ['lw_x1', 'add_x2', 'sub_x4', 'lw_x6', 'and_x7'];
const beforeOrder = [0, 1, 2, 3, 4];     // lw_x1, add_x2, sub_x4, lw_x6, and_x7
const afterOrder = [0, 3, 1, 4, 2];      // lw_x1, lw_x6, add_x2, and_x7, sub_x4

const beforeTiming = [
    ['IF', 'ID', 'EX', 'MEM', 'WB', '', '', '', '', ''],
    ['', 'IF', 'ID', '—', '—', 'EX', 'MEM', 'WB', '', ''],
    ['', '', 'IF', '', '', 'ID', 'EX', 'MEM', 'WB', ''],
    ['', '', '', 'IF', 'ID', 'EX', 'MEM', 'WB', '', ''],
    ['', '', '', '', 'IF', 'ID', '—', 'EX', 'MEM', 'WB'],
];
const afterTiming = [
    ['IF', 'ID', 'EX', 'MEM', 'WB', '', '', '', '', ''],
    ['', 'IF', 'ID', 'EX', 'MEM', 'WB', '', '', '', ''],
    ['', '', 'IF', 'ID', 'EX', 'MEM', 'WB', '', '', ''],
    ['', '', '', 'IF', 'ID', 'EX', 'MEM', 'WB', '', ''],
    ['', '', '', '', 'IF', 'ID', 'EX', 'MEM', 'WB', ''],
];

const originalLabels = ['lw x1', 'add x2', 'sub x4', 'lw x6', 'and x7'];

export default function SchedulingPlayground() {
    const [ref, isVisible] = useScrollReveal(0.15);
    const [mode, setMode] = useState('before');
    const [transitioning, setTransitioning] = useState(false);
    const code = mode === 'before' ? beforeCode : afterCode;
    const stalls = mode === 'before' ? 3 : 0;
    const cpi = mode === 'before' ? '2.00' : '1.00';

    const order = mode === 'before' ? beforeOrder : afterOrder;
    const timing = mode === 'before' ? beforeTiming : afterTiming;

    const handleModeSwitch = (newMode) => {
        if (newMode === mode) return;
        setTransitioning(true);
        setTimeout(() => {
            setMode(newMode);
            setTimeout(() => setTransitioning(false), 50);
        }, 300);
    };

    const getCellClass = (val) => {
        if (!val || val === '') return 'timing-cell t-empty';
        if (val === '—') return 'timing-cell t-bubble';
        return `timing-cell t-${val}`;
    };

    return (
        <section className="section" id="scheduling" ref={ref}>
            <div className={`section-inner reveal ${isVisible ? 'visible' : ''}`}>
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <span className="text-sm" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                        <IconSchedule style={{ width: 16, height: 16 }} /> Interactive Comparison
                    </span>
                    <h2 className="heading-section">Instruction Scheduling Playground</h2>
                    <p className="text-body" style={{ margin: '0 auto', textAlign: 'center' }}>
                        Toggle between <strong>Before</strong> and <strong>After</strong> scheduling to observe
                        how reordering independent instructions eliminates pipeline stalls.
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20, gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                        <div className="toggle-tabs">
                            <button className={`toggle-tab ${mode === 'before' ? 'active' : ''}`} onClick={() => handleModeSwitch('before')}>
                                Before Scheduling
                            </button>
                            <button className={`toggle-tab ${mode === 'after' ? 'active' : ''}`} onClick={() => handleModeSwitch('after')}>
                                After Scheduling
                            </button>
                        </div>
                        <div className="metric-pill">
                            <span className="metric-label">Stalls</span>
                            <span className="metric-value" style={{
                                color: stalls > 0 ? 'var(--accent-alt)' : 'var(--emerald)', fontWeight: 800,
                                transition: 'color 0.5s ease',
                            }}>
                                {stalls}
                            </span>
                        </div>
                        <div className="metric-pill">
                            <span className="metric-label">CPI</span>
                            <span className="metric-value" style={{
                                color: mode === 'before' ? 'var(--accent-alt)' : 'var(--emerald)', fontWeight: 800,
                                transition: 'color 0.5s ease',
                            }}>
                                {cpi}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="split" style={{ gap: 24 }}>
                    {/* Code panel */}
                    <div className="split-visual">
                        <div className="code-panel" style={{
                            opacity: transitioning ? 0 : 1,
                            transform: transitioning ? 'translateX(-20px)' : 'translateX(0)',
                            transition: 'opacity 0.4s ease, transform 0.4s ease',
                        }}>
                            <span className="code-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                {mode === 'before'
                                    ? <><IconHazard style={{ width: 14, height: 14 }} /> Baseline Code (With Hazards)</>
                                    : <><IconCheck style={{ width: 14, height: 14 }} /> Scheduled Code (Hazards Eliminated)</>}
                            </span>
                            {code.map((line, i) => (
                                <code key={`${mode}-${i}`} className={`code-line ${line.dep === 'hazard' ? 'highlight' : ''}`}
                                    style={{
                                        borderLeft: line.dep === 'moved' ? '3px solid var(--emerald)' : line.dep === 'hazard' ? '3px solid var(--accent-alt)' : '3px solid transparent',
                                        paddingLeft: 12,
                                        opacity: transitioning ? 0 : 1,
                                        transform: transitioning ? 'translateY(10px)' : 'translateY(0)',
                                        transition: `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s`,
                                    }}>
                                    <span className="hl-kw">{line.text.split(' ')[0]}</span>
                                    <span className="hl-reg">{' ' + line.text.split(' ').slice(1).join(' ')}</span>
                                    {'    '}
                                    <span className="hl-cmt">{line.comment}</span>
                                </code>
                            ))}
                        </div>
                    </div>

                    {/* Timing grid with smooth row transitions */}
                    <div className="split-visual">
                        <div className="timing-grid" style={{ position: 'relative' }}>
                            {/* Header row */}
                            <div className="timing-row">
                                <span className="timing-label" style={{ fontWeight: 800, color: 'var(--accent)' }}>Cycle</span>
                                {Array.from({ length: 10 }, (_, i) => (
                                    <div key={i} className="timing-cell t-empty" style={{ color: 'var(--fg-light)', fontWeight: 700, fontSize: 11 }}>
                                        {i + 1}
                                    </div>
                                ))}
                            </div>
                            {/* Instruction rows — each row transitions with staggered timing */}
                            {order.map((instrIdx, rowPos) => (
                                <div
                                    key={instrIds[instrIdx]}
                                    className="timing-row"
                                    style={{
                                        opacity: transitioning ? 0 : 1,
                                        transform: transitioning ? 'translateY(20px) scale(0.95)' : 'translateY(0) scale(1)',
                                        transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${rowPos * 0.08}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${rowPos * 0.08}s`,
                                    }}
                                >
                                    <span className="timing-label">{originalLabels[instrIdx]}</span>
                                    {timing[rowPos].map((cell, colIdx) => (
                                        <div key={colIdx} className={getCellClass(cell)} style={{
                                            opacity: isVisible && !transitioning ? 1 : 0,
                                            transform: isVisible && !transitioning ? 'scale(1)' : 'scale(0.6)',
                                            transition: `opacity 0.35s ease ${rowPos * 0.08 + colIdx * 0.025}s, transform 0.4s cubic-bezier(0.34,1.56,0.64,1) ${rowPos * 0.08 + colIdx * 0.025}s`,
                                        }}>
                                            {cell === '—' ? 'NOP' : cell}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        <div className="clay-card" style={{
                            padding: 16, marginTop: 12, textAlign: 'center',
                            opacity: transitioning ? 0 : 1,
                            transition: 'opacity 0.4s ease 0.3s',
                        }}>
                            {mode === 'before' ? (
                                <p style={{ margin: 0, fontSize: 14, color: 'var(--accent-alt)', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                                    <IconHazard style={{ width: 16, height: 16 }} /> 3 stall cycles due to RAW dependencies — pipeline efficiency is reduced
                                </p>
                            ) : (
                                <p style={{ margin: 0, fontSize: 14, color: 'var(--emerald)', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                                    <IconCheck style={{ width: 16, height: 16 }} /> Zero stalls — independent instructions fill gaps, pipeline runs at full throughput
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
