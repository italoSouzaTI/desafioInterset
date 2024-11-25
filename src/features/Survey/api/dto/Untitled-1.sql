import { type SQLiteDatabase } from "expo-sqlite";
export async function initialDatabase(database: SQLiteDatabase) {
    await database.execAsync(`    
         CREATE TABLE IF NOT EXISTS anomaly (
            idPRIMARY KEY,
            nome TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS category (
            prioridade PRIMARY KEY,
            descricao TEXT NOT NULL,
            enum TEXT NOT NULL 
        );
        CREATE TABLE IF NOT EXISTS internalarea (
            id PRIMARY KEY,
            areaVistoriada_id INTEGER NOT NULL,
            ambiente TEXT NOT NULL,
            descricao TEXT NOT NULL,
            tamanhoProjeto INTEGER NOT NULL,
            tamanhoReal INTEGER NOT NULL,
            inicioVistoria TEXT NOT NULL,
            fimVistoria TEXT NOT NULL
        );
    `);
}
