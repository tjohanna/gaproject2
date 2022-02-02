// import the connected mongoose object
const mongoose = require("./connection")

/////////////////////////////////////////
// Model
/////////////////////////////////////////
const {Schema, model} = mongoose

const itemSchema = new Schema({
    name: String,
    description: String,
    is_free: Boolean,
    username: String
});

const Item = model("Item", itemSchema)

//export the model
module.exports = Item

