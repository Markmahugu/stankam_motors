import React from "react";

function FAQ() {
    const faqData = [
        {
            question: "What is Stankam Motors?",
            answer: "Stankam Motors is a leading online marketplace for buying and selling cars. We provide a wide range of vehicles for sale, including used and new cars. Our platform offers a seamless experience for both buyers and sellers."
        },
        {
            question: "How can I sell my car?",
            answer: "To sell your car, you can visit our 'Sell Your Car' page, fill in your car details, and upload photos of your car. Once your listing is approved, it will be available for potential buyers to view."
        },
        {
            question: "Is there a fee to list my car?",
            answer: "Currently, there is no fee for listing your car on Stankam Motors. However, we may introduce paid premium listing options in the future to enhance visibility."
        },
        {
            question: "How do I contact customer support?",
            answer: "You can contact our customer support team through the 'Contact' page. We provide support via email, phone, and live chat."
        },
        {
            question: "Can I get financing for my car purchase?",
            answer: "Yes, we work with several financial institutions to help you secure financing for your car purchase. Please visit our 'Contact' page for more information on financing options."
        },
        {
            question: "How do I know if a car is still available?",
            answer: "Once you express interest in a car, you will be notified about its availability. If the car is sold, we update the listing accordingly."
        },
    ];

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Frequently Asked Questions</h1>
            <div className="accordion" id="faqAccordion">
                {faqData.map((faq, index) => (
                    <div className="accordion-item" key={index}>
                        <h2 className="accordion-header" id={`heading${index}`}>
                            <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse${index}`}
                                aria-expanded="true"
                                aria-controls={`collapse${index}`}
                            >
                                {faq.question}
                            </button>
                        </h2>
                        <div
                            id={`collapse${index}`}
                            className="accordion-collapse collapse"
                            aria-labelledby={`heading${index}`}
                            data-bs-parent="#faqAccordion"
                        >
                            <div className="accordion-body">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FAQ;
