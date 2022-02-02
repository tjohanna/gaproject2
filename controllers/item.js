///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const express = require("express")
const Item = require("../models/item")

///////////////////////////////////////
// create router
///////////////////////////////////////
const router = express.Router()

/////////////////////////////////////
router.use((req, res, next) => {
    if (req.session.loggedIn){
        next()
    } else {
        res.redirect("/user/login")

    }
})

///////////////////////////////////////
// routes
///////////////////////////////////////

router.get("/seed", (req, res) => {
  const startItems = [
    { name: "Central Park Ice Skating", description: "outside - dress warm", is_free:false },
    { name: "Visit Chelsea Market", description: "Get ready to eat", is_free:false },
    { name: "High Line", description: "dress warm", is_free:true },
  ]

  // Delete All 
  Item.deleteMany({}, (err, data) => {
      Item.create(startItems, (err, data) => {
          res.json(data)
      })
  })
})

  // Index Route
  router.get("/", (req, res) => {
    Item.find({username: req.session.username}, (err, items) => {
        res.render("items/index.ejs", {items})
    })
})


// New Route 
router.get("/new", (req, res) => {
    res.render("items/new.ejs")
})

// Creat Route
router.post("/", (req, res) => {
    req.body.is_free = req.body.is_free === "on" ? true : false
    req.body.username = req.session.username
    Item.create(req.body, (err, item) => {
        res.redirect("/items")
    })
})

// Edit Route
router.get("/:id/edit", (req, res) => {
    const id = req.params.id 
    Item.findById(id,(err, item) => {
        res.render("items/edit.ejs", {item})
    })

})

// Update
router.put("/:id", (req, res) =>{
    const id = req.params.id
    req.body.is_free = req.body.is_free === "on" ? true : false
    Item.findByIdAndUpdate(id, req.body, {new: true}, (err, item) => {
        res.redirect("/items")
    })
})

// DELETE Route
router.delete("/:id", (req, res) => {
    const id = req.params.id
    Item.findByIdAndRemove(id, (err, item) => {
        res.redirect("/items")
    })
})


// Show 
router.get("/:id", (req, res) => {
    const id = req.params.id
    Item.findById(id, (err, item) => {
        res.render("items/show.ejs", {item})
    })
})

// export the router
module.exports = router 