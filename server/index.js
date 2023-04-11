const express = require ('express'); // var express , instance of framework express
const app = express(); // var app , instance of express 
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require("./models");


// Routers
const postRouter= require('./routes/Posts')
app.use("/posts",postRouter);

const commentsRouter= require('./routes/Comments')
app.use("/comments", commentsRouter);

const usersRouter= require('./routes/Users')
app.use("/auth", usersRouter);

const likesRouter= require('./routes/Likes')
app.use("/likes", likesRouter);
// End Routers

db.sequelize.sync().then(() => {
app.listen( 3001, () => { 

    console.log("Server running on port 3001");
    });  
}); 


