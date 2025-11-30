# Use uma imagem oficial do Node.js
FROM node:20

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie os arquivos de dependências para o container
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Instale o nodemon globalmente
RUN npm install -g nodemon

# Copie o código fonte para dentro do container
COPY . .

# Exponha a porta que o backend vai rodar
EXPOSE 5000

# Comando para iniciar o servidor
CMD ["npm", "start"]
