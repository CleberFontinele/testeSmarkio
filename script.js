const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Post = require('./models/Post')

app.use(express.static('public'))

app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  Post.findAll({ order: [['id', 'DESC']] }).then((comentarios) => {
    res.render('formulario', { comentarios: comentarios })
  })
})

app.post('/', (req, res) => {
  Post.create({
    comentarios: req.body.comentarios
  }).then(() => {
    console.log(req.body.comentarios);
    // talvez aqui tenha um erro ao redirecionar
    res.redirect('/')
    // res.send(req.body.comentarios)
  }).catch((erro) => {
    res.send('ERRO', erro)
  })
})

const PORT = 8080

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`))
