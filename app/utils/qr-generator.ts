// This utility generates QR codes for sharing Panchang data

export async function generateQRCode(
  data: string,
  size = 200
): Promise<string> {
  // Dynamically import QRCode.js to avoid SSR issues
  const QRCode = (await import("qrcode")).default;

  try {
    // Generate QR code as data URL
    const url = await QRCode.toDataURL(data, {
      width: size,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    });

    return url;
  } catch (error) {
    console.error("Error generating QR code:", error);
    return "";
  }
}

export function createShareableLink(
  formData: any,
  boldFields: string[]
): string {
  // Create a shareable link with encoded data
  const shareData = {
    formData,
    boldFields,
    timestamp: new Date().getTime(),
  };

  // Use UTF-8 safe encoding for non-Latin characters
  const jsonString = JSON.stringify(shareData);
  const binaryString = Array.from(
    new TextEncoder().encode(jsonString),
    (byte) => String.fromCharCode(byte)
  ).join("");
  const encodedData = btoa(binaryString);

  // Create URL with the encoded data
  const baseUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}`
      : "https://yourdomain.com";

  return `${baseUrl}?share=${encodedData}`;
}
