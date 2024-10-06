import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import { GraficaBarra } from "../components/GraficaBarra";
import 'leaflet/dist/leaflet.css';

export const MapaPage = () => {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileLoaded, setFileLoaded] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [filterTriggered, setFilterTriggered] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          setGeoJsonData(jsonData);
          setFileLoaded(true);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };
      reader.readAsText(file);
    }
  };

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
        setFileLoaded(false);
      } catch (error) {
        console.error("Error cargando el archivo GeoJSON por defecto:", error);
      } finally {
        setLoading(false);
      }
    };

    // Solo carga el archivo por defecto si no hay datos de GeoJSON y no se ha cargado un archivo
    if (!geoJsonData && !fileLoaded) {
      fetchDefaultGeoJson();
    }
  }, [geoJsonData, fileLoaded]);

  // Filtrar datos cada vez que se cambia la fecha seleccionada o se carga un nuevo GeoJSON
  // useEffect(() => {
  //   if (geoJsonData && (filterTriggered || selectedDate)) {
  //     const selectedDateObject = new Date(selectedDate);
  //     const formattedSelectedDate = selectedDateObject.toISOString().split('T')[0]; // Formato YYYY-MM-DD

  //     const filteredFeatures = geoJsonData.features.filter(feature => {
  //       const description = feature.properties.description;

  //       // Extraer la fecha de 'Hoy' de la descripción usando una expresión regular
  //       const hoyMatch = description.match(/FInicio\s*=\s*(\d{1,2}\/\d{1,2}\/\d{4})/);
  //       if (!hoyMatch) {
  //         return false; // Si no encontramos la fecha, no incluimos esta característica
  //       }

  //       const hoyDateStr = hoyMatch[1];
  //       const hoyDateParts = hoyDateStr.split('/');
  //       const hoyDate = new Date(`${hoyDateParts[2]}-${hoyDateParts[1]}-${hoyDateParts[0]}`); // Formato YYYY-MM-DD

  //       // Comparar la fecha extraída con la fecha seleccionada
  //       return hoyDate.toISOString().split('T')[0] === formattedSelectedDate;
  //     });

  //     // Crear nuevo objeto GeoJSON filtrado solo con las características
  //     console.log("filteredFeatures: ", filteredFeatures)
  //     const newFilteredGeoJson = {
  //       type: "FeatureCollection",
  //       features: filteredFeatures,
  //     };

  //     setGeoJsonData(newFilteredGeoJson);
  //     setFilterTriggered(false); // Resetear el estado de filtro
  //   } else {
  //     console.log("enterer else:")
  //     setGeoJsonData(geoJsonData);
  //   }
  // }, [geoJsonData, filterTriggered, selectedDate]);
  useEffect(() => {
    if (geoJsonData && filterTriggered) {
      const selectedDateObject = new Date(selectedDate);
      const formattedSelectedDate = selectedDateObject.toISOString().split('T')[0]; // Formato YYYY-MM-DD

      const filteredFeatures = geoJsonData.features.filter(feature => {
        const description = feature.properties.description;
        console.log("selected: ", formattedSelectedDate, "description: ", description);

        // Extraer la fecha de 'Hoy' de la descripción usando una expresión regular
        const hoyMatch = description.match(/FInicio\s*=\s*(\d{1,2}\/\d{1,2}\/\d{4})/);
        if (!hoyMatch) {
          return false; // Si no encontramos la fecha, no incluimos esta característica
        }

        const hoyDateStr = hoyMatch[1];
        const hoyDateParts = hoyDateStr.split('/');
        const hoyDate = new Date(`${hoyDateParts[2]}-${hoyDateParts[1]}-${hoyDateParts[0]}`); // Formato YYYY-MM-DD

        // Comparar la fecha extraída con la fecha seleccionada
        return hoyDate.toISOString().split('T')[0] === formattedSelectedDate;
      });

      console.log("Filtered Features: ", filteredFeatures); // Agregar este log para ver qué se filtra

      // Crear nuevo objeto GeoJSON filtrado solo con las características
      const newFilteredGeoJson = {
        type: "FeatureCollection",
        features: filteredFeatures,
      };

      setFilteredData(newFilteredGeoJson);
      setFilterTriggered(false); // Resetear el estado de filtro
    } else {
      // Si no hay fecha seleccionada o si no se ha activado el filtro, mostramos todos los datos
      setFilteredData(geoJsonData);
    }
  }, [geoJsonData, filterTriggered, selectedDate]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleFilterClick = () => {
    if (selectedDate) {
      setFilterTriggered(true); // Activar el filtro
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Cargando mapa...</div>;
  }

  return (
    <div className="container mx-auto p-5">
      <div className="map-section border rounded-lg shadow-md">
        {filteredData ? (
          // <MapContainer
          //   key={fileLoaded ? 'file-loaded-map' : 'default-map'}
          //   center={[-17.783, -63.182]}
          //   zoom={13}
          //   scrollWheelZoom={false}
          //   style={{ height: "70vh" }}
          // >
          //   <TileLayer
          //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          //     attribution="&copy; OpenStreetMap contributors"
          //   />
          //   <GeoJSON data={filteredData} />
          // </MapContainer>
          <MapContainer
            key={fileLoaded ? 'file-loaded-map' : 'default-map'}
            center={[-17.783, -63.182]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "70vh" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {filteredData && filteredData.features.length > 0 ? (
              <GeoJSON data={filteredData} />
            ) : (
              <div className="text-center p-5">
                No hay datos GeoJSON disponibles para la fecha seleccionada.
              </div>
            )}
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
        <button
          onClick={handleFilterClick}
          className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Filtrar
        </button>
      </div>

      <div className="mt-8">
        <GraficaBarra />
      </div>
    </div>
  );
};