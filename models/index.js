const User2 = require('./User2');
const Blog = require('./Blog');
const Comment = require('./Comment');

User2.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Blog.belongsTo(User2, {
  foreignKey: 'user_id',
});

Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(Blog, {
  foreignKey: 'blog_id',
});

User2.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User2, {
  foreignKey: 'user_id',
});

module.exports = { User2, Blog, Comment };
