import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";

const ResultScreen = ({ result }) => {
  if (!result || result.distance === null) return <p>計算中...</p>;
  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100vh' }}
      center={result.initialCoords}
      zoom={5.4}
      options={{
        mapTypeControl: false,
        fullscreenControl: false,
        zoomControl: false,
        streetViewControl: false,
      }}
    >
      <Marker
        position={result.initialCoords}
        icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
        />
      <Marker
        position={result.markerPosition}
        icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      />
      <Polyline
        path={[result.initialCoords, result.markerPosition]}
        options={{
          strokeOpacity: 0,
          strokeWeight: 0,
          icons: [{
            icon: {
              path: 'M 0,-1 0,1',
              strokeColor: 'transparent',
              strokeOpacity: 1,
              strokeColor: '#666666',
              scale: 4,
            },
            offset: '0',
            repeat: '20px',
          }],
        }}
      />
    </GoogleMap>
  );
};

export default ResultScreen;