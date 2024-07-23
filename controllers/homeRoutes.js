const router = require('express').Router();
const { Blog, Comment, User } = require('../models');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', {
      blogs,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['content', 'date_created', 'user_id'],
          include: {
            model: User,
            attributes: ['name'],
          },
        },
      ],
    });
    console.log(blogData);
    const blog = blogData.get({ plain: true });
    console.log(blog);
    res.render('blog', {
      ...blog,
    });
  } catch (err) {
    restore.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  res.render('login');
});

module.exports = router;
