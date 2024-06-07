const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { books } = require("./data/data");
// const input = require("./ui/index");
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));
app.get("/all", (req, res) => {
  res.send(books);
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
  //   console.log(books);
});
app.get("/id", (req, res) => {
  const id = req.query.id;
  const details = books.find((one) => one.ID == id);
  const output = details.author;
  if (!output)
    res.json({
      "Status Code": "404",
      "More Information": "Could not find any matching  resource!",
    });
  else {
    res.send(output);
  }
});
app.get("/add", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "add.html"));
});
app.post("/add", (req, res) => {
  const i = parseInt(req.body.id);
  const t = req.body.title;
  const a = req.body.auth;
  const y = parseInt(req.body.yop);
  const is = req.body.isbn;
  const output = {
    ID: i,
    title: t,
    author: a,
    year: y,
    isbn: is,
  };
  books.push(output);
  console.log(output);
  res.status(201).send("Data Added Successfully!");
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.json({
    "Status Code": "500",
    "More Information": "Internal Server Error!",
  });
});
app.listen(3000, () => {
  console.log("Server running on 3000");
});
