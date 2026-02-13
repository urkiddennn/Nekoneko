
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useIsMobile } from "../../../hooks/useIsMobile";
import React from "react";

const DeepSpace = ({ color1 = "#020617", color2 = "#ffffff" }: { color1?: string, color2?: string }) => {
    const isMobile = useIsMobile();
    const starCount = isMobile ? 25 : 60;

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        // Normalize to -0.5 to 0.5
        mouseX.set((clientX / window.innerWidth) - 0.5);
        mouseY.set((clientY / window.innerHeight) - 0.5);
    };

    return (
        <div
            className="absolute inset-0 overflow-hidden"
            style={{ backgroundColor: color1 }}
            onMouseMove={handleMouseMove}
        >
            {/* Nebula effect */}
            <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-slate-950/40 blur-3xl" />

            {[...Array(starCount)].map((_, i) => {
                // Different depths for parallax
                const depth = (i % 3) + 1;
                const translateX = useTransform(mouseX, [-0.5, 0.5], [depth * -20, depth * 20]);
                const translateY = useTransform(mouseY, [-0.5, 0.5], [depth * -20, depth * 20]);

                return (
                    <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            backgroundColor: color2,
                            width: i % 10 === 0 && !isMobile ? "3px" : "1.5px",
                            height: i % 10 === 0 && !isMobile ? "3px" : "1.5px",
                            boxShadow: i % 10 === 0 && !isMobile ? `0 0 4px 1px ${color2}` : 'none',
                            x: translateX,
                            y: translateY,
                            left: (Math.random() * 100) + "%",
                            top: (Math.random() * 100) + "%",
                        }}
                        animate={isMobile ? {
                            opacity: [0.2, 0.8, 0.2],
                        } : {
                            opacity: [0.2, 1, 0.2],
                            scale: [0.5, 1.2, 0.5],
                        }}
                        transition={{
                            duration: Math.random() * 5 + 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 5,
                        }}
                    />
                );
            })}
            {/* Shooting star maybe? */}
            {!isMobile && (
                <motion.div
                    className="absolute h-0.5 w-[100px] bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                    style={{ top: '20%', left: '20%' }}
                    animate={{
                        x: ['-200%', '200%'],
                        y: ['-200%', '200%'],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 7,
                        ease: "easeIn"
                    }}
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
        </div>
    );
};

export default DeepSpace;
