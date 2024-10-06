// import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";
// // import { transformGeoJSON } from "../utils/transformGeoJSON.JS";
// import 'leaflet/dist/leaflet.css';
// import { useEffect, useState } from "react";
// import { GraficaBarra } from "../components/GraficaBarra";

// export const MapaPage = () => {
//   const [geoJsonData, setGeoJsonData] = useState(null);

//   useEffect(() => {
//     const fetchGeoJson = async () => {
//       try {
//         const response = await fetch("/data/Eventos.geojson");
//         if (!response.ok) {
//           throw new Error("No se pudo cargar el archivo GeoJSON");
//         }
//         const data = await response.json();
//         setGeoJsonData(data);
//       } catch (error) {
//         console.error("Error cargando el archivo GeoJSON:", error);
//       }
//     };

//     fetchGeoJson();
//   }, []);
//   if (!geoJsonData) {
//     return <div>Cargando datos...</div>;
//   }

//   return (
//     <div className="">
//       <div className=" m-auto mt-8  border-b w-full">
//         <MapContainer
//           center={[-17.783, -63.182]}
//           zoom={13}
//           scrollWheelZoom={false}
//           style={{ height: "70vh" }}
//         >
//           {/* <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           /> */}
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution="&copy; OpenStreetMap contributors"
//           />
//           <GeoJSON data={geoJsonData} />
//         </MapContainer>
//       </div>
//       <div className="p-5">
//         <GraficaBarra />
//       </div>
//     </div>
//   );
// };



//este vale
// import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";
// import { useEffect, useState } from "react";
// import { GraficaBarra } from "../components/GraficaBarra";
// import 'leaflet/dist/leaflet.css';

// export const MapaPage = () => {
//   const [geoJsonData, setGeoJsonData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [fileLoaded, setFileLoaded] = useState(false); // Nuevo estado para detectar carga de archivo

//   // Manejar la carga de archivos
//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         try {
//           const jsonData = JSON.parse(e.target.result);
//           setGeoJsonData(null); // Limpiamos el estado anterior
//           setTimeout(() => {
//             setGeoJsonData(jsonData); // Cargamos los nuevos datos después de limpiar
//             setFileLoaded(true); // Indicamos que se ha cargado un archivo
//           }, 100); // Pequeña demora para asegurar la limpieza
//         } catch (error) {
//           console.error("Error parsing JSON:", error);
//         }
//       };
//       reader.readAsText(file);
//     }
//   };

//   // Cargar un archivo GeoJSON por defecto si no hay datos cargados
//   useEffect(() => {
//     const fetchDefaultGeoJson = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch("/data/Eventos.geojson");
//         if (!response.ok) {
//           throw new Error("No se pudo cargar el archivo GeoJSON por defecto");
//         }
//         const data = await response.json();
//         setGeoJsonData(data);
//         setFileLoaded(false); // Indicamos que no es un archivo cargado por el usuario
//       } catch (error) {
//         console.error("Error cargando el archivo GeoJSON por defecto:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (!geoJsonData && !fileLoaded) {
//       fetchDefaultGeoJson();
//     }
//   }, [geoJsonData, fileLoaded]);

//   if (loading) {
//     return <div className="text-center mt-8">Cargando mapa...</div>;
//   }

//   return (
//     <div className="container mx-auto p-5">
//       <div className="map-section border rounded-lg shadow-md">
//         {geoJsonData ? (
//           <MapContainer
//             key={fileLoaded ? 'file-loaded-map' : 'default-map'} // Clave única para forzar re-renderizado
//             center={[-17.783, -63.182]} // Centrado en Santa Cruz de la Sierra, Bolivia
//             zoom={13}
//             scrollWheelZoom={false}
//             style={{ height: "70vh" }}
//           >
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution="&copy; OpenStreetMap contributors"
//             />
//             <GeoJSON key={JSON.stringify(geoJsonData)} data={geoJsonData} />
//           </MapContainer>
//         ) : (
//           <div className="text-center p-5">
//             No hay datos de GeoJSON cargados. Seleccione un archivo.
//           </div>
//         )}
//       </div>
//       <div className="mb-5">
//         <label
//           htmlFor="geojson-upload"
//           className="block text-lg font-semibold mb-2 text-gray-700"
//         >
//           Cargar problematica (archivo GeoJSON o JSON):
//         </label>
//         <input
//           id="geojson-upload"
//           type="file"
//           accept=".json,.geojson"
//           onChange={handleFileUpload}
//           className="block w-full cursor-pointer text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//         />
//       </div>

