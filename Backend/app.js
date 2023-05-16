const { json } = require('express');
const express=require('express');
const app=express();
const morgan=require('morgan');
const mongoose=require('mongoose');
const cors=require('cors');
require('dotenv/config');
const api=process.env.API_URL;

const productRouter=require('./routers/products');
const categoriesRouter=require('./routers/categories');
const orderRouter=require('./routers/orders');
const userRouter=require('./routers/users');
const JwtMiddleware = require('./helpers/jwt');
const errorHandler=require('./helpers/error-handler')

app.use(cors());
app.options('*',cors())

//middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(JwtMiddleware);
app.use(errorHandler);

//Routers
app.use(`${api}/products`,productRouter)
app.use(`${api}/categories`,categoriesRouter)
app.use(`${api}/orders`,orderRouter)
app.use(`${api}/users`,userRouter)


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