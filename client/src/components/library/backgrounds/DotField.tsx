import React from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { useIsMobile } from "../../../hooks/useIsMobile";

const DotField = ({ color1 = "rgba(255, 255, 255, 0.2)", color2 = "#6366f1" }: { color1?: string, color2?: string }) => {
    const isMobile = useIsMobile();
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { currentTarget, clientX, clientY } = e;
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    const maskImage = useMotionTemplate`radial-gradient(${isMobile ? '100px' : '200px'} at ${mouseX}px ${mouseY}px, black, transparent)`;
    const spotlightGradient = useMotionTemplate`radial-gradient(${isMobile ? '300px' : '600px'} circle at ${mouseX}px ${mouseY}px, ${color2}10, transparent 40%)`;

    return (
        <div
            className="absolute inset-0 bg-black overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(${color1} 1px, transparent 1px)`,
                backgroundSize: '30px 30px'
            }}>
                <motion.div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                        background: `linear-gradient(to right, ${color2}, transparent)`,
                        maskImage: maskImage,
                        WebkitMaskImage: maskImage
                    }}
                />
                {/* Spotlight effect */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: spotlightGradient,
                    }}
                />
            </div>
        </div>
    )
}

export default DotField;
