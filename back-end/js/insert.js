const sqlite3 = require('sqlite3').verbose();
const path = require('path');
//const { queryData } = require('./query.js');

function insertData(tb, values) {
  // Caminho do banco de dados
  const dbPath = path.resolve(__dirname, '..', 'sqlite3', 'odonto_sys.db');

  // Criar conexão com o banco de dados
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Erro ao abrir o banco de dados:', err.message);
      return;
    }
    console.log('Banco de dados conectado com sucesso!');
  });

  const info = {
    'ft_agenda': ['cod_agenda', 'cod_pessoa', 'cod_procedimento', 'dsc_observacao', 'dsc_status', 'dsc_data', 'tme_hora'],
    'dim_endereco': ['cod_endereco', 'dsc_rua', 'cod_cep', 'dsc_numero', 'dsc_complemento'],
    'dim_especialidade': ['cod_especialidade', 'dsc_especialidade', 'dsc_descricao'],
    'dim_pessoa': [
      'cod_pessoa', 'cod_especialidade', 'cod_endereco', 'nme_pessoa', 'nme_sobrenome', 
      'dsc_cpf', 'dsc_rg', 'dsc_restricao', 'cod_ddd', 'num_celular', 'dsc_email', 'dsc_login', 
      'dsc_senha', 'dsc_nascimento', 'dsc_pessoa', 'flg_funcao', 'dsc_status'
    ],
    'dim_procedimento': ['cod_procedimento',  'nme_procedimento', 'dsc_procedimento', 'dsc_pos_procedimento', 'url_foto', 'dsc_status']
  };

  const columns = info[tb];
  if (!columns) {
    console.error('Erro: A tabela ${tb} não existe.');
    return;
  }

  const placeholders = columns.map(() => '?').join(', '); // Cria placeholders dinâmicos
  const sql = `INSERT INTO ${tb} (${columns.join(', ')}) VALUES (${placeholders})`;

  db.run(sql, values, function (err) {
    if (err) {
      console.error('Erro ao inserir dados:', err.message);
    } else {
      console.log('Dados inseridos com sucesso! ID: ${this.lastID}');
    }
  });

  db.close();
}

// Exemplo de inserção na tabela dim_especialidade
insertData('dim_especialidade', [2, 'Teste', 'Teste de especialidade']);