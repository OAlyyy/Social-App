const express = require("express");
const router = express.Router();
const{ Posts,Likes }= require("../models");
const {validateToken}= require("../middlewares/AuthMiddleware");

// Getting  listofposts for Home and their likes .

router.get("/" ,validateToken,async (req,res) => {  // request & respond , whenever using sequelize there should be async & wait

    const listOfPosts = await Posts.findAll({include: [Likes]});
    const likedPosts = await Likes.findAll({where: {UserId: req.user.id }})
    res.json({listOfPosts: listOfPosts, likedPosts: likedPosts});
});


//Getting  list of posts for profile of each user

  router.get('/byuserId/:id' ,async (req,res) => {  
      const id = req.params.id;
      const listOfPosts = await Posts.findAll({where :{UserId: id}, include: [Likes]});
      res.json(listOfPosts);
   });


//Getting  list of comments for each post
router.get('/byId/:id' ,async (req,res) => {  // 
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
});


//Adding a post 

router.post("/" ,validateToken,async (req,res) => {  // request & respond
    const post = req.body ; 
    post.username= req.user.username;
    post.UserId = req.user.id;
    await Posts.create(post); // call sequelizer function and created db post
    res.json(post);
});


// editing title of post

router.put("/title" ,validateToken,async (req,res) => {  // request & respond
  const {newTitle, id } = req.body ; 
  await Posts.update({title: newTitle},{ where: {id: id}});
  res.json(newTitle);
});

// editing postext of post

router.put("/postText" ,validateToken,async (req,res) => {  // request & respond
  const {newText, id } = req.body ; 
  await Posts.update({postText: newText},{ where: {id: id}});
  res.json(newText);
});



//Deleting a post

router.delete("/:postId",validateToken, async (req,res) =>{
        console.log("trying to delete ");

      const postId = req.params.postId;
  
      await Posts.destroy({
        where: {
          id: postId,
        },
      }); 

      res.json(1);
    } 
  );
  



module.exports = router;