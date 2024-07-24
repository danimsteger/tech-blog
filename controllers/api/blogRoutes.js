const router = require('express').Router();
const { Comment, User, Blog } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  console.log('this is me tryingggg');
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
    console.log('This is me not workinggggg');
  }
});

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll();
    //   {
    //   include: [{ model: Blog }, { model: Comment }],
    // }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.put('/:id', withAuth, async (req, res))

module.exports = router;
