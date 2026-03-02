import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell,
} from 'recharts';

function generateRandomData(chartConfig) {
    const categories = chartConfig.xCategories || [];
    return categories.map((cat) => {
        const row = { name: cat };
        (chartConfig.series || []).forEach((s) => {
            const { min, max } = s.randomRange || { min: 0, max: 100 };
            row[s.id] = Math.floor(Math.random() * (max - min + 1)) + min;
        });
        return row;
    });
}

export default function ChartSlide({ chartConfig, onRandomize }) {
    const [data, setData] = useState(() => generateRandomData(chartConfig));

    const randomize = () => {
        setData(generateRandomData(chartConfig));
    };

    // Expose randomize function
    useEffect(() => {
        if (onRandomize) onRandomize(randomize);
    }, []);

    return (
        <div className="chart-area">
            <div className="chart-title">{chartConfig.title}</div>
            <span className="demo-badge">⚠ Demo / Sample Data</span>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data} barGap={4} barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis
                        dataKey="name"
                        tick={{ fill: '#6B7280', fontSize: 13, fontWeight: 500 }}
                        axisLine={{ stroke: '#E5E7EB' }}
                        label={{ value: chartConfig.xLabel, position: 'insideBottom', offset: -5, fill: '#6B7280', fontSize: 12 }}
                    />
                    <YAxis
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                        axisLine={{ stroke: '#E5E7EB' }}
                        label={{ value: chartConfig.yLabel, angle: -90, position: 'insideLeft', fill: '#6B7280', fontSize: 12 }}
                    />
                    <Tooltip
                        contentStyle={{
                            background: '#1E293B',
                            border: 'none',
                            borderRadius: '8px',
                            color: '#E2E8F0',
                            fontSize: '13px',
                        }}
                    />
                    <Legend
                        wrapperStyle={{ fontSize: '13px', fontWeight: 600 }}
                    />
                    {(chartConfig.series || []).map((s) => (
                        <Bar
                            key={s.id}
                            dataKey={s.id}
                            name={s.label}
                            fill={s.color || '#007ACC'}
                            radius={[4, 4, 0, 0]}
                            animationDuration={800}
                            animationBegin={200}
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export { generateRandomData };
