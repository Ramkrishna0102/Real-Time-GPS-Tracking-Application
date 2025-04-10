import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import icon2x from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Fix for default marker icon not showing
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: icon2x,
  iconUrl: icon,
  shadowUrl: iconShadow,
});

const LiveLoc = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setError("Error fetching location: " + error.message);
        },
        { enableHighAccuracy: true }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Live Location</h2>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : location.lat && location.lng ? (
        <>
          <p>Latitude: {location.lat}</p>
          <p>Longitude: {location.lng}</p>
          <div style={{ height: "400px", marginTop: "1rem" }}>
            <MapContainer
              center={[location.lat, location.lng]}
              zoom={15}
              scrollWheelZoom={true}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[location.lat, location.lng]}>
                <Popup>You are here</Popup>
              </Marker>
            </MapContainer>
          </div>
        </>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default LiveLoc;
