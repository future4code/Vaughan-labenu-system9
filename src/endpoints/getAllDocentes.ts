import { Request, Response } from "express";
import { connection } from "../data/connection";

export async function getAllDocentes(req: Request, res: Response) {
  try {
    const docentes = await connection
      .select("id", "nome", "email", "data_nasc", "turma_id")
      .from("docente");

    const especialidade = await connection
      .select("id", "nome")
      .from("especialidade");

    const docentesEspecialidades = await connection
      .select("docente_id", "especialidade_id")
      .from("docente_especialidade");

    const docentesWithEspecialidades = docentes.map((docente) => {
        
        const dataDeNascimento = new Date(docente.data_nasc).toLocaleDateString();
        docente.data_nasc = dataDeNascimento;
      const docenteEspecialidades = docentesEspecialidades.filter(
        (docenteEspecialidade) => docenteEspecialidade.docente_id === docente.id
      );
      const docenteEspecialidadesIds = docenteEspecialidades.map(
        (docenteEspecialidade) => docenteEspecialidade.especialidade_id
      );
      const docenteEspecialidadesNames = especialidade.filter((especialidade) =>
        docenteEspecialidadesIds.includes(especialidade.id)
      );
      return {
        ...docente,
        especialidades: docenteEspecialidadesNames,
      };
    });
    res.status(200).send(docentesWithEspecialidades);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
}
