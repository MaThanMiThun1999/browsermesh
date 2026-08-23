"use client";

import { motion, useSpring } from "framer-motion";
import React, { useEffect, useState } from "react";

const SPRING = {
    mass: 0.1,
    damping: 10,
    stiffness: 131,
};

export default function GlobalCursor() {
    const xSpring = useSpring(0, SPRING);
    const ySpring = useSpring(0, SPRING);
    const scaleSpring = useSpring(0, SPRING);
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        // Disable right click (context menu) and dragging on all images globally
        const handleContextMenu = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            if (target && (target.tagName === "IMG" || target.closest("img"))) {
                e.preventDefault();
            }
        };

        const handleDragStart = (e: DragEvent) => {
            const target = e.target as HTMLElement | null;
            if (target && (target.tagName === "IMG" || target.closest("img"))) {
                e.preventDefault();
            }
        };

        window.addEventListener("contextmenu", handleContextMenu);
        window.addEventListener("dragstart", handleDragStart);

        // Only enable custom cursor on non-touch devices
        const checkMobile = () => {
            if (window.matchMedia("(pointer: coarse)").matches) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };
        checkMobile();

        if (window.matchMedia("(pointer: coarse)").matches) {
            return () => {
                window.removeEventListener("contextmenu", handleContextMenu);
                window.removeEventListener("dragstart", handleDragStart);
            };
        }

        let isVisible = false;

        const moveCursor = (e: MouseEvent) => {
            if (!isVisible) {
                isVisible = true;
                scaleSpring.set(1);
            }
            xSpring.set(e.clientX + 2);
            ySpring.set(e.clientY + 12);
        };

        const handleMouseLeave = () => {
            scaleSpring.set(0);
            isVisible = false;
        };

        const handleMouseEnter = () => {
            scaleSpring.set(1);
            isVisible = true;
        };

        window.addEventListener("mousemove", moveCursor);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("contextmenu", handleContextMenu);
            window.removeEventListener("dragstart", handleDragStart);
            window.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [xSpring, ySpring, scaleSpring]);

    if (isMobile) return null;

    return (
        <motion.div
            style={{
                x: xSpring,
                y: ySpring,
                scale: scaleSpring,
            }}
            className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full size-4 bg-[#7c3aed] blur-[1px] shadow-[0_0_15px_rgba(124,58,237,0.5)] mix-blend-difference"
        />
    );
}
