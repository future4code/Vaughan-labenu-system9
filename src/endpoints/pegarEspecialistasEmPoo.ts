import { Request, Response } from "express";
import { connection } from "../data/connection";

export async function pegarEspecialistasEmPoo (req: Request, res: Response) {
    try {
        const result = await connection.raw(`
            SELECT * FROM docente_especialidade
            WHERE especialidade_id = '5'
        `);
        res.status(200).send(result[0]);
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
}