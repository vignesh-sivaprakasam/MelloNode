const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CardSchema = new Schema({
        title : {
                type : String
        },
        description : {
                type : String
        },
        stack : {
                type : Schema.Types.ObjectId,
                ref  : 'stack'
        }
});

module.exports = Card = mongoose.model('card', CardSchema);