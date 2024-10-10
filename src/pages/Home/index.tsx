import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { useContactStore, useUserStore } from "@/store/slices";

import AvatarIMG from "@/assets/user.png";
import { Contact } from "@/types";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";
import { useGlobalStoreContext } from "@/store";

export default function Home() {
  const { user, setUsers, setUserSelected } = useUserStore();
  const { contacts, setContacts, setContactSelected, contact } =
    useContactStore();
  const { logoutUser } = useGlobalStoreContext();

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [nomeContato, setNomeContato] = useState("");
  const [cpfContato, setCpfContato] = useState("");
  const [telefoneContato, setTelefoneContato] = useState("");
  const [cep, setCEP] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [uf, setUf] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [lat, setLatitude] = useState("");
  const [long, setLongitude] = useState("");
  const [newContactsList, setNewContactsList] = useState<Contact[]>([]);
  const [centeredContact, setCenteredContact] = useState(false);
  const [orderedList, setOrderedList] = useState("asc");

  const [showModalFormContact, setShowModalFormContact] = useState(false);

  useEffect(() => {
    if (searchTerm !== "") {
      if (contacts.some((contact) => contact.name?.includes(searchTerm))) {
        setNewContactsList(
          contacts.filter((contact) => contact.name?.includes(searchTerm)),
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

  const handleChangeField = async (value: string) => {
    const cleanedValue = value.replace(/\D/g, "");

    setCEP(cleanedValue);

    if (cleanedValue.length === 8) {
      await fetch(`https://viacep.com.br/ws/${cleanedValue}/json/`)
        .then((res) => res.json())
        .then((data) => {
          setLogradouro(data.logradouro);
          setUf(data.uf);
          setCidade(data.localidade);
          setBairro(data.bairro);

          setTimeout(() => {
            fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?address=${cleanedValue}&key=AIzaSyCzGu7EfsUahVfwppcy9HKpZC-XChvLtos`,
            )
              .then((res) => res.json())
              .then((data) => {
                setLatitude(data.results[0].geometry.location.lat);
                setLongitude(data.results[0].geometry.location.lng);
              });
          }, 1000);
        });
    }
  };

  const handleDeleteContact = (id: number) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const handleDeleteAccount = () => {
    navigate("/login");
    logoutUser();
    setUsers([]);
    setContacts([]);
    setUserSelected(undefined);
    handleCleanStateModal();
  };

  const handleLogout = () => {
    navigate("/login");
    logoutUser();
    setUserSelected(undefined);
    handleCleanStateModal();
  };

  const handleSubmit = () => {
    const dataContact = {
      id: contacts.length + 1,
      name: nomeContato,
      cpf: cpfContato,
      phone: telefoneContato,
      address: {
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        uf,
        lat,
        long,
      },
    };
    setContacts([...contacts, dataContact]);
    handleCleanStateModal();
  };

  const handleCleanStateModal = () => {
    setShowModalFormContact(!showModalFormContact);
    setNomeContato("");
    setCpfContato("");
    setTelefoneContato("");
    setCEP("");
    setLogradouro("");
    setNumero("");
    setComplemento("");
    setUf("");
    setCidade("");
    setBairro("");
    setLatitude("");
    setLongitude("");
  };

  return (
    <main className="flex h-screen w-full flex-col">
      <div className="flex w-full flex-row items-center justify-between px-4 py-2">
        <h3>Lista de Contatos</h3>
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex cursor-pointer flex-row items-center gap-2 rounded-2xl border border-zinc-600 p-1">
              <Avatar>
                <AvatarImage src={AvatarIMG} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span>{user?.name} </span>
            </div>
          </PopoverTrigger>
          <PopoverContent className="flex w-80 flex-col space-y-4">
            <Button
              className="bg-red-500 text-white hover:bg-red-500/80"
              onClick={handleDeleteAccount}
            >
              Deletar conta
            </Button>
            <Button className="bg-black text-white" onClick={handleLogout}>
              Deslogar
            </Button>
          </PopoverContent>
        </Popover>
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
                  <Card key={index} className="space-y-2 p-2">
                    <CardContent className="flex flex-col space-y-2 p-0">
                      <p className="capitalize">
                        <strong className="mr-1">Nome:</strong>
                        {newContact.name}{" "}
                      </p>
                      <p>
                        <strong className="mr-1">CPF:</strong>
                        {newContact.cpf}{" "}
                      </p>
                      <p>
                        <strong className="mr-1">Contato:</strong>
                        {newContact.phone}{" "}
                      </p>
                    </CardContent>
                    <CardFooter className="justify-between p-0">
                      <Button
                        className="bg-green-400 text-black hover:bg-green-500"
                        onClick={() => {
                          setContactSelected(newContact);
                          setCenteredContact(true);
                        }}
                      >
                        Ver Mapa
                      </Button>
                      <Button
                        className="bg-red-400 text-black hover:bg-red-500"
                        onClick={() => handleDeleteContact(newContact?.id)}
                      >
                        Excluir
                      </Button>
                    </CardFooter>
                  </Card>
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
      <Dialog open={showModalFormContact} onOpenChange={handleCleanStateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar novo contato</DialogTitle>
          </DialogHeader>
          <div className="flex max-h-96 flex-col gap-4 overflow-y-auto py-4">
            <div className="flex w-full items-center justify-end gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                id="name"
                className="w-3/4"
                value={nomeContato}
                onChange={(e) => setNomeContato(e.target.value)}
              />
            </div>
            <div className="flex w-full items-center justify-end gap-4">
              <Label htmlFor="name" className="text-right">
                CPF
              </Label>
              <Input
                id="cpf"
                className="w-3/4"
                value={cpfContato}
                onChange={(e) => setCpfContato(e.target.value)}
              />
            </div>
            <div className="flex w-full items-center justify-end gap-4">
              <Label htmlFor="name" className="text-right">
                Telefone
              </Label>
              <Input
                id="phone"
                className="w-3/4"
                value={telefoneContato}
                onChange={(e) => setTelefoneContato(e.target.value)}
              />
            </div>
            <div className="flex w-full items-center justify-end gap-4">
              <Label htmlFor="name" className="text-right">
                CEP
              </Label>
              <Input
                id="cep"
                className="w-3/4"
                value={cep}
                onChange={(e) => handleChangeField(e.target.value)}
              />
            </div>
            <div className="flex w-full items-center justify-end gap-4">
              <Label htmlFor="name" className="text-right">
                Rua
              </Label>
              <Input id="rua" className="w-3/4" value={logradouro} disabled />
            </div>
            <div className="flex w-full items-center justify-end gap-4">
              <Label htmlFor="name" className="text-right">
                Número
              </Label>
              <Input
                id="numero"
                className="w-3/4"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />
            </div>
            <div className="flex w-full items-center justify-end gap-4">
              <Label htmlFor="name" className="text-right">
                Complemento
              </Label>
              <Input
                id="complemento"
                className="w-3/4"
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
              />
            </div>
            <div className="flex w-full items-center justify-end gap-4">
              <Label htmlFor="name" className="text-right">
                Bairro
              </Label>
              <Input id="bairro" className="w-3/4" value={bairro} disabled />
            </div>
            <div className="flex w-full items-center justify-end gap-4">
              <Label htmlFor="name" className="text-right">
                Cidade
              </Label>
              <Input id="cidade" className="w-3/4" value={cidade} disabled />
            </div>
            <div className="flex w-full items-center justify-end gap-4">
              <Label htmlFor="name" className="text-right">
                UF
              </Label>
              <Input id="uf" className="w-3/4" value={uf} disabled />
            </div>
            <div className="flex w-full items-center justify-end gap-4">
              <Label htmlFor="name" className="text-right">
                Latitude
              </Label>
              <Input id="latitude" className="w-3/4" value={lat} disabled />
            </div>
            <div className="flex w-full items-center justify-end gap-4">
              <Label htmlFor="name" className="text-right">
                Longitude
              </Label>
              <Input id="longitude" className="w-3/4" value={long} disabled />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit}>Salvar contato</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
