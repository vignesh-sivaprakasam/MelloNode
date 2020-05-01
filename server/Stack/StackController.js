const express = require('express');
const router  = express.Router();

const Stack = require('../Stack/StackModel');
const Board = require('../Board/BoardModel');

//@route        GET api/boards/:boardID/stacks
//@desc         Get All Stacks of a board
//@access       public

router.get("/:boardID/stacks/", (req, res) => {
        if(req.query.type == "all"){
                Stack.find()
                        .then(stacks => res.json(stacks));
        } else {
                Stack.find()
                        .populate('cards')
                        .then(stacks => res.json(stacks));
        }
});

//@route        POST api/boards/:boardID/stacks
//@desc         Create a Stack for a board
//@access       public

router.post("/:boardID/stacks/", (req, res) => {
        const stack = new Stack({
                name  : req.body.name,
                color : req.body.color,
                board : req.params.boardID
        });
        stack.save().then(stackItem => {
                Board.findByIdAndUpdate(req.params.boardID, {
                        $push : { stacks: stack }
                },(err, board)=>{
                        if(err){
                                console.log("Error creating stack");
                        } else {
                                console.log(board,"StackItem adding", stackItem);
                                return res.json(stackItem);
                        }
                });
        });
});


//@route        GET api/boards/:boardID/stacks/:stackID
//@desc         Get a Stack of a board
//@access       public

router.get("/:boardID/stacks/:stackID", (req, res)=>{
        Stack.findById(req.params.stackID)
                .populate('cards')
                .then((stack)=>{
                        return res.json(stack);
                });
});


//@route        PUT api/boards/:boardID/stacks/:stackID
//@desc         Update a Stack of a board
//@access       public

router.put("/:boardID/stacks/:stackID", (req, res)=>{
        Stack.findByIdAndUpdate(req.params.stackID, {
                name  : req.body.name,
                color : req.body.color
        },{new: true})
                .populate('cards')
                .then((stack) => {
                        return res.json(stack);
                });
});

//@route        DELETE api/boards/:boardID/stacks/:stackID
//@desc         Delete a Stack of a board
//@access       public

router.delete("/:boardID/stacks/:stackID", (req, res) => {
        Stack.findByIdAndDelete(req.params.stackID)
                .then((stack)=>{
                        return res.json(stack);
                });
});

module.exports = router;