import React, { useState } from "react";
import "../styles/Login.css";
import { useAppStore } from "../components/appStore";
import Logo from "../assets/TiendasMass.svg";
import bg from "../assets/massbg.jpg";
import { Card, Input, Button, Image, CardBody } from "@nextui-org/react";
import { EyeFilledIcon } from "../components/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../components/icons/EyeSlashFilledIcon";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const setUserName = useAppStore((state) => state.setUserName);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      usuario: usuario,
      password: password,
    };

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.token) {
          localStorage.setItem("token", result.token);
          const decodedToken = jwtDecode(result.token);
          setUserName(decodedToken.nombre);
          setLoginSuccessful(true);
          window.location.href = "/home";
        } else {
          setLoginSuccessful(false);
          setErrorMessage("Contraseña o usuario incorrecto");
          setTimeout(() => {
            setErrorMessage("");
          }, 3000);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="Container flex items-center justify-center h-screen">
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
          isBlurred: true,
        }}
      />
      <Card className="bg-yellow-500 rounded-3xl flex flex-row">
        <CardBody className="items-center justify-center p-11">
          <h1 className="text-4xl font-extrabold text-blue-900">Bienvenido</h1>
          <Image isBlurred src={Logo} alt="LOGO" width={200} className="mt-9" />
          <p className="text-blue-900 font-bold text-center pt-6 text-xl">
            ¡los mejores precios, cerca de ti!
          </p>

          <p className="text-blue-900 text-center pt-12">
            Inicia sesión para continuar con la administración de la tienda
          </p>
        </CardBody>
        <div>
          <Card className="items-center m-12 p-10 pt-20 pb-20 rounded-3xl ">
            <h1 className="my-5 text-3xl font-bold">INICIAR SESIÓN</h1>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <form
              className="my-5 flex flex-col items-center"
              onSubmit={handleLogin}>
              <Input
                color="primary"
                className="py-2 px-2 w-80"
                name="usuario"
                type="text"
                label="Usuario"
                autoFocus
                autoComplete="username"
                onChange={(event) => {
                  setUsuario(event.target.value);
                }}
              />
              <Input
                color="primary"
                label="Contraseña"
                name="password"
                autoComplete="current-password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}>
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                className="max-w-xs py-2 px-2"
              />

              <Button
                className="justify-center my-5 bg-gradient-to-br from-sky-700 to-sky-900 text-white shadow-lg w-48"
                variant="shadow"
                color="warning"
                type="submit">
                Iniciar Sesión
              </Button>
            </form>
          </Card>
        </div>
      </Card>
    </div>
  );
}
