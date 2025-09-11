import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Settings, Wrench, Cog } from "lucide-react";

const Products = () => {
  const productCategories = [
    {
      icon: <Settings className="w-12 h-12 text-primary" />,
      title: "Equipamentos Industriais",
      description: "Máquinas e equipamentos para indústria"
    },
    {
      icon: <Wrench className="w-12 h-12 text-primary" />,
      title: "Ferramentas Especializadas", 
      description: "Ferramentas profissionais de alta qualidade"
    },
    {
      icon: <Cog className="w-12 h-12 text-primary" />,
      title: "Peças e Componentes",
      description: "Componentes originais e compatíveis"
    }
  ];

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

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {productCategories.map((category, index) => (
            <Card 
              key={index} 
              className="text-center card-hover animate-slide-up" 
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-8">
                <div className="flex justify-center mb-4 transition-transform duration-300 hover:scale-110">
                  {category.icon}
                </div>
                <h3 className="font-roboto font-semibold text-xl mb-3">
                  {category.title}
                </h3>
                <p className="font-open-sans text-muted-foreground">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center animate-fade-in" style={{ animationDelay: "0.8s" }}>
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