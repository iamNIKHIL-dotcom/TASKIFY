const express = require("express")
const jwt = require("jsonwebtoken");
const { authenticateJwt } = require("../middleware/user");
const { User } = require("./db")
const router = express.Router();

const SECRET = process.env.SECRET;

router.post('/signup', async (res, res) => {
    const { username, password } = req.body;
    try{
        const user = await User.findOne({ username });
        if(user) {
            return res.statusCode(403).json({message : "user already exists"});

        }
        const newUser = new User({ username, password });
        await newUser.save(); // save user details into db

        /// new issue -- use bcrypt to hash password 
        //changing here also needs to change in sign in route
        const token = jwt.sign({
            userId : newUser._id,
        }, SECRET, { expiresIn : '4h'})
        res.json({
            message : "user created succesfully",
            token
        });


    }catch(error){
        res.statusCode(500).json({ message : "error creating user" })
    }
})

router.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    try{
        const user = await User.findOne({username, password })

        if(user){
            const token = jwt.sign({
                userId : user._id
            }, SECRET, { expiresIn : "4h"});

            res.json({
                message : "LOGGED IN SUCCEFULLY",
                token
            })
        }
        else{
            res.status(403).json({
                message : " INVALID USERNAME OR PASSWORD "
            })
        }


    }catch(error){
        res.status(500).json({
            message : "error signing in ", error
        })
    }
})

module.exports = router;
