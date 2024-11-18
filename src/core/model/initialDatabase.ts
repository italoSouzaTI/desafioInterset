import { type SQLiteDatabase } from "expo-sqlite";
export async function initialDatabase(database: SQLiteDatabase) {
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS Surveys_send (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            area_vistoriaInterna_id INTEGER NOT NULL,
            data_hora TEXT NOT NULL,
            contem_anomalia INTEGER NOT NULL,
            anomalia_id INTEGER NOT NULL,
            tipo TEXT NOT NULL,
            categoria TEXT NOT NULL,
            observacao TEXT NOT NULL,
            fotos TEXT NOT NULL,
        );
    
        CREATE TABLE IF NOT EXISTS Survey (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            area_vistoria_interna_id INTEGER NOT NULL,
            data_hora TEXT NOT NULL,
            contem_anomalia INTEGER NOT NULL, 
            anomalia TEXT NOT NULL, 
            tipo TEXT NOT NULL,
            categoria TEXT NOT NULL,
            observacao TEXT NOT NULL,
            fotos TEXT NOT NULL 
        );
    `);
}
