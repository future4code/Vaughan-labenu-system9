import { Request, Response } from "express";
import { connection } from "../data/connection";


export async function changeDocenteTurma(req: Request, res: Response) {
  try {
    const { id, turma_id } = req.body;
    if (!id || !turma_id) {
      res.status(400).send({ message: "Preencha todos os campos!" });
    } else {
    const result = await connection.raw(`
        UPDATE docente
        SET turma_id = '${turma_id}'
        WHERE id = '${id}'
    `);
   
      res.status(200).send({ message: "Docente alterado com sucesso!" });
    };
  } catch (error:any) {
    res.status(400).send({ message: error.message });
  }
}

