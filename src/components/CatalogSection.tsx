import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MessageCircle, Package, Loader2, AlertCircle } from "lucide-react";
import { usePublicProducts } from "@/hooks/useProducts";
import { ProductDisplay } from "@/types/product";

const CatalogSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set());
  const [itemsToShow, setItemsToShow] = useState(10);
  const [itemsPerLoad] = useState(10);

  // Buscar produtos
  const { data: productsData, isLoading, error, refetch } = usePublicProducts({
    limit: 100, // Buscar mais produtos para o catálogo
    ativo: true
  });

  // Extrair categorias únicas dos produtos
  const categories = productsData?.products ? 
    [...new Set(productsData.products.map(p => p.category))].filter(Boolean) : [];

  // Filtrar e ordenar produtos
  const filteredProducts = productsData?.products?.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price-low':
        return (a.price || 0) - (b.price || 0);
      case 'price-high':
        return (b.price || 0) - (a.price || 0);
      case 'category':
        return a.category.localeCompare(b.category);
      default:
        return 0;
    }
  });

  // Produtos visíveis
  const visibleProducts = sortedProducts.slice(0, itemsToShow);
  const hasMoreProducts = itemsToShow < sortedProducts.length;

  // Reset itemsToShow quando filtros mudam
  useEffect(() => {
    setItemsToShow(10);
  }, [searchTerm, selectedCategory, sortBy]);

  const handleShowMore = () => {
    setItemsToShow(prev => Math.min(prev + itemsPerLoad, sortedProducts.length));
  };

  const handleProductSelection = (productId: number) => {
    const newSelection = new Set(selectedProducts);
    if (newSelection.has(productId)) {
      newSelection.delete(productId);
    } else {
      newSelection.add(productId);
    }
    setSelectedProducts(newSelection);
  };

  const handleQuoteRequest = () => {
    if (selectedProducts.size === 0) {
      alert("Selecione pelo menos um produto para solicitar orçamento.");
      return;
    }

    const selectedProductsData = Array.from(selectedProducts).map(id => {
      return productsData?.products.find(p => p.id === id);
    }).filter(Boolean);

    let message = "Olá! Gostaria de solicitar um orçamento para os seguintes produtos:\n\n";
    
    selectedProductsData.forEach((product, index) => {
      message += `${index + 1}. ${product?.name}\n`;
      message += `   Categoria: ${product?.category}\n`;
      if (product?.price && product.price > 0) {
        message += `   Preço: R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n`;
      }
      message += "\n";
    });

    message += `Total de produtos: ${selectedProductsData.length}\n\n`;
    message += "Por favor, entre em contato para mais informações.";

    const whatsappUrl = `https://wa.me/5513991670473?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="catalogo" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="font-roboto font-bold text-4xl md:text-5xl text-foreground mb-4">
                Catálogo <span className="gradient-text">Completo</span>
              </h1>
              <p className="font-open-sans text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore nossa linha completa de equipamentos de qualidade. Selecione os produtos de seu interesse e solicite um orçamento personalizado.
              </p>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Busca */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filtros Desktop */}
            <div className="flex flex-wrap gap-4 items-center">
              {/* Categoria */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Ordenação */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nome (A-Z)</SelectItem>
                  <SelectItem value="price-low">Menor preço</SelectItem>
                  <SelectItem value="price-high">Maior preço</SelectItem>
                  <SelectItem value="category">Categoria</SelectItem>
                </SelectContent>
              </Select>

              {/* Botão Filtros Mobile */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>

          {/* Filtros Mobile */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t lg:hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Categoria</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as categorias</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Ordenar por</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Nome (A-Z)</SelectItem>
                      <SelectItem value="price-low">Menor preço</SelectItem>
                      <SelectItem value="price-high">Maior preço</SelectItem>
                      <SelectItem value="category">Categoria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Contadores */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Badge variant="secondary" className="px-3 py-1">
            {filteredProducts.length} produtos encontrados
            {hasMoreProducts && ` (mostrando ${visibleProducts.length})`}
          </Badge>
          {selectedProducts.size > 0 && (
            <Badge variant="default" className="px-3 py-1">
              {selectedProducts.size} selecionados
            </Badge>
          )}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Carregando catálogo...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="w-8 h-8 text-destructive mb-4" />
            <p className="text-destructive mb-4">Erro ao carregar catálogo</p>
            <Button variant="outline" onClick={() => refetch()}>
              Tentar Novamente
            </Button>
          </div>
        )}

        {/* Produtos */}
        {!isLoading && !error && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {visibleProducts.map((product, index) => (
                <Card
                  key={product.id}
                  className={`card-hover transition-all duration-300 ${
                    selectedProducts.has(product.id) ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    {/* Checkbox de seleção */}
                    <div className="flex justify-end mb-2">
                      <input
                        type="checkbox"
                        checked={selectedProducts.has(product.id)}
                        onChange={() => handleProductSelection(product.id)}
                        className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
                      />
                    </div>

                    {/* Imagem do produto */}
                    <div className="aspect-square bg-muted/70 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <Package className={`w-12 h-12 text-muted-foreground/50 ${product.image ? 'hidden' : ''}`} />
                    </div>

                    {/* Informações do produto */}
                    <div className="space-y-2">
                      <h3 className="font-roboto font-semibold text-lg mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="font-open-sans text-muted-foreground text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      
                      {product.price && product.price > 0 && (
                        <div className="text-primary font-semibold text-lg mb-3">
                          R$ {(product.price || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                      )}
                      
                      <div className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full inline-block">
                        {product.category}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Botão Mostrar Mais */}
            {hasMoreProducts && (
              <div className="flex justify-center mb-8">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleShowMore}
                  className="font-open-sans font-semibold px-8 py-3"
                >
                  Mostrar Mais Produtos ({sortedProducts.length - itemsToShow} restantes)
                </Button>
              </div>
            )}

            {/* Botão de Orçamento */}
            {selectedProducts.size > 0 && (
              <div className="fixed bottom-6 right-6 z-50">
                <Button
                  size="lg"
                  onClick={handleQuoteRequest}
                  className="font-open-sans font-semibold px-8 py-6 bg-primary hover:bg-primary-hover text-primary-foreground btn-glow shadow-lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Solicitar Orçamento ({selectedProducts.size})
                </Button>
              </div>
            )}

            {/* Nenhum produto encontrado */}
            {filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <Package className="w-12 h-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground text-center">
                  Nenhum produto encontrado com os filtros aplicados.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSortBy('name');
                  }}
                  className="mt-4"
                >
                  Limpar Filtros
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default CatalogSection;
