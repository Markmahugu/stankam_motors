// utils/whatsappUtils.js
export function generateWhatsAppLink(whatsappNumber, carName, carUrl) {
    // Ensure the number has no spaces or special characters
    const formattedNumber = whatsappNumber.replace(/\D/g, '');
    return `https://wa.me/${formattedNumber}?text=Hello, I saw this car on the website and `;
}