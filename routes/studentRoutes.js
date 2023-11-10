// studentRoutes.js

const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Rota para criar um aluno
router.post('/students', async (req, res) => {
  try {
    const studentId = await studentController.createStudent(req.body);
    res.status(201).json({ id: studentId });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o aluno' });
  }
});

// Rota para listar todos os alunos
router.get('/students', async (req, res) => {
  try {
    const students = await studentController.getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os alunos' });
  }
});

// Outras rotas podem ser definidas aqui

module.exports = router;
