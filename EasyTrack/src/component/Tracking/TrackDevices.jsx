// src/component/Tracking/TrackDevices.jsx

import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import PropTypes from "prop-types";
import "leaflet/dist/leaflet.css";
import "./TrackDevices.css";

const devices = [
  { name: "Vehicle 1", url: "http://localhost:3001/device1" },
  { name: "Vehicle 2", url: "http://localhost:3001/device2" },
  { name: "Vehicle 3", url: "http://localhost:3001/device3" },
];

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href,
});

const ChangeMapView = ({ coords }) => {
  const map = useMap();
  map.setView(coords, 15);
  return null;
};

ChangeMapView.propTypes = {
  coords: PropTypes.arrayOf(PropTypes.number).isRequired,
};

const TrackDevices = () => {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const handleDeviceClick = async (device) => {
    try {
      const response = await fetch(device.url);
      const data = await response.json();
      setLocation({ lat: data.lat, lng: data.lng });
      setSelectedDevice(device.name);
      setError(null);
    } catch (err) {
     console.error(err);
      setError("Failed to fetch location for " + device.name);
      setLocation(null);
    }
  };

  return (
    <div className="track-wrapper">
      <aside className="device-sidebar">
        <h2>Track Devices</h2>
        {devices.map((device, index) => (
          <button
            key={index}
            className="device-button"
            onClick={() => handleDeviceClick(device)}
          >
            {device.name}
          </button>
        ))}
        {error && <p className="error-msg">{error}</p>}
      </aside>

      <main className="map-area">
        <MapContainer center={[20.5937, 78.9629]} zoom={5} className="map-container">
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {location && (
            <>
              <ChangeMapView coords={[location.lat, location.lng]} />
              <Marker position={[location.lat, location.lng]}>
                <Popup>{selectedDevice} is here</Popup>
              </Marker>
            </>
          )}
        </MapContainer>
      </main>
    </div>
  );
};

export default TrackDevices;
