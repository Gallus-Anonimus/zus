import { useEffect } from "react";

const darkenColor = (color: string, percent: number): string => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    const newR = Math.max(0, Math.floor(r * (1 - percent / 100)));
    const newG = Math.max(0, Math.floor(g * (1 - percent / 100)));
    const newB = Math.max(0, Math.floor(b * (1 - percent / 100)));
    
    return `#${newR.toString(16).padStart(2, "0")}${newG.toString(16).padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
};

export const updateAccentColor = (color: string) => {
    document.documentElement.style.setProperty("--accent-color", color);

    const hoverColor = darkenColor(color, 20);
    document.documentElement.style.setProperty("--accent-color-hover", hoverColor);

    document.documentElement.style.setProperty("--bs-primary", color);

    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    document.documentElement.style.setProperty("--bs-primary-rgb", `${r}, ${g}, ${b}`);

    localStorage.setItem("accent_color", color);
};

export const useAccentColorInit = () => {
    useEffect(() => {
        const savedColor = localStorage.getItem("accent_color");
        if (savedColor) {
            updateAccentColor(savedColor);
        }
    }, []);
};


