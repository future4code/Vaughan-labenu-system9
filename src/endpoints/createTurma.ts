import { Request, Response } from "express";
import { connection } from "../data/connection";
import { Turma } from "../Classes/Turma";


export async function createTurma(req: Request, res: Response) {
    const turmaId = new Date().getTime().toString();
  try {
    const { nome, modulo, docentes, estudantes } = req.body;
    const turma = new Turma(turmaId, nome, modulo, docentes, estudantes);
    if (!nome || !modulo) {
        res.status(400).send({ message: "Preencha todos os campos!" });
        return;
      } else {
    await connection.raw(`
        INSERT INTO turma (id, nome, modulo, docentes, estudantes)
        VALUES ('${turmaId}', '${turma.nome}', '${turma.modulo}', '${turma.docentes}', '${turma.estudantes}')
    `);
    if (docentes.length > 1) {
        for (let i = 0; i < docentes.length; i++) {
            await connection.raw(`
                UPDATE docente
                SET turma_id = '${turmaId}'
                WHERE id = '${docentes[i]}'
            `);
        }
    } else {
        await connection.raw(`
            UPDATE docente
            SET turma_id = '${turmaId}'
            WHERE id = '${docentes}'
        `);
    }
    
      res.status(200).send({ message: "Turma criada com sucesso!", turma });
    };
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
}