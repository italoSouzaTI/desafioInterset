import { baseURL } from "@core/http/Axios.http";
import { surveryPutDTO } from "../dto/surveryPutDTO";

export const surverySendPhoto = async (data: surveryPutDTO) => {
    try {
        const response = await baseURL.post<surveryPutDTO>(`vistoria`, { data });
        return response;
    } catch (error) {}
};
