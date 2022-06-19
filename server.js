const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/BOOKS_DB");

const booksSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  author: {
    type: String,
  },
  price: {
    type: Number,
  },
});
const Books = mongoose.model("booksCollection", booksSchema);
app.listen(3000, function () {
  console.log("server is running on port 3000");
});

const TitleBooks1 = new Books({
  name: "petit prince",
  author: "sarra ",
  price: 20,
});
const TitleBooks2 = new Books({
  name: "histiria",
  author: "faten fazaa",
  price: 45,
});
const TitleBooks3 = new Books({
  name: "paulo coehlo",
  author: "l'alchimiste",
  price: 35,
});
// TitleBooks1.save();
// TitleBooks2.save();
// TitleBooks3.save();
app.get("/books", async (req, res) => {
  try {
    const result = await Books.find();
    res.send({ response: result, message: "get contact successfuly" });
  } catch (error) {
    res.status(400).send({ message: "can not get contact" });
  }
});
// get one books
app.get("/:id", async (req, res) => {
  try {
    const result = await Books.findOne({ _id: req.params.id });
    res.send({ response: result, message: "getting contact successfuly" });
  } catch (error) {
    res.status(400).send({ message: "can not get contact" });
  }
});
// post
app.post("/books", async (req, res) => {
  try {
    const newBooks = new Books(req.body);
    const response = await newBooks.save();

    res.send({ response });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "can not save" });
  }
});
app.delete("/:id", async (req, res) => {
  try {
    const result = await Books.deleteOne({ _id: req.params.id });
    console.log(result);
    res.send("deleted");
  } catch (error) {
    res.send("not deleted");
  }
});
// put
app.put("/:id", async (req, res) => {
  try {
    const result = await Books.updateOne(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    console.log(result);
    res.send("user update");
  } catch (error) {
    res.status(400).send("not updated");
  }
});
