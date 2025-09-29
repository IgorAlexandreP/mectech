import { Product, ProductDisplay, ProductsResponse, LinhaProduto } from '@/types/product';
import { API_BASE_URL, API_ENDPOINTS, LANDING_PAGE_CONFIG } from '@/config/database';

// Interface para parâmetros de busca
export interface ProductSearchParams {
  ativo?: boolean;
  linhaProdutoId?: number;
  search?: string;
  limit?: number;
}

// Classe para gerenciar requisições de produtos da API .NET
export class ProductService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // Método para sanitizar parâmetros de busca
  private sanitizeSearchParams(params: ProductSearchParams): ProductSearchParams {
    return {
      ativo: typeof params.ativo === 'boolean' ? params.ativo : undefined,
      linhaProdutoId: typeof params.linhaProdutoId === 'number' && params.linhaProdutoId > 0 ? params.linhaProdutoId : undefined,
      search: typeof params.search === 'string' ? params.search.replace(/[<>\"'&]/g, '') : undefined,
      limit: typeof params.limit === 'number' && params.limit > 0 && params.limit <= 100 ? params.limit : undefined
    };
  }

  // Validar e sanitizar URL de imagem
  private validateImageUrl(url: string): string | undefined {
    if (!url || typeof url !== 'string') return undefined;
    
    const trimmedUrl = url.trim();
    if (trimmedUrl.length === 0) return undefined;
    
    // Lista de domínios permitidos
    const allowedDomains = [
      'sistema.mectechequipamentos.com.br',
      'mectechequipamentos.com.br',
      'localhost'
    ];
    
    try {
      // Se é uma URL completa, validar domínio
      if (trimmedUrl.startsWith('http')) {
        const urlObj = new URL(trimmedUrl);
        if (allowedDomains.some(domain => urlObj.hostname.includes(domain))) {
          return trimmedUrl;
        }
        return undefined;
      }
      
      // Se é um caminho relativo, validar formato
      if (trimmedUrl.startsWith('/api/upload/imagem/') || 
          trimmedUrl.startsWith('/uploads/') || 
          /^\d+$/.test(trimmedUrl)) {
        return trimmedUrl;
      }
      
      return undefined;
    } catch {
      return undefined;
    }
  }

  // Mapear produto da API .NET para formato da landing page
  private mapProductToDisplay(product: Product): ProductDisplay {
    // Construir URL da imagem usando o endpoint público /api/upload/imagem/{id}
    let imageUrl: string | undefined;
    if (product.fotoUrl && product.fotoUrl.trim() !== '') {
      const validatedUrl = this.validateImageUrl(product.fotoUrl);
      
      if (validatedUrl) {
        // Se já está no formato correto /api/upload/imagem/{id}
        if (validatedUrl.startsWith('/api/upload/imagem/')) {
          imageUrl = `${this.baseUrl.replace('/api', '')}${validatedUrl}`;
        }
        // Se está no formato antigo /uploads/produtos/{guid}.jpg
        else if (validatedUrl.startsWith('/uploads/')) {
          // Para URLs do formato /uploads/produtos/{guid}.jpg, usar o GUID completo
          // NÃO extrair números do GUID para evitar conflitos com IDs de imagem
          // Usar o caminho completo como está
          imageUrl = `${this.baseUrl.replace('/api', '')}${validatedUrl}`;
        }
        // Se contém apenas números (ID direto)
        else if (/^\d+$/.test(validatedUrl)) {
          imageUrl = `${this.baseUrl}/upload/imagem/${validatedUrl}`;
        }
        // Se é uma URL completa, usar diretamente
        else if (validatedUrl.startsWith('http')) {
          imageUrl = validatedUrl;
        }
      }
    }
    
    return {
      id: product.id,
      name: product.nome,
      description: product.descricao,
      price: product.preco,
      image: imageUrl,
      category: product.linhaProduto,
      sku: `MT${product.id.toString().padStart(3, '0')}`, // Gerar SKU baseado no ID
      unidade: 'UN',
      estoqueAtual: 0, // Não disponível na API pública
      ativo: true, // Assumir que produtos retornados estão ativos
      dataCadastro: new Date().toISOString() // Data atual como fallback
    };
  }

  // Buscar produtos públicos (sem autenticação) - para landing page
  async getPublicProducts(params: ProductSearchParams = {}): Promise<ProductsResponse> {
    try {
      // Validação e sanitização de parâmetros
      const sanitizedParams = this.sanitizeSearchParams(params);
      
      const queryParams = new URLSearchParams();
      
      // Sempre buscar apenas produtos ativos para a landing page
      queryParams.append('ativo', 'true');
      
      if (sanitizedParams.linhaProdutoId && sanitizedParams.linhaProdutoId > 0) {
        queryParams.append('linhaProdutoId', sanitizedParams.linhaProdutoId.toString());
      }
      
      if (sanitizedParams.search && sanitizedParams.search.trim().length > 0) {
        // Sanitizar string de busca
        const sanitizedSearch = sanitizedParams.search.trim().substring(0, 100); // Limitar tamanho
        queryParams.append('search', sanitizedSearch);
      }

      const url = `${this.baseUrl}${API_ENDPOINTS.PRODUCTS_PUBLIC}?${queryParams.toString()}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(LANDING_PAGE_CONFIG.REQUEST_TIMEOUT)
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar produtos: ${response.status} ${response.statusText}`);
      }

      const products: Product[] = await response.json();
      
      // Filtrar produtos excluindo aqueles com linha "reforma"
      const filteredProducts = products.filter(product => {
        const linhaProduto = product.linhaProduto?.toLowerCase() || '';
        return !linhaProduto.includes('reforma');
      });
      
      // Mapear produtos para formato da landing page
      const mappedProducts = filteredProducts
        .slice(0, params.limit || LANDING_PAGE_CONFIG.MAX_PRODUCTS_DISPLAY)
        .map(product => this.mapProductToDisplay(product));

      return {
        products: mappedProducts,
        total: filteredProducts.length,
        page: 1,
        limit: params.limit || LANDING_PAGE_CONFIG.MAX_PRODUCTS_DISPLAY
      };
    } catch (error) {
      console.error('Erro no ProductService.getPublicProducts:', error);
      throw error;
    }
  }

  // Buscar produtos (com autenticação) - para uso interno
  async getProducts(params: ProductSearchParams = {}): Promise<ProductsResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.ativo !== undefined) {
        queryParams.append('ativo', params.ativo.toString());
      }
      
      if (params.linhaProdutoId) {
        queryParams.append('linhaProdutoId', params.linhaProdutoId.toString());
      }

      const url = `${this.baseUrl}${API_ENDPOINTS.PRODUCTS}?${queryParams.toString()}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Aqui você adicionaria o token de autenticação se necessário
          // 'Authorization': `Bearer ${token}`
        },
        signal: AbortSignal.timeout(LANDING_PAGE_CONFIG.REQUEST_TIMEOUT)
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar produtos: ${response.status} ${response.statusText}`);
      }

      const products: Product[] = await response.json();
      
      // Mapear produtos para formato da landing page
      const mappedProducts = products.map(product => this.mapProductToDisplay(product));

      return {
        products: mappedProducts,
        total: products.length,
        page: 1,
        limit: products.length
      };
    } catch (error) {
      console.error('Erro no ProductService.getProducts:', error);
      throw error;
    }
  }

  // Buscar produto por ID
  async getProductById(id: number): Promise<ProductDisplay> {
    try {
      const url = `${this.baseUrl}${API_ENDPOINTS.PRODUCT_BY_ID(id)}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(LANDING_PAGE_CONFIG.REQUEST_TIMEOUT)
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar produto: ${response.status} ${response.statusText}`);
      }

      const product: Product = await response.json();
      return this.mapProductToDisplay(product);
    } catch (error) {
      console.error('Erro no ProductService.getProductById:', error);
      throw error;
    }
  }

  // Buscar linhas de produto públicas (categorias)
  async getLinhasProdutoPublicas(): Promise<LinhaProduto[]> {
    try {
      const url = `${this.baseUrl}${API_ENDPOINTS.LINHAS_PRODUTO_PUBLIC}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(LANDING_PAGE_CONFIG.REQUEST_TIMEOUT)
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar linhas de produto: ${response.status} ${response.statusText}`);
      }

      const linhas: LinhaProduto[] = await response.json();
      return linhas; // Já vem filtrado por ativo do backend
    } catch (error) {
      console.error('Erro no ProductService.getLinhasProdutoPublicas:', error);
      throw error;
    }
  }

  // Buscar linhas de produto (categorias) - com autenticação
  async getLinhasProduto(): Promise<LinhaProduto[]> {
    try {
      const url = `${this.baseUrl}${API_ENDPOINTS.LINHAS_PRODUTO}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(LANDING_PAGE_CONFIG.REQUEST_TIMEOUT)
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar linhas de produto: ${response.status} ${response.statusText}`);
      }

      const linhas: LinhaProduto[] = await response.json();
      return linhas.filter(linha => linha.ativo);
    } catch (error) {
      console.error('Erro no ProductService.getLinhasProduto:', error);
      throw error;
    }
  }

  // Health check da API pública
  async healthCheck(): Promise<{ status: string; timestamp: string; service: string; version: string }> {
    try {
      const url = `${this.baseUrl}${API_ENDPOINTS.HEALTH_CHECK}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(5000) // Timeout menor para health check
      });

      if (!response.ok) {
        throw new Error(`Health check falhou: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro no ProductService.healthCheck:', error);
      throw error;
    }
  }
}

// Instância singleton do serviço
export const productService = new ProductService();
