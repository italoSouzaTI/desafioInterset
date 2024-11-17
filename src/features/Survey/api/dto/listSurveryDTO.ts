import { IAnomalyDTO } from "./anomalyDTO";
import { ICategoryDTO } from "./categoryDTO";
import { ITypeDTO } from "./typeDTO";

export interface IlistSurveryDTO {
    id: number;
    areaVistoriaInterna_id: number;
    dataHora: string;
    contemAnomalia: boolean;
    anomalia: IAnomalyDTO;
    tipo: ITypeDTO;
    categoria: ICategoryDTO;
    observacao: string;
    fotos: string[];
}
