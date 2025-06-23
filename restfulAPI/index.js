import express from "express";
import data from "./MOCK_DATA.json" with {type :"json"};
// const express = require("express");
// const data = require("./MOCK_DATA.json");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());


// app.get("/users", (req, res) => {
//   return res.send(data);
// });

// REST API - GET, POST, PATCH, DELETE
//Get all the users
app.get("/api/users", (req, res) => {
  return res.status(200).json(data);
});

//get single user and can update and delete
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    console.log(id);

    const user = data.find((user) => user.id == id);
    return res.status(200).json(user);
  })
  

//add new user to the JSON data
app.post("/api/users", (req, res) => {
  console.log(req.body);
  data.push(req.body);
  return res.status(201).json(req.body)
});

app.put("/api/users/:id", (req, res) =>{
 const id =  Number(req.params.id);
  const userIndex = data.findIndex(user => user.id ===id)

  data.splice(userIndex, 1, {...req.body, id:id})
  res.status(201).json()
  
})

app.patch("/api/users/:id", (req, res) =>{
   const id =  Number(req.params.id);
   const userIndex = data.findIndex(user => user.id ===id)
   const users = data[userIndex]
   data.splice(userIndex, 1, {...users, ...req.body})

    res.status(201).json(data)

})

app.delete("/api/users/:id", (req, res) =>{
  const id =  Number(req.params.id);
  const del = data.filter(user => user.id !== id)
  res.status(200).json(del)
})



app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
