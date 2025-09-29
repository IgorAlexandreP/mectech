// Configuração da API .NET de produção
// Baseado na estrutura real do projeto em D:\Teste\fabrica

// URL da API .NET de produção
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://sistema.mectechequipamentos.com.br/api';

// Endpoints da API .NET (baseados no ProdutosController.cs e ProdutosPublicController.cs)
export const API_ENDPOINTS = {
  // Endpoints públicos (sem autenticação) - para landing page
  PRODUCTS_PUBLIC: '/produtospublic',
  PRODUCT_PUBLIC_BY_ID: (id: number) => `/produtospublic/${id}`,
  LINHAS_PRODUTO_PUBLIC: '/produtospublic/linhas-produto',
  HEALTH_CHECK: '/produtospublic/health',
  
  // Endpoints originais (com autenticação)
  PRODUCTS: '/produtos',
  PRODUCT_BY_ID: (id: number) => `/produtos/${id}`,
  LINHAS_PRODUTO: '/linhasproduto',
  LINHA_PRODUTO_BY_ID: (id: number) => `/linhasproduto/${id}`
};

// Configurações específicas para a landing page
export const LANDING_PAGE_CONFIG = {
  // Limite de produtos na landing page
  MAX_PRODUCTS_DISPLAY: 12,
  // Apenas produtos ativos
  SHOW_ONLY_ACTIVE: true,
  // Ordenação padrão
  DEFAULT_ORDER: 'descricao',
  // Timeout para requisições
  REQUEST_TIMEOUT: 10000
};
