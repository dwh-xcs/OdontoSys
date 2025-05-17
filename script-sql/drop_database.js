// Script para remover o banco de dados.

// Importar o módulo fs e path.
const fs = require('fs');
const path = require('path');

// Caminho do banco de dados.
const dbPath = path.resolve(__dirname, '..', 'sqlite3', 'odonto_sys.db');

// Função para remover o banco de dados.
const dropDatabase = () => {
  fs.unlink(dbPath, (err) => {
    if (err) {
      console.error('Erro ao remover o banco de dados:', err.message);
    } else {
      console.log('Banco de dados removido com sucesso!');
    }
  });
};

// Executar a função.
dropDatabase();

