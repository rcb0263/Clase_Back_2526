import { Router } from "express"
import { getDb } from "./mongo"
import { ObjectId } from "mongodb";

const router = Router();
const colleccion = () => {return getDb().collection('Colceccion');}

router.get("/r", async (req, res)=>{
    try {
        const personas = await colleccion().find().toArray();
        console.log(personas);
        res.json(personas);
    } catch (error) {
        res.status(404).json(error)
    }
})


//Paginación
router.get("/", async (req, res)=>{
    try {
        const page = Number(req.query?.page) || 1;
        const limit = Number(req.query?.limit) || 2;
        const skip = (page-1)*limit;
        const personas = await colleccion().find().skip(skip).limit(limit).toArray();
        res.json(personas);
    } catch (error) {
        res.status(404).json(error)
    }
})


router.get('/:id', async (req, res)=>{
    const idDelParametro = req.params.id
    if(idDelParametro.length==24){
        const personaEncontradaOno = await colleccion().findOne({
            _id: new ObjectId(idDelParametro)
        })
        personaEncontradaOno ? res.json(personaEncontradaOno) : res.status(404).json({message: "No se ha encontrado"})
    }else{
        res.status(404).json({message: "Id no se acepta"})
    }
})

router.post('/', async (req, res)=>{
    try {
        const newName = req.body?.name;
        const newLastName = req.body?.lastName;
        if(
            newName && 
            newLastName && 
            typeof(newName)=="string" && 
            typeof(newLastName)=="string"
        ){
            const result = await colleccion().insertOne(req.body)
            const idMongo = result.insertedId
            const personaCreada = await colleccion().findOne({_id: idMongo})
            res.status(201).json(personaCreada)
        } else {
        res.status(400).json({message: "Invalid input body"})
        }
    } catch (error) {
        res.status(400).json(error)
    }
})
/*
router.post('/multiple', async (req, res)=>{
    try {
        const newName = req.body?.name;
        const newLastName = req.body?.lastName;
        if(
            newName && 
            newLastName && 
            typeof(newName)=="string" && 
            typeof(newLastName)=="string"
        ){
            const result = await colleccion().insertMany([req.body])
            res.status(201).json(result)
        } else {
        res.status(400).json({message: "Invalid input body"})
        }
    } catch (error) {
        res.status(400).json(error)
    }
})
*/

router.put('/:id', async (req, res)=>{
    try {
        const result = await colleccion().updateOne(
            {_id: new ObjectId(req.params?.id)},
            {$set: req.body}
        )
        res.status(201).json(result)
    } catch (error) {
        res.status(404).json(error)
    }    
})

router.delete('/:id', async (req, res)=>{
    try {
        const result = await colleccion().deleteOne({
            _id: new ObjectId(req.params?.id)
        })
        res.status(201).json({result})
    } catch (error) {
        res.status(404).json(error)
    }
})

export default router;