
import { motion } from "framer-motion";

const SilkFlow = ({ color1 = "rgba(63,94,251,1)", color2 = "rgba(252,70,107,1)" }: { color1?: string, color2?: string }) => {
    return (
        <div className="absolute inset-0 overflow-hidden bg-slate-900">
            <motion.div
                className="absolute -inset-[100%] opacity-50"
                style={{
                    background: `radial-gradient(circle, ${color1} 0%, ${color2} 100%)`,
                    filter: "blur(80px)",
                }}
                animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
            <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-3xl" />
        </div>
    )
}

export default SilkFlow;
