import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { IconGraph, IconSchedule, IconPlay } from './Icons';

const instructions = [
    { id: 'I1', label: 'lw x1, 0(x10)', x: 200, y: 60 },
    { id: 'I2', label: 'add x2, x1, x3', x: 120, y: 180 },
    { id: 'I3', label: 'sub x4, x2, x5', x: 120, y: 300 },
    { id: 'I4', label: 'lw x6, 4(x10)', x: 440, y: 60 },
    { id: 'I5', label: 'and x7, x6, x8', x: 440, y: 180 },
];

const dependencies = [
    { from: 'I1', to: 'I2', reg: 'x1', type: 'hazard' },
    { from: 'I2', to: 'I3', reg: 'x2', type: 'hazard' },
    { from: 'I4', to: 'I5', reg: 'x6', type: 'hazard' },
];

const scheduledOrder = ['I1', 'I4', 'I2', 'I5', 'I3'];
const scheduledReasons = [
    'I1 has no dependencies — schedule first',
    'I4 is independent of I1 — fill the gap while I1 completes',
    'I2 depends on I1 (x1) — now ready after 2 cycles',
    'I5 depends on I4 (x6) — now ready after 2 cycles',
    'I3 depends on I2 (x2) — naturally ready, no stall needed',
];

const colors = { I1: '#3B82F6', I2: '#8B5CF6', I3: '#EC4899', I4: '#F59E0B', I5: '#10B981' };

