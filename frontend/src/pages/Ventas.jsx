import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Button,
  ButtonGroup,
  Select,
  SelectItem,
  Tab,
} from "@nextui-org/react";
import { useAppStore } from "../components/appStore";
import DetalleVentas from "./DetalleVentas.jsx";

export default function Ventas() {
  const updateOpen = useAppStore((state) => state.updateOpen);
  const open = useAppStore((state) => state.dopen);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [chartData, setChartData] = useState({
    bloques: [],
    total: 0,
  });

  useEffect(() => {
    fetchData(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const fetchData = async (page = 1, size = 25) => {
    try {
      const response = await fetch(
        `http://localhost:3000/ventas?page=${page}&size=${size}`
      );
      if (!response.ok) {
        throw new Error("Error en la petición" + response.statusText);
      }
      const data = await response.json();
      setChartData(data);
      setPageSize(size);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex bg-slate-50">
      <div className={`m-7 w-full ${open ? "ml-64" : "ml-24"} `}>
        <Card>
          <CardBody>
            <h2 className="text-3xl font-bold">Ventas</h2>
            <Card className="p-4">
              <div className="flex">
                <Input placeholder="Buscar" className="w-1/2" />
                <Button className="ml-2">Buscar</Button>
              </div>
            </Card>
            <Card className="mt-4">
              <DetalleVentas />
            </Card>
            <Table
              color="primary"
              aria-label="Example static collection table"
              topContent={
                <div className="flex w-full justify-center">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    total={Math.ceil(chartData.total / pageSize)}
                    page={currentPage}
                    initialPage={1}
                    onChange={handlePageChange}
                  />
                </div>
              }
              classNames={{
                wrapper: "min-h-[222px]",
              }}>
              <TableHeader>
                <TableColumn className="w-10 text-center text-sm font-extrabold">
                  CODIGO
                </TableColumn>
                <TableColumn className="w-36 text-center text-sm font-extrabold">
                  FECHA
                </TableColumn>
                <TableColumn className="text-center text-sm font-extrabold">
                  CLIENTE
                </TableColumn>
                <TableColumn className="w-4 text-center text-sm font-extrabold">
                  EMPLEADO
                </TableColumn>
                <TableColumn className="w-4 text-center text-sm font-extrabold">
                  TOTAL
                </TableColumn>
                <TableColumn className="w-4 text-center text-sm font-extrabold">
                  DOCUMENTO
                </TableColumn>
                <TableColumn className="w-4 text-center text-sm font-extrabold">
                  ACCIONES
                </TableColumn>
              </TableHeader>
              <TableBody>
                {Array.isArray(chartData.ventas) &&
                chartData.ventas.length > 0 ? (
                  chartData.ventas.map((venta) => (
                    <TableRow key={venta.idventa}>
                      <TableCell className="text-center">
                        {venta.idventa}
                      </TableCell>
                      <TableCell className="text-center">
                        {venta.fechaventa}
                      </TableCell>
                      <TableCell className="text-center">
                        {venta.nombre}
                      </TableCell>
                      <TableCell className="text-center">
                        {venta.nombrempleado}
                      </TableCell>
                      <TableCell className="text-center">
                        {venta.totalventa}
                      </TableCell>
                      <TableCell className="text-center">
                        {venta.descripciontd}
                      </TableCell>
                      <TableCell className="text-center">
                        <ButtonGroup>
                          <Button
                            auto
                            size="small"
                            onClick={() => updateOpen(true)}>
                            Editar
                          </Button>
                          <Button auto size="small" variant="error">
                            Eliminar
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8}>Cargando datos...</TableCell>
                    <TableCell colSpan={8}>Cargando datos...</TableCell>
                    <TableCell colSpan={8}>Cargando datos...</TableCell>
                    <TableCell colSpan={8}>Cargando datos...</TableCell>
                    <TableCell colSpan={8}>Cargando datos...</TableCell>
                    <TableCell colSpan={8}>Cargando datos...</TableCell>
                    <TableCell colSpan={8}>Cargando datos...</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
