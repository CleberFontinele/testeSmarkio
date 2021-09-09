const Sequelize = require('sequelize')

// conexão com o banco de dados mysql
const sequelize = new Sequelize('testenodeSmarkio', 'root', 'sabakukill', {
  host: "localhost",
  dialect: 'mysql'
})

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}
