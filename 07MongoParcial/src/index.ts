import express from "express"
import { connectMongoDB } from "./mongo";
import routerPersona from "./routes";

connectMongoDB();

const app = express();
app.use(express.json())
app.use('/', routerPersona)
//Aplicar las rutas
app.listen(3000, ()=>console.log("El API se ha conectado"))