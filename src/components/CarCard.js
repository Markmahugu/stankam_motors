import React from "react";
import '../index.css';
import { Link } from "react-router-dom"; // To navigate to car details page
import { generateWhatsAppLink } from '../utils/whatsappUtils'; // Import the utility function

function CarCard({ car }) {
    // Ensure car.price is a number and handle invalid values
    const price = isNaN(car.price) ? 0 : parseFloat(car.price);

    // WhatsApp number (example number, replace with the actual number you want to use)
    const whatsappNumber = "254704467869"; // Ensure the number has no spaces or special characters

    // Generate the URL for the car details page
    const carUrl = `${window.location.origin}/car/${car.id}`;

    return (
        <div className="col-md-4 mb-4">
            <div className="card">
                <img
                    src={car.image_url || 'default-image-url'} // Handle missing image URL gracefully
                    className="card-img-top"
                    alt={car.name}
                />
                <div className="card-body">
                    <h5 className="card-title">{car.name}</h5>
                    <p className="card-text">
                        Price: Ksh. {price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {/* Format the price with commas */}
                    </p>
                    <p className="card-text"><strong>Features:</strong>
                        <ul>
                            {Object.entries(car.features).map(([key, value]) => (
                                <li key={key}>{key.replace('_', ' ')}: {value ? 'Yes' : 'No'}</li>
                            ))}
                        </ul>
                    </p>
                    <p className="card-text"><strong>Model:</strong> {car.model}</p>
                    <p className="card-text"><strong>Year:</strong> {car.year}</p>
                    <p className="card-text"><strong>Transmission:</strong> {car.transmission}</p>
                    <p className="card-text"><strong>Engine:</strong> {car.engine_size} L</p>
                    <p className="card-text"><strong>Condition:</strong> {car.condition}</p>
                    <p className="card-text"><strong>Description:</strong> {car.description}</p>
                    <Link 
                        to={`/car/${car.id}`} // Navigate to CarDetails.js based on the car id
                        className="btn btn-primary me-2"
                    >
                        View Details
                    </Link>
                    <a 
                        href={generateWhatsAppLink(whatsappNumber, car.name, carUrl)} // WhatsApp link using the utility function
                        className="btn btn-success"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fab fa-whatsapp"></i> Enquire
                    </a>
                </div>
            </div>
        </div>
    );
}

export default CarCard;