

const FractalGlass = ({ color1 = "#0f172a", color2 = "#d946ef" }: { color1?: string, color2?: string }) => {
    return (
        <div className="absolute inset-0 bg-slate-950 overflow-hidden">
            {/* Background Gradient */}
            <div
                className="absolute inset-0 opacity-60"
                style={{
                    background: `linear-gradient(to top right, ${color1}, ${color2})`
                }}
            />

            {/* Fluted/Reeded Glass Effect */}
            <div
                className="absolute inset-0 z-10 opacity-70"
                style={{
                    backgroundImage: `repeating-linear-gradient(to right, transparent 0px, transparent 19px, rgba(255,255,255,0.08) 20px, rgba(255,255,255,0.02) 21px, transparent 22px)`
                }}
            />

            {/* Vertical blurring/diffusion */}
            <div className="absolute inset-0 backdrop-blur-[2px] z-10" />

            {/* Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-20" />
        </div>
    )
}

export default FractalGlass;
