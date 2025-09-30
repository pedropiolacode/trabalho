import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function buscarLivro(req, res) {
    try {
        const livrosBD = await prisma.Book.findMany();
        res.status(200).json(livrosBD);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    };
};

export async function buscarLivroId(req, res) {
    try {
        const id = parseInt(req.params.id);
        const book = await prisma.Book.findUnique( 
            {
                where: {
                    id:Number(id)
                }
            }
        );

        if(isNaN(id)) {
            return res.status(400).json({ mensagem: "ID inválido, precisa ser um numero" });
        };

        if (!book) {
            return res.status(404).json({ mensagem: "livro não encontrado" });
        };

        res.status(200).json(book);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    };
};

export async function adicionarLivro(req, res) {
    const {title, autor} = req.body;

    if (!title || !autor) {
        return res.status(400).json({ mensagem: "Titulo e autor são obrigatórios" });
    };

    try {
        const novoLivro = await prisma.Book.create({
            data: {
                title:title,
                autor:autor
            }
        });

        return res.status(201).json({ mensagem: `O Livro foi cadastrado com sucesso!` ,novoLivro });


    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    };
};

export async function deletarLivro(req, res) {
    const idLivro = parseInt(req.params.id);
    
    if(isNaN(idLivro)) {
        return res.status(400).json({ mensagem: "ID inválido, precisa ser um numero" });
    };

    if (!idLivro) {
        return res.status(400).json({mensagem: "é necessario um ID para realizar a tarefa"});
    };  

    try {
        const removerLivro = await prisma.Book.delete({
            where: {
                id:Number(idLivro)
            }
        });

        res.status(200).json({mensagem: `o livro ${removerLivro.title} foi deletado`});

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    };
    
};

export async function pegarLivroEmprestado(req, res) {
    const idLivroEmprestar = parseInt(req.params.id);

    if(isNaN(idLivroEmprestar)) {
        return res.status(400).json({ mensagem: "ID inválido, precisa ser um numero" });
    };


    if (!idLivroEmprestar) {
        return res.status(400).json({mensagem: "é necessario um ID para realizar a tarefa"});
    };


    try {
        const idLivro = await prisma.Book.findUnique({
            where: {
                id:Number(idLivroEmprestar)
            }
        });

        if (!idLivro) {
            return res.status(404).json({mensagem: "o livro nao existe no banco de dados"});
        };



        if (!idLivro.available) {
            return res.status(400).json({ mensagem: "o livro já está emprestado" });
        };


        const updateLivro = await prisma.Book.update({
            where: {
                id:Number(idLivroEmprestar)
            },

            data: {
                available: false
            }

        });

        res.status(200).json({mensagem: "o livro foi emprestado"})

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    };
};

export async function devolverLivro(req, res) {
    const idLivroEmprestado = parseInt(req.params.id);

    if(isNaN(idLivroEmprestado)) {
        return res.status(400).json({ mensagem: "ID inválido, precisa ser um numero" });
    };


    if (!idLivroEmprestado) {
        return res.status(400).json({mensagem: "é necessario um ID para realizar a tarefa"});
    };


    try {
        const idLivroEncontrado = await prisma.Book.findUnique({
            where: {
                id:Number(idLivroEmprestado)
            }
        });

        if (!idLivroEncontrado) {
            return res.status(404).json({mensagem: "o livro nao existe no banco de dados"});
        };



        if (idLivroEncontrado.available) {
            return res.status(400).json({ mensagem: "o livro nao está emprestado" });
        };


        const updateLivro = await prisma.Book.update({
            where: {
                id:Number(idLivroEmprestado)
            },

            data: {
                available: true
            }

        });

        res.status(200).json({mensagem: "o livro foi devolvido"})

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    };
};


export async function atualizarLivro(req, res) {
    const idAtualizarLivro = parseInt(req.params.id);

    if (isNaN(idAtualizarLivro)) {
        return res.status(400).json({ mensagem: "ID inválido, precisa ser um numero" });
    };

    try {
        const {title, autor, available} = req.body;

        if (!title || !autor || available === undefined) {
            return res.status(404).json({mensagem: "as informacoes do livro devem estar completas"});
        };

        const tempUpdate = await prisma.Book.update({
            where: {
                id:Number(idAtualizarLivro)
            },
            data: {
                title: title,
                autor: autor,
                available: available
            }
        });

        res.status(200).json({mensagem: `informacoes do livro atualizadas com sucesso`})


    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    };
};

