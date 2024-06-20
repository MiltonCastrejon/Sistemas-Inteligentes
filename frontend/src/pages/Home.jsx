import React from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import IconVentas from "../assets/icons/glass/ic_glass_bag.png";
import IconProductos from "../assets/icons/glass/ic_glass_buy.png";
import IconEmpleados from "../assets/icons/glass/ic_glass_users.png";
import IconTotal from "../assets/icons/glass/ic_glass_message.png";
import CountUp from "react-countup";
import { useAppStore } from "../components/appStore";
import Predicciones from "./Prediciones";

export default function Home() {
  const updateOpen = useAppStore((state) => state.updateOpen);
  const open = useAppStore((state) => state.dopen);
  const username = useAppStore((state) => state.username);
  return (
    <>
      <div className="flex bg-slate-100 h-screen">
        <div className={`m-7 w-screen ${open ? "ml-64" : "ml-24"} `}>
          <h1 className="text-3xl font-bold">
            Hola Bienvenido de nuevo {username} 👋
          </h1>
          <div className="flex gap-6 mt-6 items-stretch">
            <Card className="flex-row items-center p-6 flex-grow">
              <div className="w-20">
                <img src={IconVentas} alt="" className="w-full h-full" />
              </div>
              <CardBody>
                <p className="text-3xl font-bold">
                  {" "}
                  <CountUp delay={0.2} end={100} duration={0.4} />
                </p>
                <p className="text-base text-gray-500">Ventas del mes</p>
              </CardBody>
            </Card>
            <Card className="flex-row items-center p-5 flex-grow">
              <div className="w-20">
                <img src={IconProductos} alt="" className="w-full h-full" />
              </div>
              <CardBody>
                <p className="text-3xl font-bold">
                  {" "}
                  <CountUp delay={0.2} end={100} duration={0.4} />
                </p>
                <p className="text-gray-500">Productos</p>
              </CardBody>
            </Card>
            <Card className="flex-row items-center p-5 flex-grow">
              <div className="w-20">
                <img src={IconEmpleados} alt="" className="w-full h-full" />
              </div>
              <CardBody>
                <p className="text-3xl font-bold">
                  {" "}
                  <CountUp delay={0.2} end={100} duration={0.4} />
                </p>
                <p className="text-base text-gray-500">Empleados</p>
              </CardBody>
            </Card>
            <Card className="flex-row items-center p-6 flex-grow">
              <div className="w-20">
                <img src={IconTotal} alt="" className="w-full h-full" />
              </div>
              <CardBody>
                <p className="text-3xl font-bold">
                  S/ <CountUp delay={0.2} end={100} duration={0.4} />
                </p>
                <p className="text-base text-gray-500">Total de ventas</p>
              </CardBody>
            </Card>
          </div>
          <Predicciones></Predicciones>
        </div>
      </div>
    </>
  );
}
