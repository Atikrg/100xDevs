"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
    SiReact,
    SiNextdotjs,
    SiPrisma,
    SiPostgresql,
    SiMongodb,
    SiTypescript,
    SiTailwindcss,
    SiNodedotjs,
    SiMysql,
    SiTerraform,
    SiDocker,
    SiKubernetes,
    SiFlutter,
    SiFirebase,
    SiMui,
    SiStripe
} from "react-icons/si";
import { IconType } from "react-icons";

interface TechIconProps {
    tech: string;
    index: number;
}

// Map technology names to their icons
const techIconMap: Record<string, IconType> = {
    "React.js": SiReact,
    "React": SiReact,
    "Next.js": SiNextdotjs,
    "Prisma": SiPrisma,
    "PostgreSQL": SiPostgresql,
    "MongoDB": SiMongodb,
    "TypeScript": SiTypescript,
    "Tailwindcss": SiTailwindcss,
    "Tailwind CSS": SiTailwindcss,
    "Nodejs": SiNodedotjs,
    "Node.js": SiNodedotjs,
    "MySQL": SiMysql,
    "Terraform": SiTerraform,
    "Docker": SiDocker,
    "Kubernetes": SiKubernetes,
    "Kubernetes (Basics)": SiKubernetes,
    "Flutter": SiFlutter,
    "Firebase": SiFirebase,
    "Material UI": SiMui,
    "Stripe": SiStripe,
};

// Map technology names to their brand colors
const techColorMap: Record<string, string> = {
    "React.js": "#61DAFB",
    "React": "#61DAFB",
    "Next.js": "#000000",
    "Prisma": "#2D3748",
    "PostgreSQL": "#4169E1",
    "MongoDB": "#47A248",
    "TypeScript": "#3178C6",
    "Tailwindcss": "#06B6D4",
    "Tailwind CSS": "#06B6D4",
    "Nodejs": "#339933",
    "Node.js": "#339933",
    "MySQL": "#4479A1",
    "Terraform": "#7B42BC",
    "Docker": "#2496ED",
    "Kubernetes": "#326CE5",
    "Kubernetes (Basics)": "#326CE5",
    "Flutter": "#02569B",
    "Firebase": "#FFCA28",
    "Material UI": "#007FFF",
    "Stripe": "#635BFF",
};

export function TechIcon({ tech, index }: TechIconProps) {
    const [isHovered, setIsHovered] = useState(false);
    const Icon = techIconMap[tech];
    const brandColor = techColorMap[tech] || "#8B5CF6"; // fallback to purple

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
                delay: index * 0.05,
                type: "spring",
                stiffness: 260,
                damping: 15
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative group"
        >
            {/* Glow effect on hover */}
            <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/40 via-accent/40 to-primary/40 blur-md"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1.2 : 0.8
                }}
                transition={{ duration: 0.3 }}
            />

            <motion.div
                layout
                className="relative flex items-center justify-center cursor-pointer overflow-hidden backdrop-blur-sm bg-gradient-to-br from-background/80 via-background/60 to-background/80 ring-1 ring-primary/20"
                style={{
                    borderRadius: "9999px",
                }}
                animate={{
                    paddingLeft: isHovered ? "12px" : "6px",
                    paddingRight: isHovered ? "12px" : "6px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 15
                }}
            >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-50" />

                {/* Shimmer effect */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                        x: isHovered ? ["-100%", "100%"] : "-100%",
                    }}
                    transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                    }}
                />

                <AnimatePresence mode="wait">
                    {!isHovered ? (
                        <motion.div
                            key="icon"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            className="relative flex items-center justify-center w-5 h-5"
                        >
                            {Icon ? (
                                <Icon className="w-4 h-4" style={{ color: brandColor }} />
                            ) : (
                                <span className="text-sm font-bold" style={{ color: brandColor }}>
                                    {tech.charAt(0).toUpperCase()}
                                </span>
                            )}
                        </motion.div>
                    ) : (
                        <motion.span
                            key="text"
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 15
                            }}
                            className="relative text-xs font-semibold whitespace-nowrap px-1"
                            style={{ color: brandColor }}
                        >
                            {tech}
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}
