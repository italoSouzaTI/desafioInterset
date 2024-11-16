import { useQuery } from "@tanstack/react-query";
import { getAllSurvery } from "../api/http/listSurvery.http";
import { useEffect, useState } from "react";
import { IlistSurveryDTO } from "../api/dto/listSurveryDTO";

export function useListSuveryModelView() {
    const [listSurvery, setListSurvery] = useState<IlistSurveryDTO[]>([]);
    const listSurveryRequest = useQuery({
        queryKey: ["KeyListSurvery"],
        queryFn: getAllSurvery,
    });
    useEffect(() => {
        if (listSurveryRequest.data?.data != undefined) {
            setListSurvery(listSurveryRequest.data?.data);
        }
    }, [listSurveryRequest.data]);
    return {
        listSurveryRequest,
        listSurvery,
    };
}
