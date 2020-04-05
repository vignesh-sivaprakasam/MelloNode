const express = require('express');
const router  = express.Router();

const Stack   = require('../Stack/StackModel');
const Card    = require('../Card/CardModel');


//@route        GET api/boards/:boardID/stacks/:stackID/cards
//@desc         Get All Cards of a Stack
//@access       public

router.get("/:boardID/stacks/:stackID/cards/", (req, res)=>{
        console.log("get all Cards ");
        Card.find()
                .then((cards) => {
                        return res.json(cards);
                });
});

//@route        GET api/boards/:boardID/stacks/:stackID/cards/:cardID
//@desc         Get a Card of a Stack
//@access       public

router.get("/:boardID/stacks/:stackID/cards/:cardID", (req, res)=>{
        console.log("get all Cards ");
        Card.findById(req.params.cardID)
                .then((card) => {
                        return res.json(card);
                });
});

//@route        POST api/boards/:boardID/stacks/:stackID/cards/
//@desc         Create a Card of a Stack
//@access       public

router.post("/:boardID/stacks/:stackID/cards", (req, res) => {
        const card = new Card({
                title       : req.body.title,
                description : req.body.description,
                stack       : req.params.stackID
        });

        card.save()
                .then((cardItem) => {
                        Stack.findByIdAndUpdate(req.params.stackID, {
                                $push : { 
                                        cards : card,
                                        card_order : card
                                }
                        }, (err, stack) => {
                                if(err){
                                        console.log("Error creating Card");
                                } else {
                                        console.log("stackItem :",stack);
                                        console.log(" CardItem : ", card);
                                        return res.json(card);
                                }
                        });
                });
});


//@route        PUT api/boards/:boardID/stacks/:stackID/cards/:cardID
//@desc         Update a Card of a Stack
//@access       public

router.put("/:boardID/stacks/:stackID/cards/:cardID", (req, res) => {
        Card.findByIdAndUpdate(req.params.cardID, {
                title       : req.body.title,
                description : req.body.description
        }, { new : true})
        .then((card) => {
                return res.json(card);
        });
});

//@route        Delete api/boards/:boardID/stacks/:stackID/cards/:cardID
//@desc         Delete a Card of a Stack
//@access       public

router.delete("/:boardID/stacks/:stackID/cards/:cardID", (req, res) => {
        Card.findByIdAndDelete(req.params.cardID)
                .then((card) => {
                        Stack.findByIdAndUpdate(req.params.stackID, {
                                $pull : {
                                        card_order : req.params.cardID
                                }
                        }, { new : true }).then((stack) => {
                                console.log("Log after delete", stack);
                        });
                        return res.json(card);
                });
});


router.put("/:boardID/stacks/:stackID/cards/:cardID/move", (req, res) => {
        const params = req.params;
        const query  = req.query;
        console.log("boardID :",params.boardID, " from stackID :", params.stackID, " toStackID :", query.stackID, " position :", query.pos);
        const boardID     = params.boardID;
        const fromStackID = params.stackID;
        const toStackID   = query.stackID;
        const position    = query.pos;
        const cardID      = params.cardID;


        Stack.findByIdAndUpdate(fromStackID, {
                $pull : {
                        card_order : cardID
                }
        },{new : true}).then((stack)=>{
                Stack.findByIdAndUpdate(toStackID, {
                        $push : {
                                card_order : {
                                        $each     : [cardID],
                                        $position : position
                                }
                        }
                }).then(() => {
                        return res.json({success : true});
                });
        });
});

module.exports = router;