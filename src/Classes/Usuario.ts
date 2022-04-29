export class Usuario  {
    constructor(
        public id: string,
        public nome: string,
        public email: string,
        public data_nasc: Date,
        public turma_id: string
      ) {}

  }