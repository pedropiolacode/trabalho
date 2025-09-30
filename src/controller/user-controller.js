import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function cadastrarUsuario(req, res) {
    const { username, password } = req.body;

    const verificarUsernameDB = await prisma.User.findUnique({
        where: {username}
    })

    if (!username || !password) {
        return res.status(400).json({ mensagem: "username e senha são necessários" });
    };

    if (verificarUsernameDB) {
        return res.status(409).json({ mensagem: "username já esta cadastrado" });
    };

    if(password.length < 4) {
        return res.status(400).json({ message: "senha deve ter PELO MENOS 4 caracteres" });
    };

    try {
        const novoUsuario = await prisma.User.create({
            data: {
                username: username,
                password: password
            }
        });

        return res.status(201).json({ mensagem: `Usuario cadastrado com sucesso!` ,novoUsuario });

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
}