export interface IInternalInspectionAreaDTO {
    id: number;
    areaVistoriada_id: number;
    ambiente: Environment | string;
    descricao: string;
    tamanhoProjeto: number;
    tamanhoReal: number;
    inicioVistoria: any;
    fimVistoria: any;
}

export interface Environment {
    id: number;
    nome: string;
    local_id: number;
}
