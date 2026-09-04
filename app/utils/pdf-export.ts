export async function generatePDF(formData: any, boldFields: string[]) {
  // Dynamically import jsPDF to avoid SSR issues
  const { jsPDF } = await import("jspdf");

  // Create a new PDF document
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Set background color
  doc.setFillColor(26, 46, 59); // #1a2e3b
  doc.rect(0, 0, 210, 297, "F");

  // Set text color to white
  doc.setTextColor(255, 255, 255);

  // Add title
  doc.setFontSize(24);
  doc.text("॥ શ્રી ગણેશાય નમઃ ॥", 105, 20, { align: "center" });

  // Add subtitle
  doc.setFontSize(20);
  doc.text("દૈનિક પંચાંગ", 105, 35, { align: "center" });

  // Get Vikram Samvat lines from localStorage
  let line1 = "વિક્રમ સંવત ૨૦૮૧ , ઉત્તરાયણ , વસંત ઋતુ , શાલિવાહન શકે ૧૯૪૬";
  let line2 = "ક્રોધીનામ - અનલ નામ સંવત્સર";

  if (typeof window !== "undefined") {
    line1 = localStorage.getItem("vikramSamvatLine1") || line1;
    line2 = localStorage.getItem("vikramSamvatLine2") || line2;
  }

  // Add Vikram Samvat lines
  doc.setFontSize(12);
  doc.text(line1, 105, 50, { align: "center" });
  doc.text(line2, 105, 58, { align: "center" });

  // Add separator
  doc.text("............................", 30, 70);

  // Add form data
  doc.setFontSize(14);
  let y = 85;

  // Function to set font based on boldFields
  const setFont = (field: string) => {
    if (boldFields.includes(field)) {
      doc.setFont("helvetica", "bold");
    } else {
      doc.setFont("helvetica", "normal");
    }
  };

  // Add tithi and date
  setFont("tithi");
  doc.text(`- તિથિ - ${formData.tithi}`, 30, y);
  y += 10;

  setFont("tarikh");
  doc.text(`- તા . ${formData.tarikh}`, 30, y);
  y += 15;

  // Add separator
  doc.text("............................", 30, y);
  y += 15;

  // Add the fields with proper formatting
  setFont("nakshatra");
  doc.text(`- નક્ષત્ર - ${formData.nakshatra}`, 30, y);
  y += 10;

  setFont("yog");
  doc.text(`- યોગ   - ${formData.yog}`, 30, y);
  y += 10;

  setFont("karan");
  doc.text(`- કરણ  - ${formData.karan}`, 30, y);
  y += 15;

  // Add separator
  doc.text("............................", 30, y);
  y += 15;

  // Add sunrise and sunset
  setFont("suryoday");
  doc.text(`- સૂર્યોદય - ${formData.suryoday} કલાકે`, 30, y);
  y += 10;

  setFont("suryasta");
  doc.text(`- સૂર્યાસ્ત - ${formData.suryasta} કલાકે`, 30, y);
  y += 15;

  // Add separator
  doc.text("............................", 30, y);
  y += 15;

  // Add rashi
  setFont("aajNiRashi");
  doc.text(`-  આજ ની રાશી :  ${formData.aajNiRashi}`, 30, y);
  y += 20;

  // Add din mahima - centered title
  doc.setFont("helvetica", "bold");
  doc.text("આજ નો દિન મહિમા", 105, y, { align: "center" });
  y += 15;

  // Din mahima items
  doc.setFont("helvetica", "normal");
  formData.dinMahima.forEach((item: string) => {
    if (item.trim()) {
      doc.text(`- ${item}`, 30, y);
      y += 10;
    }
  });

  // Add page number
  doc.setFontSize(10);
  doc.text(`Page 1 of 1`, 105, 285, { align: "center" });

  // Save the PDF
  return doc.output("blob");
}
