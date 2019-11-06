var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PetSchema = new Schema({ 
    name: String,
    kind:String,
    character:String, 
    gender: Boolean,
    vaccineUpToDate: Boolean,
    provider: String,
    age:Number,
    price:Number,
    img: String,
});

module.exports = mongoose.model('Pet',PetSchema);
