import __dirname from '../utils.js'
import db from '../db/sqlite3.js'


// constpath = 'sqlite3.js'

class objectContenedor{//class contenedora
//No todas las clases necesitan un constructor
/* constructor(){
    this.path = __dirname+'/db/sqlite3.js'
} */
    getAll = async() =>{
      try{
        if(db.insert('objects')){
            let fileData = await db('objects').select('*');
            let articulo = JSON.parse(fileData);
           return articulo;
        }else{
            return [];//No tiene mascotas
        }
      } catch(error){
        console.log('Error de lectura'+ error)
      }
}
    save = async (articulo) =>{
        try{
            let productos = await this.getAll();
            if(productos.length === 0){
                articulo.id = 1;
                productos.push(articulo);
                await db.select(JSON.stringify('objects'));
            }else{//Cuando hay mas mascotas
                articulo.id = productos[productos.length-1].id+1;
                productos.push(articulo);
                await db.select(JSON.stringify('objects'));
            }

        }catch(error){
            console.log('No se pudo leer el archivo' + error);
        }
    }

    getById = async (id) =>{
        try{
             let data = await this.getAll();
             const getId = data.filter(element => element.id == id);
             return getId
            //console.log('Objeto encontrado:'+ JSON.stringify(data[2]));

        }catch(error){
            console.log('Hay un error' + error)
        }
    
    }  

    deleteById = async (id)=>{
        try {
            let data = await this.getAll();
            const borrar = data.filter(object => object.id != id)
            await db.select(path,JSON.stringify('objects'));
            return borrar
            }
        catch (error) {
            console.log('Hay un error'+ error);
        }
    }
    
    deleteAll = async (deleteAll) =>{
        try{
            const data = await this.getAll();
            let borrar = data.filter((element) =>{
                element.id !== deleteAll;
            })
            await db.select(JSON.stringify('objects'));
            console.log("Todos los objetos fueron eliminados :" + JSON.stringify((data)));

        }catch(error){
            console.log('Hay un error' + error);
        }
    }

    actualizar = async(obj) =>{
        let arr = await this.getAll()
        let id = obj.id;
        let titulo = obj.title;
        let price = obj.price;
        let thumbnail = obj.thumbnail;
        arr.map(function(dato){
            if(dato.id == id){
                dato.title = titulo;
                dato.price = price;
                dato.thumbnail = thumbnail;
            }
        })
        await db.select(JSON.stringify('objects'));
        console.log(arr)
        return arr;
    }

    createPet = async(pet) =>{
        let pets = await this.getAll();
        if(pets.length === 0){
            pet.id=1;
            pet.isAdopted = false;
            pets.push(pet);
            await db.select(JSON.stringify('objects'));
        }
        else{
            pet.id = pets[pets.length-1].id+1;
            pet.isAdopted = false;
            pets.push(pet);
            await db.select(JSON.stringify('objects'));
        }
    }
  
   
}
export default objectContenedor

