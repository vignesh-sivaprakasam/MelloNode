const express = require('express');
const router  = express.Router();

const Stack = require('../Stack/StackModel');
const Board = require('../Board/BoardModel');

//@route        GET api/boards/:id/stacks
//@desc         Get All Stacks of a board
//@access       public

router.get("/:boardID/stacks/", (req, res) => {
        Stack.find()
                .then(stacks => res.json(stacks));
});

//@route        POST api/boards/:id/stacks
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


module.exports = router;