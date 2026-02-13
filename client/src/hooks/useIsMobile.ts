import { useState, useEffect } from 'react';

export const useIsMobile = (breakpoint: number = 768) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

        // Set initial value
        setIsMobile(mediaQuery.matches);

        const handler = (event: MediaQueryListEvent) => {
            setIsMobile(event.matches);
        };

        // Modern browsers
        mediaQuery.addEventListener('change', handler);

        return () => {
            mediaQuery.removeEventListener('change', handler);
        };
    }, [breakpoint]);

    return isMobile;
};
