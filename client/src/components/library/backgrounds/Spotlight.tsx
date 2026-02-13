
import { motion, useMotionTemplate } from "framer-motion";
import { useIsMobile } from "../../../hooks/useIsMobile";

const Spotlight = ({ color1 = "rgba(255,255,255,0.15)", image, mouseX, mouseY }: { color1?: string, image?: string, mouseX?: any, mouseY?: any }) => {
    const isMobile = useIsMobile();

    // Ensure we're using templates for the motion values to avoid re-renders
    const spotlightGradient = useMotionTemplate`radial-gradient(${isMobile ? '300px' : '600px'} circle at ${mouseX}px ${mouseY}px, ${color1}, transparent 40%)`;
    const maskGradient = useMotionTemplate`radial-gradient(${isMobile ? '150px' : '300px'} circle at ${mouseX}px ${mouseY}px, black, transparent)`;

    return (
        <div className="absolute inset-0 bg-slate-950 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* The Spotlight Light Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px transition-opacity duration-300"
                style={{
                    background: spotlightGradient,
                    opacity: image ? 0.4 : 1
                }}
            />

            {/* The Image Reveal Effect */}
            {image && (
                <motion.div
                    className="pointer-events-none absolute inset-0 transition-opacity duration-300 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(${image})`,
                        maskImage: maskGradient,
                        WebkitMaskImage: maskGradient,
                    }}
                />
            )}
        </div>
    );
};

export default Spotlight;
