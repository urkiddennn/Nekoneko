
import { motion } from "framer-motion";

const Plasma = () => {
    return (
        <div className="absolute inset-0 bg-slate-900 overflow-hidden">
            <div className="absolute inset-0 opacity-40 filter blur-3xl">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                    animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    style={{ backgroundSize: '200% 200%' }}
                />
            </div>
            <svg className="absolute inset-0 w-full h-full opacity-30 mix-blend-overlay">
                <filter id="noise">
                    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noise)" />
            </svg>
        </div>
    )
}

export default Plasma;
