import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/car/:id" element={<CarDetails />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
