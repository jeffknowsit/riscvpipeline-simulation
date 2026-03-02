import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { IconExperiment, IconForward, IconHazard, IconClock, IconRandom, IconWarning } from './Icons';

function rand(min, max, dec) {
    const v = min + Math.random() * (max - min);
    return dec !== undefined ? parseFloat(v.toFixed(dec)) : Math.floor(v);
}

function generateScenarios() {
    return [
        {
            id: 'forwarding',
            title: 'Data Forwarding ON vs OFF',
            desc: 'Forwarding (bypassing) allows results to be passed directly from EX/MEM stages without waiting for write-back.',
            icon: <IconForward style={{ width: 22, height: 22 }} />,
            gradient: 'linear-gradient(135deg, #A78BFA, #7C3AED)',
            metrics: {
                fwdOff: { stalls: rand(14, 24), cpi: rand(2.2, 3.2, 2) },
                fwdOn: { stalls: rand(3, 10), cpi: rand(1.1, 1.8, 2) },
            },
        },
        {
            id: 'branch',
            title: 'Branch Frequency Impact',
            desc: 'Higher branch frequency increases control hazard stalls, especially without branch prediction.',
            icon: <IconHazard style={{ width: 22, height: 22 }} />,
            gradient: 'linear-gradient(135deg, #F472B6, #DB2777)',
            metrics: {
                low: { stalls: rand(4, 10), cpi: rand(1.2, 1.6, 2) },
                high: { stalls: rand(15, 28), cpi: rand(2.0, 3.0, 2) },
            },
        },
        {
            id: 'latency',
            title: 'Load Latency Variation',
            desc: 'Longer load latency (e.g., cache miss) increases stall duration for load-use hazards.',
            icon: <IconClock style={{ width: 22, height: 22 }} />,
            gradient: 'linear-gradient(135deg, #34D399, #10B981)',
            metrics: {
                lat1: { stalls: rand(5, 12), cpi: rand(1.3, 1.8, 2) },
                lat3: { stalls: rand(18, 32), cpi: rand(2.5, 3.8, 2) },
            },
        },
    ];
}

export default function WhatIfSection() {
    const [ref, isVisible] = useScrollReveal(0.15);
    const [scenarios, setScenarios] = useState(() => generateScenarios());

    return (
        <section className="section" id="what-if" ref={ref}>
            <div className={`section-inner reveal ${isVisible ? 'visible' : ''}`}>
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                    <span className="text-sm" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                        <IconExperiment style={{ width: 16, height: 16 }} /> Conceptual Analysis
                    </span>
                    <h2 className="heading-section">What-If Experiments</h2>
                    <p className="text-body" style={{ margin: '0 auto', textAlign: 'center' }}>
                        Explore how different microarchitectural parameters affect pipeline stalls and CPI.
                        Each scenario auto-generates illustrative demo metrics.
                    </p>
                    <button className="clay-btn clay-btn-ghost" style={{ marginTop: 12 }} onClick={() => setScenarios(generateScenarios())}>
                        <IconRandom style={{ width: 16, height: 16 }} /> Regenerate Demo Values
                    </button>
                </div>

                <div className="scenarios-grid">
                    {scenarios.map((s) => (
                        <div key={s.id} className="scenario-card">
                            <div className="scenario-header">
                                <div className="scenario-icon" style={{ background: s.gradient }}>{s.icon}</div>
                                <div>
                                    <span className="heading-card" style={{ fontSize: '1.1rem' }}>{s.title}</span>
                                </div>
                            </div>
                            <p style={{ fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.55, margin: 0 }}>{s.desc}</p>

                            {/* Metrics */}
                            {s.id === 'forwarding' && (
                                <div className="scenario-metrics">
                                    <div className="scenario-metric">
                                        <span className="sm-label">Fwd OFF Stalls</span>
                                        <span className="sm-value" style={{ color: 'var(--accent-alt)' }}>{s.metrics.fwdOff.stalls}</span>
                                    </div>
                                    <div className="scenario-metric">
                                        <span className="sm-label">Fwd ON Stalls</span>
                                        <span className="sm-value" style={{ color: 'var(--emerald)' }}>{s.metrics.fwdOn.stalls}</span>
                                    </div>
                                    <div className="scenario-metric">
                                        <span className="sm-label">CPI (OFF)</span>
                                        <span className="sm-value" style={{ color: 'var(--accent-alt)' }}>{s.metrics.fwdOff.cpi}</span>
                                    </div>
                                    <div className="scenario-metric">
                                        <span className="sm-label">CPI (ON)</span>
                                        <span className="sm-value" style={{ color: 'var(--emerald)' }}>{s.metrics.fwdOn.cpi}</span>
                                    </div>
                                </div>
                            )}
                            {s.id === 'branch' && (
                                <div className="scenario-metrics">
                                    <div className="scenario-metric">
                                        <span className="sm-label">Low Branch</span>
                                        <span className="sm-value" style={{ color: 'var(--emerald)' }}>{s.metrics.low.stalls}</span>
                                    </div>
                                    <div className="scenario-metric">
                                        <span className="sm-label">High Branch</span>
                                        <span className="sm-value" style={{ color: 'var(--accent-alt)' }}>{s.metrics.high.stalls}</span>
                                    </div>
                                    <div className="scenario-metric">
                                        <span className="sm-label">CPI (Low)</span>
                                        <span className="sm-value" style={{ color: 'var(--emerald)' }}>{s.metrics.low.cpi}</span>
                                    </div>
                                    <div className="scenario-metric">
                                        <span className="sm-label">CPI (High)</span>
                                        <span className="sm-value" style={{ color: 'var(--accent-alt)' }}>{s.metrics.high.cpi}</span>
                                    </div>
                                </div>
                            )}
                            {s.id === 'latency' && (
                                <div className="scenario-metrics">
                                    <div className="scenario-metric">
                                        <span className="sm-label">1-Cycle Load</span>
                                        <span className="sm-value" style={{ color: 'var(--emerald)' }}>{s.metrics.lat1.stalls}</span>
                                    </div>
                                    <div className="scenario-metric">
                                        <span className="sm-label">3-Cycle Load</span>
                                        <span className="sm-value" style={{ color: 'var(--accent-alt)' }}>{s.metrics.lat3.stalls}</span>
                                    </div>
                                    <div className="scenario-metric">
                                        <span className="sm-label">CPI (1-Cyc)</span>
                                        <span className="sm-value" style={{ color: 'var(--emerald)' }}>{s.metrics.lat1.cpi}</span>
                                    </div>
                                    <div className="scenario-metric">
                                        <span className="sm-label">CPI (3-Cyc)</span>
                                        <span className="sm-value" style={{ color: 'var(--accent-alt)' }}>{s.metrics.lat3.cpi}</span>
                                    </div>
                                </div>
                            )}

                            <span className="demo-badge" style={{ alignSelf: 'flex-start' }}>
                                <IconWarning style={{ width: 12, height: 12 }} /> Demo values — replace with RIPES measurements
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
