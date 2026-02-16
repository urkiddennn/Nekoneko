import React, { useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  Variants,
  useMotionValue,
  useMotionTemplate,
  useSpring,
} from "framer-motion";

interface TextProps {
  variant:
    | "default"
    | "text_reveal_lens"
    | "text_type_animation"
    | "animated_text_reveal"
    | "image_masked_text"
    | "ultimate_scroll_text"
    | "rolling_text";
  text: string;
  subText?: string;
  image?: string;
  styles?: {
    color?: string;
    fontSize?: string;
    textAlign?: string;
  };
}

const Text: React.FC<TextProps> = ({
  variant,
  text,
  subText,
  image,
  styles,
}) => {
  const {
    color = "#000000",
    fontSize = "text-6xl",
    textAlign = "text-center",
  } = styles || {};

  const commonClasses = `${fontSize} ${textAlign} font-bold`;

  switch (variant) {
    case "text_reveal_lens":
      return (
        <TextRevealLens
          text={text}
          className={commonClasses}
          color={color}
          image={image}
        />
      );
    case "text_type_animation":
      return (
        <TextTypeAnimation
          text={text}
          className={commonClasses}
          color={color}
        />
      );
    case "animated_text_reveal":
      return (
        <AnimatedTextReveal
          text={text}
          className={commonClasses}
          color={color}
        />
      );
    case "image_masked_text":
      return (
        <ImageMaskedText
          text={text}
          image={image}
          className={`${commonClasses} `}
        />
      );
    case "ultimate_scroll_text":
      return (
        <UltimateScrollText
          text={text}
          className={commonClasses}
          color={color}
        />
      );
    case "rolling_text":
      return (
        <RollingText text={text} className={commonClasses} color={color} />
      );
    default:
      return (
        <div className={`w-full py-10 ${textAlign}`} style={{ color }}>
          <h2 className={`font-bold ${fontSize}`}>{text}</h2>
          {subText && <p className="text-xl mt-4 opacity-80">{subText}</p>}
        </div>
      );
  }
};

// --- Variant Components ---

// 1. Text Reveal Lens (Mouse-driven spotlight)
const TextRevealLens = ({
  text,
  className,
  color,
  image,
}: {
  text: string;
  className: string;
  color: string;
  image?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  // Add some spring physics for "professional framer" smoothness
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 300 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 300 });

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const foregroundStyle = image
    ? {
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        WebkitBackgroundClip: "text",
        backgroundClip: "text", // Standard property
        color: "transparent",
        WebkitTextFillColor: "transparent", // Ensure transparent text
      }
    : {
        color: color,
      };

  return (
    <div
      className={`relative py-20 overflow-hidden ${className} cursor-none select-none`}
      style={{ color: "transparent" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Text (Outlined/Dimmed) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span
          style={{
            WebkitTextStroke: `1px ${color}`,
            color: "transparent",
            opacity: 0.3,
          }}
        >
          {text}
        </span>
      </div>

      {/* The mask container handles the flashlight reveal */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{
          // Use standard maskImage in addition to WebkitMaskImage for better compatibility
          maskImage: useMotionTemplate`radial-gradient(circle at ${smoothX}px ${smoothY}px, black 0%, transparent 200px)`,
          WebkitMaskImage: useMotionTemplate`radial-gradient(circle at ${smoothX}px ${smoothY}px, black 0%, transparent 200px)`,
          WebkitMaskRepeat: "no-repeat",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.2s ease", // Smooth fade in/out
        }}
      >
        {/* The text element handles the image texture/fill */}
        <h2
          style={foregroundStyle}
          className="font-bold bg-clip-text text-transparent"
        >
          {text}
        </h2>
      </motion.div>

      {/* Placeholder for layout size */}
      <span className="opacity-0 pointer-events-none select-none">{text}</span>
    </div>
  );
};

// 2. Text Type Animation (Real typewriter effect)
const TextTypeAnimation = ({
  text,
  className,
  color,
}: {
  text: string;
  className: string;
  color: string;
}) => {
  const [displayedText, setDisplayedText] = React.useState("");
  const [cursorVisible, setCursorVisible] = React.useState(true);
  const [isDone, setIsDone] = React.useState(false);

  React.useEffect(() => {
    setDisplayedText("");
    setIsDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i <= text.length) {
        setDisplayedText(text.slice(0, i));
      } else {
        setIsDone(true);
        clearInterval(interval);
      }
    }, 70);
    return () => clearInterval(interval);
  }, [text]);

  // Blinking cursor
  React.useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <div className={className} style={{ color }}>
      <span>{displayedText}</span>
      <span
        style={{
          opacity: cursorVisible ? 1 : 0,
          fontWeight: 100,
          marginLeft: "2px",
          transition: "opacity 0.1s",
        }}
      >
        {isDone ? "" : "|"}
      </span>
    </div>
  );
};

