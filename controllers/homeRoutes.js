const router = require('express').Router();
const { Blog, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  // Gets all blogs and their data
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

    // renders homepage template with blogs data passed in
    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
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
    const blog = blogData.get({ plain: true });
    res.render('blog', {
      ...blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    restore.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  console.log('step1');
  try {
    console.log('step2');
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog, attributes: ['title', 'date_created', 'id'] }],
    });
    console.log('step3');
    console.log(userData);
    console.log('step4');

    const user = userData.get({ plain: true });
    res.render('dashboard', {
      ...user,
      logged_in: true,
    });
    console.log(user);
    console.log('step5');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard/blog/:id', withAuth, async (req, res) => {
  try {
    // const userData = await User.findByPk(req.session.user_id, {
    //   attributes: { exclude: ['password'] },
    // });

    // console.log(userData);

    // const user = userData.get({ plain: true });
    // res.render('modifypost', {
    //   ...user,
    //   logged_in: true,
    // });

    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    const blog = blogData.get({ plain: true });
    res.render('modifypost', {
      ...blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  res.render('login');
});

router.get('/signup', async (req, res) => {
  res.render('signup');
});

router.get('/dashboard', async (req, res) => {
  res.render('dashboard');
});

router.get('/dashboard/new', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    console.log(userData);

    const user = userData.get({ plain: true });
    res.render('newpost', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
