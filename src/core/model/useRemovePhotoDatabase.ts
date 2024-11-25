import { IlistSurveryDTO } from "@features/Survey/api/dto/listSurveryDTO";
import { useSQLiteContext } from "expo-sqlite";
import { IremovePhotoDTO } from "./removePhotoDTO";

export function useRemovePhotoDatabase() {
    const database = useSQLiteContext();
    async function createPhoto(data: Omit<IremovePhotoDTO, "id">) {
        const statement = await database.prepareAsync(
            "INSERT INTO deletePhoto (id,url,isDelete)VALUES($id,$url,$isDelete)"
        );
        try {
            const result = await statement.executeAsync({
                $url: data.url,
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
    async function updatePhoto(data: IremovePhotoDTO) {
        const statement = await database.prepareAsync(
            "UPDATE deletePhoto SET id=$id,url=$url,isDelete=$is_delete WHERE id=$id"
        );
        try {
            const result = await statement.executeAsync({
                $id: data.id,
                $url: data.url,
                $isDelete: data.isDelete,
            });
            const insertRowId = result.lastInsertRowId.toLocaleString();
            return { insertRowId };
        } catch (error) {
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }
    async function getAllPhoto() {
        try {
            const query = "SELECT * FROM deletePhoto";
            const response = await database.getAllAsync<IremovePhotoDTO>(query);
            console.log("deu bom ");
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async function removePhotoLogic(data: IremovePhotoDTO) {
        const statement = await database.prepareAsync("UPDATE deletePhoto SET id=$id,url=$url WHERE id=$id");
        try {
            const result = await statement.executeAsync({
                $id: data.id,
                $url: data.url,
                $isDelete: true,
            });
            const insertRowId = result.lastInsertRowId.toLocaleString();
            return { insertRowId };
        } catch (error) {
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }

    return { createPhoto, updatePhoto, getAllPhoto, removePhotoLogic };
}
