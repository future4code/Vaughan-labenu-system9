import {app} from "./app";
import {getAllDocentes} from "./endpoints/getAllDocentes";
import { createDocente } from "./endpoints/createDocente";
import { changeDocenteTurma } from "./endpoints/changeDocenteTurma";


app.get("/docentes", getAllDocentes);

app.post("/docentes", createDocente);

app.put("/docentes", changeDocenteTurma);