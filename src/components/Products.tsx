import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

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

        {/* 
        TODO: Products Grid - Ready for database integration
        This section will display products from the database when integrated
        
        Structure for future implementation:
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {products?.map((product, index) => (
            <Card 
              key={product.id} 
              className="text-center card-hover animate-slide-up" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="aspect-square bg-muted/50 rounded-lg mb-4 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h3 className="font-roboto font-semibold text-lg mb-2">
                  {product.name}
                </h3>
                <p className="font-open-sans text-muted-foreground text-sm mb-3">
                  {product.description}
                </p>
                <div className="text-primary font-semibold">
                  {product.price && `R$ ${product.price}`}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        */}

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