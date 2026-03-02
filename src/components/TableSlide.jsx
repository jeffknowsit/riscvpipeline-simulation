import React, { useState, useEffect } from 'react';

function generateRandomRows(spec) {
    const rows = [];
    for (let i = 0; i < spec.rowCount; i++) {
        const cpiBefore =
            spec.cpiBeforeRange.min +
            Math.random() * (spec.cpiBeforeRange.max - spec.cpiBeforeRange.min);
        const cpiAfter =
            spec.cpiAfterRange.min +
            Math.random() * (spec.cpiAfterRange.max - spec.cpiAfterRange.min);
        const improvement = ((cpiBefore - cpiAfter) / cpiBefore) * 100;
        rows.push({
            program: spec.programNames[i] || `Prog ${i + 1}`,
            cpiBefore: cpiBefore.toFixed(spec.cpiBeforeRange.decimals || 2),
            cpiAfter: cpiAfter.toFixed(spec.cpiAfterRange.decimals || 2),
            improvement: improvement.toFixed(1),
        });
    }
    return rows;
}

export default function TableSlide({ tableConfig, onRandomize }) {
    const [rows, setRows] = useState(() =>
        generateRandomRows(tableConfig.rowsRandomSpec)
    );

    const randomize = () => {
        setRows(generateRandomRows(tableConfig.rowsRandomSpec));
    };

    useEffect(() => {
        if (onRandomize) onRandomize(randomize);
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span className="demo-badge" style={{ alignSelf: 'center' }}>⚠ Demo / Sample Data</span>
            <table className="data-table">
                <thead>
                    <tr>
                        {(tableConfig.columns || []).map((col, i) => (
                            <th key={i}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => (
                        <tr key={i}>
                            <td style={{ fontWeight: 600 }}>{row.program}</td>
                            <td>{row.cpiBefore}</td>
                            <td>{row.cpiAfter}</td>
                            <td className="improve-cell">
                                {row.improvement > 0 ? '↓' : '↑'} {Math.abs(row.improvement)}%
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export { generateRandomRows };
