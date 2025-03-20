//Script exemplo para criação de tabelas.
//Crie um novo arquivo .js na mesma pasta: script-sql/. 
//Noeamos o arquivo da seguinte forma: tb + [nome da tabela] + .js.
//O script abaixo segue um modelo de criação de tabela.
//Substitua os valores de acordo com a tabela que deseja criar.
//Lembre de alterar apenas o terceiro bloco de código.

//Bloco 01: Importar o sqlite3.
const sqlite3 = require('sqlite3').verbose();
// Importar o path
const path = require('path');
// Caminho do banco de dados
const dbPath = path.resolve(__dirname, '..', 'sqlite3', 'odonto_sys.db');

//Bloco 02: Criar a conexão com o banco de dados.
// Criar conexão com o banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados:', err.message);
  } else {
    console.log('Banco de dados conectado com sucesso!');
  }
});

//Bloco 03: Criar a tabela.
const createTables = () => {
  //Parte que deve ser alterada.
  const sql = `
    CREATE TABLE IF NOT EXISTS dim_especialidade (
      cod_especialidade INTEGER PRIMARY KEY AUTOINCREMENT,
      dsc_especialidade TEXT NOT NULL,
      dsc_descricao TEXT NOT NULL
    )
  `;

  //Modelo padrão.
  db.run(sql, (err) => {
    if (err) {
      console.error('Erro ao criar tabela:', err.message);
    } else {
      console.log('Tabela "valor" criada com sucesso!');
    }
  });
};

// Executar a função para criar as tabelas
createTables();

// Fechar a conexão após a criação das tabelas
db.close();
