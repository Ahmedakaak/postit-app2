import React, { useState, useEffect } from "react";
import axios from "axios";

const Location = () => {
  const [ip, setIp] = useState(null); // State to hold the IP address
  const [geoData, setGeoData] = useState(null); // State to hold geolocation data
  const [currency, setcurrency] = useState("");
  const [city, setcity] = useState("");

  const fetchIpAddress = async () => {
    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      setIp(response.data.ip); // Set the IP address in state
    } catch (error) {
      console.error("Error fetching IP address:", error.message);
    }
  };

  // Fetch geolocation data based on the IP

  const getGeoLocationData = async () => {
    if (!ip) return; // Ensure IP is available before making the request
    try {
      const response = await axios.get(`http://ip-api.com/json/${ip}`);
      setGeoData(response.data); // Set geolocation data in state
      setcity(geoData.city);
      var country = geoData.country;
      if (country === "Oman") {
        setcurrency("OMR");
      }
      if (country === "UAE") {
        setcurrency("AED");
      }
      if (country === "Qatar") {
        setcurrency("QR");
      }

      console.log("GeoLocation Data:", response.data);
    } catch (error) {
      console.error("Error fetching geolocation data:", error.message);
    }
  };

  useEffect(() => {
    fetchIpAddress();
  }, []);

  // Fetch geolocation data when the IP is updated

  useEffect(() => {
    if (ip) {
      getGeoLocationData();
    }
  }, [ip]);

  return (
    <div>
      {/* <p>Ip address: {ip}</p>
      <p>City:{geoData.city}</p>
      <p>Region:{geoData.region}</p>
      <p>Currency:{currency}</p> */}
      {ip ? <p>IP Address: {ip}</p> : <p>Loading IP address...</p>}
      {geoData ? (
        <div>
          Country: {geoData.country}
          <br />
          Region: {geoData.region}
          <p>Currency:{currency}</p>
        </div>
      ) : (
        <p>Loading Geolocation Data...</p>
      )}
    </div>
  );
};

export default Location;
