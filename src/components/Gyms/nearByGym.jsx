import React, { useEffect, useState } from "react";
import GymMap from "./GymMap";
import axios from "axios";
import { Box, CircularProgress, Container, Typography } from "@mui/material";

const NearByGym = () => {
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: "",
    longitude: "",
  });

  const handleMarkerClick = (gym) => {
    setGyms(gym);
  };

  const getCurrentLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          console.log("Latitude: " + latitude + ", Longitude: " + longitude);
          setCurrentLocation({
            latitude,
            longitude,
          });
        },
        function (error) {
          console.error("Error getting current location: " + error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const fetchData = async () => {
    if (currentLocation.latitude && currentLocation.longitude) {
      const data = await axios.get(
        `http://localhost:8000/api/gyms/${currentLocation.latitude}/${currentLocation.longitude}`
      );
      console.log(data);
      setGyms(data?.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [currentLocation]);

  const center = {
    lat: currentLocation?.latitude,
    lng: currentLocation?.longitude,
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h5" align="center" sx={{ m: 2 }}>
        Gyms near your location
      </Typography>

      {!loading ? (
        <GymMap
          gyms={gyms}
          center={center}
          onMarkerClick={handleMarkerClick}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&libraries=places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `500px`, width: "100%" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      ) : (
        <Box>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default NearByGym;
