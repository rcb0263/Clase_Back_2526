import express from 'express';
import cors from 'cors'
import axios from 'axios'
type Team = {
 id: number
 name: string
 city: string
 titles: number
}

let teams: Team[] = [

 { 
    id: 1, 
    name: "Lakers", 
    city: "Los Angeles", 
    titles: 17 
 },
 { 
    id: 2, 
    name: "Celtics", 
    city: "Boston", 
    titles: 17 
 },
];

const app=express();
const port=3000;

app.use(cors())
app.use(express.json())
app.get("/",(req, res)=>{
    res.send("ok mk, te has conectado")
})
app.get("/teams",(req, res)=>{
    res.json(teams)
})
app.get("/teams/:id", (req,res)=>{
    const id = Number(req.params.id);
    const team=teams.filter((equipo)=>{
        return equipo.id === id
    })
    if(team.length > 0){
        res.status(201).json(team)
    }else{
    res.status(404).json({ message: "Equipo no encontrado" })
    }

})
app.post("/teams",(req,res)=>{
    const nameNewTeam = req.body;

    const newTeam:Team ={
        id: Number(Date.now().toString()),
        name: nameNewTeam.name,
        city: nameNewTeam.city,
        titles: nameNewTeam.titles
    }
    teams.push(newTeam);
    res.status(201).json(newTeam)
})

app.delete("/teams/:id", (req,res)=>{
    const id = Number(req.params.id);
    
    const nuevoTeams= teams.filter((equipo)=>{
        return equipo.id !== id
    })
    if(teams.length==nuevoTeams.length){
        res.status(404).json({message:"Equipo no existe"})
    }else{
        teams=nuevoTeams;
        res.status(201).json({message:"Equipo eliminado"})
    }


})
app.listen(port, ()=>{
    console.log("Server started at: http://localhost:"+port)
})
const url = "http://localhost:"+port
const GetTeams=async ()=>{
    const equipos:Team[] = (await axios.get(url+"/teams")).data;
    console.log("\nGET + /teams:\n",equipos)
}
const testApi = async ()=>{
    //await for 1 second
    GetTeams()
    const body1 = { "name": "Bulls", "city": "Chicago", "titles": 6 }
    let {data} = await axios.post(url+"/teams",body1)
    console.log("\nPOST + /teams:\n",data)
    GetTeams()
    const n = await axios.delete(url+`/teams/${data.id}`)
    console.log("POST + /teams:\n",n.data)
    GetTeams()
}
setTimeout(()=>{
    console.log("\n1 segundo\n")
    testApi()
}, 1000)