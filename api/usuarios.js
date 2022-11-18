const express = require("express")
const app = express.Router()
const PrismaClient = require('@prisma/client')
const prisma = new PrismaClient.PrismaClient()
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const { decode } = require("punycode");


app.get('/', async (req, res) => {
    const usuario = await prisma.usuarios.findMany();
    res.send(usuario)
})

app.put('/:id', async (req, res) => {
    const usuarios = await prisma.usuarios.update({ where: { id: req.params.id }, data: req.body })
    res.send(`usuarios put com id = ${req.params.id}`)
})

app.post('/cadastrar', async (req, res) => {
    bcrypt.genSalt(saltRounds, async (err, salt) => {
        bcrypt.hash(req.body.senha, salt, async (err, hash) => {
            const usuario = await prisma.usuarios.create({ data: { nome: req.body.nome, email: req.body.email, senha: req.body.senha } })
            res.send(usuario)   // Store hash in your password DB.
        });
    });
})

app.post('/logar', async (req, res) => {

    const usuario = await prisma.usuarios.findFirst({ where: { email: req.body.email } });
    bcrypt.compare(req.body.senha, usuario.senha, function (err, result) {
        if (result) {
            var token = jwt.sign(usuario, process.env.HASH, { expireIn: '1h' });
            res.send(token)
        }
        else {
            res.send(null)
        } // result == true
    });
})

app.post('/refresh', async (req, res) => {
    jwt.verify(req.body.token, process.env.HASH, async (err, decoded) => {
        if (err) {
            res.send(null)
        }
        else {
            const usuario = await prisma.usuarios.findFirst({ where: { token: decoded.usuario.id } });
            var token = jwt.sign(usuario, process.env.HASH, { expireIn: '1h' });
            res.send(token)
        }
    });



})



module.exports = app;