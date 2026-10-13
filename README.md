# Blog CRUD Backend

A backend-only blog API built with Node.js, Express.js, MongoDB, and Mongoose.

## Features

- Create a blog
- Get all blogs
- Get one blog by id
- Delete a blog by id
- MongoDB connection using Mongoose

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file:
   ```bash
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/blogApp
   ```
3. Start the server:
   ```bash
   npm start
   ```

## API Routes

### POST /blogs
Create a new blog.

Request body:
```json
{
  "title": "My Blog",
  "description": "This is a description",
  "author": "Jane Doe"
}
```

### GET /blogs
Get all blogs.

### GET /blogs/:id
Get one blog by its id.

### DELETE /blogs/:id
Delete a blog by its id.

## Example with Postman

- Method: POST
- URL: http://localhost:5000/blogs
- Body: raw JSON

## GitHub

Repository: https://github.com/serena0986312-code/assignment-13-nodejs.git
