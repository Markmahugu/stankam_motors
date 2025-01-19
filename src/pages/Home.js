import React, { useState, useEffect } from 'react';
import '../index.css';
import SearchBar from '../components/SearchBar';
import CarCard from '../components/CarCard';
import { fetchCars } from '../utils/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CarWheelLoader from '../components/CarWheelLoader'; 

function Home() {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        AOS.init();

        const loadCars = async () => {
            try {
                const data = await fetchCars();
                setCars(data);
                setFilteredCars(data);
            } catch (err) {
                setError('Failed to load cars. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        loadCars();
    }, []);

    const handleSearch = (searchTerm) => {
        if (!searchTerm) {
            setFilteredCars(cars);
        } else {
            const filtered = cars.filter((car) =>
                car.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCars(filtered);
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <CarWheelLoader />
            </div>
        );
    }

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
            <section className="hero-section" style={{ backgroundImage: "url('/hero.jpg')" }}>
                <div className="overlay">

                    <h1 data-aos="fade-up" className="text-center text-white hero-title">
                        Welcome to
                    </h1>

                    <h1 class="stanmak-motors">STANKAM MOTORS</h1>
                    <p data-aos="fade-up" data-aos-delay="300" className="text-center text-white hero-subtitle">
                        Find Your Dream Car Today
                    </p>
                </div>
            </section>

            {/* Google Photos Videos Section */}
            <section className="youtube-videos my-5">
                <div className="container">
                    <h2 className="text-center mb-4">Check Out Our Latest Videos</h2>
                    <div className="row">
                        {/* Video 1 */}
                        <div className="col-md-4 mb-4">
                            <iframe
                                width="100%"
                                height="400"
                                className="rounded shadow"
                                src="https://m.youtube.com/shorts/EwcrAKo3Ff4"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        {/* Video 2 */}
                        <div className="col-md-4 mb-4">
                            <iframe
                                width="100%"
                                height="400"
                                className="rounded shadow"
                                src="https://m.youtube.com/shorts/djpKk2U9OAg"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        {/* Video 3 */}
                        <div className="col-md-4 mb-4">
                            <iframe
                                width="100%"
                                height="400"
                                className="rounded shadow"
                                src="https://www.youtube.com/shorts/_fqlX4Wk0l0"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
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
