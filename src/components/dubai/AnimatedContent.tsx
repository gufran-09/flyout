import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedContentProps {
    children: React.ReactNode;
    distance?: number;
    direction?: "vertical" | "horizontal";
    duration?: number;
    delay?: number;
    ease?: any;
    animateOpacity?: boolean;
    viewportAmount?: number;
    className?: string;
}

export default function AnimatedContent({
    children,
    distance = 100,
    direction = "vertical",
    duration = 0.5,
    delay = 0,
    ease = "easeOut",
    animateOpacity = true,
    viewportAmount = 0.1,
    className = "",
}: AnimatedContentProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: viewportAmount });

    const initial = {
        opacity: animateOpacity ? 0 : 1,
        x: direction === "horizontal" ? distance : 0,
        y: direction === "vertical" ? distance : 0,
    };

    const animate = isInView
        ? { opacity: 1, x: 0, y: 0 }
        : {
            opacity: animateOpacity ? 0 : 1,
            x: direction === "horizontal" ? distance : 0,
            y: direction === "vertical" ? distance : 0,
        };

    return (
        <motion.div
            ref={ref}
            initial={initial}
            animate={animate}
            transition={{ duration, delay, ease }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
