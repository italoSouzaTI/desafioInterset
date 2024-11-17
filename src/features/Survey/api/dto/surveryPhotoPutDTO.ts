export type surveryPhotoPutDTO = {
    id: number;
    file: FileData[];
};
interface FileData {
    uri: string;
    type: string;
    name: string;
}
