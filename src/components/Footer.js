import React from "react";
import { Link } from "react-router-dom";
import "../footer.css"; 

function Footer() {
    return (
        <footer className="bg-dark text-white text-center py-5">
            <div className="container">
                {/* Logo */}
                <div className="mb-4">
                    <img src="/stanmak.png" alt="Stankam Motors Logo" className="footer-logo" />
                </div>

                {/* Social Media Links */}
                <div className="mb-4 social-media">
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white mx-3"
                    >
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white mx-3"
                    >
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a
                        href="https://www.instagram.com/stankam_motors_ltd/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white mx-3"
                    >
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>

                {/* Quick Links */}
                <div className="row mb-4">
                    <div className="col-md-3">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li>
                                <Link to="/" className="text-white nav-link">Home</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-white nav-link">Contact</Link>
                            </li>
                            <li>
                                <Link to="/sell-your-car" className="text-white nav-link">Sell Your Car</Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-white nav-link">About</Link>
                            </li>
                            <li>
                                <Link to="/faq" className="text-white nav-link">FAQ</Link>
                            </li>
                            <li>
                                <Link to="/add-car" className="text-white nav-link">Add Car</Link> {/* Link to Add Car route */}
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Signup */}
                    <div className="col-md-3">
                        <h5>Subscribe to Our Newsletter</h5>
                        <form action="#" method="POST">
                            <input
                                type="email"
                                className="form-control mb-2"
                                placeholder="Enter your email"
                            />
                            <button type="submit" className="btn btn-primary w-100">Subscribe</button>
                        </form>
                    </div>

                    {/* Location */}
                    <div className="col-md-3">
                        <h5>Our Location</h5>
                        <p>Stankam motors, Nairobi, Kenya</p>
                    </div>
                </div>

                {/* Footer Text */}
                <div className="mt-4">
                    <p className="mb-0">
                        © {new Date().getFullYear()} Stankam Motors. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;