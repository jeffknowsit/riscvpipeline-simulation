import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { IconTimeline, IconTarget } from './Icons';

const weeks = [
    { label: 'W1-2', title: 'Study and Setup', detail: 'Study COA hazard theory, install RIPES simulator, explore 5-stage pipeline views', color: 'var(--accent)' },
    { label: 'W3-4', title: 'Baseline Experiments', detail: 'Write RISC-V programs with hazards, run in RIPES, record stall counts and CPI', color: 'var(--sky)' },
    { label: 'W5-6', title: 'Scheduling and Optimization', detail: 'Apply instruction scheduling, re-run experiments, compare before/after metrics', color: 'var(--accent-alt)' },
    { label: 'W7', title: 'Report and Presentation', detail: 'Compile graphs, tables, and analysis. Write report and prepare final presentation', color: 'var(--emerald)' },
];
const deliverables = [
    { icon: <IconTarget style={{ width: 20, height: 20, color: 'var(--accent)' }} />, text: 'Clear problem statement and project objectives' },
    { icon: <IconTarget style={{ width: 20, height: 20, color: 'var(--sky)' }} />, text: 'RIPES simulator setup with 5-stage pipeline configuration' },
    { icon: <IconTarget style={{ width: 20, height: 20, color: 'var(--accent-alt)' }} />, text: 'RISC-V test programs with data and control hazards' },
    { icon: <IconTarget style={{ width: 20, height: 20, color: 'var(--emerald)' }} />, text: 'CPI and stall measurements: before vs after scheduling' },
    { icon: <IconTarget style={{ width: 20, height: 20, color: 'var(--amber)' }} />, text: 'Comparison graphs and performance tables' },
    { icon: <IconTarget style={{ width: 20, height: 20, color: 'var(--accent)' }} />, text: 'Analysis, conclusion, and future work discussion' },
];

export default function PlanningSection() {
    const [ref, isVisible] = useScrollReveal(0.15);
    const [hoveredWeek, setHoveredWeek] = useState(null);
    return (
        <section className="section" id="planning" ref={ref}>
            <div className={`section-inner reveal ${isVisible ? 'visible' : ''}`}>
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <span className="text-sm" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                        <IconTimeline style={{ width: 16, height: 16 }} /> Project Planning
                    </span>
                    <h2 className="heading-section">Project Context and Timeline</h2>
                </div>
                <div className="split">
                    <div className="split-visual">
                        <div className="clay-card" style={{ padding: 28 }}>
                            <span className="heading-card" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                                <IconTimeline style={{ width: 18, height: 18, color: 'var(--accent)' }} /> Project Timeline
                            </span>
                            <div className="timeline-clay">
                                {weeks.map((w, i) => (
                                    <div key={i} className="tl-node" onMouseEnter={() => setHoveredWeek(i)} onMouseLeave={() => setHoveredWeek(null)}>
                                        <div className="tl-dot" />
                                        <span className="tl-week" style={{ color: w.color }}>{w.label}</span>
                                        <span className="tl-desc">{w.title}</span>
                                        {hoveredWeek === i && <div className="tl-tooltip">{w.detail}</div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="split-text">
                        <span className="heading-card" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                            <IconTarget style={{ width: 18, height: 18, color: 'var(--accent)' }} /> Deliverables and Rubric Coverage
                        </span>
                        <p className="text-body" style={{ marginBottom: 16, fontSize: 14 }}>
                            This project addresses B.Tech COA rubric items:
                            <strong> Planning, Execution, Presentation Quality, and Innovation.</strong>
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {deliverables.map((d, i) => (
                                <div key={i} className="clay-card" style={{ padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 12, borderRadius: 'var(--r-sm)', cursor: 'default' }}>
                                    {d.icon}
                                    <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--fg)' }}>{d.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
