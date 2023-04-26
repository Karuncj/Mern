const mongoose=require('mongoose');
const productSchema=mongoose.Schema({
    name:String,
    image:String,
    countInstock:{
        type:Number,
        required:true
    }
    })

    const Product = mongoose.model('Product', productSchema);
    module.exports=Product;