import { Request, Response } from "express";
import { connection } from "../data/connection";

export async function mudarTurmaDeModulo(req: Request, res: Response) {
    const { id, modulo } = req.body;
    if(!id || !modulo) {
        res.status(400).send({ message: "Preencha todos os campos!" });
        return;
    } else {
    try {
        await connection.raw(`
            UPDATE turma
            SET modulo = '${modulo}'
            WHERE id = '${id}'
        `);
        res.status(200).send({ message: "Turma alterada com sucesso!" });
    }
    catch (error: any) {
        res.status(400).send({ message: error.message });
    }
}
}