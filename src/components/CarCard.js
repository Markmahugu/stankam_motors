import React from "react";
import '../footer.css';
import { Link } from "react-router-dom"; // For navigation
import { generateWhatsAppLink } from '../utils/whatsappUtils'; // WhatsApp utility function

function CarCard({ car }) {
    const price = isNaN(car.price) ? 0 : parseFloat(car.price);
    const whatsappNumber = "254704467869";
    const carUrl = `${window.location.origin}/car/${car.id}`;

    return (
        <div className="car-card-container">
            <div className="car-card">
                <div className="car-card-image-container">
                    <img
                        src={car.image_url || 'default-image-url'}
                        alt={car.name}
                        className="car-card-image"
                    />
                    <div className="car-card-year">
                        {car.year}
                    </div>
                </div>
                <div className="car-card-details">
                <h5 className="car-card-small-title">
                        {car.make} {car.model}
                    </h5>
                    <p className="car-card-price">
                    Price: Ksh. {price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {/* Format the price with commas */}                    </p>
                    <div className="car-card-features">
                        <div>
                        <i className="fas fa-tachometer-alt"></i> {car.mileage_km} KM                        </div>
                        <div>
                            <i className="fas fa-cogs"></i> {car.transmission}
                        </div>
                        <div>
                        <i className="fas fa-check-circle"></i> {car.condition}                        </div>
                        <div>
                        <i className="fas fa-car"></i> {car.cc} CC
                                                </div>
                    </div>

                    <p className="card-text"><strong>Description:</strong> {car.description}</p>
                    <Link 
                        to={`/car/${car.id}`} // Navigate to CarDetails.js based on the car id
                        className="car-card-btn car-card-btn-details"
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
