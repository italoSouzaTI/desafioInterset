import { baseURL } from "@core/http/Axios.http";
import { surveryPutDTO } from "../dto/surveryPutDTO";

export const sendSurvery = async (data: surveryPutDTO) => {
    try {
        const response = await baseURL.post<surveryPutDTO>(`vistoria`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
    } catch (error) {}
};
