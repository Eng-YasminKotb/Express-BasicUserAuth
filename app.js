import express from 'express'
import bcrypt from 'bcrypt'

const app=express()

//middleware

app.use(express.json())

const PORT=3000;

//In-memory

const users=[]

app.post('/register',async(req,res)=>{
    try{
        //is user is already existed
        const {email, password }=req.body
        const IsUserExisted=users.find((data)=>email==data.email)
        if(IsUserExisted){
            res.status(400).send("Invalid Email or Password")
        }


   //Hashing the password
    const hashedPassword=await bcrypt.hash(password,10)
    users.push({email,password:hashedPassword})
    res.status(201).send("Rigesterd Successfully")
    }
 
    catch(err){
          res.status(500).json({message: err.message})
    }
})


app.post('/login', async(req,res)=>{
try{
      
       const {email, password }=req.body
       const IsUserExisted=users.find((data)=>email==data.email)
       if(!IsUserExisted){
           res.status(400).send("Invalid Email or Password")
       }
       
       const passwordMatch=await bcrypt.compare(password,IsUserExisted.password)
       if(passwordMatch){
        res.status(201).send("Logged in Successfully!")
       }else{
        res.status(400).send("Invalid Email or Password")
       }


}
catch(err){
     res.status(500).json({message: err.message})

}
})


app.listen(PORT,()=>{
    console.log('server started :)')
})