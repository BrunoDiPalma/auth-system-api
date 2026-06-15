import { api } from "../api/api";

export const getMe = async () => {
  const response = await api.get("/users/me");

  return response.data;
};