export default function DependencyGraph() {
    const [ref, isVisible] = useScrollReveal(0.15);
    const [step, setStep] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (!isPlaying) return;
        if (step >= scheduledOrder.length - 1) { setIsPlaying(false); return; }
        const timer = setTimeout(() => setStep((s) => s + 1), 1200);
        return () => clearTimeout(timer);
    }, [isPlaying, step]);

    const playAnimation = () => { setStep(0); setIsPlaying(true); };
    const resetAnim = () => { setStep(-1); setIsPlaying(false); };
    const getNodePos = (id) => instructions.find((i) => i.id === id);

    return (
        <section className="section" id="dep-graph" ref={ref}>
            <div className={`section-inner reveal ${isVisible ? 'visible' : ''}`}>
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                    <span className="text-sm" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                        <IconGraph style={{ width: 16, height: 16 }} /> Dependency Analysis
                    </span>
                    <h2 className="heading-section">Dependency Graph &amp; Scheduling Strategy</h2>
                    <p className="text-body" style={{ margin: '0 auto', textAlign: 'center' }}>
                        RAW dependencies between instructions form a directed graph. The scheduler performs
                        a topological ordering to reorder instructions without violating any data dependencies.
                    </p>
                </div>

                <div className="split" style={{ gap: 40, alignItems: 'stretch' }}>
                    {/* Left: SVG dependency graph — enlarged */}
                    <div className="split-visual" style={{ flex: '1 1 50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="clay-card" style={{ padding: 28, width: '100%' }}>
                            <span className="heading-card" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                                <IconGraph style={{ width: 18, height: 18, color: 'var(--accent)' }} />
                                Instruction Dependency Graph
                            </span>
                            <svg
                                className="dep-graph-svg"
                                viewBox="0 0 600 380"
                                style={{ width: '100%', height: 'auto', minHeight: 320 }}
                            >
                                <defs>
                                    <marker id="arrow" markerWidth="10" markerHeight="8" refX="10" refY="4" orient="auto">
                                        <polygon points="0 0, 10 4, 0 8" fill="var(--accent-alt)" />
                                    </marker>
                                </defs>
                                {/* Dependency edges */}
                                {dependencies.map((dep, i) => {
                                    const from = getNodePos(dep.from);
                                    const to = getNodePos(dep.to);
                                    if (!from || !to) return null;
                                    const scheduled = step >= 0 && scheduledOrder.indexOf(dep.from) <= step && scheduledOrder.indexOf(dep.to) <= step;
                                    return (
                                        <g key={i}>
                                            <line
                                                x1={from.x} y1={from.y + 24}
                                                x2={to.x} y2={to.y - 8}
                                                className={`dep-edge ${scheduled ? 'safe' : ''}`}
                                                strokeDasharray={scheduled ? 'none' : '6 4'}
                                                markerEnd="url(#arrow)"
                                            />
                                            <text
                                                x={(from.x + to.x) / 2 + 12}
                                                y={(from.y + to.y) / 2 + 12}
                                                fill="var(--fg-muted)"
                                                fontSize="12"
                                                fontWeight="700"
                                                fontFamily="var(--font-heading)"
                                            >
                                                {dep.reg}
                                            </text>
                                        </g>
                                    );
                                })}
                                {/* Instruction nodes */}
                                {instructions.map((instr) => {
                                    const idx = scheduledOrder.indexOf(instr.id);
                                    const isScheduled = step >= 0 && idx <= step;
                                    const isCurrent = step >= 0 && idx === step;
                                    return (
                                        <g key={instr.id} className="dep-node">
                                            <rect
                                                x={instr.x - 90}
                                                y={instr.y - 18}
                                                width={180}
                                                height={38}
                                                rx={14}
                                                fill={isScheduled ? colors[instr.id] : 'var(--card-bg-solid)'}
                                                stroke={isCurrent ? colors[instr.id] : 'rgba(139,92,246,0.3)'}
                                                strokeWidth={isCurrent ? 3 : 1.5}
                                                opacity={isScheduled ? 1 : 0.7}
                                                style={{ transition: 'all 0.5s ease' }}
                                            />
                                            <text
                                                x={instr.x} y={instr.y + 6}
                                                textAnchor="middle"
                                                fill={isScheduled ? '#fff' : 'var(--fg)'}
                                                fontSize="14"
                                                fontWeight="700"
                                                fontFamily="'Courier New', monospace"
                                            >
                                                {instr.label}
                                            </text>
                                            {isCurrent && (
                                                <text
                                                    x={instr.x - 90} y={instr.y - 26}
                                                    fill={colors[instr.id]}
                                                    fontSize="12" fontWeight="800"
                                                    fontFamily="var(--font-heading)"
                                                >
                                                    Step {idx + 1}
                                                </text>
                                            )}
                                        </g>
                                    );
                                })}
                            </svg>
                        </div>
                    </div>

                    {/* Right: Scheduling steps */}
                    <div className="split-text" style={{ flex: '1 1 50%' }}>
                        <span className="heading-card" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                            <IconSchedule style={{ width: 18, height: 18, color: 'var(--accent)' }} />
                            List Scheduling (Topological Order)
                        </span>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {scheduledOrder.map((id, i) => {
                                const instr = instructions.find((ins) => ins.id === id);
                                const isActive = step >= 0 && i <= step;
                                const isCurrent = step >= 0 && i === step;
                                return (
                                    <div key={id} className="clay-card" style={{
                                        padding: '14px 18px',
                                        borderRadius: 'var(--r-sm)',
                                        opacity: isActive ? 1 : 0.5,
                                        borderLeft: isCurrent ? `4px solid ${colors[id]}` : '4px solid transparent',
                                        transition: 'all 0.4s var(--ease-out)',
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div style={{
                                                width: 32, height: 32, borderRadius: '50%',
                                                background: isActive ? colors[id] : 'var(--recessed)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 14,
                                                color: isActive ? '#fff' : 'var(--fg-muted)',
                                                flexShrink: 0,
                                                transition: 'all 0.4s var(--ease-out)',
                                            }}>
                                                {i + 1}
                                            </div>
                                            <div>
                                                <div style={{ fontFamily: "'Courier New', monospace", fontSize: 14, fontWeight: 700, color: 'var(--fg)' }}>
                                                    {instr?.label}
                                                </div>
                                                {isActive && (
                                                    <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 3 }}>
                                                        {scheduledReasons[i]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                            <button className="clay-btn clay-btn-primary" onClick={playAnimation} disabled={isPlaying}>
                                <IconPlay style={{ width: 16, height: 16 }} /> {isPlaying ? 'Playing...' : 'Animate Scheduling'}
                            </button>
                            <button className="clay-btn clay-btn-ghost" onClick={resetAnim}>
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
