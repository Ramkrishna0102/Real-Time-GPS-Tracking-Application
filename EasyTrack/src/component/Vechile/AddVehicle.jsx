import { useState } from "react";
import "./AddVehicle.css";

const AddVehicle = () => {
  const [vehicle, setVehicle] = useState({
    name: "",
    model: "",
    year: "",
    licensePlate: "",
  });

  const handleChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/add-vehicle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicle),
      });

      if (!response.ok) {
        throw new Error("Failed to add vehicle");
      }

      const data = await response.json();
      console.log("Vehicle added successfully:", data);
      alert("Vehicle added successfully!");
    } catch (error) {
      console.error("Error adding vehicle:", error);
      alert("Error adding vehicle. Check console for details.");
    }
  };

  return (
    <div className="add-vehicle-container">
      <h2 className="add-vehicle-title">Add New Vehicle</h2>
      <form className="add-vehicle-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="text" name="model" placeholder="Model" onChange={handleChange} required />
        <input type="number" name="year" placeholder="Year" onChange={handleChange} required />
        <input type="text" name="licensePlate" placeholder="License Plate" onChange={handleChange} required />
        <button type="submit" className="add-vehicle-button">Add Vehicle</button>
      </form>
    </div>
  );
};

export default AddVehicle;

