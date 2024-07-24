const router = require('express').Router();
const { Comment, User, Blog } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  console.log('this is me tryingggg');
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      //   blog_id: req.session.blog_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
    console.log('This is me not workinggggg');
  }
});

router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    //   {
    //   include: [{ model: Blog }, { model: Comment }],
    // }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
