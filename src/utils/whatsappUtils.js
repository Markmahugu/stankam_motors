// utils/whatsappUtils.js
export function generateWhatsAppLink(whatsappNumber, carName, carUrl) {
    // Ensure the number has no spaces or special characters
    const formattedNumber = whatsappNumber.replace(/\D/g, '');
    return `https://wa.me/${formattedNumber}?text=I'm interested in the ${carName}. Here is the link: ${carUrl}`;
}