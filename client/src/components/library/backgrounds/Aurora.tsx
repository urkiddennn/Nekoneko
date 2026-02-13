import { motion, useMotionValue, useTransform } from "framer-motion";
import { useIsMobile } from "../../../hooks/useIsMobile";
import React from "react";

const Aurora = ({ color1 = "#10b981", color2 = "#3b82f6", color3 = "#a855f7" }: { color1?: string, color2?: string, color3?: string }) => {
    const isMobile = useIsMobile();

    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        mouseX.set(clientX / window.innerWidth);
        mouseY.set(clientY / window.innerHeight);
    };

    // Parallax transforms
    const x1 = useTransform(mouseX, [0, 1], [-20, 20]);
    const y1 = useTransform(mouseY, [0, 1], [-20, 20]);
    const x2 = useTransform(mouseX, [0, 1], [30, -30]);
    const y2 = useTransform(mouseY, [0, 1], [30, -30]);

    return (
        <div
            className="absolute inset-0 bg-slate-950 overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            <div
                className="absolute -inset-[10%] opacity-50"
                style={{ filter: `blur(${isMobile ? '40px' : '80px'})` }}
            >
                <motion.div
                    className="absolute top-0 right-0 w-[80%] h-[60%] rounded-[100%]"
                    style={{ backgroundColor: color1, opacity: 0.4, x: x1, y: y1 }}
                    animate={isMobile ? {} : {
                        rotate: [0, 10, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
                />
                <motion.div
                    className="absolute bottom-0 left-0 w-[70%] h-[60%] rounded-[100%]"
                    style={{ backgroundColor: color2, opacity: 0.4, x: x2, y: y2 }}
                    animate={isMobile ? {} : {
                        rotate: [0, -10, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[50%] rounded-[100%] mix-blend-screen"
                    style={{ backgroundColor: color3, opacity: 0.3 }}
                    animate={isMobile ? {} : {
                        rotate: [0, 5, 0],
                        scale: [1, 0.9, 1]
                    }}
                    transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
                />
            </div>
            {/* Scanlines for retro feel or just texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
        </div>
    )
}

export default Aurora;
