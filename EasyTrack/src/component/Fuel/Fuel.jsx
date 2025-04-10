import  { useState } from "react";
import "./Fuel.css";
import { FaCarSide, FaMotorcycle, FaBus } from "react-icons/fa";

const Fuel = () => {
  const [vehicleType, setVehicleType] = useState("car");
  const [fuelAmount, setFuelAmount] = useState("");
  const [pricePerLitre, setPricePerLitre] = useState("");
  const [date, setDate] = useState("");
  const [fuelData, setFuelData] = useState({
    car: [],
    bike: [],
    bus: [],
  });

  const handleAddFuel = () => {
    if (!fuelAmount || !pricePerLitre || !date) return alert("Please fill all fields");

    const litres = parseFloat(fuelAmount);
    const price = parseFloat(pricePerLitre);
    const total = litres * price;

    const newEntry = {
      date,
      fuel: litres,
      pricePerLitre: price,
      totalPrice: total,
    };

    setFuelData((prevData) => ({
      ...prevData,
      [vehicleType]: [...prevData[vehicleType], newEntry],
    }));

    setFuelAmount("");
    setPricePerLitre("");
    setDate("");
  };

  const getTotalFuel = (type) => {
    return fuelData[type].reduce((acc, entry) => acc + entry.fuel, 0).toFixed(2);
  };

  const getTotalCost = (type) => {
    return fuelData[type].reduce((acc, entry) => acc + entry.totalPrice, 0).toFixed(2);
  };

  const iconMap = {
    car: <FaCarSide className="icon car" />,
    bike: <FaMotorcycle className="icon bike" />,
    bus: <FaBus className="icon bus" />,
  };

  return (
    <div className="fuel-container">
      <h2>⛽ Fuel Tracker Dashboard</h2>

      <div className="input-section">
        <label>Vehicle Type</label>
        <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
          <option value="car">Car 🚗</option>
          <option value="bike">Bike 🏍️</option>
          <option value="bus">Bus 🚌</option>
        </select>

        <label>Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <label>Fuel Used (Litres)</label>
        <input
          type="number"
          value={fuelAmount}
          onChange={(e) => setFuelAmount(e.target.value)}
          placeholder="Enter fuel in litres"
        />

        <label>Price per Litre (₹)</label>
        <input
          type="number"
          value={pricePerLitre}
          onChange={(e) => setPricePerLitre(e.target.value)}
          placeholder="Enter price per litre"
        />

        <button onClick={handleAddFuel}>➕ Add Entry</button>
      </div>

      <div className="fuel-summary">
        <h3>📊 Fuel Summary</h3>
        <div className="summary-card">
          {["car", "bike", "bus"].map((type) => (
            <div className="card" key={type}>
              {iconMap[type]}
              <p className="type">{type.toUpperCase()}</p>
              <p className="litres">{getTotalFuel(type)} Litres</p>
              <p className="cost">₹ {getTotalCost(type)} Total</p>
            </div>
          ))}
        </div>
      </div>

      <div className="fuel-history">
        <h3>📅 Fuel History</h3>
        <div className="history-container">
          {["car", "bike", "bus"].map((type) => (
            <div key={type} className="history-block">
              <h4>{iconMap[type]} {type.toUpperCase()}</h4>
              <ul>
                {fuelData[type].map((entry, index) => (
                  <li key={index}>
                    📆 {entry.date} → ⛽ {entry.fuel} L × ₹{entry.pricePerLitre}/L = ₹{entry.totalPrice.toFixed(2)}
                  </li>
                ))}
                {fuelData[type].length === 0 && <li>No entries yet.</li>}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fuel;
