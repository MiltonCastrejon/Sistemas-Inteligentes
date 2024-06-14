import { useEffect, useState } from "react";
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
} from "@nextui-org/react";
import { useAppStore } from "../components/appStore";
import Dialog from "../components/Dialog";
import { EditIcon } from "../components/icons/EditIcon";

export default function Productos() {
  const updateOpen = useAppStore((state) => state.updateOpen);
  const open = useAppStore((state) => state.dopen);
  const [chartData, setChartData] = useState({
    bloques: [],
    total: 0,
  });

  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [idcategoria, setCategoria] = useState([4]);
  const [idmarca, setMarca] = useState([2]);
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");

  const [categoriaOptions, setCategoriaOptions] = useState([]);
  const [marcaOptions, setMarcaOptions] = useState([]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchData(newPage, pageSize);
  };

  useEffect(() => {
    fetchData(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const fetchData = async (page = 1, Size = 30) => {
    try {
      const response = await fetch(
        `http://localhost:3000/productos?page=${page}&size=${Size}`
      );
      if (!response.ok) {
        throw new Error("Error al obtener los datos: " + response.statusText);
      }
      const data = await response.json();
      setChartData(data);
      setPageSize(Size);
    } catch (error) {
      setError("Error al obtener los datos");
    }
  };
  const handleSave = async () => {
    try {
      if (
        !nombre ||
        !descripcion ||
        !idcategoria ||
        !idmarca ||
        !precio ||
        !stock
      ) {
        return alert("Faltan campos por llenar");
      }
      const response = await fetch("http://localhost:3000/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          nombre,
          descripcion,
          idcategoria,
          idmarca,
          precio,
          stock,
        }),
      });
      if (response.ok) {
        const updatedTotalPages = Math.ceil((chartData.total + 1) / pageSize);

        if (currentPage <= updatedTotalPages) {
          fetchData(currentPage, pageSize);
        } else {
          setCurrentPage(updatedTotalPages);
        }
        setNombre("");
        setDescripcion("");
        setCategoria("");
        setMarca("");
        setPrecio("");
        setStock("");
      } else {
        alert("Error al guardar los datos");
        setError("Error al guardar los datos");
      }
    } catch (error) {
      setError("Error al guardar los datos", error.message);
    }
  };

  const obtenerCategorias = async () => {
    try {
      const response = await fetch("http://localhost:3000/categorias");

      if (!response.ok) {
        throw new Error("Error al obtener los datos: " + response.statusText);
      }
      const data = await response.json();
      setCategoriaOptions(data.categorias);
    } catch (error) {
      setError("Error al obtener los datos");
    }
  };

  const obtenerMarcas = async () => {
    try {
      const response = await fetch("http://localhost:3000/marcas");
      if (!response.ok) {
        throw new Error("Error al obtener los datos: " + response.statusText);
      }
      const data = await response.json();
      setMarcaOptions(data.marcas);
    } catch (error) {
      setError("Error al obtener los datos");
    }
  };
  useEffect(() => {
    obtenerCategorias();
    obtenerMarcas();
  }, []);

  const handleEdit = async (idproducto) => {
    try {
      const response = await fetch(
        `http://localhost:3000/productos/${idproducto}`
      );
      const productData = await response.json();

      if (response.ok) {
        setEditMode(true);
        setEditId(productData.idproducto);
        setNombre(productData.nombre);
        setDescripcion(productData.descripcion);
        setCategoria(productData.idcategoria);
        setMarca(productData.idmarca);
        setPrecio(productData.precio);
        setStock(productData.stock);
        console.log(productData.nombre);
        console.log(productData.descripcion);
        console.log("categori:", productData.idcategoria);
        console.log("marca", productData.idmarca);
        console.log(productData.precio);
        console.log(productData.stock);
      } else {
        alert("Error al obtener los datos del producto");
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/productos/${editId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre,
            descripcion,
            idcategoria,
            idmarca,
            precio,
            stock,
          }),
        }
      );
      if (response.ok) {
        fetchData(currentPage, pageSize);
        console.log();
        setEditMode(false);
        setEditId(null);
        setNombre("");
        setDescripcion("");
        setCategoria("");
        setMarca("");
        setPrecio("");
        setStock("");
      } else {
        alert("Porfavor selecciona la categoria y marca");
      }
    } catch (error) {
      setError("Error al actualizar los datos");
    }
  };

  const handleDelete = async (idproducto) => {
    try {
      const response = await fetch(
        `http://localhost:3000/productos/${idproducto}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const updatedTotalPages = Math.ceil((chartData.total - 1) / pageSize);

        if (currentPage <= updatedTotalPages) {
          fetchData(currentPage, pageSize);
        } else {
          setCurrentPage(updatedTotalPages);
        }
      } else {
        alert("Error al eliminar los datos");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex bg-gray-100">
      <div className={`m-7 w-screen ${open ? "ml-64" : "ml-24"} `}>
        <Card className="p-5 shadow-2xl bg-white rounded-3xl mb-10">
          <CardBody>
            <h2 className="text-3xl font-bold mb-2">PRODUCTOS</h2>
            <div className="flex">
              <Input
                variant="faded"
                color="primary"
                className="p-2"
                label="NOMBRE"
                type="text"
                value={nombre}
                onChange={(value) => setNombre(value.target.value)}
              />
              <Input
                variant="faded"
                color="primary"
                className="p-2"
                label="DESCRIPCION"
                type="text"
                value={descripcion}
                onChange={(value) => setDescripcion(value.target.value)}
              />
            </div>
            <div className="flex">
              <Select
                variant="faded"
                color="primary"
                className="p-2"
                label="CATEGORIA"
                onChange={(e) => setCategoria(e.target.value)}
                selectedKeys={[idcategoria]}>
                {categoriaOptions.map((categoria) => (
                  <SelectItem key={categoria.idcategoria}>
                    {categoria.descripcion}
                  </SelectItem>
                ))}
              </Select>
              <Select
                variant="faded"
                color="primary"
                className="p-2"
                label="MARCA"
                onChange={(e) => setMarca(e.target.value)}
                selectedKeys={[idmarca]}>
                {marcaOptions.map((marca) => (
                  <SelectItem key={marca.idmarca} value={marca.idmarca}>
                    {marca.descripcion}
                  </SelectItem>
                ))}
              </Select>
              <Input
                variant="faded"
                color="primary"
                className="p-2"
                label="PRECIO"
                type="number"
                value={precio}
                onChange={(value) => setPrecio(value.target.value)}
              />
              <Input
                variant="faded"
                color="primary"
                className="p-2"
                label="STOCK"
                type="number"
                value={stock}
                onChange={(value) => setStock(value.target.value)}
              />
            </div>
          </CardBody>
          {editMode && (
            <ButtonGroup className="mr-5 my-4">
              <Button
                className="justify-center bg-gradient-to-br from-red-500 to-red-700 text-white shadow-lg w-40"
                variant="shadow"
                color="danger"
                onClick={() => {
                  setEditMode(false);
                  setNombre("");
                  setDescripcion("");
                  setCategoria("");
                  setMarca("");
                  setPrecio("");
                  setStock("");
                  setError("");
                }}>
                Cancelar
              </Button>
              <Button
                className="justify-center bg-gradient-to-br from-green-500 to-green-700 text-white shadow-lg w-40"
                variant="shadow"
                color="success"
                onClick={handleUpdate}>
                Guardar Cambios
              </Button>
            </ButtonGroup>
          )}
          {!editMode && (
            <div className="w-full flex justify-end">
              <Button
                className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg w-32 mr-7"
                variant="shadow"
                color="warning"
                onClick={handleSave}>
                Guardar
              </Button>
            </div>
          )}
        </Card>
        <Table
          color="primary"
          radius="lg"
          removeWrapper
          className=" p-10 shadow-2xl bg-white rounded-3xl"
          topContent={
            <div className="flex w-full justify-center">
              <Pagination
                showControls
                showShadow
                color="warning"
                variant="bordered"
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
              NOMBRE
            </TableColumn>
            <TableColumn className="text-center text-sm font-extrabold">
              DESCRIPCION
            </TableColumn>
            <TableColumn className="w-4 text-center text-sm font-extrabold">
              CATEGORIA
            </TableColumn>
            <TableColumn className="w-4 text-center text-sm font-extrabold">
              MARCA
            </TableColumn>
            <TableColumn className="w-4 text-center text-sm font-extrabold">
              PRECIO
            </TableColumn>
            <TableColumn className="w-4 text-center text-sm font-extrabold">
              STOCK
            </TableColumn>
            <TableColumn className="w-4 text-center text-sm font-extrabold">
              ACCIONES
            </TableColumn>
          </TableHeader>
          <TableBody>
            {Array.isArray(chartData.productos) &&
            chartData.productos.length > 0 ? (
              chartData.productos.map((prop, index) => (
                <TableRow key={index}>
                  <TableCell className="">{prop.idproducto}</TableCell>
                  <TableCell className="">{prop.nombre}</TableCell>
                  <TableCell className="">{prop.descripcion}</TableCell>
                  <TableCell className="">{prop.categoria}</TableCell>
                  <TableCell className="">{prop.marca}</TableCell>
                  <TableCell className="">{prop.precio}</TableCell>
                  <TableCell className="">{prop.stock}</TableCell>
                  <TableCell className="text-center">
                    <ButtonGroup fullWidth>
                      <Button
                        variant="shadow"
                        color="primary"
                        onClick={() =>
                          handleEdit(
                            prop.idproducto,
                            prop.nombre,
                            prop.descripcion,
                            prop.idcategoria,
                            prop.idmarca,
                            prop.precio,
                            prop.stock
                          )
                        }>
                        <span className="text-lg text-white cursor-pointer active:opacity-50">
                          <EditIcon />
                        </span>
                      </Button>
                      <span>
                        <Dialog
                          onDelete={() => handleDelete(prop.idproducto)}
                        />
                      </span>
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
                <TableCell colSpan={8}>Cargando datos...</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
