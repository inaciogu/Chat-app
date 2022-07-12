# Chat app

## Sobre
  O chat app, como o nome já diz, é uma aplicação web de chat onde você pode se comunicar com outros usuários em tempo real! Nela o usuário pode criar uma conta, fazer o login e entrar em uma das salas para conversar com os outros usuários logados. A interface de usuário foi desenvolvida com React.js, Typescript, Material UI para estilização, socket.io-client para escutar e emitir eventos em tempo real, e react-hook-form juntamente com yup para implementação e validação de formulários.

## Tecnologias usadas
  - React.js
  - ContextAPI
  - MaterialUI
  - Socket.io-client

## Rodando localmente
   ### Observação:
   <p>Para obter a experiência completa localmente, você precisa clonar também o repositório da <a href="https://github.com/inaciogu/Chat-API">API</a> e instalar o <a href="https://www.mongodb.com/docs/manual/installation/">MongoDB</a> na sua máquina.</p>
   
   ## Instruções:
  
  - Clone o repositório do projeto
  - Instale as dependencias com o comando `yarn`
  - Troque o nome do arquivo ".env.example" para ".env.local" e coloque o valor da variável para "http://localhost:3001"
  - Rode o comando `yarn start` para iniciar a aplicação.
