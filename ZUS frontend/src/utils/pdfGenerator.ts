import jsPDF from "jspdf";
import type { FormData } from "../types/formData.ts";

interface StoredWniosek extends FormData {
    id: number;
    createdAt: string;
}

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

export const generateSingleWniosekPDF = (wniosek: StoredWniosek) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPos = margin;

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Wniosek", pageWidth / 2, yPos, { align: "center" });
    yPos += 10;

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`Numer wniosku: #${wniosek.id}`, margin, yPos);
    yPos += 10;

    doc.setLineWidth(0.5);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 8;

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Dane osobowe:", margin, yPos);
    yPos += 7;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`PESEL: ${wniosek.pesel || "-"}`, margin + 5, yPos);
    yPos += 6;
    doc.text(`Data: ${wniosek.data || "-"}`, margin + 5, yPos);
    yPos += 6;
    doc.text(`Imie: ${wniosek.name || "-"}`, margin + 5, yPos);
    yPos += 6;
    doc.text(`Nazwisko: ${wniosek.surname || "-"}`, margin + 5, yPos);
    yPos += 6;
    doc.text(`Numer telefonu: ${wniosek.phoneNumber || "-"}`, margin + 5, yPos);
    yPos += 10;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Adres:", margin, yPos);
    yPos += 7;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const addressLines = [
        `Ulica: ${wniosek.address.street || ""} ${wniosek.address.buildingNumber || ""}`,
        `Kod pocztowy: ${wniosek.address.postalCode || "-"}`,
        `Miasto: ${wniosek.address.city || "-"}`,
        `Kraj: ${wniosek.address.country || "-"}`,
    ];

    addressLines.forEach((line) => {
        doc.text(line, margin + 5, yPos);
        yPos += 6;
    });

    yPos += 5;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text(`Utworzono: ${formatDate(wniosek.createdAt)}`, margin, yPos);

    doc.save(`wniosek_${wniosek.id}.pdf`);
};

export const generateAllWnioskiPDF = (wnioski: StoredWniosek[]) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let yPos = margin;

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Lista Wszystkich Wniosków", pageWidth / 2, yPos, { align: "center" });
    yPos += 10;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Łączna liczba wniosków: ${wnioski.length}`, margin, yPos);
    yPos += 10;

    doc.setLineWidth(0.5);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 8;

    wnioski.forEach((wniosek, index) => {
        if (yPos > pageHeight - 60) {
            doc.addPage();
            yPos = margin;
        }

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(`Wniosek #${wniosek.id}`, margin, yPos);
        yPos += 7;

        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        const details = [
            `PESEL: ${wniosek.pesel || "-"}`,
            `Data: ${wniosek.data || "-"}`,
            `Imię i Nazwisko: ${wniosek.name} ${wniosek.surname}`,
            `Telefon: ${wniosek.phoneNumber || "-"}`,
            `Adres: ${wniosek.address.street || ""} ${wniosek.address.buildingNumber || ""}, ${wniosek.address.postalCode || ""} ${wniosek.address.city || ""}, ${wniosek.address.country || ""}`,
            `Utworzono: ${formatDate(wniosek.createdAt)}`,
        ];

        details.forEach((detail) => {
            doc.text(detail, margin + 5, yPos);
            yPos += 5;
        });

        if (index < wnioski.length - 1) {
            yPos += 3;
            doc.setLineWidth(0.3);
            doc.setDrawColor(200, 200, 200);
            doc.line(margin, yPos, pageWidth - margin, yPos);
            yPos += 5;
        }
    });

    doc.save(`wszystkie_wnioski_${new Date().toISOString().split("T")[0]}.pdf`);
};




