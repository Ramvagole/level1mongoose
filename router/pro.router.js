let express=require("express")
let router=express.Router()
let User=require("../model/user.model")
let Product=require("../model/product.model")

router.post("/users",async(req,res)=>{
    try{
        let {username,email,password}=req.body
        let existing= await User.findOne({email:email})
        if(existing){
            res.json({message:"user already exist"})
        }
        let user=new User({username:username,email:email,password:password})
        await user.save()
        res.json(user)
    }catch(error){
        res.json({mesg:`Error creating user`,error})
        console.log(`Error in Users post ${error}`)
    }
})

router.get("/users",async(req,res)=>{
    try{
        let user= await User.find()
        res.json(user)
    }catch(error){
        res.json({mesg:"Error fetching users",error})
    }
})

router.put("/users/:id",async(req,res)=>{
    try{
        let {id}=req.params
        let {username,email,password}=req.body
        updatedUser = await User.findByIdAndUpdate(id,{ username, email, password },{ new: true, runValidators: true })
        if(!updatedUser){
            res.json({ message: 'User not found' })
        }
        res.json(updatedUser)
    }catch(error){
        res.json({mesg:"Error updating user",error})
    }
})
router.delete('/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedUser = await User.findByIdAndDelete(id);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error });
    }
});
router.post("/products",async(req,res)=>{
    try{
        let {name,price,description,category}=req.body
        let product=new Product({name,price,description,category})
        await product.save()
        res.json(product)
    }catch(error){
        res.json({ message: 'Error creating product', error })
    }
})
router.get("/products",async(req,res)=>{
    try{
        let product=await Product.find()
        res.json(product)
    }catch(error){
        res.json({ message: 'Error fetching products', error })
    }
})
router.put('/products/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name, price, description, category } = req.body;
  
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { name, price, description, category },
        { new: true, runValidators: true }
      );
  
      if (!updatedProduct) {
        return res.json({ message: 'Product not found' });
      }
  
      res.json(updatedProduct);
    } catch (error) {
      res.json({ message: 'Error updating product', error });
    }
});
router.delete('/products/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedProduct = await Product.findByIdAndDelete(id);
  
      if (!deletedProduct) {
        return res.json({ message: 'Product not found' });
      }
  
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.json({ message: 'Error deleting product', error });
    }
});
module.exports=router