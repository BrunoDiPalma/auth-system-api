export type RegisterUserDTO = {
  nome: string;
  email: string;
  senha: string;
};

export type UserResponse = {
  id: number;
  nome: string;
  email: string;
};
