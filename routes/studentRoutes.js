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

// Rota para listar um aluno pelo ID
router.get('/students/:id', async (req, res) => {
  const studentId = req.params.id;

  try {
    const student = await studentController.getStudentById(studentId);
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ error: 'Aluno não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o aluno' });
  }
});

// Rota para atualizar um aluno pelo ID
router.put('/students/:id', async (req, res) => {
  const studentId = req.params.id;
  const updatedStudent = req.body;

  try {
    const result = await studentController.updateStudent(studentId, updatedStudent);
    res.status(200).json({ id: result });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o aluno' });
  }
});

// Rota para excluir um aluno pelo ID
router.delete('/students/:id', async (req, res) => {
  const studentId = req.params.id;

  try {
    const result = await studentController.deleteStudent(studentId);
    if (result === 1) {
      res.status(204).end(); // 204 No Content - Indica sucesso sem conteúdo a ser retornado
    } else {
      res.status(404).json({ error: 'Aluno não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir o aluno' });
  }
});

module.exports = router;
