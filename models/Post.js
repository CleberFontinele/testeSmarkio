const db = require('./db')

const Post = db.sequelize.define('postagens', {
  id: {
    type: db.Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  comentarios: {
    type: db.Sequelize.TEXT
  }
})

module.exports = Post
// Post.sync({ force: true })
