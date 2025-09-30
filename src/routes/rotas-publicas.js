import express from 'express';
import { cadastrarUsuario } from '../controller/user-controller.js';

const rotas_publicas = express.Router();

rotas_publicas.post('/auth/register', (req, res) => {
    cadastrarUsuario(req, res);
});

export default rotas_publicas;