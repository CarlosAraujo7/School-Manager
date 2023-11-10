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

// Função para listar um aluno pelo ID
async function getStudentById(studentId) {
  const query = 'SELECT * FROM students WHERE id = $1';

  try {
    const result = await pool.query(query, [studentId]);
    return result.rows[0]; // Retorna o primeiro aluno encontrado ou null se não houver correspondência
  } catch (error) {
    throw error;
  }
}

// Função para atualizar um aluno pelo ID
async function updateStudent(studentId, updatedStudent) {
  const { name, birthdate, photo, address, phone, email, password } = updatedStudent;
  const query = `
    UPDATE students
    SET name = $2, birthdate = $3, photo = $4, address = $5, phone = $6, email = $7, password = $8
    WHERE id = $1
    RETURNING id;
  `;

  try {
    const result = await pool.query(query, [studentId, name, birthdate, photo, address, phone, email, password]);
    return result.rows[0].id;
  } catch (error) {
    throw error;
  }
}

// Função para excluir um aluno pelo ID
async function deleteStudent(studentId) {
  const query = 'DELETE FROM students WHERE id = $1';

  try {
    const result = await pool.query(query, [studentId]);
    return result.rowCount; // Retorna o número de linhas afetadas (deve ser 1 se o aluno foi excluído com sucesso)
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
};