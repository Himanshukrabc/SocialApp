const router = require("express").Router();
const Post = require("../models/post");
const User = require("../models/user");

// create a post
router.post("/",async(req,res)=>{
    const newPost = await new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).send(savedPost);
    }
    catch(err){
        console.log(err);
        res.status(403).send(err);
    }
});

// update a post
router.put("/:id",async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        // console.log(post.desc);
        if(post.userId===req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).send("Your post has been updated")
        }
        else{
            res.status(403).send("You can only update your own post");
        }
    }
    catch(err){
        console.log(err);
        res.status(403).send(err);
    }
});

// delete a post
router.delete("/:id",async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        // console.log(post.desc);
        if(post.userId===req.body.userId){
            await post.deleteOne();
            res.status(200).send("Your post has been deleted")
        }
        else{
            res.status(403).send("You can only delete your own post");
        }
    }
    catch(err){
        console.log(err);
        res.status(403).send(err);
    }
});

// like a post
router.put("/:id/like",async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}});
            res.status(200).send("Post Liked");
        }
        else{
            await post.updateOne({$pull:{likes:req.body.userId}});
            res.status(200).send("Post Disliked");
        }
    }
    catch(err){
        console.log(err);
        res.status(403).send(err);
    }
});

// get a post
router.get("/:id",async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).send(post);
    }
    catch(err){
        console.log(err);
        res.status(403).send(err);
    }
});

// get timelline posts
router.get("/timeline/:userId",async(req,res)=>{
    try{
        const curuser = await User.findById(req.params.userId);
        // console.log(curuser);
        const userPosts = await Post.find({userId:curuser._id});
        // !!!! Unclear
        const friendPosts = await Promise.all(
            curuser.following.map((friendId)=>{
                return Post.find({userId:friendId});
            })
        );
        res.status(200).send(userPosts.concat(...friendPosts));
    }
    catch(err){
        console.log(err);
        res.status(403).send(err);
    }
});

// get user posts
router.get("/profile/:username",async(req,res)=>{
    try{
        const curuser = await User.findOne({username:req.params.username});
        // console.log(curuser);    
        const userPosts = await Post.find({userId:curuser._id});
        res.status(200).send(userPosts);
    }
    catch(err){
        console.log(err);
        res.status(403).send(err);
    }
});

module.exports = router;