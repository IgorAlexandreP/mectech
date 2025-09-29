// Tipos baseados na estrutura real da API .NET de produção
export interface Product {
  id: number;
  nome: string;
  descricao: string;
  linhaProduto: string;
  preco: number;
  fotoUrl?: string;
}

export interface ProductBOM {
  id: number;
  materialId: number;
  materialCodigo: string;
  materialDescricao: string;
  qtdePorUnidade: number;
  custoMedio: number;
}

export interface LinhaProduto {
  id: number;
  nome: string;
  descricao?: string;
  ativo: boolean;
  dataCadastro: string;
}

// Para compatibilidade com a landing page
export interface ProductDisplay {
  id: number;
  name: string; // mapeado de descricao
  description: string; // mapeado de linhaProdutoNome
  price: number; // mapeado de precoLista
  image?: string; // mapeado de fotoUrl
  category: string; // mapeado de linhaProdutoNome
  sku: string;
  unidade: string;
  estoqueAtual: number;
  ativo: boolean;
  dataCadastro: string;
}

export interface ProductsResponse {
  products: ProductDisplay[];
  total: number;
  page?: number;
  limit?: number;
}
