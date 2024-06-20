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
import Clientes from "../pages/Clientes";
import Empleados from "../pages/Empleados";

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
      localStorage.setItem("isAuthenticated", isValid);
    }
  }, []);

  return (
    <Router>
      {localStorage.getItem("isAuthenticated") === "true" && (
        <Sidebar isAuthenticated={isAuthenticated} />
      )}
      <Routes>
        <Route
          path="/login"
          element={
            localStorage.getItem("isAuthenticated") === "true" ? (
              <Navigate to="/home" />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/home"
          element={
            localStorage.getItem("isAuthenticated") === "true" ? (
              <Home />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/productos"
          element={
            localStorage.getItem("isAuthenticated") === "true" ? (
              <Productos />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route index element={<Navigate to="/login" />} />
        <Route
          path="/ventas"
          element={
            localStorage.getItem("isAuthenticated") === "true" ? (
              <Ventas />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        
        <Route
          path="/clientes"
          element={
            localStorage.getItem("isAuthenticated") === "true" ? (
              <Clientes />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/empleados"
          element={
            localStorage.getItem("isAuthenticated") === "true" ? (
              <Empleados />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default Rutas;
