const express = require("express");
const router = express.Router();
const{ Posts }= require("../models");
const {Likes}= require("../models");
const {validateToken}= require("../middlewares/AuthMiddleware");




router.post("/",validateToken, async (req,res)=>{ // UserId alrady passed in validatetoken in req.user
    const{PostId} = req.body;
    const UserId= req.user.id;
   
    const found = await Likes.findOne({ where: {PostId: PostId, UserId: UserId}}) // check if user liked before
    if(!found){
         await Likes.create({PostId: PostId, UserId: UserId},);
         res.json({liked: true});
    }
     else{
       await Likes.destroy({
            where: {
                PostId: PostId,
                UserId: UserId
            },
          });
          res.json({liked: false});
     }


   
});




module.exports = router;