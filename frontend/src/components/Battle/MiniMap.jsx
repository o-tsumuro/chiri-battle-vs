import { useState, useRef } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '300px',
  height: '300px',
};

const MiniMap = ({ markerPosition, setMarkerPosition, confirmPosition }) => {
  const [center, setCenter] = useState({ lat: 38.2048, lng: 138.2529 });
  const mapRef = useRef(null);

  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setMarkerPosition({ lat, lng });
    console.log("Clicked:", { lat, lng });
  };

  const handleMapLoad = (map) => {
    mapRef.current = map;
  };

  const handleMapDragEnd = () => {
    const newCenter = mapRef.current.getCenter();
    setCenter({lat: newCenter.lat(), lng: newCenter.lng()});
  };


  return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={4.42}
        center={center}
        onClick={handleMapClick}
        onLoad={handleMapLoad}
        onDragEnd={handleMapDragEnd}
        options={{
          mapTypeControl: false,
          fullscreenControl: false,
          zoomControl: false,
          streetViewControl: false,
        }}
      >
        {markerPosition && <Marker position={markerPosition} />}
      </GoogleMap>
      {markerPosition && (
        <button onClick={() => confirmPosition()}>確定</button>
      )}
    </>
  );
};

export default MiniMap;