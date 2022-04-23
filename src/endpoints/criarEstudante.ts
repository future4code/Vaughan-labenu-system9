import { connection } from "../data/connection"
import { Request, Response } from "express"
import { Estudante } from "../Classes/Estudante"

const create = async (
    estudante: Estudante
): Promise<any> => {
    await connection("estudante")
        .insert(
            {
                id: Date.now().toString(),
                nome: estudante.nome,
                email: estudante.email,
                data_nasc: estudante.data_nasc,
                turma_id: estudante.turma_id,

            })

};
const Hobby = async (
    nome: string
): Promise<any> => {
    
    await connection("hobby")
        .select("id")
        .where("nome", nome)
        

};
const createHobby = async (
   nome: string
): Promise<any> => {
    
    return await connection("hobby")
        .insert(
            {
                id: Date.now().toString(),
                nome: nome

            })

};

export const CriarEstudante = async (req: Request, res: Response): Promise<void> => {
    try {
        let { id, nome, email, data_nasc, turma_id, hobbies } = req.body
        let data_formatada = data_nasc;
        let data = data_formatada.split('-').reverse().join('/');
        let novoEstudante = new Estudante(id, nome, email, data, turma_id, hobbies)
        const createEstudante = await create(novoEstudante);
       
        const mapHobbies = hobbies.map(async (hobby: any) => {
            const condicao = await Hobby(hobby)
            let result = await connection("hobby").select("id").where("nome", hobby);
            
            if (!result[0]) {
                const create = await createHobby(hobby);  
                result = await connection("hobby").select("id").where("nome", hobby);
            }
            
            const idnew = Date.now().toString()
            const idEstudante = await connection("estudante").select("id").where("nome", nome);
            const insert = await connection.raw(`
            INSERT INTO estudante_hobby (id, estudante_id, hobby_id)
            VALUES ('${idnew}', '${idEstudante[0].id}', '${result[0].id}')
        `); 
            
        })
        
        res.status(201).send("Aluno cadastrado com sucesso!")

    } catch (error: any) {
        res.send(error.message || error.sqlMessage)
    }
}