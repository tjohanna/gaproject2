////////////////////////////////////
// Import all our dependencies
/////////////////////////////////////
require("dotenv").config() // load env vars
const express = require("express") // import express
const morgan = require("morgan") // import morgan
const methodOverride = require("method-override")
const ItemRouter = require("./controllers/item")
const UserRouter = require("./controllers/user")
const session = require('express-session')
const MongoStore = require("connect-mongo")


//////////////////////////////////////////
// Create App Object
//////////////////////////////////////////
const app = express()

//////////////////////////////////////////
// Middleware
///////////////////////////////////////////
app.use(morgan("tiny")) // logging
app.use(methodOverride("_method")) // override for puts and deletes
app.use(express.urlencoded({extended: true})) // parse request body
app.use(express.static("public")) // serve files statically from public folder
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({mongoUrl: process.env.MONGODB_URI}),
    saveUninitialized: true,
    resave: false
}))
app.use("/items", ItemRouter)
app.use("/user", UserRouter)


////////////////////////////////////////////
// Initial Route
////////////////////////////////////////////
app.get("/", (req, res) => {
    res.render("index.ejs")
})

/////////////////////////////////////////////
// Server Listener
/////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`listening on ${PORT}`))

// app.listen(process.env.PORT || 3000, function(){
//     console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
//   });