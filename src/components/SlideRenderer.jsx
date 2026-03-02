import React, { useState } from 'react';
import PipelineDiagram from './PipelineDiagram';
import CodeBlock from './CodeBlock';
import IconSet from './IconSet';
import TimelineDiagram from './TimelineDiagram';
import DiagramVisual from './DiagramVisual';
import ChartSlide from './ChartSlide';
import TableSlide from './TableSlide';
import Interactions from './Interactions';

export default function SlideRenderer({ slide, onAction, isPdfMode, registerRandomize }) {
    const [toggleState, setToggleState] = useState(null);
    const [hoveredPlaceholder, setHoveredPlaceholder] = useState(null);

    const handleAction = (action) => {
        if (action.type === 'toggle') {
            setToggleState(action.state);
        }
        if (onAction) onAction(action);
    };

    // Find hover reveal interactions for placeholders
    const hoverReveals = (slide.interactions || []).filter(i => i.type === 'hoverReveal');

    const layoutClass = {
        'title+content': 'layout-title-content',
        'two-column': 'layout-two-column',
        'title+chart': 'layout-title-chart',
        'title+table': 'layout-title-table',
        'title+visual': 'layout-title-content',
    }[slide.layout] || 'layout-title-content';

    const isTitle = slide.id === 'slide-1';

    const renderVisual = (visual, idx) => {
        switch (visual.type) {
            case 'pipeline':
                return <PipelineDiagram key={idx} visual={visual} />;
            case 'code':
                return <CodeBlock key={idx} visual={visual} />;
            case 'iconSet':
                return <IconSet key={idx} visual={visual} />;
            case 'timeline':
                return <TimelineDiagram key={idx} visual={visual} />;
            case 'diagram':
                return <DiagramVisual key={idx} visual={visual} toggleState={toggleState} />;
            case 'placeholder':
                return (
                    <div
                        key={idx}
                        className="placeholder-box"
                        onMouseEnter={() => setHoveredPlaceholder(idx)}
                        onMouseLeave={() => setHoveredPlaceholder(null)}
                    >
                        <span className="placeholder-icon">📷</span>
                        {visual.label}
                        {hoveredPlaceholder === idx && hoverReveals[idx] && !isPdfMode && (
                            <div className="hover-tooltip">{hoverReveals[idx].text}</div>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    // Two-column layout
    if (slide.layout === 'two-column') {
        // Left: bullets + some visuals, Right: other visuals
        const leftVisuals = (slide.visuals || []).filter(
            (v) => v.type === 'code'
        );
        const rightVisuals = (slide.visuals || []).filter(
            (v) => v.type !== 'code'
        );

        return (
            <div className={`slide ${layoutClass} ${isTitle ? 'title-slide' : ''}`} id={slide.id}>
                <h2 className="slide-title">{slide.title}</h2>
                {slide.id === 'slide-10' || slide.id === 'slide-11' ? (
                    <span className="slide-badge">Demo Data</span>
                ) : null}
                <div className="slide-body">
                    {/* Left column */}
                    <div className="column">
                        {slide.bullets && slide.bullets.length > 0 && (
                            <ul className="bullets">
                                {slide.bullets.map((b, i) => (
                                    <li key={i}>{b}</li>
                                ))}
                            </ul>
                        )}
                        {leftVisuals.map((v, i) => renderVisual(v, i))}
                    </div>
                    {/* Right column */}
                    <div className="column">
                        {slide.bulletsRight && (
                            <ul className="bullets bullets-right">
                                {slide.bulletsRight.map((b, i) => (
                                    <li key={i}>{b}</li>
                                ))}
                            </ul>
                        )}
                        {rightVisuals.map((v, i) => renderVisual(v, i + leftVisuals.length))}
                    </div>
                </div>
                <Interactions
                    interactions={slide.interactions}
                    onAction={handleAction}
                    isPdfMode={isPdfMode}
                />
            </div>
        );
    }

    // title+chart layout
    if (slide.layout === 'title+chart') {
        return (
            <div className={`slide ${layoutClass}`} id={slide.id}>
                <h2 className="slide-title">{slide.title}</h2>
                <span className="slide-badge">Demo Data</span>
                <div className="slide-body">
                    {slide.bullets && (
                        <ul className="bullets">
                            {slide.bullets.map((b, i) => (
                                <li key={i}>{b}</li>
                            ))}
                        </ul>
                    )}
                    {slide.chartConfig && (
                        <ChartSlide
                            chartConfig={slide.chartConfig}
                            onRandomize={(fn) => registerRandomize && registerRandomize('chart', fn)}
                        />
                    )}
                </div>
                <Interactions
                    interactions={slide.interactions}
                    onAction={handleAction}
                    isPdfMode={isPdfMode}
                />
            </div>
        );
    }

    // title+table layout
    if (slide.layout === 'title+table') {
        return (
            <div className={`slide ${layoutClass}`} id={slide.id}>
                <h2 className="slide-title">{slide.title}</h2>
                <span className="slide-badge">Demo Data</span>
                <div className="slide-body">
                    {slide.bullets && (
                        <ul className="bullets">
                            {slide.bullets.map((b, i) => (
                                <li key={i}>{b}</li>
                            ))}
                        </ul>
                    )}
                    {slide.tableConfig && (
                        <TableSlide
                            tableConfig={slide.tableConfig}
                            onRandomize={(fn) => registerRandomize && registerRandomize('table', fn)}
                        />
                    )}
                </div>
                <Interactions
                    interactions={slide.interactions}
                    onAction={handleAction}
                    isPdfMode={isPdfMode}
                />
            </div>
        );
    }

    // Default: title+content / title+visual
    return (
        <div className={`slide ${layoutClass} ${isTitle ? 'title-slide' : ''}`} id={slide.id}>
            <h2 className="slide-title">{slide.title}</h2>
            <div className="slide-body">
                {slide.bullets && (
                    <ul className="bullets">
                        {slide.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                        ))}
                    </ul>
                )}
                {(slide.visuals || []).map((v, i) => renderVisual(v, i))}
            </div>
            <Interactions
                interactions={slide.interactions}
                onAction={handleAction}
                isPdfMode={isPdfMode}
            />
        </div>
    );
}
