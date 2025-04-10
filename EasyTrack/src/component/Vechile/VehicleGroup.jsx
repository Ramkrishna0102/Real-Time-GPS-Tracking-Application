import { useEffect, useState } from "react";
import "./VehicleGroup.css";

const VehicleGroup = () => {
  const [vehicleCounts, setVehicleCounts] = useState({});

  useEffect(() => {
    // Mock API call (Replace with actual API)
    const vehicles = [
      { type: "Car" },
      { type: "Car" },
      { type: "Bike" },
      { type: "Bike" },
    ];

    const countMap = vehicles.reduce((acc, vehicle) => {
      acc[vehicle.type] = (acc[vehicle.type] || 0) + 1;
      return acc;
    }, {});

    setVehicleCounts(countMap);
  }, []);

  return (
    <div className="vehicle-group-container">
      <h2 className="vehicle-group-title">Vehicle Group</h2>
      <ul className="vehicle-group-list">
        {Object.entries(vehicleCounts).map(([type, count]) => (
          <li key={type} className="vehicle-group-item">
            {type}: {count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VehicleGroup;
