import { Request, Response } from "express"
import { connection } from "../data/connection";

const updateEstudantes = async (
    id: string, 
    turma_id: string
    ): Promise<any> => {

    await connection("estudante")
       .update({
         turma_id: turma_id
       })
       .where("id", id);
 };
 
 export const EditarEstudante = async (req: Request, res: Response): Promise<void>  => {
  
    try {
        let {turma_id} = req.body

       const id = req.params.id
      
       const editEstudante = await updateEstudantes(req.params.id, req.body.turma_id);
 
 
       res.status(200).send({
          message: "Editado com sucesso!", editEstudante
       })
    } catch (err: any) {
       res.status(400).send({
          message: err.message,
       });
    }
 };