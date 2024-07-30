const router = require('express').Router();
const { Blog, Comment, User2 } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  // Gets all blogs and their data
  console.log('step 1');
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User2,
          attributes: ['name'],
        },
      ],
    });

    console.log(blogData);
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    console.log(blogs);

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
          model: User2,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['content', 'date_created', 'user_id'],
          include: {
            model: User2,
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
    const user2Data = await User2.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog, attributes: ['title', 'date_created', 'id'] }],
    });
    console.log('step3');
    console.log(user2Data);
    console.log('step4');

    const user2 = user2Data.get({ plain: true });
    res.render('dashboard', {
      ...user2,
      logged_in: true,
    });
    console.log(user2);
    console.log('step5');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard/blog/:id', withAuth, async (req, res) => {
  try {
    // const user2Data = await User2.findByPk(req.session.user_id, {
    //   attributes: { exclude: ['password'] },
    // });

    // console.log(user2Data);

    // const user2 = user2Data.get({ plain: true });
    // res.render('modifypost', {
    //   ...user2,
    //   logged_in: true,
    // });

    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User2,
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
    const user2Data = await User2.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    console.log(user2Data);

    const user2 = user2Data.get({ plain: true });
    res.render('newpost', {
      ...user2,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
