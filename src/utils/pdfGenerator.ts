// src/utils/pdfGenerator.ts
import jsPDF from 'jspdf';

interface PDFOptions {
  disclaimer?: string;
}

export const exportToPDF = (
  content: string,
  title: string,
  options: PDFOptions = {}
) => {
  const { disclaimer = 'Esta é uma sugestão gerada por IA. Revise com atenção antes de usar em juízo.' } = options;

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let cursorY = 30; // posição vertical inicial

  // === TÍTULO CENTRALIZADO ===
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(30, 64, 175); // azul bonito
  doc.text(title, pageWidth / 2, cursorY, { align: 'center' });
  cursorY += 15;

  // === CONTEÚDO COM QUEBRA AUTOMÁTICA ===
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);

  const lines = doc.splitTextToSize(content, pageWidth - margin * 2);
  doc.text(lines, margin, cursorY);

  // Calcula onde termina o texto
  cursorY += lines.length * 7 + 20; // 7px por linha + espaçamento

  // Se passou da página, adiciona nova página
  if (cursorY > pageHeight - 40) {
    doc.addPage();
    cursorY = 30;
  }

  // === DISCLAIMER (sempre visível no final) ===
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100, 100, 100);
  const disclaimerLines = doc.splitTextToSize(disclaimer, pageWidth - margin * 2);
  doc.text(disclaimerLines, margin, cursorY);

  // === NOME DO ARQUIVO LIMPO ===
  const safeFileName = title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .trim();

  doc.save(`${safeFileName}.pdf`);
};