import { GoogleMap, StreetViewPanorama } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const StreetView = ({ location }) => {
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
          options={{
            pov: { heading: 100, pitch: 0 },
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