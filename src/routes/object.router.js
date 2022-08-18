import { Router } from "express";
import objectContenedor from "../contenedor/dbObject.js";
import { uploader } from "../utils.js";
import db from "../db/sqlite3.js";

const router = Router();
const objectService = new objectContenedor();




router.post('/',uploader.single('image'),async(req,res)=>{
    console.log('post :/api/object');
    const {name,precio,color} = req.body;
    console.log('req.body : ', req.body);
     if(!req.file) res.status(500).send({status: 'error', error:'No se pudo cargar el archivo'});
    if(!name||!precio||!color) return res.status(400).send({status: "error", error:"Incomplete values"});
    const db = {
        name,
        precio,
        color,
       // image: req.file.filename
    } 
     await objectService.createPet(db);
    res.send({status:'success',message:"Object created"});
})

export default router; 