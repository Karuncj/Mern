const Product =require('../models/product');
const express=require('express');
const { Category } = require('../models/category');
const product = require('../models/product');
const { default: mongoose } = require('mongoose');
const router=express.Router();



router.get(`/`,async(req,res)=>{
    //http://localhost:3000/api/v1/products?categories=644e96fa634c36190f4a0bff,645c8295086fc2e048908b3a
    //const productList=await Product.find().select('name image-id');
    let filter={};
    if(req.query.categories)
    {
         filter={category:req.query.categories.split(',')}
    }

    const productList=await Product.find(filter).populate('category');

    if(!productList){
        res.status(500).json({sucess:false})
    }
    res.send(productList)
})
router.post(`/`,async(req,res)=>{
    const category=await Category.findById(req.body.category);
    if(!category) 
    return res.status(400).send('Invalid category');
  
    let product=new Product({
    name:req.body.name,
    description:req.body.description,
    richDescription:req.body.richDescription,
    image:req.body.image,
    brand:req.body.brand,
    price:req.body.price,
    category:req.body.category,
    countInstock:req.body.countInstock,
    rating:req.body.rating,
    numReviews:req.body.numReviews,
    isFeatured:req.body.isFeatured,
   })

   product = await product.save();
   if(!product)
   return res.status(500).send('The product cannot be created')

   res.send(product);
})

router.get('/:id',async(req,res)=>{
    const product = await Product.findById(req.params.id).populate('category');

    if(!product){
        res.status(500).json({success:false})
    }
    res.send(product);
})

router.put('/:id',async(req,res)=>{
    if(!mongoose.isValidObjectId(req.params.id)){
        res.status(400).send('Invalid product id')
    }
    const category=await Category.findById(req.body.category);
    if(!category) 
    return res.status(400).send('Invalid category');
    
    const product=await Product.findByIdAndUpdate(
        req.params.id,
        {
            name:req.body.name,
            description:req.body.description,
            richDescription:req.body.richDescription,
            image:req.body.image,
            brand:req.body.brand,
            price:req.body.price,
            category:req.body.category,
            countInstock:req.body.countInstock,
            rating:req.body.rating,
            numReviews:req.body.numReviews,
            isFeatured:req.body.isFeatured,
        },
        {new:true}
    )
    if(!product)
    return res.status(404).send('the product cannot updated');
    res.send(product);
})

router.delete('/:id',async(req,res)=>{
    Product.findByIdAndRemove(req.params.id).then(product =>{
        if(category){
            return res.status(200).json({success:"the product deleted"})
        }else{
            return res.status(404).json({success:"the product not deleted"})
        }
    }).catch(err=>{
        return res.status(400).json({success:false,error:err})
    })
})

router.get(`/get/count`,async(req,res)=>{
    const productCount = await Product.countDocuments();

    if(!productCount){
        res.status(500).json({success:false})
    }
    res.send({
        productCount:productCount
    });
})


router.get(`/get/featured/:count`,async(req,res)=>{
    const count=req.params.count ?req.params.count:0
    const products = await Product.find({isFeatured:true}).limit(+count);

    if(!products){
        res.status(500).json({success:false})
    }
    res.send(products)
})
module.exports=router;