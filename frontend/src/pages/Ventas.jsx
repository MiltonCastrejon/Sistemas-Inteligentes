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
  const [nuevaVenta, setNuevaVenta] = useState({
    idcliente: "",
    idempleado: "",
    idtipodocumento: "",
    detalles: [],
  });
  const [nuevoProducto, setNuevoProducto] = useState({
    idproducto: "",
    cantidad: 1,
    preciounitario: 0,
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaVenta({ ...nuevaVenta, [name]: value });
  };

  const handleProductoChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto({ ...nuevoProducto, [name]: value });
  };

  const handleAddProducto = () => {
    setNuevaVenta({
      ...nuevaVenta,
      detalles: [...nuevaVenta.detalles, nuevoProducto],
    });
    setNuevoProducto({ idproducto: "", cantidad: 1, preciounitario: 0 });
  };

  const handleSubmitVenta = async () => {
    try {
      const response = await fetch("http://localhost:3000/ventas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaVenta),
      });
      if (!response.ok) {
        throw new Error("Error en la petición" + response.statusText);
      }
      fetchData(currentPage, pageSize); // Refresh the data
      setNuevaVenta({
        idcliente: "",
        idempleado: "",
        idtipodocumento: "",
        detalles: [],
      });
    } catch (error) {
      console.log(error);
    }
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
            <Card className="mt-4 p-4">
              <h3 className="text-xl font-bold mb-4">Añadir Nueva Venta</h3>
              <div className="mb-4">
                <Input
                  name="idcliente"
                  label="ID Cliente"
                  value={nuevaVenta.idcliente}
                  onChange={handleInputChange}
                  className="mb-2"
                />
                <Input
                  name="idempleado"
                  label="ID Empleado"
                  value={nuevaVenta.idempleado}
                  onChange={handleInputChange}
                  className="mb-2"
                />
                <Input
                  name="idtipodocumento"
                  label="ID Tipo Documento"
                  value={nuevaVenta.idtipodocumento}
                  onChange={handleInputChange}
                  className="mb-2"
                />
              </div>
              <h4 className="text-lg font-bold mb-2">Productos</h4>
              <div className="mb-4 flex">
                <Input
                  name="idproducto"
                  label="ID Producto"
                  value={nuevoProducto.idproducto}
                  onChange={handleProductoChange}
                  className="mb-2 mr-2"
                />
                <Input
                  name="cantidad"
                  label="Cantidad"
                  type="number"
                  value={nuevoProducto.cantidad}
                  onChange={handleProductoChange}
                  className="mb-2 mr-2"
                />
                <Input
                  name="preciounitario"
                  label="Precio Unitario"
                  type="number"
                  value={nuevoProducto.preciounitario}
                  onChange={handleProductoChange}
                  className="mb-2 mr-2"
                />
                <Button onClick={handleAddProducto} className="mb-2">
                  Añadir Producto
                </Button>
              </div>
              <Button onClick={handleSubmitVenta} className="mt-2">
                Crear Venta
              </Button>
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
              <TableBody emptyContent={"No hay datos para mostrar."}>
                {Array.isArray(chartData.ventas) && chartData.ventas.length > 0
                  ? chartData.ventas.map((venta) => (
                      <TableRow key={venta.idventa}>
                        <TableCell className="text-center">
                          {venta.idventa}
                        </TableCell>
                        <TableCell className="text-center">
                          {venta.fechaventa}
                        </TableCell>
                        <TableCell className="text-center">
                          {venta.nombrecliente}
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
                  : null}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
