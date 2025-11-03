import express from 'express';
import cors from 'cors'

type Calle={
    numero: number,
    streetName: string,
    floor: number
}

type Person={
    id: string,
    name: string,
    email: string,
    address: Calle
}


let personicas:Person[] = [
    {
        id:"1",
        name: "Paco",
        email: "P@e.es",
        address:{
            numero: 1,
            streetName: "gg",
            floor: 1
        }
    },
    {
        id:"2",
        name: "lucia",
        email: "L@e.es",
        address:{
            numero: 1,
            streetName: "cc",
            floor: 1
        }
    },
    {
        id:"3",
        name: "Carlos",
        email: "Ca@e.es",
        address:{
            numero: 1,
            streetName: "gg",
            floor: 3
        }
    }
]

const app=express();
const port=3000;

app.use(cors())
app.use(express.json())
app.get("/",(req, res)=>{
    res.send("ok mk, te has conectado")
})
app.get("/personas",(req, res)=>{
    res.json(personicas)
})

app.post("/persona",(req,res)=>{
    const nameNewUser = req.body.name;
    if(nameNewUser){
        
    }
    const newUser:Person ={
        id: Date.now().toString(),
        ...req.body
    }
    personicas.push(newUser);
    res.status(201).json(newUser)

})

app.put("/persona/:id", (req,res)=>{
    const id = req.params.id;
    const personasNuevas=personicas.map((persona)=>{
        return persona.id === id ? {...persona, ...req.body}:persona
    })
    personicas=personasNuevas;
    res.status(201).json({message:"Persona actualizada"})

})
app.delete("/persona/:id", (req,res)=>{
    const id = req.params.id;
    const personasEliminadas=personicas.filter((persona)=>{
        return persona.id !== id
    })
    personicas=personasEliminadas;
    res.status(201).json({message:"Persona eliminada"})

})

app.listen(port, ()=>{
    console.log("Server started at: http://localhost:"+port)
})