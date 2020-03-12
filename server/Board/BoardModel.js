const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const BoardSchema = new Schema({
        name : {
                type : String
        },
        color : {
                type : String
        },
        stacks : [{
                type    : Schema.Types.ObjectId,
                ref     : 'stack'
        }]
});

module.exports = Board = mongoose.model('board', BoardSchema);