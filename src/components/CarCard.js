import React from "react";
import '../index.css';
import { Link } from "react-router-dom"; // To navigate to car details page

function CarCard({ car }) {
    // Ensure car.price is a number and handle invalid values
    const price = isNaN(car.price) ? 0 : parseFloat(car.price);

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
                        Price: Ksh. {price.toFixed(2)} {/* Format the price */}
                    </p>
                    <p className="card-text">{car.description}</p>
                    <Link 
                        to={`/car/${car.id}`} // Navigate to CarDetails.js based on the car id
                        className="btn btn-primary"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CarCard;
