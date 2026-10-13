const express = require('express');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

app.use(express.json());
app.use('/', blogRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Blog CRUD API is running'
  });
});

module.exports = app;
