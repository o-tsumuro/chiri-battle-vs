export const useDistanceCalc = () => {
  const toRad = (degrees) => {
    return degrees * Math.PI / 180;
  };

  const distanceCalc = (initialCoords, markerPosition) => {
    const R = 6371000; // 地球の半径（メートル）

    const φ1 = toRad(initialCoords.lat);
    const φ2 = toRad(markerPosition.lat);
    const Δφ = toRad(markerPosition.lat - initialCoords.lat);
    const Δλ = toRad(markerPosition.lng - initialCoords.lng);

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = Math.trunc(R * c);

    return distance;
  };

  return { distanceCalc };
};