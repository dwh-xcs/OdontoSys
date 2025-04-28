// Script para criar as tabelas para o sistema OdontoSys.

// Conection Database.
const {createConnection, closeConnection} = require('./connection.js');

// Cria a tabela no banco de dados.
function createTables(sql) {
  // Criar conexão com o banco de dados.
  const db = createConnection();

  // Verifica se a conexão foi criada com sucesso.
  db.run(sql, (err) => {
    if (err) {
      console.error('Erro ao criar tabela:', err.message);
    } else {
      console.log('Tabela criada com sucesso!');
    }
  });

  // Fecha a conexão com o banco de dados.
  closeConnection(db);
}

// Cria as tabelas no banco de dados.
const dim_procedimento = `
    
    CREATE TABLE dim_procedimento (
    cod_procedimento INTEGER PRIMARY KEY AUTOINCREMENT,
    nme_procedimento TEXT NOT NULL,
    dsc_procedimento TEXT NOT NULL,
    dsc_pos_procedimento TEXT NOT NULL,
    dsc_status INTEGER DEFAULT 1
)`;

const dim_especialidade = `

    CREATE TABLE IF NOT EXISTS dim_especialidade (
    cod_especialidade INTEGER PRIMARY KEY AUTOINCREMENT,
    dsc_especialidade TEXT NOT NULL,
    dsc_descricao TEXT NOT NULL
)`;

const dim_endereco = `

    CREATE TABLE dim_endereco (
    cod_endereco INTEGER PRIMARY KEY AUTOINCREMENT,
    dsc_rua TEXT NOT NULL,
    cod_cep TEXT NOT NULL,
    dsc_numero INTEGER NOT NULL,
    dsc_complemento TEXT
)`;

const dim_pessoa = `
    CREATE TABLE IF NOT EXISTS dim_pessoa (
    cod_pessoa INTEGER PRIMARY KEY AUTOINCREMENT,
    cod_especialidade INTEGER,
    cod_endereco INTEGER,
    nme_pessoa TEXT NOT NULL,
    dsc_cpf TEXT NOT NULL,
    dsc_restricao TEXT NOT NULL,
    num_celular TEXT NOT NULL,
    dsc_email TEXT NOT NULL,
    dsc_login TEXT NOT NULL,
    dsc_senha TEXT NOT NULL,
    dsc_nascimento TEXT NOT NULL,
    dsc_pessoa TEXT NOT NULL,
    flg_funcao TEXT NOT NULL,
    dsc_status INTEGER DEFAULT 1,

    FOREIGN KEY (cod_especialidade) REFERENCES dim_especialidade(cod_especialidade),
    FOREIGN KEY (cod_endereco) REFERENCES dim_endereco(cod_endereco)
)`;

const ft_agenda = `
    CREATE TABLE IF NOT EXISTS ft_agenda (
    cod_agenda INTEGER PRIMARY KEY AUTOINCREMENT,
    cod_pessoa INTEGER,
    cod_procedimento INTEGER,
    dsc_observacao TEXT,
    dsc_status INTEGER DEFAULT 1,
    dsc_data TEXT NOT NULL,
    tme_hora TEXT NOT NULL,

    FOREIGN KEY (cod_pessoa) REFERENCES dim_pessoa(cod_pessoa),
    FOREIGN KEY (cod_procedimento) REFERENCES dim_procedimento(cod_procedimento)
)`;

// Lista de tabelas a serem criadas.
const list_table = [dim_especialidade, dim_endereco, dim_pessoa, dim_procedimento, ft_agenda]

// Loop para criar as tabelas no banco de dados.
for (let i = 0; i < list_table.length; i++) {
  createTables(list_table[i]);
}



