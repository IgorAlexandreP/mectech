# 🔗 Integração com API .NET de Produção - Landing Page Fábrica

## 📋 Resumo

Esta landing page foi configurada para **apenas visualizar produtos** da API .NET de produção da fábrica. **Não há funcionalidades de edição, criação ou alteração** - apenas leitura de dados através de endpoints públicos.

## 🏗️ Estrutura Implementada

### Frontend (React + TypeScript)
- ✅ **Tipos TypeScript** baseados no DTO real (`src/types/product.ts`)
- ✅ **Serviço de API** para requisições .NET (`src/services/productService.ts`)
- ✅ **Hooks React Query** para gerenciar estado (`src/hooks/useProducts.ts`)
- ✅ **Componente Products atualizado** com dados reais (`src/components/Products.tsx`)
- ✅ **Configuração de ambiente** (`src/config/database.ts`)

### Backend .NET (Produção)
- ✅ **Controller público** (`ProdutosPublicController.cs`)
- ✅ **Endpoints sem autenticação** para landing page
- ✅ **Mapeamento de DTOs** existentes
- ✅ **Tratamento de erros** e performance
- ✅ **Health check** para monitoramento

## 🚀 Como Usar

### 1. Configurar API .NET (Produção)

```bash
# No projeto D:\Teste\fabrica\ProjetoFabrica.Api
# Adicionar o novo controller ProdutosPublicController.cs

# Compilar e publicar
dotnet build
dotnet publish -c Release

# Deploy para servidor de produção
```

### 2. Configurar Frontend

```bash
# Na pasta raiz do projeto
cp env.example .env
# Editar .env com a URL da sua API .NET

# Instalar dependências (se necessário)
npm install

# Executar aplicação
npm run dev
```

### 3. Variáveis de Ambiente

**Frontend (.env):**
```env
# URL da API .NET de produção
VITE_API_BASE_URL=https://sua-api-fabrica.com/api

# Para desenvolvimento local:
# VITE_API_BASE_URL=http://localhost:5000/api
```

## 🗄️ Estrutura do Banco MySQL (Produção)

A API usa as tabelas existentes do projeto .NET:

```sql
-- Tabela Produtos (já existe)
CREATE TABLE Produtos (
  Id INT PRIMARY KEY AUTO_INCREMENT,
  SKU VARCHAR(50) NOT NULL,
  Descricao VARCHAR(200) NOT NULL,
  Unidade VARCHAR(20) NOT NULL,
  LinhaProdutoId INT NOT NULL,
  PrecoLista DECIMAL(10,2) NOT NULL,
  EstoqueAtual DECIMAL(10,2) DEFAULT 0,
  Ativo BOOLEAN DEFAULT true,
  DataCadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FotoUrl VARCHAR(500)
);

-- Tabela LinhasProduto (já existe)
CREATE TABLE LinhasProduto (
  Id INT PRIMARY KEY AUTO_INCREMENT,
  Nome VARCHAR(100) NOT NULL,
  Descricao VARCHAR(500),
  Ativo BOOLEAN DEFAULT true,
  DataCadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 📊 Endpoints da API Pública

### GET /api/produtospublic
- **Descrição**: Busca produtos públicos (sem autenticação)
- **Parâmetros**: `ativo`, `linhaProdutoId`, `search`, `limit`
- **Resposta**: Lista de produtos ativos

### GET /api/produtospublic/:id
- **Descrição**: Busca produto específico (público)
- **Resposta**: Dados do produto

### GET /api/produtospublic/linhas-produto
- **Descrição**: Busca linhas de produto ativas
- **Resposta**: Lista de categorias

### GET /api/produtospublic/health
- **Descrição**: Health check da API pública
- **Resposta**: Status da API

## 🔒 Segurança

- ✅ **Somente leitura** - nenhum endpoint de escrita
- ✅ **CORS configurado** para frontend
- ✅ **Timeouts** para evitar travamentos
- ✅ **Tratamento de erros** robusto
- ✅ **Pool de conexões** para performance

## 🎨 Funcionalidades da Landing Page

### Estados do Componente Products
- ✅ **Loading**: Spinner enquanto carrega
- ✅ **Error**: Mensagem de erro com botão "Tentar Novamente"
- ✅ **Empty**: Mensagem quando não há produtos
- ✅ **Success**: Grid de produtos com dados reais

### Dados Exibidos
- ✅ **Nome do produto** (campo Descricao)
- ✅ **Descrição** (campo LinhaProdutoNome)
- ✅ **Preço** (campo PrecoLista formatado em R$)
- ✅ **Imagem** (campo FotoUrl com fallback)
- ✅ **Categoria** (campo LinhaProdutoNome)
- ✅ **SKU** (código do produto)
- ✅ **Unidade** (unidade de medida)
- ✅ **Estoque** (quantidade disponível)
- ✅ **Status** (apenas produtos ativos)

## 🚀 Deploy

### API .NET (Backend)
1. **Adicionar controller** `ProdutosPublicController.cs` ao projeto
2. **Compilar projeto** com `dotnet build`
3. **Publicar** com `dotnet publish -c Release`
4. **Deploy** para servidor de produção
5. **Configurar CORS** se necessário
6. **Configurar SSL/HTTPS**

### Frontend
1. **Configurar** `VITE_API_BASE_URL` para sua API .NET em produção
2. **Executar** `npm run build`
3. **Hospedar** os arquivos da pasta `dist/`

## 📝 Próximos Passos

1. ✅ **Analisar estrutura** do projeto .NET existente
2. ✅ **Criar controller público** para produtos
3. ✅ **Configurar frontend** para usar API .NET
4. **Deploy da API** .NET com novo controller
5. **Deploy do frontend** com configuração correta
6. **Testar integração** completa
7. **Configurar domínio** e SSL

## 🆘 Suporte

- **Logs**: Verifique console do navegador e logs do servidor .NET
- **Health Check**: Acesse `/api/produtospublic/health` para verificar status
- **Network**: Use DevTools para verificar requisições
- **Database**: Verifique conexão MySQL e dados nas tabelas Produtos/LinhasProduto
- **CORS**: Configure CORS no projeto .NET se necessário

## 🔧 Configuração CORS (se necessário)

No `Program.cs` do projeto .NET, adicione:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLandingPage", policy =>
    {
        policy.WithOrigins("https://sua-landing-page.com")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

app.UseCors("AllowLandingPage");
```

---

**⚠️ Importante**: Esta implementação é **somente leitura**. Clientes não podem alterar, criar ou deletar produtos - apenas visualizar o catálogo da fábrica através de endpoints públicos.
