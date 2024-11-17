import { baseURL } from "@core/http/Axios.http";
import { TTypeAnomaly } from "../dto/typeAnomaly";

export const getTypeAnomaly = async () => {
    try {
        const response = await baseURL.get<TTypeAnomaly[]>(`tipoanomalia/all`);
        return response;
    } catch (error) {
        throw error;
    }
};
