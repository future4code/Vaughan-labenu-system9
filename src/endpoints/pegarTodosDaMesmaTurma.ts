import { Request, Response } from "express";
import { connection } from "../data/connection";


export async function pegarTodosDaMesmaTurma (req: Request, res: Response) {
   try {
         const { id } = req.params;
         if (!id) {
             res.status(400).send({ message: "Preencha todos os campos!" });
             return;
         }

            const result = await connection.raw(`
                SELECT nome, id FROM docente
                WHERE turma_id = '${id}'
            `);
            const result2 = await connection.raw(`
                SELECT nome, id FROM estudante
                WHERE turma_id = '${id}'
            `);
            
            
            res.status(200).send(
                {
                    docentes: result[0],
                    estudantes: result2[0]
                }
            );
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
}