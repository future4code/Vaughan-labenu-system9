import { Request, Response } from "express";
import { connection } from "../data/connection";
import { Docente } from "../Classes/Docente";

export async function createDocente(req: Request, res: Response) {
  const docenteId = new Date().getTime().toString();
  const docenteEspecialidadeTableId = new Date().getTime().toString();

  const { nome, email, data_nasc, turma_id, especialidade_id } = req.body;

  const docente = new Docente(docenteId, nome, email, data_nasc, turma_id);

  if (!nome || !email || !data_nasc || !especialidade_id) {
    res.status(400).send({ message: "Preencha todos os campos" });
    return;
  }

  try {
    await connection.raw(
      `
            INSERT INTO docente (id, nome, email, data_nasc, turma_id)
            VALUES (?, ?, ?, ?, ?)
        `,
      [docenteId, nome, email, data_nasc, turma_id]
    );

    if (especialidade_id.length > 1) {
      for (let i = 0; i < especialidade_id.length; i++) {
        const newDocenteEspecialidadeTableId = new Date().getTime().toString();
        await connection.raw(
          `
                    INSERT INTO docente_especialidade (id, docente_id, especialidade_id)
                    VALUES (?, ?, ?)
                `,
          [newDocenteEspecialidadeTableId, docenteId, especialidade_id[i]]
        );
      }
    } else {
      await connection.raw(
        `
            INSERT INTO docente_especialidade (id, docente_id, especialidade_id)
            VALUES (?, ?, ?)
        `,
        [docenteEspecialidadeTableId, docenteId, especialidade_id]
      );
    }

    res.status(200).send({
      message: "Docente criado com sucesso",
      docente,
    });
  } catch (error: any) {
    res.status(400).send({
      message: "Erro ao criar docente",
      error: error.sqlMessage || error.message,
    });
  }
}
