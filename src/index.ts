import {app} from "./app";

import {createTurma} from "./endpoints/createTurma";
import {getAllTurmas} from "./endpoints/getAllTurmas";
import {mudarTurmaDeModulo} from "./endpoints/mudarTurmaDeModulo";

import { CriarEstudante } from "./endpoints/criarEstudante";
import { BuscarEstudante } from "./endpoints/buscarEstudante";
import { EditarEstudante } from "./endpoints/mudarTurmaDoEstudante";

import {getAllDocentes} from "./endpoints/getAllDocentes";
import { createDocente } from "./endpoints/createDocente";
import { changeDocenteTurma } from "./endpoints/changeDocenteTurma";

import {pegarTodosDaMesmaTurma} from "./endpoints/pegarTodosDaMesmaTurma";
import {pegarEspecialistasEmPoo} from "./endpoints/pegarEspecialistasEmPoo";


app.post("/turmas", createTurma);
app.get("/turmas", getAllTurmas);
app.put("/turmas", mudarTurmaDeModulo);

app.get("/docentes", getAllDocentes);
app.post("/docentes", createDocente);
app.put("/docentes", changeDocenteTurma);

app.post("/estudantes", CriarEstudante)
app.get("/estudantes", BuscarEstudante)
app.put("/estudantes/:id", EditarEstudante)


app.get("/turmas/:id", pegarTodosDaMesmaTurma);
app.get("/especialistas", pegarEspecialistasEmPoo);