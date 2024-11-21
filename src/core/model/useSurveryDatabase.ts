import { IlistSurveryDTO } from "@features/Survey/api/dto/listSurveryDTO";
import { useSQLiteContext } from "expo-sqlite";

export function useSurveryDatabase() {
    const database = useSQLiteContext();
    async function create(data: IlistSurveryDTO) {
        const statement = await database.prepareAsync(
            "INSERT INTO survery (id,areaVistoriaInterna_id,dataHora,contemAnomalia,anomalia,tipo,categoria,observacao,fotos,isSync)VALUES($id,$areaVistoriaInterna_id,$dataHora,$contemAnomalia,$anomalia,$tipo,$categoria,$observacao,$fotos,$isSync)"
        );
        try {
            const result = await statement.executeAsync({
                $id: data.id,
                $areaVistoriaInterna_id: data.areaVistoriaInterna_id,
                $dataHora: data.dataHora,
                $contemAnomalia: data.contemAnomalia,
                $anomalia: data.anomalia,
                $tipo: data.tipo,
                $categoria: data.categoria,
                $observacao: data.observacao,
                $fotos: data.fotos,
                $isSync: data.isSync,
                $isDelete: false,
            });
            const insertRowId = result.lastInsertRowId.toLocaleString();
            return { insertRowId };
        } catch (error) {
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }
    async function update(data: IlistSurveryDTO) {
        const statement = await database.prepareAsync(
            "UPDATE Survery SET id=$id,area_vistoria_interna_id=$area_vistoria_interna_id,data_hora=$data_hora,contem_anomalia=$contem_anomalia,anomalia=$anomalia,tipo=$tipo,categoria=$categoria,observacao=$observacao,fotos=$fotos,is_sync=$is_sync,is_delete=$is_delete WHERE id=$id_survery"
        );
        try {
            const result = await statement.executeAsync({
                $id: data.id,
                $area_vistoria_interna_id: data.areaVistoriaInterna_id,
                $data_hora: data.dataHora,
                $contem_anomalia: data.contemAnomalia,
                $anomalia: data.anomalia,
                $tipo: data.tipo,
                $categoria: data.categoria,
                $observacao: data.observacao,
                $fotos: data.fotos,
                $is_sync: data.isSync,
                $is_delete: data.isDelete,
            });
            const insertRowId = result.lastInsertRowId.toLocaleString();
            return { insertRowId };
        } catch (error) {
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }
    async function getAll() {
        try {
            const query = "SELECT * FROM survery";
            const response = await database.getAllAsync<IlistSurveryDTO>(query);
            console.log("deu bom ");
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async function removeLogic(data: IlistSurveryDTO) {
        const statement = await database.prepareAsync(
            "UPDATE survery SET id=$id,area_vistoria_interna_id=$area_vistoria_interna_id,data_hora=$data_hora,contem_anomalia=$contem_anomalia,anomalia=$anomalia,tipo=$tipo,categoria=$categoria,observacao=$observacao,fotos=$fotos,is_sync=$is_sync WHERE id=$id_survery"
        );
        try {
            const result = await statement.executeAsync({
                $id: data.id,
                $area_vistoria_interna_id: data.areaVistoriaInterna_id,
                $data_hora: data.dataHora,
                $contem_anomalia: data.contemAnomalia,
                $anomalia: data.anomalia,
                $tipo: data.tipo,
                $categoria: data.categoria,
                $observacao: data.observacao,
                $fotos: data.fotos,
                $is_sync: false,
                $is_delete: true,
            });
            const insertRowId = result.lastInsertRowId.toLocaleString();
            return { insertRowId };
        } catch (error) {
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }

    return { create, update, getAll, removeLogic };
}
