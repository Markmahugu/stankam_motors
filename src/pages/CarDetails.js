import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Access route parameters
import { fetchCarById } from '../utils/api'; // API call to fetch car by ID
import CarWheelLoader from '../components/CarWheelLoader';
import { generateWhatsAppLink } from '../utils/whatsappUtils'; // Import the utility function

function CarDetails() {
    const { id } = useParams(); // Get the car ID from the URL parameters
    const [car, setCar] = useState(null); // State to store car details
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // WhatsApp number (example number, replace with the actual number you want to use)
    const whatsappNumber = "254704467869"; // Ensure the number has no spaces or special characters

    // Fetch car details by ID when the component mounts or when ID changes
    useEffect(() => {
        const getCarDetails = async () => {
            try {
                if (!id) throw new Error("Invalid car ID.");
                const data = await fetchCarById(id); // Fetch car details by ID
                setCar(data); // Set the car data in state
            } catch (err) {
                setError("Failed to load car details. Please try again later.");
            } finally {
                setLoading(false); // Set loading to false once the data is fetched
            }
        };
        getCarDetails();
    }, [id]); // Dependency on the car ID

    // Render loading spinner
    if (loading) {
        return <CarWheelLoader />;
    }

    // Render error message if any
    if (error) {
        return (
            <div className="alert alert-danger text-center mt-5" role="alert">
                {error}
            </div>
        );
    }

    // Ensure the car object is not null before rendering its details
    if (!car) {
        return (
            <div className="alert alert-warning text-center mt-5" role="alert">
                Car details not available.
            </div>
        );
    }

    // Ensure price is a number and handle invalid values
    const price = isNaN(car?.price) ? 0 : parseFloat(car.price);

    // Generate the URL for the car details page
    const carUrl = `${window.location.origin}/car/${car.id}`;

    return (
        <div className="container mt-4">
            <h1>{car.name}</h1>
            <p><strong>Price:</strong> Ksh. {price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p> {/* Format price with commas */}
            <p><strong>Description:</strong> {car.description}</p>
            <p><strong>Make:</strong> {car.make}</p>
            <p><strong>Model:</strong> {car.model}</p>
            <p><strong>Year:</strong> {car.year}</p>
            <p><strong>Mileage:</strong> {car.mileage_km.toLocaleString('en-US')} km</p> {/* Format mileage with commas */}
            <p><strong>Fuel Type:</strong> {car.fuel_type}</p>
            <p><strong>Transmission:</strong> {car.transmission}</p>
            <p><strong>Color:</strong> {car.color}</p>
            <p><strong>Engine Size:</strong> {car.engine_size} L</p>
            <p><strong>Horsepower:</strong> {car.horsepower} HP</p>
            <p><strong>Body Style:</strong> {car.body_style}</p>
            <p><strong>Features:</strong> {car.features && Object.keys(car.features).map(feature => (
                <span key={feature} className="badge bg-secondary me-2">{feature}</span>
            ))}</p>

            {/* Optionally render the car image */}
            {car.image_url && (
                <img
                    src={car.image_url}
                    alt={car.name}
                    className="img-fluid"
                    style={{ maxWidth: "100%", height: "auto" }}
                />
            )}

            {/* Buttons */}
            <div className="mt-3">
                <a
                    href={generateWhatsAppLink(whatsappNumber, `I'm interested in this: ${car.name}. Check it out here: ${carUrl}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-success me-2"
                >
                    Contact via WhatsApp
                </a>
                <a href="/" className="btn btn-secondary">Back to Cars</a>
            </div>
        </div>
    );
}

export default CarDetails;
