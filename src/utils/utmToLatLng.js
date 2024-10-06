import proj4 from 'proj4';

export const utmToLatLng = (x, y, zone = 20) => {
  const utm = `+proj=utm +zone=${zone} +south +datum=WGS84 +units=m +no_defs`;
  const wgs84 = proj4.WGS84;
  const [lng, lat] = proj4(utm, wgs84, [x, y]);
  return [lat, lng];
};