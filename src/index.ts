import {app} from "./app";
import {getAllDocentes} from "./endpoints/getAllDocentes";
import { createDocente } from "./endpoints/createDocente";
import { changeDocenteTurma } from "./endpoints/changeDocenteTurma";

import {createTurma} from "./endpoints/createTurma";
import {getAllTurmas} from "./endpoints/getAllTurmas";
import {mudarTurmaDeModulo} from "./endpoints/mudarTurmaDeModulo";

import {pegarTodosDaMesmaTurma} from "./endpoints/pegarTodosDaMesmaTurma";
import {pegarEspecialistasEmPoo} from "./endpoints/pegarEspecialistasEmPoo";

app.get("/docentes", getAllDocentes);
app.post("/docentes", createDocente);
app.put("/docentes", changeDocenteTurma);

app.post("/turmas", createTurma);
app.get("/turmas", getAllTurmas);
app.put("/turmas", mudarTurmaDeModulo);

app.get("/turmas/:id", pegarTodosDaMesmaTurma);
app.get("/especialistas", pegarEspecialistasEmPoo);