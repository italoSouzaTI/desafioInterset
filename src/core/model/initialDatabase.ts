import { type SQLiteDatabase } from "expo-sqlite";
export async function initialDatabase(database: SQLiteDatabase) {
    await database.execAsync(`    
        CREATE TABLE IF NOT EXISTS survery (
            id INTEGER PRIMARY KEY,
            areaVistoriaInterna_id INTEGER NOT NULL,
            dataHora TEXT NOT NULL,
            contemAnomalia INTEGER NOT NULL, 
            anomalia TEXT , 
            tipo TEXT ,
            categoria TEXT ,
            observacao TEXT ,
            fotos TEXT,
            isSync  BOOLEAN,
            isDelete  BOOLEAN
        );
        CREATE TABLE IF NOT EXISTS deletePhoto(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT NOT NULL,
        isDelete  BOOLEAN
        );
         CREATE TABLE IF NOT EXISTS anomaly (
            id INTEGER PRIMARY KEY,
            nome TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS category (
            prioridade INTEGER PRIMARY KEY,
            descricao TEXT NOT NULL,
            enum TEXT NOT NULL 
        );
        CREATE TABLE IF NOT EXISTS internalarea (
            id INTEGER PRIMARY KEY,
            areaVistoriada_id INTEGER NOT NULL,
            ambiente TEXT NOT NULL,
            descricao TEXT NOT NULL,
            tamanhoProjeto INTEGER ,
            tamanhoReal INTEGER NOT NULL,
            inicioVistoria TEXT ,
            fimVistoria TEXT 
        );
    `);
}
