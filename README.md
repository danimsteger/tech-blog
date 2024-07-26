# Tech Blog

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This project involved creating a full-stack application from scratch for a blog site that allows users to create blog posts as well as comment on other posts. This project followed MVC paradigm, and was created using the following languages and packages: JavaScript, Handlebars.s, Express, Sequelize, express-session npm package, and bootstrap.

---

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

---

---

## Installation

### Clone this repository

```
git clone git@github.com:danimsteger/tech-blog.git
```

### Go into this repository

```
cd tech-blog
```

### Access code of the repository

```
code .
```

### Install Necessary Dependencies on local device

```
npm install
```

---

---

## Usage

To view the program, navigate to the cloned repository and run the following command in your terminal to invoke the application:

```
npm start
```

From there, you can visit the local host link: [http://localhost:3001](http://localhost:3001)

You can also view the application by directly going to the deployed page via Render by clicking [here](https://tech-blog-4o3v.onrender.com).

The page will initally load previously posted blogs that will look like this:

![Sample View of initial page](/assets/images/home.png)

Users can click on any blog page to view it and any comments that have been posted for that blog without logging in. However, if a user wants to leave a comment, they will need to log in.

If a user clicks the dashboard link on the navigation bar without logging in, they will be redirected to the login page.

![Sample view of login](/assets/images/login.png)

If a user has not created an account, they can signup instead by clicking the 'Sign Up Instead' button and filling in their information. A users username must be uniqure or they will not be able to sign up.

![Sample view of signup](/assets/images/signup.png)

Once a user has created an account or logged in, they will be directed to their dashboard. If a user has not created any blog posts yet, their dashboard will look like this:

![Sample view of dashboard](/assets/images/dashboard-new.png)

Users can click the 'New Post' button and will be redirected to a 'Create a Post' form where they can input a title and content for the blog. Once they click 'Create' they will be redirected back to their dashboard.

![sample view of create post](/assets/images/create.png)

Once a user creates blogs, their dashboard will populate all of their created blog titles and will look like this:

![Sample view of dashboard](/assets/images/dashboard.png)

From their dashboard, users can click on any of their existing blogs to update or delete them. If they click on an existing blog, they will be redirected to an update form. From their, they can edit the title and content and update it. Or, they can delete the blog post altogether, and it will no longer appear on their dashboard or on the homepage.

![sample view of update blog](/assets/images/update.png)

Additionally, users can view other users' blog posts on the homepage. When they click on an existing blog post, they are taken to that post's page and any user comments on that post will be shown underneath it. Users can complete the 'Add a Comment' form to add additional comments on that post.

![sample view of individual post page](/assets/images/individual-blog.png)

---

---

## Credits

This project was created by Danielle Steger. To complete this project, several resources were referenced, adopted, and modified. Specifically, materials provided in Module 14 of edX Boot Camps LLC were referenced and modified. Additionally, several articles on "MDN Web Docs" and "W3Schools" were referenced. This project was completed with the use of node, sequelize, and express and their corresponding documentation was referenced as well.

---

---

## License

Distributed under the MIT License. See [LICENSE](LICENSE).
