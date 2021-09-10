const Sequelize = require('sequelize')

const sequelize = new Sequelize('testenodeSmarkio', 'root', 'sabakukill', {
  host: "localhost",
  dialect: 'mysql'
})

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}
