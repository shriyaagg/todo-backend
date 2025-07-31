//auth.middleware.js
import jwt from 'jsonwebtoken'

function authMiddleware(req,res,next){
    const authHeader=req.headers['authorization']
    if (!authHeader){
        return res.status(401).json({message:"Missing authorization header"})
        }
    const token=authHeader.split(' ')[1]
    if(!token){
        return res.status(403).json({message:"Token not provided"})
        }
    jwt.verify(token,process.env.SECRET_TOKEN_KEY,(err,user)=>{
        if(err){
            return res.status(403).json({message:"Invalid Token"})
        }
        req.user=user
        next()
    })
}

export default authMiddleware;