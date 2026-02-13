
import { motion } from "framer-motion";
import { useIsMobile } from "../../../hooks/useIsMobile";

const GradientCircles = ({ color1 = "#facc15", color2 = "#c084fc", color3 = "#f472b6" }: { color1?: string, color2?: string, color3?: string }) => {
    const isMobile = useIsMobile();
    const blurAmount = isMobile ? 'blur-[40px]' : 'blur-[100px]';

    return (
        <div className="absolute inset-0 bg-white dark:bg-black overflow-hidden is-gradient-circles">
            <motion.div
                className={`absolute w-[600px] h-[600px] rounded-full mix-blend-multiply filter opacity-60 animate-blob ${blurAmount}`}
                style={{ backgroundColor: color1 }}
                animate={isMobile ? {} : {
                    x: [0, 200, 0],
                    y: [0, -100, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.div
                className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full mix-blend-multiply filter opacity-60 animate-blob animation-delay-2000 ${blurAmount}`}
                style={{ backgroundColor: color2 }}
                animate={isMobile ? {} : {
                    x: [0, -200, 0],
                    y: [0, 100, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{ duration: 12, repeat: Infinity }}
            />
            {!isMobile && (
                <motion.div
                    className={`absolute -bottom-32 left-80 w-[600px] h-[600px] rounded-full mix-blend-multiply filter opacity-60 animate-blob animation-delay-4000 ${blurAmount}`}
                    style={{ backgroundColor: color3 }}
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.3, 1]
                    }}
                    transition={{ duration: 11, repeat: Infinity }}
                />
            )}
        </div>
    )
}

export default GradientCircles;
