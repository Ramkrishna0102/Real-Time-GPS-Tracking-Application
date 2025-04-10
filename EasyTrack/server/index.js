require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { OAuth2Client } = require("google-auth-library");
const EmployeeModel = require("./models/EmployeeModel");
const VehicleModel = require("./models/Vehicle");

const app = express();
app.use(express.json());
app.use(cors());

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// **MongoDB Connection**
mongoose
    .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/employee", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

// **Google Login Route**
app.post("/google-login", async (req, res) => {
    const { token } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { name, email, picture } = ticket.getPayload();

        let user = await EmployeeModel.findOne({ email });

        if (!user) {
            user = await EmployeeModel.create({ name, email, picture });
        }

        res.status(200).json({ user, message: "Google Login Successful" });
    } catch (error) {
        res.status(400).json({ error: "Google Login Failed", details: error.message });
    }
});

// **Register Route**
app.post("/register", async (req, res) => {
    try {
        const employee = await EmployeeModel.create(req.body);
        res.status(201).json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// **Add Vehicle Route**
app.post("/add-vehicle", async (req, res) => {
    try {
        const { name, model, year, licensePlate } = req.body;
        const newVehicle = new VehicleModel({ name, model, year, licensePlate });
        await newVehicle.save();
        res.status(201).json({ message: "Vehicle added successfully", newVehicle });
    } catch (err) {
        res.status(500).json({ message: "Error adding vehicle", error: err.message });
    }
});

// **Start Server**
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
