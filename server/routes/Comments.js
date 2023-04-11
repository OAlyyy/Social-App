const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId } });
  res.json(comments);
});

router.post("/", validateToken, async (req, res) => {
  const comment = req.body;
  const username = req.user.username;
  comment.username = username;
  await Comments.create(comment);
  res.json(comment);
});


//we are grabbing commentId

router.delete("/:commentId", validateToken, async (req, res) => {
  console.log("is it here ");
  const commentId = req.params.commentId;
  
  if (!commentId) {
    return res.json({ error: "Comment id is required" });
  }

  await Comments.destroy({
    where: {
     id: commentId,
    },
  });

  res.json("Comment deleted successfully");
});


module.exports = router;