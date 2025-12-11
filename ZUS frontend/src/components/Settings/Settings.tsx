import { useState, useEffect } from "react";
import { updateAccentColor } from "../../utils/useAccentColor.ts";

const Settings = () => {
    const [accentColor, setAccentColor] = useState("#6200ee");

    useEffect(() => {

        const savedColor = localStorage.getItem("accent_color");
        if (savedColor) {
            setAccentColor(savedColor);
        } else {
            const currentColor = getComputedStyle(document.documentElement)
                .getPropertyValue("--accent-color")
                .trim();
            if (currentColor) {
                setAccentColor(currentColor);
            }
        }
    }, []);

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newColor = e.target.value;
        setAccentColor(newColor);
        updateAccentColor(newColor);
    };

    const resetToDefault = () => {
        const defaultColor = "#6200ee";
        setAccentColor(defaultColor);
        updateAccentColor(defaultColor);
    };

    return (
        <div>
            <h1 className="mb-4">Ustawienia</h1>
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">Kolory</h5>
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="accent-color" className="form-label fw-semibold">
                            Kolor akcentu
                        </label>
                        <div className="d-flex align-items-center gap-3">
                            <input
                                type="color"
                                id="accent-color"
                                className="form-control form-control-color"
                                value={accentColor}
                                onChange={handleColorChange}
                                style={{ width: "80px", height: "40px", cursor: "pointer" }}
                            />
                            <input
                                type="text"
                                className="form-control"
                                value={accentColor}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
                                        setAccentColor(value);
                                        updateAccentColor(value);
                                    } else {
                                        setAccentColor(value);
                                    }
                                }}
                                placeholder="#6200ee"
                                style={{ maxWidth: "150px" }}
                            />
                            <button 
                                className="btn btn-outline-secondary" 
                                onClick={resetToDefault}
                            >
                                Resetuj
                            </button>
                        </div>
                        <small className="text-muted">
                            Wybierz kolor akcentu dla aplikacji. Zmiana zostanie zapisana automatycznie.
                        </small>
                    </div>
                    <div className="mt-4">
                        <p className="text-muted mb-2">Podgląd:</p>
                        <div className="d-flex gap-2 flex-wrap">
                            <button className="btn btn-primary">Przycisk podstawowy</button>
                            <div className="bg-primary text-white px-3 py-2 rounded">
                                Tło podstawowe
                            </div>
                            <div className="border border-primary px-3 py-2 rounded">
                                Obramowanie podstawowe
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;

