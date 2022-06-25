const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require("../models/user");
// Login

router.get("/",(req,res)=>{
    res.send("Hey its auth routes");
});

// Register user
router.post("/register",async (req,res)=>{
    try{
        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);

        // Creating user
        const user = await new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
        });

        // save user and respond
        await user.save();
        res.status(200).send(user);
    }
    catch(err){console.log(err);}
});

// Login
router.post("/login",async (req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        if(!user){
            res.status(404).send("User not found");
        }
        const validPassword = await bcrypt.compare(req.body.password,user.password);
        if(!validPassword){
            res.status(404).send("Incorrect Password");
        }
        else{
            res.status(200).json(user);
        }
    }
    catch(err){
        console.log(err);
    }
});

module.exports=router;