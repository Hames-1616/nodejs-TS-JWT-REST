import express from "express"
import { user } from "../models/user"
import bcryptjs from "bcryptjs"
import jwt,  {JwtPayload}  from "jsonwebtoken"


const authRouter  = express.Router() 


authRouter.post("/api/signup" , async (req  , res ) =>
{
    try {
        const {name ,email,password} = req.body
    const exist = await user.findOne({ email })
    if(exist){
        return res
            .json({msg:"User with same email already exists"})
            .status(400)
    }
    
       const hashedpassword = await bcryptjs.hash(password,8)

        let usr = new user({
            name,
            email,
            password : hashedpassword
        })

        usr = await usr.save()
        res.json(usr)
    
    } catch (e : any) {
        res.status(500)
        .json({error : e.message})
    }
})

authRouter.post("/api/signin", async(req,res) =>{
    try {
        const { email , password } = req.body
        const usr  = await user.findOne({email})
        if(!user){
            return res
                .status(400)
                .json({
                msg : "user with this email does not exits"
                })
        }
         const isMatched = await bcryptjs.compare(password,usr!.password)
         if(!isMatched){
            return res
                .status(400)
                .json({
                    msg : "Incorrect password"
                })
         }

         const token = jwt.sign({id : usr!._id},"passwordKey")
         return res.json({access:token})
    } catch (e : any) {
        return res.status(500).json({
            error : e.message
        })
    }
})


authRouter.post("/tokenvalid" , async(req,res) =>{
    try{
        const token = req.header("auth")

        if(!token) return res.status(401).json(false)
        
        const verified  = jwt.verify(token,"passwordKey")  as JwtPayload

        if(!verified) return res.status(401).json(false)
        

        const currentUser = await user.findById(verified.id) 

        if (!currentUser) res.json(false)

        res.json(true)

    }
    catch(E){
        res.status(500).json({error :"Error"})
    }
})




export {authRouter}