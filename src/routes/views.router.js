import {Router} from "express";
import objectContenedor from "../contenedor/dbObject.js";


const router = Router();
const objectService = new objectContenedor();
router.get('/',(req,res)=>{
    res.render('welcome')
})

router.get('/newObject', async (req,res)=>{
    let object = await objectService.getAll();
    res.render('newObject',{
        object,
    });
})

export default router;