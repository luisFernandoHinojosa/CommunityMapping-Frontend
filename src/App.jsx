// import { MapaPage } from './pages/MapaPage';
// import './App.css'
// function App() {
//   return (
//     <MapaPage />
//   );
// }
// export default App;

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './App.css'; // Estilos generales
import { MapaPage } from "./pages/MapaPage";
import ComparativaPage from "./pages/ComparativaPage";
import EventoDetallePage from "./pages/EventoDetallePage";

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header py-6 fixed w-full z-20">
          <nav className="app-nav">
            <ul>
              <li><Link to="/">Mapa</Link></li>
              <li><Link to="/comparativa">Comparativa</Link></li>
              <li><Link to="/detalle">Detalles del Evento</Link></li>
            </ul>
          </nav>
        </header>

        <main className="app-content z-10 mt-16">
          <Routes>
            <Route path="/" element={<MapaPage />} />
            <Route path="/comparativa" element={<ComparativaPage />} />
            <Route path="/detalle" element={<EventoDetallePage />} />
          </Routes>
        </main>


      </div>
    </Router>
  );
}

export default App;
