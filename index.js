require('dotenv').config()
const express=require('express')
const cors=require('cors')
const  router=require('./Routes/router')
require('./DB/connection')

const pfServer=express()
pfServer.use(cors())

pfServer.use(express.json())
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))


const PORT=3000 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log(`Server Running at ${PORT}`);
})
pfServer.get('/',(req,res)=>{
   res.status(200).send(`<h1> Request received at Server</h1>`)    
})