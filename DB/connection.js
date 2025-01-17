const mongoose=require('mongoose')

const connectionString=process.env.DB_CONNECTION

mongoose.connect(connectionString).then(res=>{
    console.log("mongoDB connected to Server");
}).catch(err=>{
    console.log("Connection failed");
    console.log(err);
    
})