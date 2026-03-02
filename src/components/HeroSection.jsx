import React from 'react';
import { HeroGeometric } from './ui/shape-landing-hero';
import { IconArrowDown, IconSchedule, IconTimeline } from './Icons';

export default function HeroSection() {
    return (
        <section id="hero">
            <HeroGeometric
                badge="B.Tech COA · RIPES-Based Project"
                title1="Instruction Scheduling"
                title2="for RISC-V Pipelines"
                description="A visual, simulation-based exploration of how instruction scheduling reduces hazard-induced stalls in a 5-stage RISC-V pipeline, improving CPI and overall throughput."
            >
                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', marginTop: 12 }}>
                    <a href="#hazards" className="clay-btn clay-btn-primary" style={{
                        padding: '14px 28px', fontSize: '0.9rem',
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                    }}>
                        <IconArrowDown style={{ width: 16, height: 16 }} /> Start Walkthrough
                    </a>
                    <a href="https://app.presentations.ai/view/Agmvw20rh3" target="_blank" rel="noopener noreferrer" className="clay-btn clay-btn-secondary" style={{
                        padding: '14px 28px', fontSize: '0.9rem',
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        background: 'rgba(255,255,255,0.05)',
                        color: 'rgba(255,255,255,0.9)',
                        border: '1px solid rgba(255,255,255,0.1)',
                    }}>
                        <IconTimeline style={{ width: 16, height: 16 }} /> Project PPT
                    </a>
                    <a href="#scheduling" className="clay-btn clay-btn-ghost" style={{
                        padding: '14px 28px', fontSize: '0.9rem',
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        color: 'rgba(255,255,255,0.5)', borderColor: 'rgba(255,255,255,0.1)',
                    }}>
                        <IconSchedule style={{ width: 16, height: 16 }} /> Playground
                    </a>
                </div>
            </HeroGeometric>
        </section>
    );
}
