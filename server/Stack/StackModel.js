const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const StackSchema = new Schema({
        name : {
                type : String
        },
        color : {
                type : String
        },
        board : {
                type : Schema.Types.ObjectId,
                ref  : 'board'
        }
});

module.exports = Stack = mongoose.model('stack', StackSchema);