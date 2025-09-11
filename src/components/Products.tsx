import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Package } from "lucide-react";

const Products = () => {
  // TODO: Replace with real products from database
  // const { data: products, isLoading } = useProducts();
  
  return (
    <section id="produtos" className="py-20 bg-muted/30 section-animate">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-roboto font-bold text-4xl md:text-5xl text-foreground mb-4">
            Nossos <span className="gradient-text">Produtos</span>
          </h2>
          <p className="font-open-sans text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Confira os equipamentos disponíveis diretamente no nosso catálogo no WhatsApp.
          </p>
        </div>

        {/* Products Grid - Ready for database integration */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {/* Product Card Template - Ready for real data */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
            <Card 
              key={index} 
              className="card-hover animate-slide-up opacity-40" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-4">
                {/* Product Image Placeholder */}
                <div className="aspect-square bg-muted/70 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                  <Package className="w-12 h-12 text-muted-foreground/50" />
                  {/* 
                  TODO: Replace with real product image
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  */}
                </div>
                
                {/* Product Info Placeholders */}
                <div className="space-y-2">
                  {/* Product Name */}
                  <div className="h-5 bg-muted/60 rounded animate-pulse"></div>
                  {/* Product Description */}
                  <div className="h-3 bg-muted/40 rounded animate-pulse"></div>
                  <div className="h-3 bg-muted/40 rounded w-3/4 animate-pulse"></div>
                  {/* Product Price */}
                  <div className="h-4 bg-primary/20 rounded w-1/2 animate-pulse mt-3"></div>
                </div>
                
                {/* 
                TODO: Replace with real product data structure
                <h3 className="font-roboto font-semibold text-lg mb-2">
                  {product.name}
                </h3>
                <p className="font-open-sans text-muted-foreground text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="text-primary font-semibold">
                  {product.price && `R$ ${product.price.toLocaleString('pt-BR')}`}
                </div>
                */}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center animate-fade-in">
          <Button 
            size="lg"
            className="font-open-sans font-semibold px-8 py-6 bg-primary hover:bg-primary-hover text-primary-foreground btn-glow"
            asChild
          >
            <a 
              href="https://wa.me/c/5513991670473" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2"
            >
              <span>Acessar Catálogo Completo</span>
              <ExternalLink className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Products;