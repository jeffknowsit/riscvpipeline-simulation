import React, { useState } from 'react';

export default function Interactions({ interactions, onAction, isPdfMode }) {
    if (isPdfMode || !interactions || interactions.length === 0) return null;

    return (
        <div className="interactions">
            {interactions.map((item, i) => {
                if (item.type === 'button') {
                    return (
                        <button
                            key={i}
                            className="interaction-btn"
                            onClick={() => onAction && onAction(item.action)}
                        >
                            {item.action?.type === 'goToSlide' && '📄 '}
                            {item.action?.type === 'randomizeChart' && '🎲 '}
                            {item.action?.type === 'randomizeTable' && '🎲 '}
                            {item.label}
                        </button>
                    );
                }
                if (item.type === 'toggle') {
                    return <ToggleControl key={i} item={item} onAction={onAction} />;
                }
                if (item.type === 'hoverReveal') {
                    return null; // hover reveals are handled at the visual level
                }
                return null;
            })}
        </div>
    );
}

function ToggleControl({ item, onAction }) {
    const [activeIdx, setActiveIdx] = useState(0);

    const handleToggle = (idx) => {
        setActiveIdx(idx);
        if (onAction) {
            onAction({ type: 'toggle', state: item.states[idx] });
        }
    };

    return (
        <div className="toggle-btn">
            {item.states.map((state, idx) => (
                <button
                    key={idx}
                    className={`toggle-option ${idx === activeIdx ? 'active' : ''}`}
                    onClick={() => handleToggle(idx)}
                >
                    {state.charAt(0).toUpperCase() + state.slice(1)}
                </button>
            ))}
        </div>
    );
}
