const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Post = require('./models/Post')

app.use(express.static('public'))

// configurar handlebars -- template engine
// main é o template da aplicação
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  Post.findAll({ order: [['id', 'DESC']] }).then((comentarios) => {
    res.render('formulario', { comentarios: comentarios })
    // console.log(comentarios);
  })
})

app.post('/', (req, res) => {
  Post.create({
    comentarios: req.body.comentarios
  }).then(() => {
    console.log(req.body.comentarios);
    // res.send('Post criado com sucesso!')
    res.redirect('/')
    // res.send(req.body.comentarios)
  }).catch((erro) => {
    res.send('ERRO', erro)
  })
})

const PORT = 8080

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`))
