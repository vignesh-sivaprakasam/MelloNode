const express = require('express');
const router  = express.Router();

//Board Model
const Board = require('../../server/Board/BoardModel');

//@route        GET api/boards
//@desc         Get All Boards
//@access       public

router.get("/", (req, res) => {
        Board.find()
                .populate('stack')
                .then(boards => 
                        res.json(boards));
});

//@route        POST api/boards
//@desc         Create a Board
//@access       public

router.post("/", (req, res) => {
        const newBoard = new Board({
                name : req.body.name,
                color: req.body.color
        });
        newBoard.save().then(item => res.json(item));
});

//@route        GET api/boards/:id
//@desc         GET the Board
//@access       public

router.get("/:id", (req, res) => {
        Board.findById(req.params.id)
                .populate({
                        path : 'stacks',
                        populate : {
                                path  : 'cards',
                                model : 'card'
                        }
                })
                .then(board => 
                        res.json(board)
                )
                .catch(err => res.status(404).json({ success: false }));
});


//@route        PUT api/boards/:id
//@desc         Update the Board value
//@access       public

router.put("/:id", (req, res) => {
        // {new : true} to get the updated value in response
        Board.findByIdAndUpdate(req.params.id, {
                name  : req.body.name,
                color : req.body.color
        }, {new : true}).then(board => {
                return res.json(board);
        });
});


//@route        DELETE api/boards/:id
//@desc         Delete the Board
//@access       public

router.delete("/:id", (req, res) => {
        Board.findById(req.params.id)
                .then(board => {
                        board.remove()
                        .then(() => res.json({ success: true }));
                })
                .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;