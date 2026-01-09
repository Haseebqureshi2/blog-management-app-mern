import Post from "../models/Post.js";

// Public - Get all posts
export const getPosts = async (req, res) => {
  const posts = await Post.find().populate("author", "name");
  res.json(posts);
};

// Public - Get single post
export const getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id).populate("author", "name");
  if (post) res.json(post);
  else res.status(404).json({ message: "Post not found" });
};

// Private - Create post
export const createPost = async (req, res) => {
  const { title, content } = req.body;

  const post = await Post.create({
    title,
    content,
    author: req.user._id
  });

  res.status(201).json(post);
};

// Private - Update post
export const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) return res.status(404).json({ message: "Post not found" });

  if (post.author.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;

  const updatedPost = await post.save();
  res.json(updatedPost);
};

// Private - Delete post
export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) return res.status(404).json({ message: "Post not found" });

  if (post.author.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  await post.deleteOne();
  res.json({ message: "Post deleted" });
};
