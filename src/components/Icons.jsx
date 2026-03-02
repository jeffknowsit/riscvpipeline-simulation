import React from 'react';

// Consistent vector icon library — duotone style, 24x24 viewBox, 2px stroke
const sv = { xmlns: 'http://www.w3.org/2000/svg', width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };

export function IconPipeline(props) {
    return (
        <svg {...sv} stroke="currentColor" {...props}>
            <rect x="1" y="8" width="4" height="8" rx="1" fill="currentColor" opacity="0.15" />
            <rect x="7" y="8" width="4" height="8" rx="1" fill="currentColor" opacity="0.15" />
            <rect x="13" y="8" width="4" height="8" rx="1" fill="currentColor" opacity="0.15" />
            <rect x="19" y="8" width="4" height="8" rx="1" fill="currentColor" opacity="0.15" />
            <path d="M5 12h2M11 12h2M17 12h2" />
        </svg>
    );
}

export function IconCPU(props) {
    return (
        <svg {...sv} stroke="currentColor" {...props}>
            <rect x="4" y="4" width="16" height="16" rx="2" fill="currentColor" opacity="0.1" />
            <rect x="9" y="9" width="6" height="6" rx="1" />
            <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
        </svg>
    );
}

export function IconHazard(props) {
    return (
        <svg {...sv} stroke="currentColor" {...props}>
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" fill="currentColor" opacity="0.1" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
    );
}

export function IconSchedule(props) {
    return (
        <svg {...sv} stroke="currentColor" {...props}>
            <path d="M16 3h5v5" />
            <path d="M8 21H3v-5" />
            <path d="M21 3l-7 7" />
            <path d="M3 21l7-7" />
        </svg>
    );
}

export function IconChart(props) {
    return (
        <svg {...sv} stroke="currentColor" {...props}>
            <path d="M18 20V10M12 20V4M6 20v-6" strokeWidth="2.5" />
        </svg>
    );
}

export function IconTarget(props) {
    return (
        <svg {...sv} stroke="currentColor" {...props}>
            <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.08" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
    );
}

export function IconCode(props) {
    return (
        <svg {...sv} stroke="currentColor" {...props}>
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
        </svg>
    );
}

export function IconClock(props) {
    return (
        <svg {...sv} stroke="currentColor" {...props}>
            <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.08" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    );
}

export function IconRandom(props) {
    return (
        <svg {...sv} stroke="currentColor" {...props}>
            <path d="M16 3h5v5" />
            <path d="M4 20L21 3" />
            <path d="M21 16v5h-5" />
            <path d="M15 15l6 6" />
            <path d="M4 4l5 5" />
        </svg>
    );
}

export function IconCheck(props) {
    return (
        <svg {...sv} stroke="currentColor" {...props}>
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" fill="currentColor" opacity="0.08" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    );
}

export function IconWarning(props) {
    return (
        <svg {...sv} stroke="currentColor" {...props}>
            <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.08" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
    );
}

export function IconTimeline(props) {
    return (
        <svg {...sv} stroke="currentColor" {...props}>
            <path d="M2 12h20" />
            <circle cx="6" cy="12" r="2" fill="currentColor" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
            <circle cx="18" cy="12" r="2" fill="currentColor" />
        </svg>
    );
}

export function IconGraph(props) {
    return (
        <svg {...sv} stroke="currentColor" {...props}>
            <circle cx="6" cy="6" r="3" fill="currentColor" opacity="0.15" />
            <circle cx="18" cy="6" r="3" fill="currentColor" opacity="0.15" />
            <circle cx="6" cy="18" r="3" fill="currentColor" opacity="0.15" />
            <circle cx="18" cy="18" r="3" fill="currentColor" opacity="0.15" />
            <path d="M8.5 7.5l7 0M8.5 16.5l7 0M6 9v6M18 9v6" />
        </svg>
    );
}

export function IconExperiment(props) {
    return (
        <svg {...sv} stroke="currentColor" {...props}>
            <path d="M9 3h6M10 3v6l-5 8a1 1 0 00.85 1.53h12.3A1 1 0 0019 17l-5-8V3" />
            <path d="M8.5 14h7" strokeDasharray="2 2" />
        </svg>
    );
}

export function IconForward(props) {
    return (
        <svg {...sv} stroke="currentColor" {...props}>
            <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
    );
}

export function IconMoon(props) {
    return (
        <svg {...sv} stroke="currentColor" {...props}>
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor" opacity="0.12" />
        </svg>
    );
}

export function IconSun(props) {
    return (
        <svg {...sv} stroke="currentColor" {...props}>
            <circle cx="12" cy="12" r="5" fill="currentColor" opacity="0.15" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
    );
}

export function IconSlider(props) {
    return (
        <svg {...sv} stroke="currentColor" {...props}>
            <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3" />
            <circle cx="4" cy="12" r="2" fill="currentColor" opacity="0.2" />
            <circle cx="12" cy="10" r="2" fill="currentColor" opacity="0.2" />
            <circle cx="20" cy="14" r="2" fill="currentColor" opacity="0.2" />
        </svg>
    );
}

export function IconArrowDown(props) {
    return (
        <svg {...sv} stroke="currentColor" {...props}>
            <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
    );
}

export function IconPlay(props) {
    return (
        <svg {...sv} stroke="currentColor" {...props}>
            <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" opacity="0.15" />
        </svg>
    );
}
