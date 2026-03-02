import React from 'react';
import { ThemeProvider, useTheme } from './hooks/ThemeContext';
import { FallingPattern } from './components/ui/falling-pattern';
import BackgroundBlobs from './components/BackgroundBlobs';
import HeroSection from './components/HeroSection';
import HazardSection from './components/HazardSection';
import SchedulingPlayground from './components/SchedulingPlayground';
import RipesSimPanel from './components/RipesSimPanel';
import ResultsSection from './components/ResultsSection';
import TimelineExplorer from './components/TimelineExplorer';
import DependencyGraph from './components/DependencyGraph';
import WhatIfSection from './components/WhatIfSection';
import PlanningSection from './components/PlanningSection';
import ConclusionSection from './components/ConclusionSection';
import { useActiveSection } from './hooks/useScrollReveal';
import { IconSun, IconMoon } from './components/Icons';
import './index.css';

const sectionIds = [
  'hero', 'hazards', 'scheduling', 'ripes', 'results',
  'timeline-explorer', 'dep-graph', 'what-if',
  'planning', 'conclusion',
];
const sectionLabels = [
  'Intro', 'Hazards', 'Scheduling', 'Simulate', 'Results',
  'Timeline', 'Dependencies', 'What-If',
  'Planning', 'Conclusion',
];

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const activeIdx = useActiveSection(sectionIds);

  return (
    <>
      {/* FallingPattern animated background — full viewport, deep black */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <FallingPattern
          color={theme === 'dark' ? '#a78bfa' : 'oklch(0.75 0.12 280)'}
          backgroundColor={theme === 'dark' ? '#000000' : '#f5f3fa'}
          duration={150}
          blurIntensity="1em"
          density={1}
          className="h-full"
        />
      </div>

      <BackgroundBlobs />

      {/* Theme toggle */}
      <button className="theme-toggle" onClick={toggleTheme} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
        {theme === 'light' ? <IconMoon /> : <IconSun />}
      </button>

      {/* Navigation dots */}
      <nav className="nav-dots" aria-label="Section navigation">
        {sectionIds.map((id, i) => (
          <a key={id} href={`#${id}`} className={`nav-dot ${i === activeIdx ? 'active' : ''}`}
            title={sectionLabels[i]} aria-label={`Go to ${sectionLabels[i]} section`} />
        ))}
      </nav>

      {/* 10 Sections */}
      <HeroSection />
      <HazardSection />
      <SchedulingPlayground />
      <RipesSimPanel />
      <ResultsSection />
      <TimelineExplorer />
      <DependencyGraph />
      <WhatIfSection />
      <PlanningSection />
      <ConclusionSection />

      <footer className="footer-clay">
        <div className="footer-content">
          <p>© 2026 B.Tech COA Project  ·  <span className="creator-tag">Created by Jeff Joseph</span></p>
          <a href="https://github.com/jeffknowsit" target="_blank" rel="noopener noreferrer" className="github-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
            GitHub Profile
          </a>
        </div>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
