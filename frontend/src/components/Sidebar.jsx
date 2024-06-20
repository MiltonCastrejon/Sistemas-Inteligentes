import { useNavigate } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Image,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { useAppStore } from "./appStore";
import DashboardIcon from "../assets/icons/navbar/ic_analytics.svg";
import ClienteIcon from "../assets/icons/navbar/ic_user.svg";
import FormaPagoIcon from "../assets/icons/navbar/ic_formaPago.svg";
import ServicioIcon from "../assets/icons/navbar/ic_cart.svg";
import AdministradorIcon from "../assets/icons/navbar/ic_lock.svg";
import Logout from "../pages/Logout";
import IcLogo from "../assets/images/logo.png";

export default function MiniDrawer() {
  const navigate = useNavigate();
  const updateOpen = useAppStore((state) => state.updateOpen);
  const open = useAppStore((state) => state.dopen);
  const username = useAppStore((state) => state.username);

  return (
    <>
      <div className="bg-gray-100 fixed">
        <button
          type="button"
          className="text-black p-4 rounded-full hover:bg-yellow--100 focus:outline-none  focus:border-green-100"
          onClick={() => updateOpen(!open)}>
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.5 8H25.5M4.5 15H25.5M4.5 22H25.5"
              stroke="#637381"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className={`flex h-screen ${open ? "bg-white-700" : ""}`}>
          <div
            className={`transition-all duration-300 ${
              open ? "w-56" : "w-16"
            } overflow-hidden`}>
            {" "}
            <div
              className={`m-1 flex p-3 items-center justify-between ${
                open
                  ? "bg-primary rounded-2xl shadow-2xl"
                  : " rounded-full shadow-none"
              }`}>
              {open && (
                <div className="flex items-center">
                  <Image
                    isBlurred
                    width={40}
                    src={IcLogo}
                    alt="LOGO"
                    className="m-2"
                  />
                  <div>
                    <p className="hidden sm:block font-bold mx-2">FerreCast</p>
                  </div>
                </div>
              )}
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="primary"
                    name={username || "Usuario"}
                    size="sm"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-bold text-base">Cuenta: </p>
                    <p className="font-semibold text-base">
                      {username || "Usuario"}
                    </p>
                  </DropdownItem>
                  <DropdownItem key="logout" color="success" as={Logout}>
                    Cerrar Sesión
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className="overflow-y-auto h-screen">
              <button
                className="w-full py-4 px-4 text-left transition-colors duration-300 ease-in-out hover:bg-primary-100 rounded-lg"
                onClick={() => navigate("/home")}>
                <img
                  src={DashboardIcon}
                  alt=""
                  className="inline-block w-7 h-7 mr-3"
                />
                {open && <span className="text-sm font-bold">Dashboard</span>}
              </button>
              <button
                className="w-full py-4 px-4 text-left transition-colors duration-300 ease-in-out hover:bg-primary-100 rounded-lg"
                onClick={() => navigate("/productos")}>
                <img
                  src={ServicioIcon}
                  alt=""
                  className="inline-block w-7 h-7 mr-3"
                />
                {open && <span className="text-sm font-bold">Productos</span>}
              </button>
              <button
                className="w-full py-4 px-4 text-left transition-colors duration-300 ease-in-out hover:bg-primary-100 rounded-lg"
                onClick={() => navigate("/clientes")}>
                <img
                  src={DashboardIcon}
                  alt=""
                  className="inline-block w-7 h-7 mr-3"
                />
                {open && <span className="text-sm font-bold">Clientes</span>}
              </button>
              <button
                className="w-full py-4 px-4 text-left transition-colors duration-300 ease-in-out hover:bg-primary-100 rounded-lg"
                onClick={() => navigate("/empleados")}>
                <img
                  src={ClienteIcon}
                  alt=""
                  className="inline-block w-7 h-7 mr-3 "
                />
                {open && <span className="text-sm font-bold">Empleados</span>}
              </button>
              <button
                className=" w-full py-4 px-4 text-left transition-colors duration-300 ease-in-out hover:bg-primary-100 rounded-lg"
                onClick={() => navigate("/servicios")}>
                <img
                  src={ServicioIcon}
                  alt=""
                  className="inline-block w-7 h-7 mr-3"
                />
                {open && <span className="text-sm font-bold">Servicios</span>}
              </button>

              <button
                className="w-full py-4 px-4 text-left transition-colors duration-300 ease-in-out hover:bg-primary-100 rounded-lg"
                onClick={() => navigate("/formapago")}>
                <img
                  src={FormaPagoIcon}
                  alt=""
                  className="inline-block w-7 h-7 mr-3"
                />
                {open && (
                  <span className="text-sm font-bold">Formas de Pago</span>
                )}
              </button>
              <button
                className="w-full py-4 px-4 text-left transition-colors duration-300 ease-in-out hover:bg-primary-100 rounded-lg"
                onClick={() => navigate("/ventas")}>
                <img
                  src={ServicioIcon}
                  alt=""
                  className="inline-block w-7 h-7 mr-3"
                />
                {open && <span className="text-sm font-bold">Ventas</span>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
