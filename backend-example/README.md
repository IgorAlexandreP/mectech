# API Backend - Fábrica de Produtos

Este é um exemplo de API backend para conectar a landing page com o banco MySQL da fábrica.

## 🚀 Configuração Rápida

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
```bash
cp env.example .env
```

Edite o arquivo `.env` com suas configurações do banco MySQL:
```env
DB_HOST=seu-servidor-mysql.com
DB_PORT=3306
DB_USER=fabrica_user
DB_PASSWORD=senha_super_segura
DB_NAME=fabrica_produtos
PORT=3001
NODE_ENV=production
```

### 3. Executar o servidor
```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

## 📊 Endpoints Disponíveis

### GET /api/products
Busca todos os produtos com filtros opcionais.

**Parâmetros de query:**
- `page` (opcional): Número da página (padrão: 1)
- `limit` (opcional): Itens por página (padrão: 20)
- `category` (opcional): Filtrar por categoria
- `search` (opcional): Buscar por nome ou descrição
- `availability` (opcional): Filtrar por disponibilidade (true/false)

**Exemplo:**
```
GET /api/products?page=1&limit=10&category=equipamentos&availability=true
```

### GET /api/products/:id
Busca um produto específico por ID.

**Exemplo:**
```
GET /api/products/123
```

### GET /api/products/category/:category
Busca produtos por categoria.

**Exemplo:**
```
GET /api/products/category/equipamentos?page=1&limit=10
```

### GET /api/health
Health check da API.

## 🗄️ Estrutura da Tabela MySQL

A API espera uma tabela `products` com a seguinte estrutura:

```sql
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  image VARCHAR(500),
  category VARCHAR(100),
  specifications TEXT,
  availability BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🔒 Segurança

- A API é **somente leitura** - não há endpoints para criar, editar ou deletar produtos
- Use HTTPS em produção
- Configure CORS adequadamente
- Use variáveis de ambiente para credenciais sensíveis
- Implemente rate limiting se necessário

## 🚀 Deploy

Para deploy em produção:

1. Configure as variáveis de ambiente no servidor
2. Use PM2 ou similar para gerenciar o processo
3. Configure um proxy reverso (nginx) se necessário
4. Configure SSL/HTTPS
5. Monitore logs e performance

## 📝 Logs

A API registra:
- Requisições recebidas
- Erros de banco de dados
- Tempo de resposta
- Health checks
