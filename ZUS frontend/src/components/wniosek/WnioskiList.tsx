import { useEffect, useState } from "react";
import type { FormData } from "../../types/formData.ts";
import WniosekCard from "./WniosekCard.tsx";
import { generateAllWnioskiPDF } from "../../utils/pdfGenerator.ts";
import {IconFileDownload} from "@tabler/icons-react";

interface StoredWniosek extends FormData {
    id: number;
    createdAt: string;
}

const WnioskiList = () => {
    const [wnioski, setWnioski] = useState<StoredWniosek[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchWnioski();
    }, []);

    const fetchWnioski = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:3000/wniosek");
            
            if (!response.ok) {
                throw new Error("Nie udało się pobrać wniosków");
            }
            
            const data = await response.json();
            setWnioski(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Wystąpił błąd");
            console.error("Error fetching wnioski:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/wniosek/${id}`, {
                method: "DELETE",
            });
            
            if (!response.ok) {
                throw new Error("Nie udało się usunąć wniosku");
            }

            setWnioski((prev) => prev.filter((w) => w.id !== id));
        } catch (err) {
            alert(err instanceof Error ? err.message : "Wystąpił błąd podczas usuwania");
            console.error("Error deleting wniosek:", err);
        }
    };

    const handleDownloadAllPDF = () => {
        if (wnioski.length === 0) {
            alert("Brak wniosków do pobrania");
            return;
        }
        generateAllWnioskiPDF(wnioski);
    };

    if (loading) {
        return (
            <div className="container mt-4">
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Ładowanie...</span>
                    </div>
                    <p className="mt-3">Ładowanie wniosków...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">Błąd!</h4>
                    <p>{error}</p>
                    <button className="btn btn-primary" onClick={fetchWnioski}>
                        Spróbuj ponownie
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Lista Wniosków</h2>
                <div className="d-flex gap-2">
                    {wnioski.length > 0 && (
                        <button 
                            className="btn btn-success" 
                            onClick={handleDownloadAllPDF}
                            title="Pobierz wszystkie wnioski jako PDF"
                        >
                            <IconFileDownload /> Pobierz PDF wszystkich
                        </button>
                    )}
                    <button className="btn btn-primary" onClick={fetchWnioski}>
                        Odśwież
                    </button>
                </div>
            </div>

            {wnioski.length === 0 ? (
                <div className="card shadow-sm">
                    <div className="card-body text-center py-5">
                        <p className="text-muted mb-0">Brak wniosków w systemie</p>
                    </div>
                </div>
            ) : (
                <div className="row">
                    {wnioski.map((wniosek) => (
                        <WniosekCard
                            key={wniosek.id}
                            wniosek={wniosek}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default WnioskiList;

