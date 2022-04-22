import { Request, Response } from "express"
import { connection } from "../data/connection"



export const BuscarEstudante = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nome } = req.query

        if (!nome) {
            throw new Error(`Não foi possivel achar o nome '${nome}'`)
        }
        const filtraNome = await connection("estudante")
            .select("*")
            .where("nome", "like", `%${nome}%`)
        
            res.status(200).send(filtraNome)

    } catch (error: any) {
        res.send(error.message || error.sqlMessage)
    }
}