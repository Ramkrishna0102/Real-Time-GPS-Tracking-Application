const mongoose = require("mongoose");

const vehiclesDB = mongoose.createConnection("mongodb://localhost:27017/vehiclesDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const VehicleSchema = new mongoose.Schema({
    name: String,
    model: String,
    year: Number,
    licensePlate: String,
});

const VehicleModel = vehiclesDB.model("Vehicle", VehicleSchema);

module.exports = VehicleModel;
