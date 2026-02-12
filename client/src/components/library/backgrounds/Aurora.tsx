
import { motion } from "framer-motion";

const Aurora = ({ color1 = "#10b981", color2 = "#3b82f6", color3 = "#a855f7" }: { color1?: string, color2?: string, color3?: string }) => {
    return (
        <div className="absolute inset-0 bg-slate-950 overflow-hidden">
            <div className="absolute -inset-[10%] opacity-50 blur-[80px]">
                <motion.div
                    className="absolute top-0 right-0 w-[80%] h-[60%] rounded-[100%]"
                    style={{ backgroundColor: color1, opacity: 0.4 }}
                    animate={{
                        rotate: [0, 10, 0],
                        scale: [1, 1.1, 1],
                        x: [0, 50, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
                />
                <motion.div
                    className="absolute bottom-0 left-0 w-[70%] h-[60%] rounded-[100%]"
                    style={{ backgroundColor: color2, opacity: 0.4 }}
                    animate={{
                        rotate: [0, -10, 0],
                        scale: [1, 1.2, 1],
                        y: [0, -50, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}

                />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[50%] rounded-[100%] mix-blend-screen"
                    style={{ backgroundColor: color3, opacity: 0.3 }}
                    animate={{
                        rotate: [0, 5, 0],
                        scale: [1, 0.9, 1]
                    }}
                    transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
                />
            </div>
            {/* Scanlines for retro feel or just texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px]" />
        </div>
    )
}

export default Aurora;
