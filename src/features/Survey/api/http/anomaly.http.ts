import { baseURL } from "@core/http/Axios.http";
import { TAnomaly } from "../dto/anomaly";

export const getAnomaly = async () => {
    try {
        const response = await baseURL.get<TAnomaly[]>(`anomalia/all`);
        return response;
    } catch (error) {
        throw error;
    }
};
