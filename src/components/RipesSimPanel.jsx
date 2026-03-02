import React, { useState, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { IconCPU, IconCode, IconPlay, IconSchedule, IconWarning } from './Icons';

const baseCode = [
    'lw   x1, 0(x10)', 'add  x2, x1, x3', 'sub  x4, x2, x5',
    'lw   x6, 4(x10)', 'and  x7, x6, x8', 'sw   x7, 8(x10)',
    'addi x10, x10, 12', 'bne  x10, x11, loop',
];
const schedCode = [
    'lw   x1, 0(x10)', 'lw   x6, 4(x10)', 'add  x2, x1, x3',
    'and  x7, x6, x8', 'sub  x4, x2, x5', 'sw   x7, 8(x10)',
    'addi x10, x10, 12', 'bne  x10, x11, loop',
];
const initRegs = { x1: 0, x2: 0, x3: 5, x4: 0, x5: 3, x6: 0, x7: 0, x8: 0xFF, x10: 0x100, x11: 0x124 };
function randomInRange(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

export default function RipesSimPanel() {
    const [ref, isVisible] = useScrollReveal(0.15);
    const [isScheduled, setIsScheduled] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [currentLine, setCurrentLine] = useState(-1);
    const [cycle, setCycle] = useState(0);
    const [regs, setRegs] = useState({ ...initRegs });
    const [changedRegs, setChangedRegs] = useState(new Set());
    const [results, setResults] = useState(null);
    const timer = useRef(null);
    const code = isScheduled ? schedCode : baseCode;

    const runSimulation = () => {
        setIsRunning(true); setCurrentLine(-1); setCycle(0);
        setRegs({ ...initRegs }); setChangedRegs(new Set()); setResults(null);
        let step = 0;
        const totalSteps = code.length;
        const stalls = isScheduled ? randomInRange(2, 8) : randomInRange(12, 22);
        const totalCycles = totalSteps + stalls;
        const cpi = (totalCycles / totalSteps).toFixed(2);
        timer.current = setInterval(() => {
            if (step >= totalSteps) {
                clearInterval(timer.current); setIsRunning(false);
                setResults({ stalls, totalCycles, cpi, instructions: totalSteps }); return;
            }
            setCurrentLine(step); setCycle(step + 1);
            const newRegs = { ...initRegs }; const changed = new Set();
            if (step >= 0) { newRegs.x1 = randomInRange(1, 255); changed.add('x1'); }
            if (step >= 1) { newRegs.x2 = randomInRange(1, 255); changed.add('x2'); }
            if (step >= 2) { newRegs.x4 = randomInRange(1, 255); changed.add('x4'); }
            if (step >= 3) { newRegs.x6 = randomInRange(1, 255); changed.add('x6'); }
            if (step >= 4) { newRegs.x7 = randomInRange(1, 255); changed.add('x7'); }
            setRegs(newRegs); setChangedRegs(changed); step++;
        }, 400);
    };
    const stopSim = () => { clearInterval(timer.current); setIsRunning(false); };

    return (
        <section className="section" id="ripes" ref={ref}>
            <div className={`section-inner reveal ${isVisible ? 'visible' : ''}`}>
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <span className="text-sm" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                        <IconCPU style={{ width: 16, height: 16 }} /> Simulation
                    </span>
                    <h2 className="heading-section">RIPES-Style Simulation Panel</h2>
                    <p className="text-body" style={{ margin: '0 auto', textAlign: 'center' }}>
                        Step through the pipeline simulation and observe register updates in real time.
                        Apply scheduling to compare stall reduction.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
                        <button className="clay-btn clay-btn-primary" onClick={runSimulation} disabled={isRunning}>
                            <IconPlay style={{ width: 16, height: 16 }} /> {isRunning ? 'Running...' : 'Run Simulation'}
                        </button>
                        <button className="clay-btn clay-btn-ghost" onClick={() => { stopSim(); setIsScheduled(!isScheduled); setCurrentLine(-1); setResults(null); }}>
                            <IconSchedule style={{ width: 16, height: 16 }} /> {isScheduled ? 'Use Baseline Code' : 'Apply Scheduling'}
                        </button>
                    </div>
                </div>

                <div className="ripes-panel">
                    <div className="ripes-title-bar">
                        <div className="ripes-dot r" /><div className="ripes-dot y" /><div className="ripes-dot g" />
                        <span className="ripes-panel-label">RIPES · {isScheduled ? 'Scheduled Code' : 'Baseline Code'}</span>
                        {cycle > 0 && (
                            <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-heading)', fontSize: 13, fontWeight: 700, color: 'var(--accent)' }}>
                                Cycle: {cycle}
                            </span>
                        )}
                    </div>

                    <div className="ripes-code">
                        <div className="code-panel" style={{ height: '100%', minHeight: 280 }}>
                            <span className="code-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <IconCode style={{ width: 14, height: 14 }} /> RISC-V Assembly
                            </span>
                            {code.map((line, i) => {
                                const parts = line.split(/\s+/);
                                return (
                                    <code key={i} className={`code-line ${i === currentLine ? 'highlight' : ''}`} style={{
                                        background: i === currentLine ? 'rgba(139,92,246,0.18)' : 'transparent',
                                        borderLeft: i === currentLine ? '3px solid var(--accent)' : '3px solid transparent',
                                        paddingLeft: 12,
                                    }}>
                                        <span style={{ color: '#64748B', fontSize: 11, width: 24, display: 'inline-block' }}>{i + 1}</span>
                                        <span className="hl-kw">{parts[0]}</span>
                                        <span className="hl-reg">{' ' + parts.slice(1).join(' ')}</span>
                                    </code>
                                );
                            })}
                        </div>
                    </div>

                    <div className="ripes-right">
                        <div style={{ marginBottom: 4 }}>
                            <span className="text-sm" style={{ fontSize: 10, marginBottom: 6, display: 'block' }}>Register File</span>
                            <div className="register-panel">
                                {Object.entries(regs).map(([name, val]) => (
                                    <div key={name} className="reg-row">
                                        <span className="reg-name">{name}</span>
                                        <span className={changedRegs.has(name) ? 'reg-changed' : 'reg-val'}>
                                            0x{val.toString(16).toUpperCase().padStart(2, '0')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {results && (
                            <div className="clay-card" style={{ padding: 16 }}>
                                <span className="text-sm" style={{ fontSize: 10, marginBottom: 10, display: 'block' }}>Simulation Results</span>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                                    <div className="metric-pill" style={{ justifyContent: 'center', padding: '8px 12px' }}>
                                        <span className="metric-label" style={{ fontSize: 10 }}>Stalls</span>
                                        <span className="metric-value" style={{ color: results.stalls > 10 ? 'var(--accent-alt)' : 'var(--emerald)', fontWeight: 800 }}>{results.stalls}</span>
                                    </div>
                                    <div className="metric-pill" style={{ justifyContent: 'center', padding: '8px 12px' }}>
                                        <span className="metric-label" style={{ fontSize: 10 }}>CPI</span>
                                        <span className="metric-value" style={{ color: parseFloat(results.cpi) > 2 ? 'var(--accent-alt)' : 'var(--emerald)', fontWeight: 800 }}>{results.cpi}</span>
                                    </div>
                                    <div className="metric-pill" style={{ justifyContent: 'center', padding: '8px 12px' }}>
                                        <span className="metric-label" style={{ fontSize: 10 }}>Cycles</span>
                                        <span className="metric-value" style={{ fontWeight: 800 }}>{results.totalCycles}</span>
                                    </div>
                                    <div className="metric-pill" style={{ justifyContent: 'center', padding: '8px 12px' }}>
                                        <span className="metric-label" style={{ fontSize: 10 }}>Instrs</span>
                                        <span className="metric-value" style={{ fontWeight: 800 }}>{results.instructions}</span>
                                    </div>
                                </div>
                                <span className="demo-badge" style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                                    <IconWarning style={{ width: 12, height: 12 }} /> Demo values — replace with RIPES measurements
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
