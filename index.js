let express=require("express")
let router=require("./router/pro.router.js")
let con=require("./db.js")
let app=express()
app.use(express.json())
app.use("/glass",router)

app.get("/",(req,res)=>{
    res.send("successfully connected to home")
})
app.listen(8000,async()=>{
    try{
        await con
        console.log("sucessfully hosted on port 8000")
        console.log("sucessfuly connected to mongodb")
    }catch(error){
        console.log(`error in port listen ${error}`)
    }
})