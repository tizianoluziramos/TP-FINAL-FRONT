import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Cotizador from "./components/Cotizador";
import Historial from "./components/Historial";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div
        className="historial"
        onClick={() => navigate("/historial")}
        style={{ cursor: "pointer" }}
      >
        <span title="Ver Historial">📋 </span>
      </div>
      <h1 className="center separador">Seguros del hogar 🏡</h1>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Header />
              <Cotizador />
            </div>
          }
        />
        <Route
          path="/historial"
          element={
            <>
              <Historial />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
