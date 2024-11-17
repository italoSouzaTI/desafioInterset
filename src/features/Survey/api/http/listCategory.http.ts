import { baseURL } from "@core/http/Axios.http";
import { ICategoryDTO } from "../dto/categoryDTO";

export const getAllCategory = async () => {
    try {
        const response = await baseURL.get<ICategoryDTO[]>(`categoriaprioridade/all`);
        return response;
    } catch (error) {
        throw error;
    }
};
