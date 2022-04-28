// Lägg till express och gör router get, post, put, delete
import express from "express";
import Router from "express";
import bookModel from "../models/book.model.js";



const router = express.Router();

router.get("/", (req, res) => {
   bookModel.find().populate({
    path: "userID",
    select: "username",
  }) 
   // for att fa tag pa user pa clientsidan, hamta user.name typ
    .then((books) => res.json(books))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/getownbooks", (req, res) => {
  bookModel.find().populate({
    path: "userID",
    select: "username",
  }) //({ userID: req.session.userID })
  .then((books) => res.json(books))
  .catch((err) => res.status(400).json("Error: " + err))
});

router.post("/add", (req, res) => {
    if (!req.session.username) {
    console.log('funkar det?')//return res.status(400).json("You are not logged in");
  }   

  const username = req.session.username; 
  const title = req.body.title;
  const author = req.body.author;
  const description = req.body.description;
  const review = req.body.review;

  const newBook = new bookModel({ username, title, author, description, review });

  newBook
    .save()
    .then(() => res.json("Book posted!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:id", (req, res) => {
  bookModel.findOne({ _id: req.params.id })
    .then((book) => res.json(book))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.put("/:id", (req, res) => {
  bookModel.findOneAndUpdate(
    { _id: req.params.id },
    { title: req.body.title, author: req.body.author,
        description: req.body.description, review: req.body.review }
  )
    .then(() => res.json("Book updated!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/:id", (req, res) => {
  bookModel.findByIdAndDelete({ _id: req.params.id })
    .then(() => res.json("Book Deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

export default router