const db = require('./db')

const Post = db.sequelize.define('postagens', {
  comentarios: {
    type: db.Sequelize.TEXT
  }
})

module.exports = Post
// Post.sync({ force: true })
