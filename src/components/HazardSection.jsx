import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { IconHazard, IconCPU } from './Icons';

const stages = ['IF', 'ID', 'EX', 'MEM', 'WB'];

const instructions = [
    { name: 'lw  x1', cells: ['IF', 'ID', 'EX', 'MEM', 'WB'] },
    { name: 'add x2', cells: ['', 'IF', 'ID', '—', '—', 'EX', 'MEM', 'WB'], hasBubble: [3, 4] },
    { name: 'sub x4', cells: ['', '', 'IF', '', '', 'ID', 'EX', 'MEM', 'WB'] },
    { name: 'lw  x6', cells: ['', '', '', 'IF', 'ID', 'EX', 'MEM', 'WB'] },
    { name: 'and x7', cells: ['', '', '', '', 'IF', 'ID', '—', 'EX', 'MEM', 'WB'], hasBubble: [6] },
];

const hazardTypes = [
    { id: 'data', label: 'RAW Data Hazard', desc: 'Read-After-Write: an instruction reads a register before a previous instruction writes it. The pipeline must stall until the data is available.' },
    { id: 'control', label: 'Control Hazard', desc: 'Branch or jump instructions change the program counter. Instructions already fetched after the branch become invalid and must be flushed.' },
    { id: 'structural', label: 'Structural Hazard', desc: 'Two instructions require the same hardware resource in the same cycle. This is resolved by stalling one instruction or adding duplicate resources.' },
];

export default function HazardSection() {
    const [ref, isVisible] = useScrollReveal(0.15);
    const [activeHazard, setActiveHazard] = useState('data');

    const getCellClass = (val) => {
        if (!val || val === '') return 'timing-cell t-empty';
        if (val === '—') return 'timing-cell t-bubble';
        return `timing-cell t-${val}`;
    };

    return (
        <section className="section" id="hazards" ref={ref}>
            <div className={`section-inner reveal ${isVisible ? 'visible' : ''}`}>
                <div className="split">
                    {/* Left: Explanation */}
                    <div className="split-text">
                        <span className="text-sm" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <IconCPU style={{ width: 16, height: 16 }} /> COA Fundamentals
                        </span>
                        <h2 className="heading-section">
                            Pipelining and Hazard<br />Classification
                        </h2>
                        <p className="text-body">
                            A <strong>5-stage pipeline</strong> overlaps instruction execution across stages:
                            IF, ID, EX, MEM, WB. In the ideal case, one instruction completes every cycle.
                            However, <strong>hazards</strong> force the processor to insert stall cycles (bubbles),
                            increasing the effective CPI.
                        </p>

                        {/* Hazard pills */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 8 }}>
                            {hazardTypes.map((h) => (
                                <button
                                    key={h.id}
                                    className={`hazard-pill ${h.id} ${activeHazard === h.id ? 'active' : ''}`}
                                    onClick={() => setActiveHazard(h.id)}
                                >
                                    <IconHazard style={{ width: 14, height: 14 }} />
                                    {h.label}
                                </button>
                            ))}
                        </div>

                        <div className="clay-card" style={{ padding: 16, marginTop: 8 }}>
                            <p style={{ fontSize: 14, color: 'var(--fg-muted)', margin: 0, lineHeight: 1.6 }}>
                                {hazardTypes.find(h => h.id === activeHazard)?.desc}
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                            <div className="metric-pill bad">
                                <span className="metric-label">Stall</span>
                                <span className="metric-value">= Wasted Cycle</span>
                            </div>
                            <div className="metric-pill bad">
                                <span className="metric-label">More Stalls</span>
                                <span className="metric-value">= Higher CPI</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Pipeline timing grid */}
                    <div className="split-visual">
                        <div className="timing-grid">
                            <div className="timing-row">
                                <span className="timing-label" style={{ fontWeight: 800, color: 'var(--accent)' }}>Cycle</span>
                                {Array.from({ length: 10 }, (_, i) => (
                                    <div key={i} className="timing-cell t-empty" style={{ color: 'var(--fg-light)', fontWeight: 700, fontSize: 11 }}>
                                        {i + 1}
                                    </div>
                                ))}
                            </div>
                            {instructions.map((instr, rowIdx) => (
                                <div key={rowIdx} className="timing-row">
                                    <span className="timing-label">{instr.name}</span>
                                    {instr.cells.map((cell, colIdx) => (
                                        <div key={colIdx} className={getCellClass(cell)} style={{
                                            opacity: isVisible ? 1 : 0,
                                            transition: `opacity 0.3s ${(rowIdx * 10 + colIdx) * 0.04}s`
                                        }}>
                                            {cell === '—' ? 'NOP' : cell}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                            {stages.map((s) => (
                                <div key={s} style={{
                                    display: 'flex', alignItems: 'center', gap: 6, fontSize: 12,
                                    fontWeight: 700, fontFamily: 'var(--font-heading)',
                                }}>
                                    <div className={`timing-cell t-${s}`} style={{ width: 28, height: 20, fontSize: 9 }}>{s}</div>
                                    <span style={{ color: 'var(--fg-muted)' }}>
                                        {s === 'IF' ? 'Fetch' : s === 'ID' ? 'Decode' : s === 'EX' ? 'Execute' : s === 'MEM' ? 'Memory' : 'WriteBack'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
