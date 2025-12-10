import type { FormData } from "../../types/formData.ts";
import { generateSingleWniosekPDF } from "../../utils/pdfGenerator.ts";
import {IconFileDownload} from "@tabler/icons-react";

interface StoredWniosek extends FormData {
    id: number;
    createdAt: string;
}

interface WniosekCardProps {
    wniosek: StoredWniosek;
    onDelete: (id: number) => void;
}

const WniosekCard = ({ wniosek, onDelete }: WniosekCardProps) => {
    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString("pl-PL", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            });
        } catch {
            return dateString;
        }
    };

    const handleDelete = () => {
        if (window.confirm("Czy na pewno chcesz usunąć ten wniosek?")) {
            onDelete(wniosek.id);
        }
    };

    const handleDownloadPDF = () => {
        generateSingleWniosekPDF(wniosek);
    };

    return (
        <div className="col-md-6 col-lg-4 mb-4">
            <div className="card shadow-sm h-100">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-0">
                        Wniosek #{wniosek.id}
                    </h5>
                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-sm btn-light"
                            onClick={handleDownloadPDF}
                            title="Pobierz PDF"
                        >
                            <IconFileDownload />
                        </button>
                        <button
                            className="btn btn-sm btn-danger"
                            onClick={handleDelete}
                            title="Usuń wniosek"
                        >
                            ×
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <strong>PESEL:</strong>
                        <p className="mb-0">{wniosek.pesel || "-"}</p>
                    </div>
                    <div className="mb-3">
                        <strong>Data:</strong>
                        <p className="mb-0">{wniosek.data || "-"}</p>
                    </div>
                    <div className="mb-3">
                        <strong>Imię i Nazwisko:</strong>
                        <p className="mb-0">
                            {wniosek.name} {wniosek.surname}
                        </p>
                    </div>
                    <div className="mb-3">
                        <strong>Numer telefonu:</strong>
                        <p className="mb-0">{wniosek.phoneNumber || "-"}</p>
                    </div>
                    <div className="mb-3">
                        <strong>Adres:</strong>
                        <p className="mb-0">
                            {wniosek.address.street || ""} {wniosek.address.buildingNumber || ""}
                            <br />
                            {wniosek.address.postalCode || ""} {wniosek.address.city || ""}
                            <br />
                            {wniosek.address.country || ""}
                        </p>
                    </div>
                    <div className="mt-3 pt-3 border-top">
                        <small className="text-muted">
                            <strong>Utworzono:</strong> {formatDate(wniosek.createdAt)}
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WniosekCard;


