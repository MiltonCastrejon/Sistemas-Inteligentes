import { useEffect, useState } from "react";
import { useAppStore } from "../components/appStore";

import {
  Card,
  CardBody,
  Input,
  Select,
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableColumn,
  TableCell,
} from "@nextui-org/react";
export default function Empleados() {
  const updateOpen = useAppStore((state) => state.updateOpen);
  const open = useAppStore((state) => state.dopen);
  return (
    <div className="flex bg-gray-100">
      <div className={`m-7 w-screen ${open ? "ml-64" : "ml-24"} `}>
        <Card className="p-5 shadow-2xl bg-white rounded-3xl mb-10">
          <CardBody>
            <h2 className="text-3xl font-bold mb-2">EMPLEADOS</h2>
            <div className="flex">
              <Input
                variant="faded"
                color="primary"
                className="p-2"
                label="NOMBRES"
                type="text"
              />
              <Input
                variant="faded"
                color="primary"
                className="p-2"
                label="APELLIDOS"
                type="text"
              />
            </div>

            <div className="flex">
              <Input
                variant="faded"
                color="primary"
                className="p-2"
                label="USUARIO"
                type="text"
              />
              <Input
                variant="faded"
                color="primary"
                className="p-2"
                label="CONTRASEÑA"
                type="text"
              />
            </div>
          </CardBody>
        </Card>
        <Table>
          <TableHeader>
            <TableColumn>Nombre</TableColumn>
            <TableColumn>Usuario</TableColumn>
            <TableColumn>Contraseña</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Direccion</TableCell>
              <TableCell>Telefono</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
