// // Script para inserir dados padrões nas tabelas do banco de dados

// const { insertData } = require('./insert.js');

// //dim_procedimento
// insertData('dim_procedimento', [1, 'Limpeza (Profilaxia)', 'Remoção de placa bacteriana e tártaro para prevenir cáries e doenças gengivais.', 'Evitar alimentos corantes por 24 horas e manter boa higiene bucal.', 1]);
// insertData('dim_procedimento', [2, 'Restauração (Obturação)', 'Tratamento de cáries com a aplicação de resina ou amálgama para reconstruir o dente.', 'Evitar alimentos duros por 24 horas e manter boa higiene bucal.', 1]);
// insertData('dim_procedimento', [3, 'Canal (Tratamento Endodôntico)', 'Remoção da polpa infeccionada do dente, seguido da vedação do canal.', 'Evitar mastigar alimentos duros do lado do dente tratado por 48 horas.', 1]);
// insertData('dim_procedimento', [4, 'Clareamento Dental', 'Procedimento estético para clarear a cor dos dentes.', 'Evitar alimentos com corantes e bebidas ácidas por 48 horas.', 1]);
// insertData('dim_procedimento', [5, 'Extração Dental', 'Remoção de dentes comprometidos, inclusos ou em excesso.', 'Aplicar gelo nas primeiras 24 horas para reduzir o inchaço e evitar alimentos sólidos.', 1]);
// insertData('dim_procedimento', [6, 'Implante Dentário', 'Colocação de pino de titânio no osso para suportar prótese dentária.', 'Evitar alimentos duros e quentes por 7 dias, e não fumar para acelerar a cicatrização.', 1]);
// insertData('dim_procedimento', [7, 'Aparelho Ortodôntico', 'Correção do alinhamento dos dentes e da mordida com dispositivos fixos ou móveis.', 'Evitar alimentos pegajosos e duros que possam danificar o aparelho.', 1]);
// insertData('dim_procedimento', [8, 'Facetas de Porcelana', 'Lâminas finas aplicadas sobre os dentes para melhorar a estética.', 'Evitar alimentos duros ou pegajosos que possam danificar as facetas.', 1]);
// insertData('dim_procedimento', [9, 'Prótese Dentária', 'Substituição de dentes ausentes com próteses fixas (coroas, pontes) ou removíveis.', 'Evitar alimentos pegajosos e fazer a higienização adequada da prótese.', 1]);
// insertData('dim_procedimento', [10, 'Cirurgia de Siso', 'Extração dos terceiros molares (dentes do siso), geralmente por falta de espaço ou inflamação.', 'Aplicar gelo nas primeiras 24 horas e evitar alimentos sólidos nas primeiras 48 horas.', 1]);
// insertData('dim_procedimento', [11, 'Raspagem e Alisamento Radicular', 'Limpeza profunda para tratar a gengivite e periodontite, removendo tártaro abaixo da gengiva.', 'Evitar alimentos duros e muito quentes nas primeiras 24 horas. Manter a higiene bucal com cuidado para evitar irritação na gengiva.', 1]);
// insertData('dim_procedimento', [12, 'Aplicação de Flúor', 'Fortalecimento do esmalte dental para prevenir cáries, comum em crianças.', 'Evitar comer ou beber por 30 minutos após a aplicação para garantir a absorção do flúor.', 1]);
// insertData('dim_procedimento', [13, 'Planejamento Digital do Sorriso (DSD)', 'Uso de tecnologia para simular resultados estéticos antes de tratamentos.', 'Não há cuidados específicos pós-procedimento, pois é uma simulação digital. Cuidados dependem do tratamento subsequente escolhido.', 1]);


// const { insertData } = require('./insert.js');
// //dim_especialidade
// insertData('dim_especialidade', [0, 'Cliente', 'Cliente da Odonto-Sys.']);
// insertData('dim_especialidade', [1, 'Ortodontia', 'Corrige a posição dos dentes e dos ossos maxilares, utilizando aparelhos.']);
// insertData('dim_especialidade', [2, 'Implantodontia', 'Realiza implantes dentários para substituir dentes ausentes.']);
// insertData('dim_especialidade', [3, 'Periodontia', 'Trata doenças da gengiva e do osso que sustenta os dentes.']);
// insertData('dim_especialidade', [4, 'Endodontia', 'Atua no tratamento de canais radiculares e infecções na polpa do dente.']);
// insertData('dim_especialidade', [5, 'Odontopediatria', 'Cuida da saúde bucal de bebês, crianças e adolescentes.']);
// insertData('dim_especialidade', [6, 'Prótese Dentária', 'Restaura dentes perdidos com próteses fixas ou removíveis.']);
// insertData('dim_especialidade', [7, 'Dentística (Estética)', 'Melhora a estética dental com restaurações, clareamentos e facetas.']);
// insertData('dim_especialidade', [8, 'Cirurgia Bucomaxilofacial', 'Realiza cirurgias complexas na boca, maxilares e face.']);
// insertData('dim_especialidade', [9, 'Odontogeriatria', 'Foca na saúde bucal de idosos, considerando as mudanças da idade.']);
// insertData('dim_especialidade', [10, 'Radiologia Odontológica', 'Faz exames de imagem para diagnóstico e planejamento de tratamentos.']);
// insertData('dim_especialidade', [11, 'Estomatologia', 'Diagnostica e trata doenças da boca, como lesões e câncer bucal.']);
// insertData('dim_especialidade', [12, 'Disfunção Temporomandibular (DTM) e Dor Orofacial', 'Trata problemas na articulação da mandíbula e dores associadas.']);

