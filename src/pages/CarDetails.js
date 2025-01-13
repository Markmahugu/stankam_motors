import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Access route parameters
import { fetchCarById } from '../utils/api'; // API call to fetch car by ID

function CarDetails() {
    const { id } = useParams(); // Get the car ID from the URL parameters
    const [car, setCar] = useState(null); // State to store car details
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch car details by ID when the component mounts or when ID changes
    useEffect(() => {
        const getCarDetails = async () => {
            try {
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
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    // Render error message if any
    if (error) {
        return (
            <div className="alert alert-danger text-center mt-5" role="alert">
                {error}
            </div>
        );
    }

    // Ensure price is a number and handle invalid values
    const price = isNaN(car?.price) ? 0 : parseFloat(car.price);

    // Render car details if the data is available
    if (car) {
        return (
            <div className="container mt-4">
                <h1>{car.name}</h1>
                <p><strong>Price:</strong> Ksh. {price.toFixed(2)}</p> {/* Now this will work */}
                <p><strong>Description:</strong> {car.description}</p>
                <p><strong>Make:</strong> {car.make}</p>
                <p><strong>Model:</strong> {car.model}</p>
                <p><strong>Year:</strong> {car.year}</p>
                <p><strong>Mileage:</strong> {car.mileage} miles</p>
                <p><strong>Fuel Type:</strong> {car.fuel_type}</p>
                <p><strong>Transmission:</strong> {car.transmission}</p>
                <p><strong>Color:</strong> {car.color}</p>
                <p><strong>Engine Size:</strong> {car.engine_size} L</p>
                <p><strong>Horsepower:</strong> {car.horsepower} HP</p>
                <p><strong>Body Style:</strong> {car.body_style}</p>
                <p><strong>Features:</strong> {car.features}</p>

                {/* Optionally render the car image */}
                {car.image_url && (
                    <img
                        src={car.image_url}
                        alt={car.name}
                        className="img-fluid"
                        style={{ maxWidth: "100%", height: "auto" }}
                    />
                )}
            </div>
        );
    }

    return null; // Return null if no car data is available
}

export default CarDetails;
