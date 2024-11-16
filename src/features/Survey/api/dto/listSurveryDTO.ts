import { IanomaliaDTO } from "./anomaliaDTO";
import { IcategoriaDTO } from "./categoriaDTO";
import { ItipoDTO } from "./tipoDTO";

export interface IlistSurveryDTO {
    id: number;
    areaVistoriaInterna_id: number;
    dataHora: string;
    contemAnomalia: boolean;
    anomalia: IanomaliaDTO;
    tipo: ItipoDTO;
    categoria: IcategoriaDTO;
    observacao: string;
    fotos: string[];
}
