"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";

interface GitHubCalendarComponentProps {
    username: string;
}

export function GitHubCalendarComponent({ username }: GitHubCalendarComponentProps) {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-pulse text-muted-foreground">Loading GitHub activity...</div>
            </div>
        );
    }

    return (
        <div className="w-full flex justify-center items-center">
            <div className="relative w-full max-w-[800px] overflow-hidden flex justify-center [&_svg]:w-full [&_svg]:h-auto">
                <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(rgba(0,0,0,0.4)_1px,transparent_1px)] [background-size:4px_4px] opacity-30 dark:opacity-20 mix-blend-overlay" />
                <GitHubCalendar
                    username={username}
                    colorScheme={theme === "dark" ? "dark" : "light"}
                    blockSize={13}
                    blockMargin={4}
                    fontSize={14}
                    theme={{
                        light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
                        dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                    }}
                />
            </div>
        </div>
    );
}
