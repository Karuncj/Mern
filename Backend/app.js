const { json } = require('express');
const express=require('express');
const app=express();
const morgan=require('morgan');
const mongoose=require('mongoose');

require('dotenv/config');
const api=process.env.API_URL;
const productRouter=require('./routers/products');


//middleware
app.use(express.json());
app.use(morgan('tiny'));

//Routers
app.use(`${api}/products`,productRouter)    

mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    dbName:'eshop-database'
})
.then(()=>{
    console.log('Database Connection is ready')
})
.catch((err)=>{
    console.log(err)
})
app.listen(3000,()=>{
    console.log(api)
    console.log('server is running ');
})