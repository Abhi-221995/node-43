import express from "express";
import data from "./MOCK_DATA.json" with {type :"json"};
// const express = require("express");
// const users = require("./MOCK_DATA.json");

const PORT = process.env.PORT || 5000;

const app = express();

// app.get("/users", (req, res) => {
//   return res.send(data);
// });


// REST API - GET, POST, PATCH, DELETE
//Get all the users
app.get("/api/users", (req, res) => {
  return res.json(data);
});


//get single user and can update and delete
app.route("/api/users/:id")
.get( (req, res) =>{
    const id = Number(req.params.id);
    console.log(id)

   const user =  data.find((user) => user.id == id)
   return res.json(user)
})
.patch((req, res) =>{

    const id = Number(req.params.id);
    return res.json({status : "pending"})
})
.delete((req, res) =>{
    const id = Number(req.params.id);
    return res.json({status : "pending"})
})


//add new user to the JSON data
app.post("/api/users", (req, res) =>{
    return res.json({status : "pending"})
})


app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
