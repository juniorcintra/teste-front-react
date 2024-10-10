import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Contact } from "@/types";

interface CardContactProps {
  contact: Contact;
  setContactSelected: (contact: Contact) => void;
  setCenteredContact: (value: boolean) => void;
  handleEdit: (contact: Contact) => void;
  handleDeleteContact: (id: number) => void;
}

export default function CardContact({
  contact,
  setContactSelected,
  setCenteredContact,
  handleEdit,
  handleDeleteContact,
}: CardContactProps) {
  return (
    <Card className="space-y-2 p-2">
      <CardContent className="flex flex-col space-y-2 p-0">
        <p className="capitalize">
          <strong className="mr-1">Nome:</strong>
          {contact.name}{" "}
        </p>
        <p>
          <strong className="mr-1">CPF:</strong>
          {contact.cpf}{" "}
        </p>
        <p>
          <strong className="mr-1">Contato:</strong>
          {contact.phone}{" "}
        </p>
      </CardContent>
      <CardFooter className="justify-between p-0">
        <Button
          className="bg-green-400 text-black hover:bg-green-500"
          onClick={() => {
            setContactSelected(contact);
            setCenteredContact(true);
          }}
        >
          Ver Mapa
        </Button>
        <Button
          className="bg-blue-400 text-black hover:bg-blue-500"
          onClick={() => {
            handleEdit(contact);
          }}
        >
          Editar
        </Button>
        <Button
          className="bg-red-400 text-black hover:bg-red-500"
          onClick={() => handleDeleteContact(contact?.id ?? 0)}
        >
          Excluir
        </Button>
      </CardFooter>
    </Card>
  );
}
