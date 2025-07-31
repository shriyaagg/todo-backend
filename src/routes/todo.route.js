//todo.route.js

import { Router } from "express";
import {Todo} from '../databases/todo.model.js'


const router=Router()


router.get('/',async (req,res)=>{
    try {
        const getTodo=await Todo.find({ userId: req.user.id })
        res.json(getTodo)
    } catch (error) {
        res.status(500).json({ error: 'Error fetching todo' });
    }
})
router.post('/',async (req,res)=>{
    try {
        const {task}=req.body
        const createTask=await Todo.create({
            task,
            status:false,
            userId: req.user.id
        })
        res.status(201).json(createTask)
    } catch (error) {
        res.status(400).json({ error: 'Error creating todo' });
    }
})

router.put('/:id',async (req,res)=>{
  const { id } = req.params;
    const {status}=req.body
    try {
        const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { status },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found or unauthorized" });
    }

    res.json({ message: "Todo updated", todo: updatedTodo });
    } catch (error) {
        res.status(500).json({ error: 'Error updating' });
    }

})
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Todo.findByIdAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting todo' });
  }
});

export default router