import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Update with your backend API URL

// Fetch cars from the backend API
export const fetchCars = async () => {
    try {
        const response = await axios.get(`${API_URL}/cars`);
        return response.data; // Return the list of cars with all details
    } catch (error) {
        console.error("Error fetching cars:", error);
        throw new Error("Failed to fetch cars. Please try again later.");
    }
};

// Fetch a single car's details by ID
export const fetchCarById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/cars/${id}`);
        return response.data; // Return the specific car details by ID
    } catch (error) {
        console.error(`Error fetching car with ID ${id}:`, error);
        throw new Error("Failed to fetch car details. Please try again later.");
    }
};
