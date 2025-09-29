import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ProductDisplay, ProductsResponse, LinhaProduto } from '@/types/product';
import { ProductService, ProductSearchParams } from '@/services/productService';
import { productService } from '@/services/productService';

// Hook para buscar produtos públicos (para landing page)
export const usePublicProducts = (params: ProductSearchParams = {}): UseQueryResult<ProductsResponse, Error> => {
  return useQuery({
    queryKey: ['public-products', params],
    queryFn: () => productService.getPublicProducts(params),
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};

// Hook para buscar todos os produtos (com autenticação)
export const useProducts = (params: ProductSearchParams = {}): UseQueryResult<ProductsResponse, Error> => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productService.getProducts(params),
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};

// Hook para buscar produto por ID
export const useProduct = (id: number): UseQueryResult<ProductDisplay, Error> => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
  });
};

// Hook para buscar linhas de produto públicas (categorias) - para landing page
export const useLinhasProdutoPublicas = (): UseQueryResult<LinhaProduto[], Error> => {
  return useQuery({
    queryKey: ['linhas-produto-publicas'],
    queryFn: () => productService.getLinhasProdutoPublicas(),
    staleTime: 10 * 60 * 1000, // 10 minutos (categorias mudam menos)
    gcTime: 20 * 60 * 1000, // 20 minutos
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
  });
};

// Hook para buscar linhas de produto (categorias) - com autenticação
export const useLinhasProduto = (): UseQueryResult<LinhaProduto[], Error> => {
  return useQuery({
    queryKey: ['linhas-produto'],
    queryFn: () => productService.getLinhasProduto(),
    staleTime: 10 * 60 * 1000, // 10 minutos (categorias mudam menos)
    gcTime: 20 * 60 * 1000, // 20 minutos
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
  });
};

// Hook para health check da API
export const useApiHealthCheck = (): UseQueryResult<{ status: string; timestamp: string; service: string; version: string }, Error> => {
  return useQuery({
    queryKey: ['api-health-check'],
    queryFn: () => productService.healthCheck(),
    staleTime: 1 * 60 * 1000, // 1 minuto
    gcTime: 5 * 60 * 1000, // 5 minutos
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    refetchOnWindowFocus: false,
  });
};
