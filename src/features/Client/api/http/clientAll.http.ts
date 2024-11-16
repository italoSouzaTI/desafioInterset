import { baseURL } from "@core/http/Axios.http";
import { IClientDTO } from "../dto/client";

export const getAllClient = async () => {
    try {
        const response = await baseURL.get<IClientDTO>(`cliente/all`);
        return response;
    } catch (error) {
        throw error;
    }
};
