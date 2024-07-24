const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');

router.post('/', async (req, res) => {
  console.log('this is me trying');
  try {
    const userData = await User.create(req.body);
    console.log('hellooooooo');
    console.log(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
    console.log('this is me not working!');
  }
});

// router.post('/signup', async (req, res) => {
//   try {
//     const userData = await User.create(req.body);

//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;

//       res.status(200).json(userData);
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect username, please try again' });
      console.log('this username isnt right');
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password, please try again' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
      console.log('you are now logged in!!');
      console.log(req.session.logged_in);
    });
  } catch (err) {
    res.status(200).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const userData = await User
      .findAll
      //   {
      //   include: [{ model: Blog }, { model: Comment }],
      // }
      ();

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
