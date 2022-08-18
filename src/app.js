import express from "express";
import __dirname from "./utils.js";
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';
import db from "./db/sqlite3.js";
import objectRouter from './routes/object.router.js'

const app = express();
const server = app.listen(8080,() => console.log("Listening on 8080"));
const io = new Server(server);

let pets =[
    {name:"patas",specie:"pez",age:1},
    {name:"aletas",specie:"perro",age:2},
    {name:"orejas",specie:"conejo",age:4},

]

app.get('/products',async(req,res)=>{
    try{
        let products = await db('products').select('*');
        res.send(products);
    }catch{

    }
})

app.get('/pets',async(req,res)=>{
    try{
        let pets = await db('pets').select('*');
        res.send(pets);
    }catch{
        res.status(500).send("Cannot get pets");
    }
})
app.get('/insert',async(req,res)=>{
    try{
        let result = await db('pets').insert(pets);
        res.send(result);
    }catch(error){
        res.status(500).send("Cannot insert pets");
    }
})

app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname+'/public'));
app.use('/',viewsRouter);
app.use('/api/object',objectRouter);

let log = [];
io.on('connection',socket=>{
    console.log('socket connection');
    socket.on('message', data =>{
        socket.broadcast.emit('newUser');
        log.push(data);
        io.emit('log',log);
    })
})