import React from "react";
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
import Logout from "../pages/Logout";
import IcLogo from "../assets/images/logo.png";
import { useAppStore } from "./appStore";

export default function AppNavbar() {
  const updateOpen = useAppStore((state) => state.updateOpen);
  const dopen = useAppStore((state) => state.dopen);
  const username = useAppStore((state) => state.username);

  return (
    <Navbar className="px-8" maxWidth="full">
      <div>
        <NavbarBrand className="mr-7">
          <button
            type="button"
            className="text-black p-2 rounded-full hover:bg-green-100 focus:outline-none  focus:border-green-100"
            onClick={() => updateOpen(!dopen)}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.5 8H25.5M4.5 15H25.5M4.5 22H25.5"
                stroke="#637381"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <Image isBlurred width={50} src={IcLogo} alt="LOGO" className="m-2" />
          <div>
            <p className="hidden sm:block font-bold text-inherit mx-5">
              FerreCast
            </p>
          </div>
        </NavbarBrand>
      </div>
      <div as="div" className="items-center" justify="end">
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
              <p className="font-semibold text-base">{username || "Usuario"}</p>
            </DropdownItem>
            <DropdownItem key="logout" color="success" as={Logout}>
              Cerrar Sesión
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </Navbar>
  );
}
