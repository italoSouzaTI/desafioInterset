import { IAnomalyDTO } from "./anomalyDTO";
import { ICategoryDTO } from "./categoryDTO";
import { ITypeDTO } from "./typeDTO";

export interface IlistSurveryDTO {
    id?: number;
    areaVistoriaInterna_id: number;
    dataHora: string;
    contemAnomalia: boolean;
    anomalia: IAnomalyDTO | string | null;
    tipo: ITypeDTO | string | string | null;
    categoria: ICategoryDTO | string | null;
    observacao: string;
    fotos: string[] | string;
    isSync?: boolean;
    isDelete?: boolean;
}
