
export class Turma {
  id: string;
  nome: string;
  modulo: number;
  docentes: string[];
  estudantes: string[];

  constructor(
    id: string,
    nome: string,
    modulo: number,
    docentes: string[],
    estudantes: string[],
  ) {
    this.id = id;
    this.nome = nome;
    this.modulo = modulo;
    this.docentes = docentes;
    this.estudantes = estudantes;
  }
}
