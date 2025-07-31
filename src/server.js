//server
import express from 'express'
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import authRoute from './routes/auth.route.js';      
import todoRoute from './routes/todo.route.js';       
import authMiddleware from './middleware/auth.middleware.js'; 


const app=express()
const PORT=process.env.PORT||8000

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(express.json()); 

app.get('/',(req,res)=>{
    res.send('API is running')
})
app.use('/auth',authRoute)
app.use('/todo',authMiddleware,todoRoute)
app.listen(PORT,()=>console.log(`server is running on ${PORT}`))