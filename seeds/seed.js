// Adopted from Module 14 Activities
const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // const blogs = await Blog.bulkCreate(blogData, {
  //   individualHooks: true,
  //   returning: true,
  // });
  const createdBlogs = [];

  for (const blog of blogData) {
    const newBlog = await Blog.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    createdBlogs.push(newBlog);
  }

  for (const comment of commentData) {
    const randomBlog =
      createdBlogs[Math.floor(Math.random() * createdBlogs.length)];

    await Comment.create({
      ...comment,
      blog_id: randomBlog.id,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  process.exit(0);
};

seedDatabase();
