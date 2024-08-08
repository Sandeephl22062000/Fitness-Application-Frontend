import { Box, Container } from "@mui/material";
import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

const GymMap = withScriptjs(
  withGoogleMap(({ gyms, center }) => {
    const [selectedGym, setSelectedGym] = React.useState(null);
    const handleMarkerClick = (gym) => {
      setSelectedGym(gym);
    };

    return (
      <Container>
        <Box sx={{ height: "500px" }}>  
          {gyms.length > 0 && (
            <GoogleMap defaultZoom={12} defaultCenter={center}>
              {gyms.map((gym) => (
                <Marker
                  key={gym.id}
                  position={{
                    lat: gym?.geocodes?.main?.latitude,
                    lng: gym?.geocodes?.main?.longitude,
                  }}
                  onClick={() => handleMarkerClick(gym)}
                />
              ))}
              {selectedGym && (
                <InfoWindow
                  position={{
                    lat: selectedGym?.geocodes?.main?.latitude,
                    lng: selectedGym?.geocodes?.main?.longitude,
                  }}
                  onCloseClick={() => setSelectedGym(null)}
                >
                  <div>
                    <h5>{selectedGym?.name}</h5>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          )}
        </Box>
      </Container>
    );
  })
);

export default GymMap;
