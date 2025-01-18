import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCarById } from '../utils/api';
import CarWheelLoader from '../components/CarWheelLoader';
import { generateWhatsAppLink } from '../utils/whatsappUtils';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import "../cardetails.css";

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const whatsappNumber = "254704467869";

    useEffect(() => {
        const getCarDetails = async () => {
            try {
                if (!id) throw new Error("Invalid car ID.");
                const data = await fetchCarById(id);
                setCar(data);
            } catch (err) {
                setError("Failed to load car details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        getCarDetails();
    }, [id]);

    if (loading) {
        return <CarWheelLoader />;
    }

    if (error) {
        return (
            <div className="alert alert-danger text-center mt-5" role="alert">
                {error}
            </div>
        );
    }

    if (!car) {
        return (
            <div className="alert alert-warning text-center mt-5" role="alert">
                Car details not available.
            </div>
        );
    }

    const price = isNaN(car?.price) ? 0 : parseFloat(car.price);
    const carUrl = `${window.location.origin}/car/${car.id}`;
    const photoUrl = `/uploads/photos/${car.photo}`;
    const galleryImages = car.images?.map(image => ({
        src: `/uploads/photos/${image}`,
        alt: `${car.name}`
    })) || [];

    return (
        <div className="container mt-4">
            <h1>{car.name}</h1>
            <p><strong>Price:</strong> Ksh. {price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p><strong>Description:</strong> {car.description}</p>
            <p><strong>Make:</strong> {car.make}</p>
            <p><strong>Model:</strong> {car.model}</p>
            <p><strong>Year:</strong> {car.year}</p>
            <p><strong>Mileage:</strong> {car.mileage_km.toLocaleString('en-US')} km</p>
            <p><strong>Fuel Type:</strong> {car.fuel_type}</p>
            <p><strong>Transmission:</strong> {car.transmission}</p>
            <p><strong>Color:</strong> {car.color}</p>
            <p><strong>Engine Size:</strong> {car.engine_size} L</p>
            <p><strong>Horsepower:</strong> {car.horsepower} HP</p>
            <p><strong>Body Style:</strong> {car.body_style}</p>
            <p><strong>Features:</strong> {car.features && Object.keys(car.features).map(feature => (
                <span key={feature} className="badge bg-secondary me-2">{feature}</span>
            ))}</p>

            {car.photo && (
                <img
                    src={photoUrl}
                    alt={car.name}
                    className="img-fluid"
                    style={{ maxWidth: "100%", height: "auto" }}
                />
            )}

            {car.images && car.images.length > 0 && (
                <div className="row mt-4">
                    <h2>Gallery</h2>
                    {car.images.map((image, index) => (
                        <div
                            className="col-md-4 mb-3"
                            key={index}
                            onClick={() => {
                                setCurrentImageIndex(index);
                                setLightboxOpen(true);
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            <img
                                src={`/uploads/photos/${image}`}
                                alt={`${car.name} ${index + 1}`}
                                className="img-fluid"
                                style={{ maxWidth: "100%", height: "auto" }}
                            />
                        </div>
                    ))}

                    {lightboxOpen && (
                        <Lightbox
                            open={lightboxOpen}
                            close={() => setLightboxOpen(false)}
                            slides={galleryImages}
                            index={currentImageIndex}
                        />
                    )}
                </div>
            )}

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
};

export default CarDetails;