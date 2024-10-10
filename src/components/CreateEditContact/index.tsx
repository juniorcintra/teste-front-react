import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useContactStore } from "@/store/slices";
import { validateCpf } from "@/utils/utils";
import { Contact } from "@/types";

interface CreateEditContactProps {
  showModalFormContact: boolean;
  setShowModalFormContact: (value: boolean) => void;
  data?: Contact;
  idContato: number;
  setIdContato: (value: number) => void;
}

export default function CreateEditContact({
  showModalFormContact,
  setShowModalFormContact,
  data,
  idContato,
  setIdContato,
}: CreateEditContactProps) {
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

  const { contacts, setContacts } = useContactStore();

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

  useEffect(() => {
    setNomeContato(data?.name ?? "");
    setCpfContato(data?.cpf ?? "");
    setTelefoneContato(data?.phone ?? "");
    setCEP(data?.address?.cep ?? "");
    setLogradouro(data?.address?.logradouro ?? "");
    setNumero(data?.address?.numero ?? "");
    setComplemento(data?.address?.complemento ?? "");
    setUf(data?.address?.uf ?? "");
    setCidade(data?.address?.cidade ?? "");
    setBairro(data?.address?.bairro ?? "");
    setLatitude(data?.address?.lat ?? "");
    setLongitude(data?.address?.long ?? "");
  }, [data]);

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
    setIdContato(0);
  };

  const handleSubmit = () => {
    if (!validateCpf(cpfContato)) {
      toast.error("CPF Inválido!");
      return;
    }
    if (
      contacts?.some((contact) => contact.cpf === cpfContato) &&
      idContato === 0
    ) {
      toast.error("Já existe um contato cadastrado com esse CPF");
      return;
    }

    const dataContact = {
      id: idContato !== 0 ? idContato : contacts?.length + 1,
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

    if (idContato !== 0) {
      const newContacts = contacts.map((contact) => {
        if (contact.id === idContato) return dataContact;
        return contact;
      });

      setContacts(newContacts);
    } else {
      setContacts([...contacts, dataContact]);
    }

    toast.success("Dados salvos com sucesso!");
    handleCleanStateModal();
  };

  return (
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
  );
}
