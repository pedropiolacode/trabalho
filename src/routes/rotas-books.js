import express from 'express';
import { adicionarLivro, atualizarLivro, buscarLivro, buscarLivroId, deletarLivro, devolverLivro, pegarLivroEmprestado } from '../controller/books-controller.js';
import { verificarAdmin } from '../middlewares/admin.js';
import { autenticarToken } from '../middlewares/auth-token.js';

const rotas_livros = express.Router();

rotas_livros.get('/books', autenticarToken, (req, res) => {
    buscarLivro(req, res);
});

rotas_livros.get('/books/:id', autenticarToken, (req, res) => {
    buscarLivroId(req, res);
});

rotas_livros.post('/books', autenticarToken, verificarAdmin, (req, res) => {
    adicionarLivro(req, res);
});

rotas_livros.delete('/books/:id', autenticarToken, verificarAdmin, (req, res) => {
    deletarLivro(req, res);
});

rotas_livros.post('/books/:id/borrow', autenticarToken, (req, res) => {
    pegarLivroEmprestado(req, res);
});

rotas_livros.post('/books/:id/return', autenticarToken, (req, res) => {
    devolverLivro(req, res);
});

rotas_livros.patch('/books/:id', autenticarToken, verificarAdmin, (req, res) => {
    atualizarLivro(req, res);
});

export default rotas_livros;