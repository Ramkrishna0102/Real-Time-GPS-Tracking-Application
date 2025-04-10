import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Sidebar.css";
import PropTypes from "prop-types";

const menuItems = [
  { title: "Dashboard", path: "/" }, 
  { 
    title: "⇒Vehicles", 
    subItems: [
      { title: ">Vehicle Info", path: "/vehicle-info" }, 
      { title: ">Add Vehicle", path: "/add-vehicle" }, 
      { title: ">Vehicle Group", path: "/vehicle-group" }
    ] 
  },
  { 
    title: "⇒Drivers", 
    subItems: [
      { title: ">Driver Info", path: "/driver-info" },
      // { title: "Driver Edit", path: "/driver-edit" },
      { title: ">Add Driver", path: "/add-driver" }
    ] 
  },
  { 
    title: "⇒Bookings", 
    subItems: [
      { title: ">Bookings Info", path: "/bookings-info" },
      { title: ">Bookings Edit", path: "/bookings-edit" },
      { title: ">Add Booking", path: "/add-booking" }
    ] 
  },
  { 
    title: "⇒Customers", 
    subItems: [
      { title: ">Customer Info", path: "/customer-info" },
      { title: ">Customer Edit", path: "/customer-edit" },
      { title: ">Add Customer", path: "/add-customer" }
    ] 
  },
  { 
    title: "⇒Fuels", 
    subItems: [
      { title: ">Fuel Info", path: "/Fuel-Info" },
      // { title: ">Fuel Edit", path: "/fuel-edit" },
      // { title: ">Add Fuel", path: "/add-fuel" }
    ] 
  },
  { 
    title: "⇒Reminder", 
    subItems: [
      { title: ">Reminder Info", path: "/reminder-info" },
      { title: ">Add Reminder", path: "/add-reminder" }
    ] 
  },
  { 
    title: "⇒Income and Expense", 
    subItems: [
      { title: ">Income Expense Info", path: "/income-expense-info" },
      { title: ">Income Expense Edit", path: "/income-expense-edit" },
      { title: ">Add Income/Expense", path: "/add-income-expense" }
    ] 
  },
  { 
    title: "⇒Tracking", 
    subItems: [
      { title: ">TrackDevices", path: "/TrackDevices" },
      { title: ">Live Location", path: "/live-location" }
    ] 
  },
  { 
    title: "⇒Geofence", 
    subItems: [
      { title: ">Add Geofence", path: "/add-geofence" },
      { title: ">Geofence Info", path: "/geofence-info" },
      { title: ">Geofence Events", path: "/geofence-events" }
    ] 
  },
  { 
    title: "⇒Reports", 
    subItems: [
      { title: ">Booking Report", path: "/booking-report" },
      { title: ">Income and Expenses Report", path: "/income-expenses-report" },
      { title: ">Fuel Report", path: "/fuel-report" }
    ] 
  },
  { 
    title: "⇒Settings", 
    subItems: [
      { title: ">General Settings", path: "/general-settings" },
      { title: ">SMTP Configuration", path: "/smtp-configuration" },
      { title: ">Email Template", path: "/email-template" }
    ] 
  },
  { 
    title: "⇒Users", 
    subItems: [
      { title: ">User’s List", path: "/users-list" },
      { title: ">Add User", path: "/add-user" }
    ] 
  },
  { title: "⇒Logout", path: "/logout" }
];

const Sidebar = ({ isSidebarOpen }) => {
  const [openSubmenus, setOpenSubmenus] = useState({});
  const navigate = useNavigate();

  const handleMenuClick = (item) => {
    if (item.path) {
      navigate(item.path);
    } else if (item.subItems) {
      setOpenSubmenus(prevState => ({
        ...prevState,
        [item.title]: !prevState[item.title]
      }));
    }
  };

  return (
    <aside className={isSidebarOpen ? "sidebar open" : "sidebar"}>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <div className="menu-item" onClick={() => handleMenuClick(item)}>
              {item.title}
            </div>
            {item.subItems && openSubmenus[item.title] && (
              <ul className="submenu">
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex} onClick={() => navigate(subItem.path)}>
                    {subItem.title}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
};

export default Sidebar;
