import express from 'express';
import rotas_livros from './routes/rotas-books.js';
import rotas_publicas from './routes/rotas-publicas.js';

const api_biblioteca = express();
api_biblioteca.use(express.json());
api_biblioteca.use('/', rotas_livros);
api_biblioteca.use('/', rotas_publicas)

api_biblioteca.listen(3000, () => {
    console.log("start sv")
});

