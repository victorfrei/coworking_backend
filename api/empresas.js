const express = require("express")
const app = express.Router()
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

app.get('/', async (req, res) => {
    const empresas = await prisma.empresas.findMany({ include: { projetos: true, parceiros: true } })
    res.send(empresas);
})

app.post('/', async (req, res) => {
    const empresas = await prisma.empresas.create({ data: req.body });
    res.send(empresas);
})

app.put('/:id', async (req, res) => {
    const empresas = await prisma.empresas.update({ where: { id: req.params.id }, data: req.body });
    res.send(empresas);

})

app.delete('/:id', async (req, res) => {
    const empresas = await prisma.empresas.delete({ where: { id: req.params.id } });
    res.send(`A empresa com o id = ${req.params.id} foi deletado com sucesso! `)
})

module.exports = app;