const express = require("express")
const { Todo } = require("../db")

const {authenticateJwt } = require("../middleware/user");



const router = express.Router();
router.use(authenticateJwt)


router.post("/", async (req,res) => {
    //posting todo
    const createPayLoad = req.body;
    console.log(req.userId);

    if(!createPayLoad){
        res.status(400).json({
            message : "u sent me wrong i/p"
        });
    }

    try{
        const newTodo = await Todo.create({
            title : createPayLoad.title,
            completed : false,
            userId : req.userId,

        })

        res.status(201).json({
            msg : "todo created",
            todo : newTodo,
        })
    }catch(error){
        res.status(500).json({
            msg : " error creating todo"
        })
    }

})

router.get("/" , async (req,res) => {
    // get todo
    try{
        const todos = await Todo.find({
            userId : req.userId,
        })
        res.json({
            todos : todos
        })

    }catch(error){
        res.status(500).json({
            msg : " error fetching todos"
        })
    }


})

router.put("/:id", async (req, res) => {
    //change todo status

    const { id } = req.params;
    const updatePayLoad = req.body;
    
    if(typeof updatePayLoad.completed == 'undefined'){
        return res.status(500).json({
            msg : ' u must provide complete status'
        })

    }
    try{
        const result = await Todo.updateOne(
            {  _id : id },
            { completed : updatePayLoad.completed}
        );

        res.json({
            msg : "Todo marked as completed",
        })

    }catch(error){
        res.status(500).json({
            msg : "error updating todo"
        })
    }
})

module.exports = router;