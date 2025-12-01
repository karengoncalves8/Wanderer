# 🌍 Wanderer – Aplicativo de Viagens  

## 📖 Descrição  

O **Wanderer** é um aplicativo mobile projetado para apoiar viajantes em todas as etapas de suas jornadas.  
Desde o cadastro e preferências do usuário até o planejamento completo com voos, hospedagens, itinerários personalizados, listas de afazeres, notificações inteligentes e cálculo de gastos, o app busca proporcionar uma experiência **completa, prática e intuitiva** para explorar o mundo.  

## ⚙️ Tecnologias Utilizadas  

- **Frontend Mobile**: React Native (TypeScript)  
- **Backend**: Node.js / Express  
- **Banco de Dados**: MySQL   
- **API Externa**: Integração com serviços de voos, hotéis e transporte local  
- **Autenticação**: JWT   

## 📋 Requisitos  

### Requisitos Funcionais  

| Código | Descrição |
|--------|-----------|
| RFN01 | Cadastro de Usuários: permitir o cadastro de perfis de usuário, com informações pessoais e preferências de viagem. |
| RFN02 | Histórico de Destinos: visualizar o histórico de destinos visitados, com informações de data, avaliações e fotos. |
| RFN03 | Busca de Voos: pesquisar voos nacionais e internacionais com filtros (preço, companhia, duração, horários). |
| RFN04 | Agendamento de Voos: salvar informações de reservas de voos. |
| RFN05 | Busca de Acomodações: pesquisar hospedagens com filtros (tipo, avaliações, localização, fotos). |
| RFN06 | Agendamento de Acomodações: salvar informações de reservas de hospedagem. |
| RFN07 | Itinerários Personalizados: montar itinerários com destinos, atrações, restaurantes e eventos. |
| RFN08 | Sugestões automáticas: recomendar atrações próximas com base em geolocalização e preferências. |
| RFN09 | Lista de Afazeres e Itens: criar listas de tarefas e itens de viagem. |
| RFN10 | Cálculo de gastos: registrar gastos e acompanhar orçamento por categorias. |
| RFN11 | Integração com transportes: integrar com aplicativos de transporte e aluguel de veículos. |
| RFN12 | Conteúdos de Apoio: oferecer dicas de viagem, recomendações de segurança, vistos e exigências de entrada. |
| RFN13 | Autenticação de Usuários: login por senha ou biometria para segurança de dados. |
| RFN14 | Tradução Automática: traduzir informações básicas (cardápios, placas etc.). |

### Requisitos Não Funcionais  

| Código | Descrição |
|--------|-----------|
| RNF01 | Suporte Offline: acesso ao itinerário e informações sem internet. |
| RNF02 | Design Intuitivo: interface moderna, clara e agradável. |
| RNF03 | Escalabilidade: atualizações periódicas, novos recursos e estabilidade. |

## 🗂️ Backlog do Produto  

| RFN | Rank | Prioridade | User Story | Estimativa | Sprint |
|-----|------|------------|------------|------------|--------|
| 01 | 1 | Alta | Como usuário, quero me cadastrar no sistema, fornecendo informações pessoais, para criar meu perfil. | 2 | 1 |
| 01 | 2 | Alta | Como usuário, quero definir minhas preferências de viagem, para receber sugestões personalizadas. | 2 | 1 |
| 03 | 5 | Alta | Como usuário, quero pesquisar voos com filtros, para encontrar a melhor opção. | 13 | 1 |
| 04 | 7 | Alta | Como usuário, quero agendar um voo e salvar a reserva, para garantir minha viagem. | 5 | 1 |
| 05 | 9 | Alta | Como usuário, quero pesquisar acomodações com filtros, para escolher a melhor opção. | 13 | 1 |
| 06 | 10 | Alta | Como usuário, quero reservar acomodações e salvar a reserva, para garantir meu lugar. | 5 | 1 |
| 16 | 20 | Alta | Como usuário, quero fazer login com senha ou biometria, para acessar meus dados com segurança. | 2 | 1 |
| 02 | 3 | Média | Como usuário, quero visualizar o histórico de destinos visitados, para relembrar viagens. | 3 | 2 |
| 02 | 4 | Baixa | Como usuário, quero editar informações dos destinos visitados, para manter histórico atualizado. | 3 | 2 |
| 07 | 11 | Alta | Como usuário, quero criar itinerários personalizados, para planejar minha viagem. | 8 | 2 |
| 09 | 13 | Média | Como usuário, quero criar lista de tarefas relacionadas à viagem, para me preparar adequadamente. | 3 | 2 |
| 09 | 14 | Média | Como usuário, quero criar lista de itens de viagem, para não esquecer nada. | 3 | 2 |
| 10 | 15 | Alta | Como usuário, quero registrar e visualizar gastos, para acompanhar meu orçamento. | 8 | 2 |
| 07 | 16 | Média | Como usuário, quero visualizar meu itinerário em um mapa interativo, para ter visão geográfica. | 8 | 3 |
| 08 | 17 | Alta | Como usuário, quero receber sugestões automáticas de destinos, para aproveitar melhor a viagem. | 13 | 3 |
| 11 | 18 | Média | Como usuário, quero integrar transporte local (Uber etc.), para facilitar deslocamentos. | 5 | 3 |
| 12 | 19 | Baixa | Como usuário, quero acessar conteúdos de apoio, para me preparar melhor para a viagem. | 3 | 3 |
| 14 | 21 | Média | Como usuário, quero tradução automática de informações básicas, para facilitar comunicação. | 3 | 3 |


