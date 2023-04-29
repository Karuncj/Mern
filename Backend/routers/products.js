const Product =require('../models/product');
const express=require('express');
const router=express.Router();

router.get(`/`,async(req,res)=>{
    const productList=await Product.find();

    if(!productList){
        res.status(500).json({sucess:false})
    }
    res.send(productList)
})
router.post(`/`,(req,res)=>{
   const product=new Product({
    name:req.body.name,
    image:req.body.image,
    countInstock:req.body.countInstock,
   })

   product.save().then((createdProduct=>{
    res.status(201).json(createdProduct)
   })).catch((err)=>{
    console.log(err)
    res.status(500).json({
        error:err,
        sucess:false
    })
   })
})
module.exports=router