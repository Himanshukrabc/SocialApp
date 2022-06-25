const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require("../models/user");

router.put("/:id",async (req,res)=>{
    if(req.body.userId===req.params.id||req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password=await bcrypt.hash(req.body.password,salt);
            }
            catch(err){
                console.log(err);
                return res.status(503).send(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{$set:req.body});
            res.status(200).json("User information updated"); 
        }
        catch(err){
            console.log(err);
            return res.status(503).send(err);
        }
    }
    else{
        res.status(503).send("You can only update your account!");
    }
});

// Delete a user
router.delete("/:id",async (req,res)=>{
    if(req.body.userId===req.params.id||req.body.isAdmin){
        try{
            const user = await User.findByIdAndDelete(req.params.id,{$set:req.body});
            res.status(200).json("Accout Deleted Successfully"); 
        }
        catch(err){
            console.log(err);
            return res.status(503).send(err);
        }
    }
    else{
        res.status(503).send("You can only update your account!");
    }
});

// Get a user
router.get("/",async (req,res)=>{
    try{
        // console.log(req.query);
        const userId=req.query.userId;
        const username=req.query.username;
        const user = userId
        ? await User.findById(userId)
        : await User.findOne({username:username});
        // console.log(user);
        // user._doc -- represents the json object that is sent
        // all the values listed are removed from others
        const {password,updatedAt,...others}=user._doc;
        res.status(200).json(others); 
    }
    catch(err){
        console.log(err);
        return res.status(503).send(err);
    }
});

// Follow a user
router.put("/:id/follow",async (req,res)=>{
    if(req.body.userId!==req.params.id){
        try{
            const curuser = await User.findById(req.body.userId);
            const user = await User.findById(req.params.id);
            // console.log(user);
            // console.log(curuser);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers:req.body.userId}});
                await curuser.updateOne({$push:{following:req.params.id}});
                res.status(200).send("User has been followed");
            }
            else{
                return res.status(403).send("You already follow this user");
            }
        }
        catch(err){
            console.log(err);
            return res.status(503).send(err);
        }
    }
    else return res.status(403).send("You cannot follow yourself");
});

// Get Followings
router.get("/friends/:userId",async(req,res)=>{
    try{
        const user = await User.findById(req.params.userId);
        const friends =  await Promise.all(
            user.following.map(friendId=>{
                return User.findById(friendId);
            })
        );
        // console.log("POPOP");
        let friendsList=[];
        friends.map(friends=>{
            const {_id,username,profilePicture}=friends;
            friendsList.push({_id,username,profilePicture});
        });
        // console.log(friendsList);
        res.status(200).send(friendsList);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});

// Follow a user
router.put("/:id/unfollow",async (req,res)=>{
    if(req.body.userId!==req.params.id){
        try{
            const curuser = await User.findById(req.body.userId);
            const user = await User.findById(req.params.id);
            // console.log(user);
            // console.log(curuser);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{followers:req.body.userId}});
                await curuser.updateOne({$pull:{following:req.params.id}});
                res.status(200).send("User has been unfollowed");
            }
            else{
                return res.status(403).send("You dont follow this user");
            }
        }
        catch(err){
            console.log(err);
            return res.status(503).send(err);
        }
    }
    else return res.status(403).send("You cannot unfollow yourself");
});


module.exports=router;