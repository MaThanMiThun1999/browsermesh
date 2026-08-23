"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import React from "react";

const SPRING = {
    mass: 0.1,
    damping: 10,
    stiffness: 131,
};

const SimpleMouseFollow = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const opacity = useMotionValue(0);

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        const bounds = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - bounds.left - 10); // Offset to center the dot (size-5 is 20px, so 10px)
        y.set(e.clientY - bounds.top - 10);
    };

    return (
        <div
            onPointerMove={(e) => {
                handlePointerMove(e);
            }}
            onPointerEnter={() => {
                opacity.set(1);
            }}
            onPointerLeave={() => {
                opacity.set(0);
            }}
            className="rounded-4xl bg-[#0a0a1a]/60 border border-white/10 mt-20 size-[500px] cursor-none overflow-hidden relative"
        >
            <motion.div
                style={{
                    x,
                    y,
                    opacity,
                }}
                className="absolute rounded-full size-5 bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)] pointer-events-none"
            ></motion.div>
        </div>
    );
};

const SpringMouseFollow = () => {
    const xSpring = useSpring(0, SPRING);
    const ySpring = useSpring(0, SPRING);
    const opacitySpring = useSpring(0, SPRING);
    const scaleSpring = useSpring(0, SPRING);

    return (
        <div
            onPointerMove={(e) => {
                const bounds = e.currentTarget.getBoundingClientRect();
                xSpring.set(e.clientX - bounds.left - 20); // Center the size-10 (40px) dot
                ySpring.set(e.clientY - bounds.top - 20);
            }}
            onPointerEnter={() => {
                opacitySpring.set(1);
                scaleSpring.set(1);
            }}
            onPointerLeave={() => {
                opacitySpring.set(0);
                scaleSpring.set(0);
            }}
            className="rounded-4xl bg-[#0a0a1a]/60 border border-white/10 mt-20 size-[500px] cursor-none overflow-hidden relative"
        >
            <motion.div
                style={{
                    x: xSpring,
                    y: ySpring,
                    opacity: opacitySpring,
                    scale: scaleSpring,
                }}
                className="absolute rounded-full size-10 bg-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.8)] pointer-events-none"
            ></motion.div>
        </div>
    );
};

const Skiper61 = () => {
    return (
        <section className="h-screen w-full snap-y snap-mandatory overflow-y-scroll">
            <div className="flex h-screen w-full snap-start flex-col items-center justify-center px-5">
                <div className="grid content-start justify-items-center gap-6 text-center">
                    <span className="after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-['']">
                        Mouse follow simple
                    </span>
                </div>
                <SimpleMouseFollow />
            </div>
            <div className="flex h-screen w-full snap-start flex-col items-center justify-center px-5">
                <div className="grid content-start justify-items-center gap-6 text-center">
                    <span className="after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-['']">
                        Mouse follow with Spring
                    </span>
                </div>
                <SpringMouseFollow />
            </div>
        </section>
    );
};

export { SimpleMouseFollow, Skiper61, SpringMouseFollow };
