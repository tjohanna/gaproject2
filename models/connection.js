/////////////////////////////////////
// Import Dependencies
/////////////////////////////////////
require("dotenv").config()// load env vars
const mongoose = require("mongoose")

//////////////////////////////////////
// Establish Database Connection
///////////////////////////////
// "process" is part of node
const MONGODB_URI = process.env.MONGODB_URI
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// Establish connection
mongoose.connect(MONGODB_URI, CONFIG)

mongoose.connection
.on("open", () => console.log("Connected to Mongo"))
.on("close", () => console.log("Disconnected From Mongo"))
.on("error", (error) => console.log(error))

////////////////////////////////////////
// Export the Connected Mongoose
//////////////////////////////////////

module.exports = mongoose



