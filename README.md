
# Integração Treclinic

Esse sistema é responsavel por buscar informações na base de dados do AMIGOAPP e atualizar informações no CRM ( RDStation ), também possue funções de menssageria integradas no ChatGuru, para automatizar a etapa de confirmação do atendimento com o cliente.

# CRON TIMES

- todo dia as 3:00am vai rodar todas as automações de alteração de etapa ( OS D-X );

- a cada 30 min vai ser feita uma verificação em funis especificos indicados pelo adm, para atualizar as informações do contato e atendimento.

# END POINT

- http://3.84.225.179:3333/first-query
  roda a automação para o funil ATENDIMENTO___AGENDAMENTO_PRIMEIRA_CONSULTA

- http://3.84.225.179:3333/dermatology/first-query
  roda a automação para o funil Processo Dermatologia / estética___Agendamento da pré consulta

- http://3.84.225.179:3333/before-surgery
  roda a automação para o funil Operaciona: Pré cirurgico___Operacional Cirurgico: Instrumentadora

- http://3.84.225.179:3333/block-date-surgery
  roda a automação para o funil Comercial___Bloquear Data Cirurgia

- http://3.84.225.179:3333/dermatology/d/:days
  roda a automação para o funil D-X
  OBS: substitua o :Days, pelo numero de dias ex:
  /d/x, /d/260, /d/200 .....