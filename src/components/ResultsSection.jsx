import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { IconChart, IconRandom, IconWarning } from './Icons';

function randomInRange(min, max, decimals) {
    const val = min + Math.random() * (max - min);
    return decimals !== undefined ? parseFloat(val.toFixed(decimals)) : Math.floor(val);
}
function generateData() {
    const programs = ['Program A', 'Program B', 'Program C', 'Program D'];
    const stallData = programs.map((name) => ({ name, Before: randomInRange(10, 25), After: randomInRange(2, 15) }));
    const cpiData = programs.map((name) => {
        const before = randomInRange(1.8, 3.0, 2);
        const after = randomInRange(1.1, 2.2, 2);
        return { name, before, after, improvement: (((before - after) / before) * 100).toFixed(1) };
    });
    return { stallData, cpiData };
}

export default function ResultsSection() {
    const [ref, isVisible] = useScrollReveal(0.15);
    const [data, setData] = useState(() => generateData());

    useEffect(() => { if (isVisible) setData(generateData()); }, [isVisible]);

    return (
        <section className="section" id="results" ref={ref}>
            <div className={`section-inner reveal ${isVisible ? 'visible' : ''}`}>
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                    <span className="text-sm" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                        <IconChart style={{ width: 16, height: 16 }} /> Dynamic Results
                    </span>
                    <h2 className="heading-section">Performance Metrics</h2>
                    <p className="text-body" style={{ margin: '0 auto', textAlign: 'center' }}>
                        Stall counts and CPI for multiple test programs. Auto-generated demo data updates
                        each time this section enters the viewport.
                    </p>
                    <button className="clay-btn clay-btn-ghost" style={{ marginTop: 12 }} onClick={() => setData(generateData())}>
                        <IconRandom style={{ width: 16, height: 16 }} /> Randomize Examples
                    </button>
                </div>

                <div className="bento">
                    <div className="clay-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                            <span className="heading-card">Stall Cycles: Before vs After</span>
                            <span className="demo-badge"><IconWarning style={{ width: 12, height: 12 }} /> Demo Data</span>
                        </div>
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={data.stallData} barGap={4} barCategoryGap="20%">
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(124,58,237,0.08)" />
                                <XAxis dataKey="name" tick={{ fill: '#635F69', fontSize: 13, fontWeight: 600 }} axisLine={{ stroke: 'rgba(124,58,237,0.12)' }} />
                                <YAxis tick={{ fill: '#635F69', fontSize: 12 }} axisLine={{ stroke: 'rgba(124,58,237,0.12)' }} label={{ value: 'Stall Cycles', angle: -90, position: 'insideLeft', fill: '#635F69', fontSize: 12 }} />
                                <Tooltip contentStyle={{ background: '#1E1B2E', border: 'none', borderRadius: 16, color: '#E2E8F0', fontSize: 13 }} />
                                <Legend wrapperStyle={{ fontSize: 13, fontWeight: 700 }} />
                                <Bar dataKey="Before" fill="#DB2777" radius={[8, 8, 0, 0]} animationDuration={1000} />
                                <Bar dataKey="After" fill="#7C3AED" radius={[8, 8, 0, 0]} animationDuration={1000} animationBegin={200} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="clay-card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                            <span className="heading-card">CPI Comparison</span>
                            <span className="demo-badge"><IconWarning style={{ width: 12, height: 12 }} /> Demo</span>
                        </div>
                        <table className="clay-table">
                            <thead><tr><th>Program</th><th>CPI Before</th><th>CPI After</th><th>% Improvement</th></tr></thead>
                            <tbody>
                                {data.cpiData.map((row, i) => (
                                    <tr key={i}>
                                        <td style={{ fontWeight: 700, fontFamily: 'var(--font-heading)' }}>{row.name}</td>
                                        <td style={{ color: 'var(--accent-alt)', fontWeight: 700 }}>{row.before}</td>
                                        <td style={{ color: 'var(--emerald)', fontWeight: 700 }}>{row.after}</td>
                                        <td className="improve-val">&darr; {row.improvement}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 8 }}>
                            <div className="stat-orb" style={{ width: 100, height: 100 }}>
                                <span className="stat-value" style={{ fontSize: 22 }}>
                                    {(data.cpiData.reduce((s, r) => s + parseFloat(r.improvement), 0) / data.cpiData.length).toFixed(0)}%
                                </span>
                                <span className="stat-label" style={{ fontSize: 9 }}>Avg Improv</span>
                            </div>
                            <div className="stat-orb" style={{ width: 100, height: 100 }}>
                                <span className="stat-value" style={{ fontSize: 22, color: 'var(--emerald)' }}>
                                    {(data.cpiData.reduce((s, r) => s + r.after, 0) / data.cpiData.length).toFixed(2)}
                                </span>
                                <span className="stat-label" style={{ fontSize: 9 }}>Avg CPI</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
