import { useSQLiteContext } from "expo-sqlite";
import { IremovePhotoDTO } from "./removePhotoDTO";
import { IInternalInspectionAreaDTO } from "@features/Survey/api/dto/internalInspectionAreaDTO";

export function useInternalInspectionAreaDatabase() {
    const database = useSQLiteContext();
    async function createInternalInspection(data: IInternalInspectionAreaDTO) {
        const statement = await database.prepareAsync(
            "INSERT INTO internalarea (id,areaVistoriada_id,ambiente,descricao,tamanhoProjeto,tamanhoReal,inicioVistoria,fimVistoria)VALUES($id,$areaVistoriada_id,$ambiente,$descricao,$tamanhoProjeto,$tamanhoReal,$inicioVistoria,$fimVistoria)"
        );
        try {
            const result = await statement.executeAsync({
                $id: data.id,
                $areaVistoriada_id: data.areaVistoriada_id,
                $ambiente: data.ambiente,
                $descricao: data.descricao,
                $tamanhoProjeto: data.tamanhoProjeto,
                $tamanhoReal: data.tamanhoReal,
                $inicioVistoria: data.inicioVistoria,
                $fimVistoria: data.fimVistoria,
            });
            const insertRowId = result.lastInsertRowId.toLocaleString();
            return { insertRowId };
        } catch (error) {
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }

    async function getAllInternalInspection() {
        try {
            const query = "SELECT * FROM internalarea";
            const response = await database.getAllAsync<IInternalInspectionAreaDTO>(query);
            console.log("deu bom ");
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    return { createInternalInspection, getAllInternalInspection };
}
