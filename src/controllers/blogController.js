const Blog = require('../models/Blog');

const createBlog = async (req, res) => {
  try {
    const { title, description, author } = req.body;

    if (!title || !description || !author) {
      return res.status(400).json({ message: 'Title, description, and author are required' });
    }

    const blog = await Blog.create({ title, description, author });
    return res.status(201).json(blog);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    return res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  deleteBlogById
};