// 3. Animated Text Reveal (Staggered words)
const AnimatedTextReveal = ({
  text,
  className,
  color,
}: {
  text: string;
  className: string;
  color: string;
}) => {
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{
        color,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: className.includes("center")
          ? "center"
          : className.includes("right")
            ? "flex-end"
            : "flex-start",
      }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      className={className}
    >
      {words.map((word, index) => (
        <motion.div variants={child} key={index} className="mr-2">
          {word}
        </motion.div>
      ))}
    </motion.div>
  );
};

// 4. Image Masked Text (Mouse-reveal image through text)
const ImageMaskedText = ({
  text,
  image,
  className,
}: {
  text: string;
  image?: string;
  className: string;
}) => {
  const fallbackImage =
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2898&auto=format&fit=crop";
  const bgImage = image || fallbackImage;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 300 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 300 });

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`relative py-10 ${className} cursor-none select-none`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background: outlined text (always visible) */}
      <h2
        className="font-white tracking-tighter leading-none"
        style={{
          // WebkitTextStroke: "1px rgba(150,150,150,0.4)",
          color: "transparent",
        }}
      >
        {text}
      </h2>

      {/* Foreground: image-filled text, revealed by mouse */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          maskImage: useMotionTemplate`radial-gradient(circle at ${smoothX}px ${smoothY}px, black 0%, transparent 250px)`,
          WebkitMaskImage: useMotionTemplate`radial-gradient(circle at ${smoothX}px ${smoothY}px, black 0%, transparent 250px)`,
          WebkitMaskRepeat: "no-repeat",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <h2
          className="font-black tracking-tighter leading-none"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          {text}
        </h2>
      </motion.div>
    </div>
  );
};

// 5. Ultimate Scroll Text (Parallax or simple reveal on scroll)
const UltimateScrollText = ({
  text,
  className,
  color,
}: {
  text: string;
  className: string;
  color: string;
}) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <div
      ref={ref}
      className="relative min-h-[50vh] flex items-center justify-center"
    >
      <motion.h2 style={{ opacity, scale, color }} className={className}>
        {text}
      </motion.h2>
    </div>
  );
};

// 6. Rolling Text (Marquee style)
const RollingText = ({
  text,
  className,
  color,
}: {
  text: string;
  className: string;
  color: string;
}) => {
  // Simple marquee implementation
  return (
    <div className="overflow-hidden whitespace-nowrap flex w-full">
      <motion.div
        className={`flex ${className}`}
        style={{ color }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20,
        }}
      >
        <span className="mr-8">{text}</span>
        <span className="mr-8">{text}</span>
        <span className="mr-8">{text}</span>
        <span className="mr-8">{text}</span>
      </motion.div>
      <motion.div
        className={`flex ${className}`}
        style={{ color }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20,
        }}
      >
        <span className="mr-8">{text}</span>
        <span className="mr-8">{text}</span>
        <span className="mr-8">{text}</span>
        <span className="mr-8">{text}</span>
      </motion.div>
    </div>
  );
};

export default Text;
