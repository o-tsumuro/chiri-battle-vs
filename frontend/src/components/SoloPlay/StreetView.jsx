import { useState, useRef } from 'react';
import { GoogleMap, StreetViewPanorama } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const StreetView = ({ location }) => {
  const [pov, setPov] = useState({ heading: 100, pitch: 0 });
  const panoramaRef = useRef(null);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={location}
      zoom={1}
      options={{ streetViewControl: false }}
    >
      {location && (
        <StreetViewPanorama
          position={location}
          visible={true}
          onPovChanged={() => {
            const panorama = panoramaRef.current;
            if (panorama) {
              const newPov = panorama.getPov();
              setPov(newPov);
            }
          }}
          onLoad={(panorama) => {
            panoramaRef.current = panorama;
          }}
          options={{
            pov: {pov},
            zoom: 1,
            addressControl: false,
            enableCloseButton: false,
          }}
        />
      )}
    </GoogleMap>
  );
}

export default StreetView;