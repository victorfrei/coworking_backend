const express = require("express")
const app = express.Router()
const PrismaClient = require('@prisma/client')
const prisma = new PrismaClient.PrismaClient()

app.post('/', async (req, res) => {
    const usuarios = await prisma.usuario.findMany();
    res.send(usuarios)
})

app.put('/:id', async (req, res) => {
    const usuarios = await prisma.usuario.update({ where: { id: req.params.id }, data: req.body })
    res.send(`usuarios put com id = ${req.params.id}`)
})

module.exports = app;