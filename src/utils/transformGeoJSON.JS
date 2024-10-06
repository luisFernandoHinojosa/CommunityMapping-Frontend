// import { utmToLatLng } from "./utmToLatLng";

// export const transformGeoJSON = (geojson) => {
//   return {
//     ...geojson,
//     features: geojson.features.map((feature) => {
//       const [x, y] = feature.geometry.coordinates;
//       const [lat, lng] = utmToLatLng(x, y);
//       return {
//         ...feature,
//         geometry: {
//           ...feature.geometry,
//           coordinates: [lng, lat],
//         },
//       };
//     }),
//   };
// };
export const transformGeoJSON = (geojson) => {
  return {
    ...geojson,
    features: geojson.features.map((feature) => {
      if (feature.geometry.type === 'MultiPoint') {
        return {
          ...feature,
          geometry: {
            ...feature.geometry,
            coordinates: feature.geometry.coordinates.map(([lng, lat]) => [lng, lat]),
          },
        };
      }
      return feature;
    }),
  };
};

