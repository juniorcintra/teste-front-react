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
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};
