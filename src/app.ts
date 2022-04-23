import express,  { Request, Response } from "express";
import cors from "cors";
import { AddressInfo } from "net";
import { CriarEstudante } from "./endpoints/criarEstudante";
import { BuscarEstudante } from "./endpoints/buscarEstudante";
import { EditarEstudante } from "./endpoints/mudarTurmaDoEstudante";


export const app = express();
app.use(express.json());
app.use(cors());

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
       const address = server.address() as AddressInfo;
       console.log(`Server is running in http://localhost: ${address.port}`);
    } else {
       console.error(`Failure upon starting server.`);
    }
});

app.post("/estudantes", CriarEstudante)

app.get("/estudantes", BuscarEstudante)

app.put("/estudantes/:id", EditarEstudante)