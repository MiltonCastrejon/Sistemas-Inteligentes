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
export default function Clientes() {
  const updateOpen = useAppStore((state) => state.updateOpen);
  const open = useAppStore((state) => state.dopen);
  return (
    <div className="flex bg-gray-100">
      <div className={`m-7 w-screen ${open ? "ml-64" : "ml-24"} `}>
        <Card className="p-5 shadow-2xl bg-white rounded-3xl mb-10">
          <CardBody>
            <h2 className="text-3xl font-bold mb-2">CLIENTES</h2>
            <div className="flex">
              <Input
                variant="faded"
                color="primary"
                className="p-2"
                label="NOMBRE"
                type="text"
              />
              <Input
                variant="faded"
                color="primary"
                className="p-2"
                label="DIRECCION"
                type="text"
              />
              <Input
                variant="faded"
                color="primary"
                className="p-2"
                label="TELEFONO"
                type="text"
              />
            </div>

            <div className="flex">
              <Select
                variant="faded"
                color="primary"
                className="p-2"
                label="Tipo de Documento"
                type="text"
              />
              <Input
                variant="faded"
                color="primary"
                className="p-2"
                label="NUMERO DE DOCUMENTO"
                type="text"
              />
            </div>
          </CardBody>
        </Card>
        <Table>
          <TableHeader>
            <TableColumn>Nombre</TableColumn>
            <TableColumn>Direccion</TableColumn>
            <TableColumn>Telefono</TableColumn>
            <TableColumn>Documento</TableColumn>
            <TableColumn>Numero de Documento</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Direccion</TableCell>
              <TableCell>Telefono</TableCell>
              <TableCell>Documento</TableCell>
              <TableCell>Numero de Documento</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