//       <div className="mt-8">
//         <GraficaBarra />
//       </div>
//     </div>
//   );
// };

import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import { GraficaBarra } from "../components/GraficaBarra";
import 'leaflet/dist/leaflet.css';
import { GraficaTorta } from "../components/GraficaTorta";

export const MapaPage = () => {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [filteredData, setFilteredData] = useState(null); // Nuevo estado para los datos filtrados
  const [loading, setLoading] = useState(false);
  const [fileLoaded, setFileLoaded] = useState(false); // Estado para detectar la carga de archivo
  const [selectedDate, setSelectedDate] = useState(""); // Estado para la fecha seleccionada

  // Manejar la carga de archivos
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          setGeoJsonData(null); // Limpiamos el estado anterior
          setTimeout(() => {
            setGeoJsonData(jsonData); // Cargamos los nuevos datos después de limpiar
            setFileLoaded(true); // Indicamos que se ha cargado un archivo
          }, 100); // Pequeña demora para asegurar la limpieza
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  // Cargar un archivo GeoJSON por defecto si no hay datos cargados
  useEffect(() => {
    const fetchDefaultGeoJson = async () => {
      setLoading(true);
      try {
        const response = await fetch("/data/Eventos.geojson");
        if (!response.ok) {
          throw new Error("No se pudo cargar el archivo GeoJSON por defecto");
        }
        const data = await response.json();
        setGeoJsonData(data);
        setFileLoaded(false); // Indicamos que no es un archivo cargado por el usuario
      } catch (error) {
        console.error("Error cargando el archivo GeoJSON por defecto:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!geoJsonData && !fileLoaded) {
      fetchDefaultGeoJson();
    }
  }, [geoJsonData, fileLoaded]);

  // Filtrar el GeoJSON basado en la fecha seleccionada
  useEffect(() => {
    if (geoJsonData && selectedDate) {
      console.log("selected date", selectedDate)
      const filteredFeatures = geoJsonData.features.filter(feature => {
        const featureDate = new Date(feature.properties.hoy);
        console.log("hoy date", featureDate)
        const selected = new Date(selectedDate);
        // Comparar la fecha seleccionada con la fecha de la feature
        return featureDate.toDateString() === selected.toDateString();
      });

      // Crear nuevo objeto GeoJSON filtrado
      setFilteredData({
        ...geoJsonData,
        features: filteredFeatures,
      });
    } else {
      // Si no hay fecha seleccionada, mostramos todos los datos
      setFilteredData(geoJsonData);
    }
  }, [geoJsonData, selectedDate]);

  // Manejar el cambio de fecha
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  if (loading) {
    return <div className="text-center mt-8">Cargando mapa...</div>;
  }

  return (
    <div className="container mx-auto p-5">
      <div className="map-section border rounded-lg shadow-md">
        {filteredData ? (
          <MapContainer
            key={fileLoaded ? 'file-loaded-map' : 'default-map'} // Clave única para forzar re-renderizado
            center={[-17.783, -63.182]} // Centrado en Santa Cruz de la Sierra, Bolivia
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "70vh" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <GeoJSON key={JSON.stringify(filteredData)} data={filteredData} />
          </MapContainer>
        ) : (
          <div className="text-center p-5">
            No hay datos de GeoJSON cargados. Seleccione un archivo.
          </div>
        )}
      </div>

      <div className="my-5">
        <label
          htmlFor="geojson-upload"
          className="block text-lg font-semibold mb-2 text-gray-700"
        >
          Cargar problematica (archivo GeoJSON o JSON):
        </label>
        <input
          id="geojson-upload"
          type="file"
          accept=".json,.geojson"
          onChange={handleFileUpload}
          className="block w-full cursor-pointer text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      <div className="my-5">
        <label
          htmlFor="date-filter"
          className="block text-lg font-semibold mb-2 text-gray-700"
        >
          Filtrar por fecha:
        </label>
        <input
          id="date-filter"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="block w-full cursor-pointer text-sm text-gray-500"
        />
      </div>

      <div className="mt-8">
        <GraficaBarra />
        <GraficaTorta/>
      </div>
    </div>
  );
};



// import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";
// import L from 'leaflet';
// import { useEffect, useState } from "react";
// import { GraficaBarra } from "../components/GraficaBarra";
// import 'leaflet/dist/leaflet.css';

// export const MapaPage = () => {
//   const [geoJsonData, setGeoJsonData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [fileLoaded, setFileLoaded] = useState(false);

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         try {
//           const jsonData = JSON.parse(e.target.result);
//           const clonedData = JSON.parse(JSON.stringify(jsonData)); // Deep clone
//           setGeoJsonData(null);
//           setTimeout(() => {
//             setGeoJsonData(clonedData);
//             setFileLoaded(true);
//           }, 100);
//         } catch (error) {
//           console.error("Error parsing JSON:", error);
//         }
//       };
//       reader.readAsText(file);
//     }
//   };

//   useEffect(() => {
//     const fetchDefaultGeoJson = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch("/data/Eventos.geojson");
//         if (!response.ok) {
//           throw new Error("No se pudo cargar el archivo GeoJSON por defecto");
//         }
//         const data = await response.json();
//         const clonedData = JSON.parse(JSON.stringify(data));
//         setGeoJsonData(clonedData);
//         setFileLoaded(false);
//       } catch (error) {
//         console.error("Error cargando el archivo GeoJSON por defecto:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (!geoJsonData && !fileLoaded) {
//       fetchDefaultGeoJson();
//     }
//   }, [geoJsonData, fileLoaded]);

//   const pointToLayer = (feature, latlng) => {
//     return L.circleMarker(latlng, {
//       radius: 8,
//       fillColor: "#FF0000",
//       color: "#FF0000",
//       weight: 1,
//       opacity: 1,
//       fillOpacity: 0.8
//     });
//   };

//   if (loading) {
//     return <div className="text-center mt-8">Cargando mapa...</div>;
//   }

//   return (
//     <div className="container mx-auto p-5">
//       <div className="map-section border rounded-lg shadow-md">
//         {geoJsonData ? (
//           <MapContainer
//             key={fileLoaded ? 'file-loaded-map' : 'default-map'}
//             center={[-17.783, -63.182]}
//             zoom={13}
//             scrollWheelZoom={false}
//             style={{ height: "70vh" }}
//           >
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution="&copy; OpenStreetMap contributors"
//             />
//             <GeoJSON data={geoJsonData} pointToLayer={pointToLayer} />
//           </MapContainer>
//         ) : (
//           <div className="text-center p-5">
//             No hay datos de GeoJSON cargados. Seleccione un archivo.
//           </div>
//         )}
//       </div>
//       <div className="mb-5">
//         <label
//           htmlFor="geojson-upload"
//           className="block text-lg font-semibold mb-2 text-gray-700"
//         >
//           Cargar problematica (archivo GeoJSON o JSON):
//         </label>
//         <input
//           id="geojson-upload"
//           type="file"
//           accept=".json,.geojson"
//           onChange={handleFileUpload}
//           className="block w-full cursor-pointer text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//         />
//       </div>

//       <div className="mt-8">
//         <GraficaBarra />
//       </div>
//     </div>
//   );
// };
