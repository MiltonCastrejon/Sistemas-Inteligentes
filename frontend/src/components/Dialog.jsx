import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  buttonGroup,
  useDisclosure,
  ButtonGroup,
} from "@nextui-org/react";
import { DeleteIcon } from "./icons/DeleteIcon.jsx";

export default function Dialog({ onDelete }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ButtonGroup></ButtonGroup>
      <Button
        color="danger"
        variant="shadow"
        radius="sm"
        onPress={() => onOpen()}
      >
        <span className="text-lg text-white cursor-pointer active:opacity-50">
          <DeleteIcon />
        </span>
      </Button>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Eliminar Bloque
          </ModalHeader>
          <ModalBody>
            <p>¿Desea eliminar este bloque?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" variant="shadow" onPress={onClose}>
              Cancelar
            </Button>
            <Button
              color="danger"
              variant="shadow"
              onPress={() => {
                onDelete();
                onClose();
              }}
            >
              Aceptar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
