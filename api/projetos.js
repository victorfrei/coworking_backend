const express = require("express")
const app = express.Router()
const PrismaClient = require('@prisma/client')
const prisma = new PrismaClient.PrismaClient()


app.get('/', async (req, res) => {
    const projetos = await prisma.projetos.findMany({include: {demos, showUp}});
    res.send(projetos);
})

app.post('/', async (req, res) => {
    const projetos = await prisma.projetos.create({ data: req.body });
    res.send(projetos);
})

app.put('/:id', async (req, res) => {
    const projetos = await prisma.projetos.update({ where: { id: req.params.id }, data: req.body , include: {demos, showUp}});
    res.send(projetos);
})

app.delete('/:id', async (req, res) => {
    const projetos = await prisma.projetos.delete({ where: { id: req.params.id } });
    res.send(`O projeto com o id = ${req.params.id} foi deletado com sucesso! `)
})

module.exports = app;