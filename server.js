const express = require("express");
const app = express();
// setting views engine
app.set("view engine", "ejs");

//declaring route
//send routes
app.get("/", (req, res) => {
  console.log("server started");
  res.send("hey there!!!...");
});
//send status
app.get("/500", (req, res) => {
  res.sendStatus(500);
});

//render files
app.get("/ejs",(req,res)=>{
  res.render('index') //normal file rendering
  res.render('index',{ a: 5 }) // file rendering with passing data to file

})

//using router
const userRouter = require('./routes/users');
app.use('/users', userRouter);

// specify port to listen to
app.listen(3000);
