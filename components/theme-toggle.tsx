import { useTheme } from "next-themes";
import * as React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {Moon, Sun } from "lucide-react";

export const ThemeToggle: React.FC = () => {
    const {theme, setTheme, resolvedTheme} = useTheme();
    const [, startTransition] = React.useTransition();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!resolvedTheme) return;
        document.documentElement.setAttribute("data-theme", resolvedTheme);
    }, [resolvedTheme]);

    if (!mounted) return null; // Preventing a server-side render of the theme toggle

    const isDarkMode = theme === "dark" || resolvedTheme === "dark";

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => {
                startTransition(() => {
                    setTheme(isDarkMode ? "light" : "dark");
                });
            }}
        >
            {isDarkMode ? <Moon className="transition-all size-5" /> : <Sun className="transition-all size-5" />}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}