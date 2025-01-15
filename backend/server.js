const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000; // Allow environment-based port configuration

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files

// PostgreSQL connection
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

// Test database connection on server startup
pool.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
        process.exit(1);
    } else {
        console.log("Database connected successfully.");
    }
});

// Set up multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/photos/"); // Store images in the 'uploads/photos' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Filename with timestamp to avoid duplicates
    },
});

const upload = multer({ storage: storage });

// Routes

// Endpoint to fetch all cars
app.get("/api/cars", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM cars");
        res.status(200).json(result.rows);
    } catch (err) {
        console.error("Error fetching cars:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Endpoint to fetch a single car by ID
app.get("/api/cars/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM cars WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Car not found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(`Error fetching car with ID ${id}:`, err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Endpoint to add a new car with photos
app.post("/api/cars", upload.array("photos", 5), async (req, res) => {
    const {
        name,
        price,
        description,
        make,
        model,
        year,
        mileage,
        fuel_type,
        transmission,
        color,
        engine_size,
        horsepower,
        body_style,
        features,
    } = req.body;

    // Retrieve the uploaded photos
    const photos = req.files;

    try {
        // Insert car data into the 'cars' table
        const result = await pool.query(
            `INSERT INTO cars (name, price, description, make, model, year, mileage, fuel_type, transmission, color, engine_size, horsepower, body_style, features)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id`,
            [
                name,
                price,
                description,
                make,
                model,
                year,
                mileage,
                fuel_type,
                transmission,
                color,
                engine_size,
                horsepower,
                body_style,
                features,
            ]
        );
        const carId = result.rows[0].id;

        // Insert photos into the 'car_photos' table
        const photoQuery = `INSERT INTO car_photos (car_id, photo_path) VALUES ($1, $2) RETURNING id`;
        for (let photo of photos) {
            const photoPath = `/uploads/photos/${photo.filename}`;
            await pool.query(photoQuery, [carId, photoPath]);
        }

        // Respond with the newly added car data
        res.status(201).json({ success: true, message: "Car added successfully!", carId });
    } catch (err) {
        console.error("Error adding car:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Endpoint to delete a car by ID
app.delete("/api/cars/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("DELETE FROM cars WHERE id = $1 RETURNING *", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Car not found" });
        }
        res.status(200).json({ message: "Car deleted successfully", car: result.rows[0] });
    } catch (err) {
        console.error(`Error deleting car with ID ${id}:`, err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Catch-all route for undefined routes
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Start server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));