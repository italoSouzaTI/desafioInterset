import { baseURL } from "@core/http/Axios.http";
import { surveryPutDTO } from "../dto/surveryPutDTO";

export const sendSurveryPut = async (id: number, data: surveryPutDTO) => {
    try {
        console.log("sendSurveryPut", data);
        const response = await baseURL.put<surveryPutDTO>(`vistoria/${id}`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
    } catch (error) {}
};
