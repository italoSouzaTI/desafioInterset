import { baseURL } from "@core/http/Axios.http";
import { IlistSurveryDTO } from "../dto/listSurveryDTO";
import { IInternalInspectionAreaDTO } from "../dto/internalInspectionAreaDTO";

export const getAllInternalInspectionArea = async () => {
    try {
        const response = await baseURL.get<IInternalInspectionAreaDTO[]>(`areavistoriainterna/all`);
        return response;
    } catch (error) {
        throw error;
    }
};
