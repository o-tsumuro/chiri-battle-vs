import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";

const ResultMap = ({ initPos, myPos, opponentPos }) => {
  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100vh' }}
      center={initPos}
      zoom={5.4}
      options={{
        mapTypeControl: false,
        fullscreenControl: false,
        zoomControl: false,
        streetViewControl: false,
      }}
    >
      <Marker
        position={initPos}
        icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
      />
      <Marker
        position={myPos}
        icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      />
      <Marker
        position={opponentPos}
        icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
      />
      <Polyline
        path={[initPos, myPos]}
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
      <Polyline
        path={[initPos, opponentPos]}
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

export default ResultMap;