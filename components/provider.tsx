"use client"

import React, { ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";

interface ThemeProviderProps {
    children: ReactNode;
}


export function ThemeProvider({ children }: ThemeProviderProps) {
    return (
        <NextThemesProvider enableSystem defaultTheme="system" disableTransitionOnChange>
            <TooltipProvider>
                {children}
            </TooltipProvider>
        </NextThemesProvider>
    );
}
