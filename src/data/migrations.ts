import { connection } from "./connection"



const printError = (error: any) => { console.log(error.sqlMessage || error.message) }

const createTables = () => connection
    .raw(`
    CREATE TABLE IF NOT EXISTS turma (
      id VARCHAR(255) PRIMARY KEY,
      nome VARCHAR(255),
      modulo VARCHAR(255) DEFAULT 0,
      docentes VARCHAR(255),
      estudantes VARCHAR(255)
   );
    CREATE TABLE IF NOT EXISTS estudante (
       id VARCHAR(255) PRIMARY KEY,
       nome VARCHAR(255) NOT NULL,
       email VARCHAR(255) UNIQUE NOT NULL,
       data_nasc DATE NOT NULL,
       turma_id VARCHAR(255),
       FOREIGN KEY (turma_id) REFERENCES turma(id)
    );
    CREATE TABLE IF NOT EXISTS hobby (
      id VARCHAR(255) PRIMARY KEY,
      nome VARCHAR(255) UNIQUE NOT NULL
   );
    CREATE TABLE IF NOT EXISTS estudante_hobby (
       id VARCHAR(255) PRIMARY KEY,
       estudante_id VARCHAR(255) NOT NULL,
       FOREIGN KEY (estudante_id) REFERENCES estudante(id),
       hobby_id VARCHAR(255) NOT NULL,
       FOREIGN KEY (hobby_id) REFERENCES hobby(id)
    );
    CREATE TABLE IF NOT EXISTS docente (
      id VARCHAR(255) PRIMARY KEY,
      nome VARCHAR(255),
      email VARCHAR(255) UNIQUE NOT NULL,
      data_nasc DATE NOT NULL,
      turma_id VARCHAR(255),
      FOREIGN KEY (turma_id) REFERENCES turma(id)
   );
   CREATE TABLE IF NOT EXISTS especialidade (
      id VARCHAR(255) PRIMARY KEY,
      nome VARCHAR(255) UNIQUE NOT NULL
   );
   CREATE TABLE IF NOT EXISTS docente_especialidade (
      id VARCHAR(255) PRIMARY KEY,
      docente_id VARCHAR(255) NOT NULL,
      FOREIGN KEY (docente_id) REFERENCES docente(id),
      especialidade_id VARCHAR(255) NOT NULL,
      FOREIGN KEY (especialidade_id) REFERENCES especialidade(id)
   );
   INSERT INTO especialidade (id, nome) VALUES ('1', 'JS');
   INSERT INTO especialidade (id, nome) VALUES ('2', 'CSS');
   INSERT INTO especialidade (id, nome) VALUES ('3', 'React');
   INSERT INTO especialidade (id, nome) VALUES ('4', 'Typescript');
   INSERT INTO especialidade (id, nome) VALUES ('5', 'POO');
`)
    .then(() => { console.log("Tabelas criadas") })
    .catch(printError)

const closeConnection = () => { connection.destroy() }

createTables()

    .finally(closeConnection)