import { baseURL } from "@core/http/Axios.http";
import { IlistSurveryDTO } from "../dto/listSurveryDTO";

export const getAllSurvery = async () => {
    try {
        const response = await baseURL.get<IlistSurveryDTO[]>(`vistoria/all`);
        return response;
    } catch (error) {
        throw error;
    }
};
