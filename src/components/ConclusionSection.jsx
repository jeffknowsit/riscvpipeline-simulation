import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { IconCheck, IconForward, IconPlay, IconSchedule, IconArrowDown } from './Icons';

const summaryPoints = [
    'Instruction scheduling reduces pipeline stalls and directly improves CPI',
    'A 5-stage RISC-V pipeline benefits from reordering independent instructions to fill delay slots',
    'RIPES simulator provides clear visualization of hazards, stalls, and scheduling impact',
    'This project covers: problem statement, objectives, RIPES setup, RISC-V code, CPI analysis, and conclusion',
];
const futureWork = [
    'Compare CPI with and without data forwarding',
    'Explore more complex pipeline configurations (superscalar, out-of-order)',
    'Apply dynamic scheduling algorithms (Tomasulo\'s algorithm)',
    'Benchmark with larger RISC-V programs and real-world workloads',
];

export default function ConclusionSection() {
    const [ref, isVisible] = useScrollReveal(0.15);
    return (
        <section className="section" id="conclusion" ref={ref}>
            <div className={`section-inner reveal ${isVisible ? 'visible' : ''}`} style={{ textAlign: 'center' }}>
                <span className="text-sm">Summary</span>
                <h2 className="heading-section">Conclusion and Further Exploration</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 700, margin: '24px auto 0', textAlign: 'left' }}>
                    {summaryPoints.map((point, i) => (
                        <div key={i} className={`clay-card reveal ${isVisible ? 'visible' : ''}`} style={{
                            padding: '14px 20px', borderRadius: 'var(--r-sm)', transitionDelay: `${i * 0.1}s`,
                            display: 'flex', alignItems: 'flex-start', gap: 10,
                        }}>
                            <IconCheck style={{ width: 18, height: 18, color: 'var(--emerald)', flexShrink: 0, marginTop: 2 }} />
                            <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--fg)' }}>{point}</span>
                        </div>
                    ))}
                </div>

                <div className="clay-card" style={{ maxWidth: 700, margin: '28px auto 0', textAlign: 'left' }}>
                    <span className="heading-card" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                        <IconForward style={{ width: 18, height: 18, color: 'var(--accent)' }} /> Future Work and Extensions
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {futureWork.map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                                <IconForward style={{ width: 14, height: 14, color: 'var(--accent)', flexShrink: 0, marginTop: 3 }} />
                                <span style={{ fontSize: 14, color: 'var(--fg-muted)', lineHeight: 1.5 }}>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 32, flexWrap: 'wrap' }}>
                    <a href="#ripes" className="clay-btn clay-btn-primary" style={{ fontSize: '1rem', padding: '16px 32px' }}>
                        <IconPlay style={{ width: 16, height: 16 }} /> Replay Simulation
                    </a>
                    <a href="#scheduling" className="clay-btn clay-btn-secondary" style={{ fontSize: '1rem', padding: '16px 32px' }}>
                        <IconSchedule style={{ width: 16, height: 16 }} /> Jump to Playground
                    </a>
                    <a href="#hero" className="clay-btn clay-btn-ghost" style={{ fontSize: '1rem', padding: '16px 32px' }}>
                        <IconArrowDown style={{ width: 16, height: 16, transform: 'rotate(180deg)' }} /> Back to Top
                    </a>
                </div>

                <p style={{ marginTop: 40, fontSize: 13, color: 'var(--fg-light)' }}>
                    B.Tech COA Project &middot; Instruction Scheduling to Reduce Pipeline Stalls &middot; RIPES Simulator
                </p>
            </div>
        </section>
    );
}
