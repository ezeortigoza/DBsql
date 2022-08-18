import knex from 'knex';

let mysqloptions = knex({
    client:'mysql',
    connection:{
        host:'127.0.0.1',
        user:'root',
        password:'',
        database:'base_knex'
    }
})
const sqliteoptions ={
    client:'sqlite3',
    connection:{
        filename:'/sqliteDatabase.sqlite'
    },
    useNullAsDefault:true
}
let db = knex(sqliteoptions)
try{
    let exists = await db.schema.hasTable('objects'); //hastable pregunta si ya existe esa base de datos
    if(exists){
        await db('objects').del(); //Borra el servidor en cuanto se inicialice
    }else{
        await db.schema.createTable('objects',table=>{
            table.primary('id');
            table.increments('id');
            table.string('name',30).nullable(false); //nullable signfica que no puedo guardar valores nulos debo tenerlos si o si
            table.string('precio',20);
            table.string('color',20);
            //table.integer('age');

        })
    }
}catch(error){
    console.log(error)
}

export default db;