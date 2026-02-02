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
        <div className="w-full overflow-x-auto flex justify-center">
            <GitHubCalendar
                username={username}
                colorScheme={theme === "dark" ? "dark" : "light"}
                blockSize={12}
                blockMargin={4}
                fontSize={14}
                theme={{
                    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
                    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                }}
            />
        </div>
    );
}
