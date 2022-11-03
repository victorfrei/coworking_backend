const express = require("express")
const app = express.Router()
const PrismaClient = require('@prisma/client')
const prisma = new PrismaClient.PrismaClient()

app.get('/', async (req, res) => {
    const parceiros = await prisma.parceiros.findMany();
    res.send(parceiros);
})

app.post('/', async (req, res) => {
    const parceiros = await prisma.parceiros.create({ data: req.body });
    res.send(parceiros);
})

app.put('/:id', async (req, res) => {
    const parceiros = await prisma.parceiros.update({ where: { id: req.params.id }, data: req.body });
    res.send(parceiros);

})

app.delete('/:id', async (req, res) => {
    const parceiros = await prisma.parceiros.delete({ where: { id: req.params.id } });
    res.send(`O projeto com o id = ${req.params.id} foi deletado com sucesso! `)
})

module.exports = app;