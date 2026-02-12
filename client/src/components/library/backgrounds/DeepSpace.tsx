
import { motion } from "framer-motion";

const DeepSpace = ({ color1 = "#020617", color2 = "#ffffff" }: { color1?: string, color2?: string }) => {
    return (
        <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: color1 }}>
            {/* Nebula effect */}
            <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-slate-950/40 blur-3xl" />

            {[...Array(60)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    initial={{
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                        scale: Math.random() * 0.5 + 0.2,
                        opacity: Math.random() * 0.8,
                    }}
                    animate={{
                        opacity: [0.2, 1, 0.2],
                        scale: [0.5, 1.2, 0.5],
                    }}
                    transition={{
                        duration: Math.random() * 5 + 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 5,
                    }}
                    style={{
                        backgroundColor: color2,
                        width: i % 10 === 0 ? "3px" : "1.5px", // Occasional larger stars
                        height: i % 10 === 0 ? "3px" : "1.5px",
                        boxShadow: i % 10 === 0 ? `0 0 4px 1px ${color2}` : 'none'
                    }}
                />
            ))}
            {/* Shooting star maybe? */}
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
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        </div>
    );
};

export default DeepSpace;
