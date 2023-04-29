const mongoose=require('mongoose');
const productSchema=mongoose.Schema({
    name:String,
    image:String,
    countInstock:{
        type:Number,
        required:true
    }
    })

module.exports=mongoose.model('product', productSchema);