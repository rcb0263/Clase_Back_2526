import { Router } from "express"
import { getDb } from "./mongo"
import { ObjectId } from "mongodb";
import { LD } from "./types";

const router = Router();
const colleccion = () => {return getDb().collection('discos');}

router.get("/",(req, res)=>{
    res.send("ok mk, te has conectado")
})

router.get("/ld",async (req, res)=>{//Terminado
    try {
        const discos = await colleccion().find().toArray();
        let corupted=0;
        /* 
                discos.forEach((n)=>{
            if(!n.filmName || typeof(n.fName)!="string") {
                corupted++
            }else if(!n.rotationType || typeof(n.fName)!="string"){
                corupted++
            }else if(!n.region || typeof(n.fName)!="string") {
                corupted++
            }else if(!n.lengthMinutes || typeof(n.fName)!="string"){
                corupted++
            }else if(!n.videoFormat || typeof(n.fName)!="string") {
                corupted++
            }
        })
        */
        const corruptos: Partial<LD[]>=[];
        const noCorruptos = discos.filter((n)=>{
            if(!n.filmName || typeof(n.fName)!="string") {
                corupted++
                noCorruptos.push(n)
            }else if(!n.rotationType || typeof(n.fName)!="string"){
                corupted++
                noCorruptos.push(n)
            }else if(!n.region || typeof(n.fName)!="string") {
                corupted++
                noCorruptos.push(n)
            }else if(!n.lengthMinutes || typeof(n.fName)!="string"){
                corupted++
                noCorruptos.push(n)
            }else if(!n.videoFormat || typeof(n.fName)!="string") {
                corupted++
                noCorruptos.push(n)
            }else{
                return n;
            }
        })
        if(corupted!=0){
            res.status(200).json()
        }
        res.status(201).json(discos);
    } catch (error) {
        res.status(404).json(error)
    }
})

router.get("/ld/:id",async (req, res)=>{//POR ACABAR
    try {
        const idDelParametro = req.params?.id;
        if(idDelParametro.length ==24){
            const disco = await colleccion().findOne({_id: new ObjectId(idDelParametro)});
            res.status(201).json(disco);
        }else{
            res.status(401).json({message: "debes introducir el id como parametro"})
        }

    } catch (error) {
        res.status(404).json(error)
    }
})
router.delete('/ld/:id', async (req, res)=>{
    try {
        const idDelParametro = req.params?.id;
        if(idDelParametro.length ==24){
            const disco = await colleccion().deleteOne({_id: new ObjectId(idDelParametro)});
            res.status(201).json(disco);
        }else{
            res.status(401).json({message: "debes introducir el id como parametro"})
        }

    } catch (error) {
        res.status(404).json(error)
    }
})
router.post("/ld",async (req,res)=>{
    try {
        const fName = req.body?.filmName
        const rType = req.body?.rotationType
        const region = req.body?.region
        const lMinutes = req.body?.lengthMinutes
        const vFormat = req.body?.videoFormat
        const eMsg:string[] = []
        if(!fName || typeof(fName)!="string"){
            eMsg.push("Nombre debe ser un string")
        }
        if(!lMinutes || typeof(lMinutes)!="number"){
            eMsg.push("lenghtMinutes debe ser un number")
        }
        if(rType!= 'CAV' &&  rType!='CLV'){
            eMsg.push("rType debe ser CAV o CLV")
        }
        if(!region || typeof(region)!="string"){
            eMsg.push("region debe ser un string")
        }
        if(vFormat!= 'NTSC' && vFormat!= 'PAL'){
            eMsg.push("vFormat debe ser NTSC o PAL")
        }
        if(eMsg.length >0){
            res.status(401).json({message: eMsg})
        }else{
            const newTeam:LD ={
                filmName: req.body?.filmName,
                rotationType: req.body?.rotationType,
                region: req.body?.region,
                lengthMinutes: req.body?.lengthMinutes,
                videoFormat: req.body?.videoFormat
            }
            const result = await colleccion().insertOne(newTeam)
            res.status(201).json(result)
        }
    } catch (error) {
        
    }

})

router.put('/ld/:id', async (req, res)=>{
    try {
        const idDelParametro = req.body?.id
        const fName = req.body?.filmName
        const rType = req.body?.rotationType
        const region = req.body?.region
        const lMinutes = req.body?.lengthMinutes
        const vFormat = req.body?.videoFormat
        const eMsg:string[] = []
        if(idDelParametro && idDelParametro.length !=24){
            eMsg.push("el id debe ser de 24 digitos")
        }
        if(fName && typeof(fName)!="string"){
            eMsg.push("Nombre debe ser un string")
        }
        if(lMinutes && typeof(lMinutes)!="number"){
            eMsg.push("lenghtMinutes debe ser un number")
        }
        if(rType && rType!= 'CAV' &&  rType!='CLV'){
            eMsg.push("rType debe ser CAV o CLV")
        }
        if(region && typeof(region)!="string"){
            eMsg.push("region debe ser un string")
        }
        if(vFormat && vFormat!= 'NTSC' && vFormat!= 'PAL'){
            eMsg.push("vFormat debe ser NTSC o PAL")
        }
        if(eMsg.length >0){
            res.status(401).json({message: eMsg})
        }else{
            const disco:Partial<LD> = {
                filmName: req.body?.filmName,
                rotationType: req.body?.rotationType,
                region: req.body?.region,
                lengthMinutes: req.body?.lengthMinutes,
                videoFormat: req.body?.videoFormat
            }
            const result = await colleccion().updateOne(
                {_id: new ObjectId(req.params?.id)},
                {$set: disco}
            )
            res.json(result)
        }

    } catch (error) {
        res.status(404).json(error)
    }    
})
export default router;