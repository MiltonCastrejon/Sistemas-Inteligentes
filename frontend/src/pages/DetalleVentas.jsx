import React from "react";
import { Button, Card, CardBody ,Input} from "@nextui-org/react";

export default function DetalleVentas() {
  return (
    <div>
      <Card>
        <CardBody>
          <h1>Detalle de ventas</h1>
          <Button>hola</Button>
          <Input
            variant="bordered"
            className="px-2"
            label="NOMBRE"
            type="text"
          />
        </CardBody>
      </Card>
    </div>
  );
}
