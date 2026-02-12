
import { motion } from "framer-motion";

const AnimatedPolka = ({ color1 = "#6366f1" }: { color1?: string }) => {
    return (
        <div className="absolute inset-0 h-full w-full bg-white dark:bg-slate-950">
            <div
                className="absolute inset-0 h-full w-full"
                style={{
                    backgroundImage: `radial-gradient(${color1} 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                    opacity: 0.3
                }}
            />
            <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]">
                <div
                    className="absolute inset-0 h-full w-full"
                    style={{
                        backgroundImage: `radial-gradient(${color1} 1px, transparent 1px)`,
                        backgroundSize: '24px 24px',
                        opacity: 0.8
                    }}
                />
            </div>
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent"
                animate={{
                    x: ["-100%", "100%"],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
        </div>
    );
};

export default AnimatedPolka;
