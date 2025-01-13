import React, { useState } from "react";

function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(null);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !message) {
            setStatus("Please fill in all fields.");
            return;
        }

        // Submit the form data (replace with your form submission logic)
        try {
            // Simulate form submission (e.g., to an API endpoint)
            setStatus("Sending message...");
            // Here you would typically send the data to your server
            // For example: await sendMessageToServer(name, email, message);
            setStatus("Message sent successfully!");
            // Clear form fields after submission
            setName("");
            setEmail("");
            setMessage("");
        } catch (err) {
            setStatus("There was an error sending your message. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Contact Us</h1>

            <div className="row">
                <div className="col-md-6">
                    <h3>Contact Information</h3>
                    <p>If you have any questions, feel free to reach out to us using the form below or through our contact details:</p>
                    <ul>
                        <li>
                            <strong>Email:</strong> <a href="mailto:info@stankammotors.com">info@stankammotors.com</a>
                        </li>
                        <li>
                            <strong>Phone:</strong> +1 800 123 4567
                        </li>
                        <li>
                            <strong>Address:</strong> 1234 Motor St, Car City, Country
                        </li>
                    </ul>
                </div>
                <div className="col-md-6">
                    <h3>Send Us a Message</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Your Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Your Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">
                                Your Message
                            </label>
                            <textarea
                                className="form-control"
                                id="message"
                                rows="4"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Enter your message"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Send Message
                        </button>
                    </form>
                    {status && (
                        <div className="mt-3">
                            <p className={status.includes("success") ? "text-success" : "text-danger"}>
                                {status}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Contact;
