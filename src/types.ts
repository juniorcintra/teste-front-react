export type User = {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
};

export type Contact = {
  id?: number;
  name?: string;
  cpf?: string;
  phone?: string;
  address?: Address;
};

export type Address = {
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  lat: string;
  long: string;
};
