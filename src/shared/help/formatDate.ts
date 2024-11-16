export function formartDate(value: string) {
    const date = new Date(value);
    // Opções de formatação para data e hora no formato brasileiro
    const options = {
        timeZone: "America/Sao_Paulo",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    };
    const formattedDate = date.toLocaleString("pt-BR", options);
    return formattedDate;
}
