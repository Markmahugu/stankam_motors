import React, { useState, useEffect } from 'react';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { addCar } from '../utils/api';
import CarWheelLoader from '../components/CarWheelLoader';

function AddCar() {
    const [carData, setCarData] = useState({
        make: "",
        model: "",
        year: "",
        price: "",
        mileage_km: "",
        body_style: "",
        transmission: "",
        fuel_type: "",
        drivetrain: "",
        condition: "Used",
        availability: "Available",
        features: { sunroof: false, leatherSeats: false, navigation: false },
        keywords: "",
        photo: null // Add a photo field
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        AOS.init();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === "checkbox") {
            setCarData({
                ...carData,
                features: { ...carData.features, [value]: checked }
            });
        } else if (type === "file") {
            setCarData({
                ...carData,
                photo: files[0] // Set the photo file
            });
        } else {
            setCarData({
                ...carData,
                [name]: value
            });
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");  // Reset error message
        setSuccess(""); // Reset success message

        const formData = new FormData();
        for (const key in carData) {
            formData.append(key, carData[key]);
        }

        try {
            const response = await addCar(formData); // Send formData to API

            if (response.success) {
                setSuccess("Car added successfully!");
                setCarData({
                    make: "",
                    model: "",
                    year: "",
                    price: "",
                    mileage_km: "",
                    body_style: "",
                    transmission: "",
                    fuel_type: "",
                    drivetrain: "",
                    condition: "Used",
                    availability: "Available",
                    features: { sunroof: false, leatherSeats: false, navigation: false },
                    keywords: "",
                    photo: null // Reset photo field
                });
            } else {
                throw new Error(response.message || "Error adding car");
            }
        } catch (error) {
            setError("Error adding car. Please try again.");
        }
    };

    return (
        <div className="add-car-form">
            <h2>Add a New Car</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Make</label>
                    <input
                        type="text"
                        name="make"
                        value={carData.make}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Model</label>
                    <input
                        type="text"
                        name="model"
                        value={carData.model}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Year</label>
                    <input
                        type="number"
                        name="year"
                        value={carData.year}
                        onChange={handleChange}
                        required
                        min="1900"
                        max={new Date().getFullYear()}
                    />
                </div>

                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        name="price"
                        value={carData.price}
                        onChange={handleChange}
                        required
                        min="1"
                    />
                </div>

                <div className="form-group">
                    <label>Mileage (km)</label>
                    <input
                        type="number"
                        name="mileage_km"
                        value={carData.mileage_km}
                        onChange={handleChange}
                        required
                        min="0"
                    />
                </div>

                <div className="form-group">
                    <label>Body Style</label>
                    <select
                        name="body_style"
                        value={carData.body_style}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Body Style</option>
                        <option value="Sedan">Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="Truck">Truck</option>
                        <option value="Coupe">Coupe</option>
                        <option value="Hatchback">Hatchback</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Transmission</label>
                    <select
                        name="transmission"
                        value={carData.transmission}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Transmission</option>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                        <option value="CVT">CVT</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Fuel Type</label>
                    <select
                        name="fuel_type"
                        value={carData.fuel_type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Fuel Type</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Drivetrain</label>
                    <select
                        name="drivetrain"
                        value={carData.drivetrain}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Drivetrain</option>
                        <option value="FWD">FWD</option>
                        <option value="RWD">RWD</option>
                        <option value="AWD">AWD</option>
                        <option value="4WD">4WD</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Condition</label>
                    <select
                        name="condition"
                        value={carData.condition}
                        onChange={handleChange}
                    >
                        <option value="New">New</option>
                        <option value="Used">Used</option>
                        <option value="Certified Pre-Owned">Certified Pre-Owned</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Features</label>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="features"
                                value="sunroof"
                                checked={carData.features.sunroof}
                                onChange={handleChange}
                            />
                            Sunroof
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="features"
                                value="leatherSeats"
                                checked={carData.features.leatherSeats}
                                onChange={handleChange}
                            />
                            Leather Seats
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="features"
                                value="navigation"
                                checked={carData.features.navigation}
                                onChange={handleChange}
                            />
                            Navigation
                        </label>
                    </div>
                </div>

                <div className="form-group">
                    <label>Keywords</label>
                    <input
                        type="text"
                        name="keywords"
                        value={carData.keywords}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Photo</label>
                    <input
                        type="file"
                        name="photo"
                        onChange={handleChange}
                        accept="image/*"
                        required
                    />
                </div>

                <button type="submit" className="submit-btn">
                    Add Car
                </button>
            </form>
        </div>
    );
}

function SellYourCar() {
    return (
        <div className="container mt-5">
            <h1>Sell Your Car</h1>
            <p>
                Use this page to list your car for sale. Provide details such as make, model, year, price, and images to help potential buyers.
            </p>
            <AddCar />
        </div>
    );
}

export default SellYourCar;