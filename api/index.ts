import PrismaClient from '@prisma/client'
import Express from 'express'
const app = Express()
const port = 3000
const prisma = new PrismaClient.PrismaClient()
app.use(Express.json())
app.use(Express.static('public'))
import { v4 } from 'uuid';

app.get('/api', (req, res) => {
    const path = `/api/item/${v4()}`;
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
  });

// projetos

app.get('/api/projetos', async (req, res) => {
    const projetos = await prisma.projetos.findMany();
    res.send(projetos);
})

app.post('/api/projetos', async (req, res) => {
    const projetos = await prisma.projetos.create({ data: req.body });
    res.send(projetos);
})

app.put('/api/projetos/:id', async (req, res) => {
    const projetos = await prisma.projetos.update({ where: { id: req.params.id }, data: req.body });
    res.send(projetos);
})

app.delete('/api/projetos/:id', async (req, res) => {
    const projetos = await prisma.projetos.delete({ where: { id: req.params.id } });
    res.send(`O projeto com o id = ${req.params.id} foi deletado com sucesso! `)
})

//parceiros

app.get('/api/parceiros', async (req, res) => {
    const parceiros = await prisma.parceiros.findMany();
    res.send(parceiros);
})

app.post('/api/parceiros', async (req, res) => {
    const parceiros = await prisma.parceiros.create({ data: req.body });
    res.send(parceiros);
})

app.put('/api/parceiros/:id', async (req, res) => {
    const parceiros = await prisma.parceiros.update({ where: { id: req.params.id }, data: req.body });
    res.send(parceiros);

})

app.delete('/api/parceiros/:id', async (req, res) => {
    const parceiros = await prisma.parceiros.delete({ where: { id: req.params.id } });
    res.send(`O projeto com o id = ${req.params.id} foi deletado com sucesso! `)
})

//usuarios

app.post('/api/usuarios', async (req, res) => {
    const usuarios = await prisma.usuario.findMany();
    res.send(usuarios)
})

app.put('/api/usuarios/:id', async (req, res) => {
    const usuarios = await prisma.usuario.update({ where: { id: req.params.id }, data: req.body })
    res.send(`usuarios put com id = ${req.params.id}`)
})


// sessao

app.get('/api/sessao', async (req, res) => {
    const sessao = await prisma.sessao.findMany();
    res.send(sessao)
})

app.post('/api/sessao', async (req, res) => {
    const sessao = await prisma.sessao.create({ data: req.body })
    res.send(sessao)
})

app.put('/api/sessao/:id', async (req, res) => {
    const sessao = await prisma.sessao.update({ where: { id: req.params.id }, data: req.body })
    res.send(sessao)
})

app.delete('/api/sessao/:id', async(req, res) => {
    const sessao = await prisma.sessao.delete({where: {id: req.params.id}});
    res.send(`A Sessão com o id = ${req.params.id} foi deletado com sucesso! `)
})


//restriçao

app.get('*', (req, res) => {
    res.send('Acesso Negado!!!!!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})