import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import Contact from "./pages/Contact";
import SellYourCar from "./pages/SellYourCar";
import About from "./pages/About";
import FAQ from "./pages/FAQ";

function App() {
    return (
        <Router>
            <Navbar />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/car/:id" element={<CarDetails />} /> {/* Define route for car details */}                    <Route path="/contact" element={<Contact />} />
                    <Route path="/sell-your-car" element={<SellYourCar />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/faq" element={<FAQ />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;
