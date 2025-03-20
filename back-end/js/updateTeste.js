const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho do banco de dados
const dbPath = path.resolve(__dirname, '..', 'sqlite3', 'odonto_sys.db');

// Criar conexão com o banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados:', err.message);
  } else {
    console.log('Banco de dados conectado com sucesso!');
  }
});

const queryData = () => {
  db.all('SELECT * FROM especialidade', (err, rows) => {
    if (err) {
      console.error('Erro ao consultar dados:', err.message);
    } else {
      console.log('Especialidades encontradas:', rows);
    }
  });
};

const updateData = (id, newDescricao) => {
  const sql = `UPDATE especialidade SET dsc_descricao = ? WHERE cod_especialidade = ?`;
  const values = [newDescricao, id];

  db.run(sql, values, function (err) {
    if (err) {
      console.error('Erro ao atualizar dados:', err.message);
    } else {
      console.log(`Dados atualizados com sucesso! Linhas afetadas: ${this.changes}`);
    }
  });
};

// Executar as funções
queryData();
updateData(1, 'Nova descrição para a especialidade');

// Fechar a conexão após as operações
db.close();