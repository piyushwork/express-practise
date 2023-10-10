const express = require("express");
const users = require('./users.json');

const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
    res.json(users);
});
router.post("/create-new",(req, res) => {
    const newuserId = parseInt(req.body.id);
    const newUserName = req.body.name;
    const newUserAge = parseInt(req.body.age);

    const user = users.find(item => item.id === newuserId);

    if (user) {
        res.status(400).json({ error: `User with ID: ${newuserId} already exists` });
    } else {
        const newUser = {
            id: newuserId,
            name: newUserName,
            age: newUserAge
        };
        users.push(newUser);
        console.log(newUser);
        res.status(201).send(true);
    }
});

// router.get("/:id",(req,res)=>{
//     const userId = parseInt(req.params.id);
//     const user = users.find(item => item.id === userId);
//     console.log(user);
//     res.json(user);
// });
// router.put("/:id",(req,res)=>{
    // const userId = parseInt(req.body.id);
    // const updatedUserName = req.body.name;
    // const updatedUserAge = parseInt(req.body.age);
    // const user = users.find(item => item.id === userId);
// 
    // if(!user){
        // res.sendStatus(404).send("user not found");
    // }
    // user.name = updatedUserName;
    // user.age = updatedUserAge;
    // console.log(user);
    // res.send(true);
// });
// router.delete("/:id",(req,res)=>{
    // const userId = parseInt(req.params.id);
    // const indexToRemove = users.findIndex(item => item.id === userId);
    // users.splice(indexToRemove,1);
    // res.send(true)
// });
// above could also be done as code below

router.route("/:id").get((req,res)=>{
console.log(req.user);
    const user = req.user
    console.log(user);
    res.json(user);
}).put((req,res)=>{
    const updatedUserName = req.body.name;
    const updatedUserAge = parseInt(req.body.age);
    const user = req.user;
    console.log(user);

    if(!user){
        res.sendStatus(404).send("user not found");
    }
    user.name = updatedUserName;
    user.age = updatedUserAge;
    res.send(true);
}).delete((req,res)=>{
    const userId = parseInt(req.params.id);
    const indexToRemove = users.findIndex(item => item.id === userId);
    users.splice(indexToRemove,1);
    res.send(true)
    console.log(users);
});

router.param("id",(req,res,next,id)=>{

    req.user = users.find(item => item.id === parseInt(id));
    next();

});

module.exports = router
