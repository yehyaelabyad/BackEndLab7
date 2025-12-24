const config = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
const posts = [
  {
    id: 1,
    title: "First Post",
    content: "This is the content of the first post.",
  },
  {
    id: 2,
    title: "Second Post",
    content: "This is the content of the second post.",
  },
  {
    id: 3,
    title: "Third Post",
    content: "This is the content of the third post.",
  },
];
app.get("/", (req, res) => {
  res.send("Welcome to the Posts API!");
});
app.get("/about", (req, res) => {
  res.send("Welcome to the Posts API About Page!");
});
app.get("/post", (req, res) => {
  const { id } = req.query;
  if (id) {
    const post = posts.find((p) => p.id === Number(id));
    if (!post) return res.status(404).send("Post not found");
    return res.json(post);
  }
  res.json(posts);
});
app.post("/post", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).send("Title and content are required");
  }
  const newPost = {
    id: posts.length + 1,
    title,
    content,
  };
  posts.push(newPost);
  res.status(201).json({
    message: "Post created successfully",
    post: newPost,
  });
});
app.use((req, res) => {
  res.status(404).send("Route not found");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
