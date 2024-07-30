const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
  secret: process.env.DB_SECRET || 'abcdef12345abcdef12345',
  cookie: {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set the correct MIME type for JavaScript files
app.use((req, res, next) => {
  if (req.url.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript');
  }
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () =>
    console.log(`Now listening on http://localhost:${PORT}`)
  );
});
