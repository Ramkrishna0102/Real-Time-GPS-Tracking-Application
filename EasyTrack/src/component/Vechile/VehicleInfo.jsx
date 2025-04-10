import { useEffect, useState } from "react";
import ".//VechileInfo.css"

const VehicleInfo = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Mock API call (Replace with actual API call)
    const fetchedVehicles = [
      { id: 1, type: "Car", model: "Toyota Fortuner", number: "UP 32 AB 1234" },
      { id: 1, type: "Car", model: "Tata Harrier", number: "UP 32 AB 1234" },
      { id: 2, type: "Bike", model: "Royal Enfield Bullet", number: "UP 32 XY 5678" },
      { id: 2, type: "Bike", model: "Jawa Perak", number: "UP 32 XY 5678" }
    ];
    setVehicles(fetchedVehicles);
  }, []);

  return (
    <div className="vehicle-container">
      <h2 className="vehicle-title">Vehicle Information</h2>
      <ul className="vehicle-list">
        {vehicles.map((vehicle) => (
          <li key={vehicle.id} className="vehicle-card">
            <span className="vehicle-details">{vehicle.type} - {vehicle.model}</span>
            <span className="vehicle-number">{vehicle.number}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VehicleInfo;
