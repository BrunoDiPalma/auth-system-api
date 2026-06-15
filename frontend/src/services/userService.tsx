import { api } from "../api/api";
import type { User } from "../types/user";

export const getMe = async (): Promise<User> => {
  const response = await api.get("/users/me");

  return response.data;
};
