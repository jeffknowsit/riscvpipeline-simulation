import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook: triggers "visible" class when element enters viewport.
 * Uses IntersectionObserver with configurable threshold.
 */
export function useScrollReveal(threshold = 0.15) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(el); // only trigger once
                }
            },
            { threshold }
        );
        observer.observe(el);

        return () => observer.disconnect();
    }, [threshold]);

    return [ref, isVisible];
}

/**
 * Returns the index of the section currently in view.
 * Used for nav dots.
 */
export function useActiveSection(sectionIds) {
    const [activeIdx, setActiveIdx] = useState(0);

    useEffect(() => {
        const observers = [];
        sectionIds.forEach((id, idx) => {
            const el = document.getElementById(id);
            if (!el) return;
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActiveIdx(idx);
                },
                { threshold: 0.4 }
            );
            observer.observe(el);
            observers.push(observer);
        });
        return () => observers.forEach((o) => o.disconnect());
    }, [sectionIds]);

    return activeIdx;
}
