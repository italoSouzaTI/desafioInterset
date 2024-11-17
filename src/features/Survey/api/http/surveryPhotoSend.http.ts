import { baseURL } from "@core/http/Axios.http";
import { surveryPutDTO } from "../dto/surveryPutDTO";
import { surveryPhotoPutDTO } from "../dto/surveryPhotoPutDTO";

export const sendSurveryPhoto = async (data: surveryPhotoPutDTO) => {
    try {
        const response = await baseURL.post<surveryPhotoPutDTO>(`vistoria/upload`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response;
    } catch (error) {}
};
