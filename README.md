# 🐾 Abrigo de Animais – Desafio Técnico JavaScript  

## 📝 Sobre o Projeto

Este projeto é a solução de um **desafio técnico do Programa de Estágio START DB**, que consistia em criar um **programa em JavaScript** para organizar a adoção de animais em um abrigo, respeitando regras complexas de negócio.  

O objetivo do desafio era simular um sistema real de adoção, exigindo **pensamento crítico, lógica estruturada e testes automatizados**.  

---

## 🐶 Regras do Desafio

- Cada animal só poderia ser adotado por quem apresentasse **todos os brinquedos favoritos na ordem correta**.  
- **Gatos não podiam ser adotados** em caso de empate.  
- Cada pessoa poderia adotar **no máximo 3 animais**.  
- O jabuti **“Loco”** aceita qualquer ordem se estiver acompanhado de outro animal.  

---

## 🐾 Animais e Brinquedos Favoritos

| Animal | Tipo   | Brinquedos Favoritos |
| ------ | ------ | ------------------ |
| Rex    | Cão    | RATO, BOLA          |
| Mimi   | Gato   | BOLA, LASER         |
| Fofo   | Gato   | BOLA, RATO, LASER   |
| Zero   | Gato   | RATO, BOLA          |
| Bola   | Cão    | CAIXA, NOVELO       |
| Bebe   | Cão    | LASER, RATO, BOLA   |
| Loco   | Jabuti | SKATE, RATO         |

---

## ⚙️ Funcionalidades

- Adoção de animais baseada nos **brinquedos favoritos**.  
- Limite de **3 animais por pessoa**.  
- Regras especiais para **gatos e jabuti Loco**.  
- **Validação e normalização de entradas**, incluindo remoção de duplicatas.  
- Testes automatizados com **Jest**, cobrindo todos os cenários do desafio.  

---

## 🚀 Tecnologias e Conceitos Utilizados

- **JavaScript moderno (ES6+)**  
- **Normalização de dados** (`.trim().toUpperCase()`, `Set`)  
- **Estruturas de loops, filtros e mapeamentos** (`for...of`, `.map`, `.flatMap`, `.join`)  
- **Testes automatizados com Jest** (`beforeEach`, `expect`)  
- **Correção de bugs e lógica de negócio complexa**  
- **Boas práticas de programação e organização de código**  

---

## 💡 Aprendizado

Durante o desafio, pude desenvolver habilidades essenciais para **resolução de problemas reais**, incluindo:  

- Análise detalhada de código;  
- Identificação e correção de **erros de digitação, comparações e lógica**;  
- Estruturação de soluções complexas de forma organizada;  
- Aplicação de **persistência e aprendizado ativo** em projetos práticos.  

---

## 📂 Como Rodar

1. Clone o repositório:  
```bash
git clone https://github.com/matteuou/DesafioDB
Instale as dependências:
npm install

Execute os testes:
npm test

