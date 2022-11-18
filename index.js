const Express = require('express')
const app = Express()
const port = 3000
var cors = require('cors')

app.use(Express.json())
app.use(cors())
app.use(Express.static('public'))

const projetos = require("./api/projetos")
const parceiros = require("./api/parceiros")
const usuarios = require("./api/usuarios")
const empresas = require("./api/empresas")

app.use("/api/projetos", projetos)

app.use("/api/parceiros", parceiros)

app.use("/api/usuarios", usuarios)

app.use("/api/empresas", empresas)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})