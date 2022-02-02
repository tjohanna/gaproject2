// Import our Dependencies
///////////////////////////////////

const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

//////////////////////////////////
// Create Router
/////////////////////////////////

const router = express.Router();

/////////////////////////////////
// Routes
/////////////////////////////////

// Signup Routes 
router.get("/signup", (req, res) => {
    res.render("user/signup.ejs")
})

router.post("/signup", async (req, res) => {
    // hashing the password
   req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10)
   );
   // create the new user
   User.create(req.body, (err, user) => {
    //    console.log(user)
       res.redirect("/user/login");
   });

})

// Login Routes
router.get("/login", (req, res) => {
    res.render("user/login.ejs")
});

router.post("/login", (req, res) => {
    // get the data from the request body
    const { username, password } = req.body;
    User.findOne({ username }, (err, user) => {
      // checking if userexists
      if (!user) {
        res.send("user doesn't exist");
      } else {
        //check if password matches
        const result = bcrypt.compareSync(password, user.password);
        if (result) {
          req.session.username = username
          req.session.loggedIn = true
          res.redirect("/items");
        } else {
          res.send("wrong password");
        }
      }
    });
  });


 // hello display
 router.get("/hello", (req, res) => {
  res.render("user/hello.ejs");
});

// buddy error =D
router.get("/buddy", (req, res) => {
  res.render("user/buddy.ejs");
});

 // logout route
router.get("/logout", (req, res) => {
    // destroy session and redirect to main page
    req.session.destroy((err) => {
        res.redirect("/")
        // res.redirect("/hello")
    })
})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;