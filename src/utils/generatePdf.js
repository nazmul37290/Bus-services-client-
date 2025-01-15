import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const generatePDF = () => {
  const ticketElement = document.getElementById("ticket");

  html2canvas(ticketElement, {
    scale: 2,
    backgroundColor: "#ffffff",
    windowWidth: 1200,
  }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    }); // Portrait, millimeters, A4 size
    const margin = 10;
    const imgWidth = 210 - margin * 2; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

    pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight);
    pdf.save("ticket.pdf");
  });
};

export const printTicket = () => {
  const ticketElement = document.getElementById("ticket");

  html2canvas(ticketElement, {
    scale: 2,
    backgroundColor: "#ffffff",
    windowWidth: 1200,
  }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    let printWindow = window.open("", "_blank");
    printWindow.document.write('<img src="' + imgData + '" width="100%"/>');
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  });
};
