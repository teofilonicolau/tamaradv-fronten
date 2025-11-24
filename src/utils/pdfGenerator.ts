import jsPDF from "jspdf";

export const exportToPDF = (text: string, title: string, disclaimer: { disclaimer: string }) => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text(title, 10, 20);
  doc.setFontSize(12);
  doc.text(text, 10, 40);
  doc.setFontSize(10);
  doc.text(`Disclaimer: ${disclaimer.disclaimer}`, 10, 60);
  doc.save(`${title}.pdf`);
};
