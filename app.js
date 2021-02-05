const express = require('express')
const app = express()
const mongoose  = require('mongoose')
require('dotenv').config({path:'./.env'})

//DB connection
const DB=process.env.DB

const connectDB=async()=>{
    const conn=await mongoose.connect(DB,{
        useCreateIndex:true,
        useNewUrlParser:true,
        useUnifiedTopology: true 
    })
    .then(data=>{
        console.log(`DB connected:${data.connection.host}`)
    })
    .catch(err=>{
        console.log(err)
        process.exit(1)
    })
}

connectDB()



require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))


if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})

