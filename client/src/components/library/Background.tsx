import React, { Suspense } from "react";
import { useMotionValue } from "framer-motion";
import { cn } from "../../lib/utils";

// --- Lazy Load Variants ---
const AnimatedPolka = React.lazy(() => import("./backgrounds/AnimatedPolka"));
const AnimatedGradient = React.lazy(() => import("./backgrounds/AnimatedGradient"));
const DeepSpace = React.lazy(() => import("./backgrounds/DeepSpace"));
const SilkFlow = React.lazy(() => import("./backgrounds/SilkFlow"));
const DotField = React.lazy(() => import("./backgrounds/DotField"));
const Spotlight = React.lazy(() => import("./backgrounds/Spotlight"));
const FractalGlass = React.lazy(() => import("./backgrounds/FractalGlass"));
const GradientCircles = React.lazy(() => import("./backgrounds/GradientCircles"));
const Plasma = React.lazy(() => import("./backgrounds/Plasma"));
const BackgroundGrid = React.lazy(() => import("./backgrounds/BackgroundGrid"));
const Aurora = React.lazy(() => import("./backgrounds/Aurora"));
const RetroGrid = React.lazy(() => import("./backgrounds/RetroGrid"));

// --- Main Component ---

type BackgroundVariant =
    | 'animated_polka'
    | 'animated_gradient'
    | 'deep_space'
    | 'silk_flow'
    | 'dot_field'
    | 'spotlight'
    | 'fractal_glass'
    | 'gradient_circles'
    | 'plasma'
    | 'background_grid'
    | 'aurora'
    | 'retro_grid';

interface BackgroundProps {
    variant: BackgroundVariant;
    children?: React.ReactNode;
    className?: string;
    styles?: React.CSSProperties;
    color1?: string;
    color2?: string;
    color3?: string;
    image?: string;
    alignHorizontal?: "left" | "center" | "right";
    alignVertical?: "top" | "center" | "bottom";
    anchorId?: string;
    renderItem?: (item: any, index: number) => React.ReactNode;
}

const Background: React.FC<BackgroundProps> = ({
    variant = 'animated_polka',
    children,
    className,
    styles,
    color1,
    color2,
    color3,
    image,
    alignHorizontal = "center",
    alignVertical = "center",
    renderItem
}) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { currentTarget, clientX, clientY } = e;
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    const getVariant = () => {
        switch (variant) {
            case 'animated_polka': return <AnimatedPolka color1={color1} />;
            case 'animated_gradient': return <AnimatedGradient color1={color1} color2={color2} color3={color3} />;
            case 'deep_space': return <DeepSpace color1={color1} color2={color2} />;
            case 'silk_flow': return <SilkFlow color1={color1} color2={color2} />;
            case 'dot_field': return <DotField color1={color1} color2={color2} />;
            case 'spotlight': return <Spotlight color1={color1} image={image} mouseX={mouseX} mouseY={mouseY} />;
            case 'fractal_glass': return <FractalGlass color1={color1} color2={color2} />;
            case 'gradient_circles': return <GradientCircles color1={color1} color2={color2} color3={color3} />;
            case 'plasma': return <Plasma />;
            case 'background_grid': return <BackgroundGrid />;
            case 'aurora': return <Aurora color1={color1} color2={color2} color3={color3} />;
            case 'retro_grid': return <RetroGrid color1={color1} />;
            default: return <AnimatedPolka color1={color1} />;
        }
    };

    const getAlignmentClasses = () => {
        let classes = "flex w-full h-full relative z-10 pointer-events-none "; // pointer-events-none so background doesn't block clicks, but children need pointer-events-auto

        switch (alignHorizontal) {
            case "left": classes += "justify-start "; break;
            case "right": classes += "justify-end "; break;
            case "center": default: classes += "justify-center "; break;
        }

        switch (alignVertical) {
            case "top": classes += "items-start "; break;
            case "bottom": classes += "items-end "; break;
            case "center": default: classes += "items-center "; break;
        }

        return classes;
    };

    return (
        <div
            className={cn("relative w-full overflow-hidden min-h-[400px] h-full group", className)}
            style={styles}
            onMouseMove={handleMouseMove}
        >
            <Suspense fallback={<div className="absolute inset-0 bg-slate-950/20" />}>
                {getVariant()}
            </Suspense>
            <div className={getAlignmentClasses()}>
                <div className="pointer-events-auto w-full max-w-7xl mx-auto px-4">
                    {children && renderItem && typeof children === 'object' && !React.isValidElement(children)
                        ? (Array.isArray(children)
                            ? (children as any[]).map((child, idx) => renderItem(child, idx))
                            : renderItem(children, 0)
                        )
                        : children
                    }
                </div>
            </div>
        </div>
    );
};

export default Background;
