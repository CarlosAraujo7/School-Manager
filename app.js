const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    port: 5432, // Porta padrão do PostgreSQL
    password: '0701'
});

app.use(bodyParser.json());

// Rota para cadastrar aluno
app.post('/alunos', async (req, res) => {
    try {
        const { nome, data_nascimento, foto, endereco, telefone, email, senha } = req.body;
        const result = await pool.query(
            'INSERT INTO alunos (nome, data_nascimento, foto, endereco, telefone, email, senha) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [nome, data_nascimento, foto, endereco, telefone, email, senha]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para obter todos os alunos
app.get('/alunos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM alunos');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para obter um aluno por ID
app.get('/alunos/:id', async (req, res) => {
    try {
        const alunoId = req.params.id;
        const result = await pool.query('SELECT * FROM alunos WHERE aluno_id = $1', [alunoId]);

        if (result.rows.length === 0) {
            res.status(404).send('Aluno não encontrado');
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para atualizar um aluno existente
app.put('/alunos/:id', async (req, res) => {
    try {
        const alunoId = req.params.id;
        const { nome, data_nascimento, foto, endereco, telefone, email, senha } = req.body;
        const result = await pool.query(
            'UPDATE alunos SET nome = $1, data_nascimento = $2, foto = $3, endereco = $4, telefone = $5, email = $6, senha = $7 WHERE aluno_id = $8 RETURNING *',
            [nome, data_nascimento, foto, endereco, telefone, email, senha, alunoId]
        );

        if (result.rows.length === 0) {
            res.status(404).send('Aluno não encontrado');
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para apagar um aluno
app.delete('/alunos/:id', async (req, res) => {
    try {
        const alunoId = req.params.id;
        const result = await pool.query('DELETE FROM alunos WHERE aluno_id = $1 RETURNING *', [alunoId]);

        if (result.rows.length === 0) {
            res.status(404).send('Aluno não encontrado');
        } else {
            res.json({ mensagem: 'Aluno apagado com sucesso' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para cadastrar professor
app.post('/professores', async (req, res) => {
    try {
        const { nome, data_nascimento, foto, siape, endereco, telefone, email, senha } = req.body;
        const result = await pool.query(
            'INSERT INTO professores (nome, data_nascimento, foto, siape, endereco, telefone, email, senha) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [nome, data_nascimento, foto, siape, endereco, telefone, email, senha]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para obter todos os professores
app.get('/professores', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM professores');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para obter um professor por ID
app.get('/professores/:id', async (req, res) => {
    try {
        const professorId = req.params.id;
        const result = await pool.query('SELECT * FROM professores WHERE professor_id = $1', [professorId]);

        if (result.rows.length === 0) {
            res.status(404).send('Professor não encontrado');
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para atualizar um professor existente
app.put('/professores/:id', async (req, res) => {
    try {
        const professorId = req.params.id;
        const { nome, data_nascimento, foto, siape, endereco, telefone, email, senha } = req.body;
        const result = await pool.query(
            'UPDATE professores SET nome = $1, data_nascimento = $2, foto = $3, siape = $4, endereco = $5, telefone = $6, email = $7, senha = $8 WHERE professor_id = $9 RETURNING *',
            [nome, data_nascimento, foto, siape, endereco, telefone, email, senha, professorId]
        );

        if (result.rows.length === 0) {
            res.status(404).send('Professor não encontrado');
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para apagar um professor
app.delete('/professores/:id', async (req, res) => {
    try {
        const professorId = req.params.id;
        const result = await pool.query('DELETE FROM professores WHERE professor_id = $1 RETURNING *', [professorId]);

        if (result.rows.length === 0) {
            res.status(404).send('Professor não encontrado');
        } else {
            res.json({ mensagem: 'Professor apagado com sucesso' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// ...

// Rota para cadastrar turma
app.post('/turmas', async (req, res) => {
    try {
        const { disciplina_id, horario, sala_aula, professor_id } = req.body;
        const result = await pool.query(
            'INSERT INTO turmas (disciplina_id, horario, sala_aula, professor_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [disciplina_id, horario, sala_aula, professor_id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para obter todas as turmas
app.get('/turmas', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM turmas');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para obter uma turma por ID
app.get('/turmas/:id', async (req, res) => {
    try {
        const turmaId = req.params.id;
        const result = await pool.query('SELECT * FROM turmas WHERE turma_id = $1', [turmaId]);

        if (result.rows.length === 0) {
            res.status(404).send('Turma não encontrada');
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para atualizar uma turma existente
app.put('/turmas/:id', async (req, res) => {
    try {
        const turmaId = req.params.id;
        const { disciplina_id, horario, sala_aula, professor_id } = req.body;
        const result = await pool.query(
            'UPDATE turmas SET disciplina_id = $1, horario = $2, sala_aula = $3, professor_id = $4 WHERE turma_id = $5 RETURNING *',
            [disciplina_id, horario, sala_aula, professor_id, turmaId]
        );

        if (result.rows.length === 0) {
            res.status(404).send('Turma não encontrada');
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para excluir uma turma
app.delete('/turmas/:id', async (req, res) => {
    try {
        const turmaId = req.params.id;
        const result = await pool.query('DELETE FROM turmas WHERE turma_id = $1 RETURNING *', [turmaId]);

        if (result.rows.length === 0) {
            res.status(404).send('Turma não encontrada');
        } else {
            res.json({ mensagem: 'Turma apagada com sucesso' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para cadastrar disciplina
app.post('/disciplinas', async (req, res) => {
    try {
        const { nome } = req.body;
        const result = await pool.query(
            'INSERT INTO disciplinas (nome) VALUES ($1) RETURNING *',
            [nome]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});


// Rota para obter todas as disciplinas
app.get('/disciplinas', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM disciplinas');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para cadastrar nota de um aluno em uma disciplina
app.post('/notas', async (req, res) => {
    try {
        const { aluno_id, disciplina_id, nota } = req.body;
        const result = await pool.query(
            'INSERT INTO notas (aluno_id, disciplina_id, nota) VALUES ($1, $2, $3) RETURNING *',
            [aluno_id, disciplina_id, nota]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para obter todas as notas de um aluno
app.get('/notas/:aluno_id', async (req, res) => {
    try {
        const alunoId = req.params.aluno_id;
        const result = await pool.query('SELECT * FROM notas WHERE aluno_id = $1', [alunoId]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para calcular a média de um aluno em todas as disciplinas
app.get('/media/:aluno_id', async (req, res) => {
    try {
        const alunoId = req.params.aluno_id;

        // Obter todas as disciplinas
        const disciplinasResult = await pool.query('SELECT disciplina_id FROM disciplinas');
        const disciplinas = disciplinasResult.rows;

        // Calcular a média para cada disciplina
        const medias = [];
        for (const disciplina of disciplinas) {
            const disciplinaId = disciplina.disciplina_id;

            const result = await pool.query(
                'SELECT AVG(nota) as media FROM notas WHERE aluno_id = $1 AND disciplina_id = $2',
                [alunoId, disciplinaId]
            );

            if (result.rows.length > 0 && result.rows[0].media !== null) {
                medias.push({
                    disciplina_id: disciplinaId,
                    media: result.rows[0].media,
                });
            }
        }

        res.json(medias);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para calcular a média de um aluno em uma disciplina
app.get('/media/:aluno_id/:disciplina_id', async (req, res) => {
    try {
        const alunoId = req.params.aluno_id;
        const disciplinaId = req.params.disciplina_id;

        const result = await pool.query(
            'SELECT AVG(nota) as media FROM notas WHERE aluno_id = $1 AND disciplina_id = $2',
            [alunoId, disciplinaId]
        );

        if (result.rows.length > 0 && result.rows[0].media !== null) {
            res.json({
                aluno_id: alunoId,
                disciplina_id: disciplinaId,
                media: result.rows[0].media,
            });
        } else {
            res.status(404).send('Média não encontrada para o aluno nesta disciplina');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
