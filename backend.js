// console.log('Hello, World')

const express = require ('express')
const cors = require ('cors')
const mongoose = require ('mongoose')
const app = express()
app.use(express.json())
app.use(cors())

const Filme = mongoose.model("Filme", mongoose.Schema({
    titulo: {type: String},
    sinopse: {type: String}
}))

async function conectarAoBanco () {
    await mongoose.connect('mongodb+srv://pro_mac:machion@cluster0.skf8n.mongodb.net/?retryWrites=true&w=majority')
}

let filmes = [
    {titulo: "Forrest Gump - O Contador de Histórias",
     sinopse: "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks), um rapaz com QI abaixo da média e boas intenções."
    },
    {titulo: "Um Sonho de Liberdade",
     sinopse: "Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem sucedido banqueiro, tem a sua vida radicalmente modificada ao ser condenado por um crime que nunca cometeu, o homicídio de sua esposa e do amante dela"
    }
]

app.get('/oi', (req, res) => {
    res.send('oi')
})

app.get('/filmes', async (req, res) => {
    const filmes = await Filme.find()
    res.json(filmes)
})

app.post ('/filmes', async (req, res) => {
    //obter os dados enviados pelo cliente
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    //montar um objeto JSON com esses dados
    //const filme = {titulo: titulo, sinopse: sinopse}
    const filme = new Filme({titulo: titulo, sinopse: sinopse})
    await filme.save()
    const filmes = await Filme.find()
    //adicionar o novo filme à lista de filmes
    //filmes.push(filme)
    //devolver para o cliente a lista atualizada
    res.json(filmes)
})

app.listen(3000, () => {
    try {
        conectarAoBanco()
        console.log("up & running & connected")
    }
    catch (e) {
        console.log('Erro', e)
    }
})