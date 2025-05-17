const { createConnection, closeConnection } = require('../script-sql/connection.js');

// Função para buscar agendamentos relacionando as tabelas.
// Parâmetros: cod_agenda, dsc_data, nme_profissional, nme_pessoa, cod_cpf, outputFormat (1 para JSON, 2 para Tabela), callback.

function get_pessoa(cod_pessoa, nme_pessoa, cod_cpf, outputFormat, callback) {
  // Verifica se o parâmetro obrigatório `outputFormat` é válido.
  if (outputFormat !== 1 && outputFormat !== 2) {
    return callback(new Error("O parâmetro 'outputFormat' deve ser 1 (JSON) ou 2 (Tabela)."));
  }

  // Cria a conexão com o banco de dados.
  const db = createConnection();
  
  // Consulta SQL base.
  let query = `
    SELECT 
        P.cod_pessoa,
        P.nme_pessoa,
        P.cod_cpf,
        P.dsc_pessoa,
        P.num_celular,
        P.dsc_email,
        P.flg_funcao,
        p.dsc_status,
  
        EN.dsc_rua,
        EN.dsc_numero,
        EN.dsc_complemento,
        EN.cod_cep,
  
        ES.dsc_especialidade,
        ES.dsc_descricao
            
        FROM dim_pessoa P
        LEFT JOIN dim_endereco EN ON P.cod_endereco = EN.cod_endereco
        LEFT JOIN dim_especialidade ES ON P.cod_especialidade = ES.cod_especialidade
        WHERE P.dsc_status = 1
    `;

    // Mapeamento de parâmetros para colunas.
    const filters = {
        cod_pessoa: 'P.cod_pessoa',
        nme_pessoa: 'P.nme_pessoa',
        cod_cpf: 'P.cod_cpf'
    };

    // Parâmetros para a consulta.
    const params = [];
    const options = { cod_pessoa, nme_pessoa, cod_cpf };

    // Adiciona filtros dinamicamente com base nos parâmetros fornecidos.
    for (const [key, value] of Object.entries(options)) {
        // Verifica se o valor não é nulo ou indefinido.
        if (value !== null && value !== undefined) {
        // Adiciona o filtro à consulta SQL.
        if (key === 'nme_pessoa') {
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

module.exports = { get_pessoa };

// Exemplo de uso da função get_agendamento com retorno em Tabela.
// get_agendamento(null, null, null, null, '77777777777', 2, (err, message) => {
//   if (err) {
//     console.error("Erro:", err);
//   } else {
//     console.log(message);
//   }
// });

// Exemplo de uso da função get_agendamento com retorno em JSON.
// get_pessoa(null, null, '22222222222', 1, (err, agendamentos) => {
//   if (err) {
//     console.error("Erro:", err);
//   } else {
//     console.log("Agendamentos encontrados (JSON):", agendamentos);
//   }
// });