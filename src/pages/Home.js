import React, { useState, useEffect } from "react";
import '../index.css';
import SearchBar from "../components/SearchBar";
import CarCard from "../components/CarCard";
import { fetchCars } from "../utils/api"; // Utility function to fetch cars from the backend
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

function Home() {
    const [cars, setCars] = useState([]); // State to store the list of cars
    const [filteredCars, setFilteredCars] = useState([]); // State to store filtered cars based on search
    const [loading, setLoading] = useState(true); // State to handle loading indicator
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        // Initialize AOS for scroll animations
        AOS.init();

        const loadCars = async () => {
            try {
                const data = await fetchCars(); // Fetch the cars with all details from the backend
                console.log("Fetched Cars: ", data); // Debug: log the data fetched from the backend
                setCars(data); // Update the state with the fetched data
                setFilteredCars(data); // Set filtered cars initially as all cars
            } catch (err) {
                setError("Failed to load cars. Please try again later.");
            } finally {
                setLoading(false); // Set loading to false
            }
        };
        loadCars();
    }, []);

    // Handle search
    const handleSearch = (searchTerm) => {
        console.log("Search Term: ", searchTerm); // Debug: log the search term entered
        if (!searchTerm) {
            setFilteredCars(cars); // Show all cars if no search term is provided
        } else {
            const filtered = cars.filter(car =>
                car.name.toLowerCase().includes(searchTerm.toLowerCase()) // Ensure case-insensitive search
            );
            console.log("Filtered Cars: ", filtered); // Debug: log the filtered cars
            setFilteredCars(filtered);
        }
    };

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

    // Render error message
    if (error) {
        return (
            <div className="alert alert-danger text-center mt-5" role="alert">
                {error}
            </div>
        );
    }

    return (
        <div>
            {/* Hero Section */}
            <section className="hero-section" style={{ backgroundImage: "url('/ford.png')" }}>
                <div className="overlay">
                    <h1 data-aos="fade-up" className="text-center text-white hero-title">
                        Welcome to STANMAK MOTORS
                    </h1>
                    <p data-aos="fade-up" data-aos-delay="200" className="text-center text-white hero-subtitle">
                        Find Your Dream Car Today
                    </p>
                </div>
            </section>

            {/* Cars Section */}
            <div className="container mt-4">
                <h2 className="text-center mb-4">Available Cars</h2>
                <SearchBar onSearch={handleSearch} />
                <div className="row">
                    {filteredCars.length === 0 ? (
                        <div className="col-12 text-center">No cars found matching your search.</div>
                    ) : (
                        filteredCars.map((car) => <CarCard key={car.id} car={car} />)
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
