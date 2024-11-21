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
    `);
}
