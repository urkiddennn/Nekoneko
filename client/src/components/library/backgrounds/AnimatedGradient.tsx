

const AnimatedGradient = ({ color1, color2, color3 }: { color1?: string, color2?: string, color3?: string }) => {
    // Fallbacks if colors not provided
    const c1 = color1 || "#ec4899"; // pink-500
    const c2 = color2 || "#ef4444"; // red-500
    const c3 = color3 || "#eab308"; // yellow-500

    return (
        <div
            className="absolute inset-0 bg-[length:400%_400%] animate-gradient-xy opacity-20 dark:opacity-30 blur-3xl"
            style={{
                backgroundImage: `linear-gradient(to bottom right, ${c1}, ${c2}, ${c3})`
            }}
        />
    );
};

export default AnimatedGradient;
