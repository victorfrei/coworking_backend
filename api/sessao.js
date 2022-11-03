const express = require("express")
const app = express.Router()
const PrismaClient = require('@prisma/client')
const prisma = new PrismaClient.PrismaClient()

app.get('/', async (req, res) => {
    const sessao = await prisma.sessao.findMany();
    res.send(sessao)
})

app.post('/', async (req, res) => {
    const sessao = await prisma.sessao.create({ data: req.body })
    res.send(sessao)
})

app.put('/:id', async (req, res) => {
    const sessao = await prisma.sessao.update({ where: { id: req.params.id }, data: req.body })
    res.send(sessao)
})

app.delete('/:id', async(req, res) => {
    const sessao = await prisma.sessao.delete({where: {id: req.params.id}});
    res.send(`A Sessão com o id = ${req.params.id} foi deletado com sucesso! `)
})

module.exports = app;