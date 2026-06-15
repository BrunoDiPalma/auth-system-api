import { api } from "../api/api";

export const getTask = async () => {
    const response = await api.get("/tasks")

    return response.data
}