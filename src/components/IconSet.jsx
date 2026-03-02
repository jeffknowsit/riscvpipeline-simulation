import React from 'react';

const iconMap = {
    target: { emoji: '🎯', label: 'Target' },
    cpu: { emoji: '🖥️', label: 'CPU' },
    code: { emoji: '📝', label: 'Code' },
    chart: { emoji: '📊', label: 'Chart' },
    clock: { emoji: '⏱️', label: 'Clock' },
    team: { emoji: '👥', label: 'Team' },
};

export default function IconSet({ visual }) {
    const icons = visual.icons || [];
    return (
        <div className="icon-set">
            {icons.map((icon, i) => {
                const item = iconMap[icon] || { emoji: '📌', label: icon };
                return (
                    <div key={i} className="icon-item" style={{ animationDelay: `${i * 0.1}s` }}>
                        <span className="icon-emoji">{item.emoji}</span>
                        <span className="icon-label">{item.label}</span>
                    </div>
                );
            })}
        </div>
    );
}
