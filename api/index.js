"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("@prisma/client"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const prisma = new client_1.default.PrismaClient();
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
const uuid_1 = require("uuid");
app.get('/api', (req, res) => {
    const path = `/api/item/${(0, uuid_1.v4)()}`;
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});
// projetos
app.get('/api/projetos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projetos = yield prisma.projetos.findMany();
    res.send(projetos);
}));
app.post('/api/projetos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projetos = yield prisma.projetos.create({ data: req.body });
    res.send(projetos);
}));
app.put('/api/projetos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projetos = yield prisma.projetos.update({ where: { id: req.params.id }, data: req.body });
    res.send(projetos);
}));
app.delete('/api/projetos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projetos = yield prisma.projetos.delete({ where: { id: req.params.id } });
    res.send(`O projeto com o id = ${req.params.id} foi deletado com sucesso! `);
}));
//parceiros
app.get('/api/parceiros', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parceiros = yield prisma.parceiros.findMany();
    res.send(parceiros);
}));
app.post('/api/parceiros', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parceiros = yield prisma.parceiros.create({ data: req.body });
    res.send(parceiros);
}));
app.put('/api/parceiros/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parceiros = yield prisma.parceiros.update({ where: { id: req.params.id }, data: req.body });
    res.send(parceiros);
}));
app.delete('/api/parceiros/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parceiros = yield prisma.parceiros.delete({ where: { id: req.params.id } });
    res.send(`O projeto com o id = ${req.params.id} foi deletado com sucesso! `);
}));
//usuarios
app.post('/api/usuarios', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield prisma.usuario.findMany();
    res.send(usuarios);
}));
app.put('/api/usuarios/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield prisma.usuario.update({ where: { id: req.params.id }, data: req.body });
    res.send(`usuarios put com id = ${req.params.id}`);
}));
// sessao
app.get('/api/sessao', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sessao = yield prisma.sessao.findMany();
    res.send(sessao);
}));
app.post('/api/sessao', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sessao = yield prisma.sessao.create({ data: req.body });
    res.send(sessao);
}));
app.put('/api/sessao/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sessao = yield prisma.sessao.update({ where: { id: req.params.id }, data: req.body });
    res.send(sessao);
}));
app.delete('/api/sessao/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sessao = yield prisma.sessao.delete({ where: { id: req.params.id } });
    res.send(`A Sessão com o id = ${req.params.id} foi deletado com sucesso! `);
}));
//restriçao
app.get('*', (req, res) => {
    res.send('Acesso Negado!!!!!');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
