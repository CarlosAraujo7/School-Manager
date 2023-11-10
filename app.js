// app.js

const express = require('express');
const app = express();
const studentRoutes = require('./routes/studentRoutes');

app.use(express.json());

app.use('/api', studentRoutes);
// Outras rotas podem ser configuradas aqui

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor em execução na porta ${PORT}`);
});
