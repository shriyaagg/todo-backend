//auth.route.js
import { Router } from "express";
import {User} from '../databases/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router=Router()

router.post('/register',async (req,res)=>{
      if (!req.body) return res.status(400).send("No request body found!");

    const {username,email,password}=req.body
    const hashedPassword=bcrypt.hashSync(password,8)

  try {
      const user=await User.create({
          username,
          email,
          password:hashedPassword
      })
      res.status(201).json({message:"user registered"})
    //   const insertTodo=
  } catch (error) {
    res.status(500).send(error.message)
  }
})
router.post('/login',async (req,res)=>{
    const {username,email,password}=req.body
try {
        if(!username && !email){
            return res.status(403).json({message:"username or email is required"})
        }
        const user= await User.findOne(
            {
                $or:[{username},{email}]
            }
        )

        if(!user){
            res.status(401).json({message:"user doesnt exist"})
        }
        const isPasswordValid=bcrypt.compareSync(password,user.password)
        if(!isPasswordValid){
            res.status(401).send({ message: "Invalid password" }) 
        }

        const token=jwt.sign({ id: user._id, username: user.username },process.env.SECRET_TOKEN_KEY,{expiresIn:'24h'})
        res.json({token})
        res.status(200).json({messgae:"user loggedin"})
} catch (error) {
    res.status(503).json({message:error.message})
}
})


export default router