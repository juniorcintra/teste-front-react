import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useContactStore } from "@/store/slices";

import { Contact } from "@/types";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";
import Header from "@/components/Header";
import CardContact from "@/components/CardContact";
import CreateEditContact from "@/components/CreateEditContact";

export default function Home() {
  const { contacts, setContacts, setContactSelected, contact } =
    useContactStore();

  const [searchTerm, setSearchTerm] = useState("");

  const [newContactsList, setNewContactsList] = useState<Contact[]>([]);
  const [centeredContact, setCenteredContact] = useState(false);
  const [orderedList, setOrderedList] = useState("asc");
  const [dataEdit, setDataEdit] = useState<Contact>();
  const [idContato, setIdContato] = useState(0);

  const [showModalFormContact, setShowModalFormContact] = useState(false);

  useEffect(() => {
    if (searchTerm !== "") {
      if (
        contacts.some((contact) =>
          contact.name?.toUpperCase().includes(searchTerm.toUpperCase()),
        )
      ) {
        setNewContactsList(
          contacts.filter((contact) =>
            contact.name?.toUpperCase().includes(searchTerm.toUpperCase()),
          ),
        );
        return;
      } else {
        setNewContactsList([]);
      }
      if (contacts.some((contact) => contact.cpf?.includes(searchTerm))) {
        setNewContactsList(
          contacts.filter((contact) => contact.cpf?.includes(searchTerm)),
        );
        return;
      } else {
        setNewContactsList([]);
      }
    } else {
      setNewContactsList(contacts);
    }
  }, [searchTerm, contacts]);

  const handleDeleteContact = (id: number) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const handleEdit = (contact: Contact) => {
    setShowModalFormContact(!showModalFormContact);
    setDataEdit(contact);
    setIdContato(contact?.id ?? 0);
  };

  return (
    <main className="flex h-screen w-full flex-col">
      <Header />
      <div className="flex h-full w-full flex-row">
        <div className="relative flex h-full w-1/4 flex-col space-y-4 border p-2">
          <div className="flex flex-row items-center gap-2">
            <Input
              className="flex-1"
              placeholder="Digite o CPF ou Nome"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <Button onClick={() => setShowModalFormContact(true)}>+</Button>
          </div>
          <div className="flex flex-row items-center gap-2">
            Ordenar:
            <Button onClick={() => setOrderedList("asc")}>
              <ArrowDownAZ />
            </Button>
            <Button onClick={() => setOrderedList("desc")}>
              <ArrowUpAZ />
            </Button>
          </div>
          <div className="flex h-full w-full flex-col space-y-2 overflow-y-auto">
            {newContactsList.length > 0 ? (
              newContactsList
                ?.slice()
                .sort((a, b) => {
                  const nameA = a.name || "";
                  const nameB = b.name || "";

                  return orderedList === "asc"
                    ? nameA.localeCompare(nameB)
                    : nameB.localeCompare(nameA);
                })
                .map((newContact, index) => (
                  <CardContact
                    key={index}
                    contact={newContact}
                    setContactSelected={setContactSelected}
                    setCenteredContact={setCenteredContact}
                    handleEdit={handleEdit}
                    handleDeleteContact={handleDeleteContact}
                  />
                ))
            ) : (
              <span>Nenhum contato encontrado...</span>
            )}
          </div>
        </div>
        <div className="w-3/4 border">
          <APIProvider apiKey={"AIzaSyCzGu7EfsUahVfwppcy9HKpZC-XChvLtos"}>
            <Map
              style={{ width: "100%", height: "100%" }}
              defaultZoom={centeredContact ? 15 : 10}
              gestureHandling={"greedy"}
              disableDefaultUI={true}
              center={
                centeredContact
                  ? {
                      lat: Number(contact?.address?.lat),
                      lng: Number(contact?.address?.long),
                    }
                  : null
              }
              onDrag={() => setCenteredContact(false)}
            >
              {contact ? (
                <Marker
                  position={{
                    lat: Number(contact?.address?.lat),
                    lng: Number(contact?.address?.long),
                  }}
                />
              ) : null}
            </Map>
          </APIProvider>
        </div>
      </div>
      <CreateEditContact
        showModalFormContact={showModalFormContact}
        setShowModalFormContact={setShowModalFormContact}
        data={dataEdit}
        idContato={idContato}
        setIdContato={setIdContato}
      />
    </main>
  );
}
