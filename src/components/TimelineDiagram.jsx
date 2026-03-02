import React from 'react';

export default function TimelineDiagram({ visual }) {
    const segments = visual.segments || [];
    const labels = visual.labels || [];

    return (
        <div className="timeline-visual">
            {segments.map((seg, i) => (
                <div key={i} className="timeline-segment">
                    <div className="timeline-dot" />
                    <span className="timeline-seg-label">{seg}</span>
                    <span className="timeline-seg-text">{labels[i] || ''}</span>
                </div>
            ))}
        </div>
    );
}
