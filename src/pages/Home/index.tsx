/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { useContactStore, useUserStore } from "@/store/slices";

import AvatarIMG from "@/assets/user.png";
import { Contact } from "@/types";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { user } = useUserStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [newContactsList, setNewContactsList] = useState<Contact[]>([]);

  const { contacts } = useContactStore();

  useEffect(() => {
    if (searchTerm !== "") {
      if (contacts.filter((contact) => contact.name?.includes(searchTerm))) {
        setNewContactsList(
          contacts.filter((contact) => contact.name?.includes(searchTerm)),
        );
        return;
      }
      if (contacts.filter((contact) => contact.cpf?.includes(searchTerm))) {
        setNewContactsList(
          contacts.filter((contact) => contact.cpf?.includes(searchTerm)),
        );
        return;
      }
    } else {
      setNewContactsList(contacts);
    }
  }, [searchTerm]);

  return (
    <main className="flex h-screen w-full flex-col">
      <div className="flex w-full flex-row items-center justify-between px-4 py-2">
        <h3>Lista de Contatos</h3>
        <div className="flex flex-row items-center gap-2 rounded-2xl border border-zinc-600 p-1">
          <Avatar>
            <AvatarImage src={AvatarIMG} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span>{user?.name} </span>
        </div>
      </div>
      <div className="flex h-full w-full flex-row">
        <div className="relative flex h-full w-1/4 flex-col space-y-4 border p-2">
          <div className="flex flex-row items-center gap-2">
            <Input
              className="flex-1"
              placeholder="Digite o CPF ou Nome"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <Button onClick={() => {}}>+</Button>
          </div>
          <div className="flex h-full w-full flex-col overflow-y-auto">
            {newContactsList.length > 0 ? (
              newContactsList.map((newContact, index) => (
                <Card key={index} className="p-2">
                  <CardContent className="flex flex-col space-y-2 p-0">
                    <p>
                      <strong>Nome:</strong>
                      {newContact.name}{" "}
                    </p>
                    <p>
                      <strong>CPF:</strong>
                      {newContact.cpf}{" "}
                    </p>
                    <p>
                      <strong>Contato:</strong>
                      {newContact.phone}{" "}
                    </p>
                  </CardContent>
                  <CardFooter className="justify-between p-0">
                    <Button
                      className="bg-green-400 text-black hover:bg-green-500"
                      onClick={() => {}}
                    >
                      + Ver Mapa
                    </Button>
                    <Button
                      className="bg-red-400 text-black hover:bg-red-500"
                      onClick={() => {}}
                    >
                      - Excluir
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <span>Nenhum contato encontrado...</span>
            )}
          </div>
        </div>
        <div className="w-3/4 border"></div>
      </div>
    </main>
  );
}
