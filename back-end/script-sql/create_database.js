// Script para criar o banco de dados SQLite3 para o sistema OdontoSys.

// Importar o sqlite3.
const sqlite3 = require('sqlite3').verbose();
// Importar o path.
const path = require('path');
// Importar o fs.
const fs = require('fs');

// Caminho do banco de dados.
const dbPath = path.resolve(__dirname, '..', 'sqlite3', 'odonto_sys.db');

// Função para criar o banco de dados.
const createDatabase = () => {
  // Verificar se o banco de dados já existe.
  if (fs.existsSync(dbPath)) {
    console.log('O banco de dados já existe no caminho especificado.');
    return;
  }

  // Criar conexão com o banco de dados.
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Erro ao criar o banco de dados:', err.message);
    } else {
      console.log('Banco de dados criado com sucesso!');
    }
  });

  // Fechar a conexão após criar o banco.
  db.close((err) => {
    if (err) {
      console.error('Erro ao fechar o banco de dados:', err.message);
    }
  });
};

// Executar a função.
createDatabase();