import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    // Default to 'dark' to match the FallingPattern aesthetic
    const [theme, setTheme] = useState(() => {
        try {
            return localStorage.getItem('coa-theme') || 'dark';
        } catch { return 'dark'; }
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        try { localStorage.setItem('coa-theme', theme); } catch { }
    }, [theme]);

    const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
