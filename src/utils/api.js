import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Ensure this matches your backend API base URL

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

// Add a new car to the backend API
export const addCar = async (carData) => {
    try {
        const response = await axios.post(`${API_URL}/cars`, carData);
        return response.data; // Return the response indicating success or failure
    } catch (error) {
        console.error("Error adding car:", error);
        throw new Error("Failed to add car. Please try again later.");
    }
};
