const mongoose=require("mongoose")

let productSchema=mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    description:{type:String},
    category:{type:String}
},{timestamps:true})

const Product=mongoose.model("Product",productSchema)
module.exports=Product