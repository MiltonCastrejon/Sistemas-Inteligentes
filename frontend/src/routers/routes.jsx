import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Sidebar from "../components/Sidebar";
import Productos from "../pages/Productos";
import Ventas from "../pages/Ventas";
import Predicciones from "../pages/Prediciones";

// funcion para decodificar el token
function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

const Rutas = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const isValid = parseJwt(token).exp * 1000 > Date.now();
      setIsAuthenticated(isValid);
    }
  }, []);
  return (
    <Router>
      {isAuthenticated && <Sidebar isAuthenticated={isAuthenticated} />}
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/home" /> : <Login />}
        />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/productos"
          element={isAuthenticated ? <Productos /> : <Navigate to="/login" />}
        />
        <Route index element={<Navigate to="/login" />} />
        <Route
          path="/ventas"
          element={isAuthenticated ? <Ventas /> : <Navigate to="/login" />}
        />
        <Route
          path="/predicciones"
          element={
            isAuthenticated ? <Predicciones /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
};

export default Rutas;
