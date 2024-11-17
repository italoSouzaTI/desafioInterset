import { baseURL } from "@core/http/Axios.http";

export const sendSurveryDelete = async (data: string) => {
    try {
        const response = await baseURL.delete(`vistoria/foto?url=${data}`);
        return response;
    } catch (error) {}
};
