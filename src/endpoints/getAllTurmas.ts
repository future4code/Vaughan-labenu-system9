import { Request, Response } from "express";
import { connection } from "../data/connection";

export async function getAllTurmas (req: Request, res: Response) {
    try {
        const result = await connection.raw(`
            SELECT * FROM turma
        `);
        res.status(200).send(result[0]);
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
}