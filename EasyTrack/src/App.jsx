import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/Header/Header";
import Sidebar from "./component/Sidebar/Sidebar";
import Signup from "./component/Log_sig/signup";
import Login from "./component/Log_sig/login";
import AddVehicle from "./component/Vechile/AddVehicle"
import VehicleInfo from "./component/Vechile/VehicleInfo";
import VehicleGroup from "./component/Vechile/VehicleGroup";
import Fuel from "./component/Fuel/Fuel"
import LiveLoc from "./component/Tracking/LiveLoc";
import TrackDevices from "./component/Tracking/TrackDevices";

import "./App.css";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [vehicles, setVehicles] = useState([]);

  // Fetch vehicles from backend
  const fetchVehicles = async () => {
    try {
      const response = await fetch("http://localhost:3001/vehicles");
      if (response.ok) {
        const data = await response.json();
        setVehicles(data);
      } else {
        console.error("Failed to fetch vehicles");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Load vehicles when component mounts
  useEffect(() => {
    fetchVehicles();
  }, []);

  // Handle new vehicle added
  const handleVehicleAdded = (newVehicle) => {
    setVehicles((prevVehicles) => [...prevVehicles, newVehicle]);
  };

  return (
    <Router>
      <div className="app">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="main-container">
          <Sidebar isSidebarOpen={isSidebarOpen} />
          <main className={isSidebarOpen ? "content sidebar-open" : "content"}>
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/add-vehicle"
                element={<AddVehicle onVehicleAdded={handleVehicleAdded} />}
              />
              <Route path="/vehicle-info" element={<VehicleInfo vehicles={vehicles} />} />
              <Route path="/vehicle-group" element={<VehicleGroup />} />

              <Route path="/Fuel-Info" element={<Fuel />} />
              <Route path="/live-location" element={<LiveLoc />} />
              <Route path="/TrackDevices" element={<TrackDevices />} />



            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
