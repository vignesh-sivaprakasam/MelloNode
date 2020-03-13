const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const StackSchema = new Schema({
        name : {
                type : String
        },
        color : {
                type : String
        },
        card_order : [{
                type : Schema.Types.ObjectId,
                ref  : 'card'
        }],
        cards : [{
                type : Schema.Types.ObjectId,
                ref  : 'card'
        }],
        board : {
                type : Schema.Types.ObjectId,
                ref  : 'board'
        }
});

module.exports = Stack = mongoose.model('stack', StackSchema);