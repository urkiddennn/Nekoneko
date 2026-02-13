import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect } from "react";

const RetroGrid = ({
    color1 = "rgba(0, 0, 0, 0.05)",
}: {
    color1?: string,
}) => {
    const y = useMotionValue(0);

    useEffect(() => {
        // We move by the exact size of one grid square (40px) to create a seamless loop
        const controls = animate(y, [0, 40], {
            duration: 2,
            repeat: Infinity,
            ease: "linear",
        });
        return () => controls.stop();
    }, [y]);

    return (
        <div className="absolute inset-0 overflow-hidden [perspective:200px] bg-white dark:bg-black">
            {/* Grid wrapper that handles the 3D transform */}
            <div className="absolute inset-0 [transform:rotateX(60deg)_scale(2)] origin-center">
                {/* 
                    The actual animated layer. 
                    We use 'y' (translateY) which is GPU-accelerated (composite layer).
                    Background-position would trigger repaints, causing lag.
                */}
                <motion.div
                    className="absolute inset-x-[-50%] top-[-100%] h-[300%] w-[200%] [will-change:transform]"
                    style={{
                        y,
                        backgroundImage: `
                            linear-gradient(to right, ${color1} 1px, transparent 1px),
                            linear-gradient(to bottom, ${color1} 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px',
                    }}
                />
            </div>

            {/* Fading Edge (Horizon) */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-transparent dark:from-black dark:via-black/80 dark:to-transparent pointer-events-none" />
        </div>
    );
};

export default RetroGrid;