// const { insertData } = require('./insert.js');
// //dim_endereco
// insertData('dim_endereco', [1, 'Avenida Pedro Álvares Cabral', '04094050', 0, 'Parque Ibirapuera']);
// insertData('dim_endereco', [2, 'Praça da Sé', '01001000', 0, 'Catedral da Sé']);
// insertData('dim_endereco', [3, 'Praça Charles Miller', '01234010', 0, 'Estádio do Pacaembu']);
// insertData('dim_endereco', [4, 'Avenida Paulista', '01311000', 1578, 'MASP']);
// insertData('dim_endereco', [5, 'Rua da Cantareira', '01024000', 306, 'Mercadão de São Paulo']);
// insertData('dim_endereco', [6, 'Praça Ramos de Azevedo', '01037010', 0, 'Theatro Municipal']);
// insertData('dim_endereco', [7, 'Rua XV de Novembro', '01013001', 347, 'Pátio do Colégio']);
// insertData('dim_endereco', [8, 'Rua Oscar Freire', '01426001', 979, 'Jardins']);
// insertData('dim_endereco', [9, 'Avenida Cruzeiro do Sul', '02031000', 1800, 'Pinacoteca de São Paulo']);
// insertData('dim_endereco', [10, 'Avenida Nazaré', '04263000', 481, 'Museu do Ipiranga']);

// const { insertData } = require('./insert.js');
// //dim_pessoa
// insertData('dim_pessoa', [1, 1, 1, 'Rogério Ceni', '11111111111', 'Não pode realizar procedimentos com anestesia local devido a reação alérgica', '11990000001', 'rogerioceni@saopaulofc.com', 'senha123', '1973-01-22', 'Mito do São Paulo FC', 'PACIENTE', 1]);
// insertData('dim_pessoa', [2, 0, 2, 'Raí', '22222222222', 'Nenhuma', '11990000002', 'rai@saopaulofc.com', 'senha123', '1965-05-15', 'Capitão mundial', 'PACIENTE', 1]);
// insertData('dim_pessoa', [3, 0, 3, 'Careca', '33333333333', 'Restrição para extração de dentes devido a condições médicas', '11990000003', 'careca@saopaulofc.com', 'senha123', '1960-10-05', 'Artilheiro histórico', 'PACIENTE', 1]);
// insertData('dim_pessoa', [4, 0, 4, 'Müller', '44444444444', 'Nenhuma', '11990000004', 'muller@saopaulofc.com', 'senha123', '1966-01-31', 'Atacante campeão', 'PACIENTE', 1]);
// insertData('dim_pessoa', [5, 0, 5, 'Cafu', '55555555555', 'Evitar uso de aparelhos ortodônticos devido a histórico de lesões bucais', '11990000005', 'cafu@saopaulofc.com', 'senha123', '1970-06-07', 'Capitão do Penta', 'PACIENTE', 1]);
// insertData('dim_pessoa', [6, 0, 7, 'Kaká', '66666666666', 'Nenhuma', '11990000006', 'kaka@saopaulofc.com', 'senha123', '1982-04-22', 'Melhor do Mundo', 'PACIENTE', 1]);
// insertData('dim_pessoa', [7, 0, 8, 'Diego Lugano', '77777777777', 'Não pode realizar clareamento dental devido a sensibilidade extrema nos dentes', '11990000007', 'lugano@saopaulofc.com', 'senha123', '1980-11-02', 'Zagueiro ídolo uruguaio', 'PACIENTE', 1]);
// insertData('dim_pessoa', [8, 0, 9, 'Hernanes', '88888888888', 'Nenhuma', '11990000008', 'hernanes@saopaulofc.com', 'senha123', '1985-05-29', 'O Profeta', 'PACIENTE', 1]);
// insertData('dim_pessoa', [9, 0, 9, 'Leonardo', '99999999999', 'Deve evitar tratamentos estéticos (ex: facetas) devido a problemas periodontais graves', '11990000009', 'leonardo@saopaulofc.com', 'senha123', '1969-09-05', 'Lateral e dirigente', 'PACIENTE', 1]);
// insertData('dim_pessoa', [10, 0, 10, 'Toninho Cerezo', '10101010101', 'Nenhuma', '11990000010', 'toninhocerezo@saopaulofc.com', 'senha123', '1955-04-21', 'Volante campeão', 'PACIENTE', 1]);

// const { insertData } = require('./insert.js');
// //ft_agenda
// insertData('ft_agenda', [1, 1, 1, 10, 'Consulta inicial - Avaliação odontológica', 1, '2025-05-10', '14:00']);
// insertData('ft_agenda', [2, 1, 2, 12, 'Profilaxia (limpeza dentária)', 1, '2025-05-11', '10:30']);
// insertData('ft_agenda', [3, 1, 3, 1, 'Tratamento de canal - Pré-molar', 1, '2025-05-12', '09:00']);
// insertData('ft_agenda', [4, 1, 4, 4, 'Clareamento dental - Sessão 1', 1, '2025-05-13', '11:00']);
// insertData('ft_agenda', [5, 1, 5, 5, 'Instalação de aparelho ortodôntico', 1, '2025-05-14', '15:00']);
// insertData('ft_agenda', [6, 1, 6, 6, 'Consulta de revisão ortodôntica', 1, '2025-05-15', '16:30']);
// insertData('ft_agenda', [7, 1, 7, 9, 'Extração de dente siso', 1, '2025-05-16', '13:00']);
// insertData('ft_agenda', [8, 1, 8, 11, 'Colocação de prótese dentária', 1, '2025-05-17', '08:30']);
// insertData('ft_agenda', [9, 1, 9, 10, 'Restauração de cárie - Molar superior', 1, '2025-05-18', '17:00']);
// insertData('ft_agenda', [10, 1, 10, 7, 'Avaliação para implante dentário', 1, '2025-05-19', '12:00']);