const { createConnection, closeConnection } = require('../script-sql/connection.js');

// Função para buscar agendamentos relacionando as tabelas.
// Parâmetros: cod_agenda, dsc_data, nme_profissional, nme_pessoa, cod_cpf, outputFormat (1 para JSON, 2 para Tabela), callback.

function get_agendamento(cod_agenda, dsc_data, nme_profissional, nme_pessoa, cod_cpf, outputFormat, callback) {
  // Verifica se o parâmetro obrigatório `outputFormat` é válido.
  if (outputFormat !== 1 && outputFormat !== 2) {
    return callback(new Error("O parâmetro 'outputFormat' deve ser 1 (JSON) ou 2 (Tabela)."));
  }

  // Cria a conexão com o banco de dados.
  const db = createConnection();

  // Consulta SQL base.
  let query = `
    SELECT 
        A.cod_agenda,
        A.dsc_data,
        A.tme_hora,

        A.cod_profissional,
        PF.nme_pessoa AS nme_profissional,
        E.cod_especialidade,
        E.dsc_especialidade,
        E.dsc_descricao,

        A.cod_pessoa,
        P.nme_pessoa,
        P.cod_cpf,
        P.dsc_pessoa,
        P.num_celular,
        P.dsc_email,
        P.flg_funcao,

        PC.cod_procedimento,
        PC.nme_procedimento,
        PC.dsc_procedimento,
        PC.dsc_pos_procedimento,

        A.dsc_observacao  

    FROM ft_agenda A
    INNER JOIN dim_pessoa PF ON A.cod_profissional = PF.cod_pessoa
    INNER JOIN dim_pessoa P ON A.cod_pessoa = P.cod_pessoa
    INNER JOIN dim_procedimento PC ON A.cod_procedimento = PC.cod_procedimento
    LEFT JOIN dim_especialidade E ON A.cod_profissional = E.cod_especialidade
    WHERE A.dsc_status = 1
  `;

  // Mapeamento de parâmetros para colunas.
  const filters = {
    cod_agenda: 'A.cod_agenda',
    dsc_data: 'A.dsc_data',
    nme_profissional: 'PF.nme_pessoa',
    nme_pessoa: 'P.nme_pessoa',
    cod_cpf: 'P.cod_cpf',
  };

  // Parâmetros para a consulta.
  const params = [];
  const options = { cod_agenda, dsc_data, nme_profissional, nme_pessoa, cod_cpf };

  // Adiciona filtros dinamicamente com base nos parâmetros fornecidos.
  for (const [key, value] of Object.entries(options)) {
    // Verifica se o valor não é nulo ou indefinido.
    if (value !== null && value !== undefined) {
      // Adiciona o filtro à consulta SQL.
      if (key === 'nme_profissional' || key === 'nme_pessoa') {
        // Se o filtro for de texto, usa LIKE para permitir buscas parciais.
        query += ` AND ${filters[key]} LIKE ?`;
        params.push(`%${value}%`);
      } else {
        // Para outros filtros, usa o operador de igualdade.
        query += ` AND ${filters[key]} = ?`;
        params.push(value);
      }
    }
  }

  // Executa a consulta SQL.
  db.all(query, params, (err, rows) => {
    if (err) {
      // Se ocorrer um erro, exibe a mensagem de erro no console e chama o callback com o erro.
      console.error("Erro ao buscar dados:", err.message);
      if (typeof callback === "function") callback(err);
    } else {
      // Se não houver erro, verifica o formato de saída desejado.
      if (outputFormat === 1) {
        // Retorna os dados no formato JSON.
        if (typeof callback === "function") callback(null, rows);
      } else if (outputFormat === 2) {
        // Retorna os dados no formato de tabela.
        console.table(rows);
        if (typeof callback === "function") callback(null, "Tabela exibida no console.");
      }
    }
    // Fecha a conexão com o banco de dados após a execução da consulta.
    closeConnection(db);
  });
}

module.exports = { get_agendamento };

// Exemplo de uso da função get_agendamento com retorno em Tabela.
// get_agendamento(null, null, null, null, '77777777777', 2, (err, message) => {
//   if (err) {
//     console.error("Erro:", err);
//   } else {
//     console.log(message);
//   }
// });

// Exemplo de uso da função get_agendamento com retorno em JSON.
// get_agendamento(null, null, null, null, '77777777777', 1, (err, agendamentos) => {
//   if (err) {
//     console.error("Erro:", err);
//   } else {
//     console.log("Agendamentos encontrados (JSON):", agendamentos);
//   }
// });