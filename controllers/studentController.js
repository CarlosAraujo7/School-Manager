// studentController.js

const pool = require('../database');

// Função para criar um aluno
async function createStudent(student) {
  const { name, birthdate, photo, address, phone, email, password } = student;
  const query = `
    INSERT INTO students (name, birthdate, photo, address, phone, email, password)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id;
  `;

  try {
    const result = await pool.query(query, [name, birthdate, photo, address, phone, email, password]);
    return result.rows[0].id;
  } catch (error) {
    throw error;
  }
}

// Função para listar todos os alunos
async function getAllStudents() {
  const query = 'SELECT * FROM students';

  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw error;
  }
}

// Outras funções de gerenciamento de alunos podem ser implementadas aqui

module.exports = {
  createStudent,
  getAllStudents,
  // Outras funções aqui
};
