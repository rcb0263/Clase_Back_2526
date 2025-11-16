import express from "express"
import { connectMongoDB } from "./mongo";
import rutasAuth from "./routes/auth";
import rutasPatata from "./routes/patata";

connectMongoDB();

const app = express();
app.use(express.json())
app.use('/api', rutasAuth)
app.use('/patata', rutasPatata)
//Aplicar las rutas
app.listen(3000, ()=>console.log("El API se ha conectado"))