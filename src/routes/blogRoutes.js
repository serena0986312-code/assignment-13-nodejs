const express = require('express');
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  deleteBlogById
} = require('../controllers/blogController');

const router = express.Router();

router.post('/blogs', createBlog);
router.get('/blogs', getAllBlogs);
router.get('/blogs/:id', getBlogById);
router.delete('/blogs/:id', deleteBlogById);

module.exports = router;
