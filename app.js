const { log } = require("console");
const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid"); // for random id genetor
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

let posts = [
  {
    id: uuidv4(),
    username: "apnaCollege",
    content: "I love coding",
  },
  {
    id: uuidv4(),
    username: "exampleUser",
    content: "Just another day of coding",
  },
  {
    id: uuidv4(),
    username: "devGuru",
    content: "Coding is my passion",
  },
  {
    id: uuidv4(),
    username: "codingExplorer",
    content: "Exploring the world of coding",
  },
  {
    id: uuidv4(),
    username: "codeNinja",
    content: "Ninja coding skills in action",
  },
  {
    id: uuidv4(),
    username: "techEnthusiast",
    content: "Enthusiastic about technology and coding",
  },
  {
    id: uuidv4(),
    username: "webDeveloper",
    content: "Building awesome web applications",
  },
];

// read route
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

// creat route
app.post("/posts", (req, res) => {
  let id = uuidv4();
  let { username, content } = req.body;
  posts.push({ username, content, id });
  res.redirect("/posts");
});
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

// show route
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

// update route -> patch req.
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  console.log(newContent);
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

// delete route
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});
app.listen(8080, () => {
  console.log("App is listing at port 8080");
});
