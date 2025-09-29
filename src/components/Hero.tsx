import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 transition-transform duration-1000"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-secondary/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-roboto font-bold text-5xl md:text-7xl text-background mb-6 animate-slide-up">
          Monte ou renove sua <span className="gradient-text">Academia</span> com a mesma excelência
          </h1>
          <p className="font-open-sans text-xl md:text-2xl text-background/90 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.3s" }}>
          Equipamentos de fabricação própria e serviço de reforma que prolonga a vida útil dos seus aparelhos
          </p>
          <Button 
            size="lg"
            className="font-open-sans font-semibold text-lg px-8 py-6 bg-primary hover:bg-primary-hover text-primary-foreground btn-glow animate-scale-in"
            style={{ animationDelay: "0.6s" }}
            asChild
          >
            <a 
              href="https://wa.me/5513991670473" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2"
            >
              <span>Peça um Orçamento no WhatsApp</span>
              <ExternalLink className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-background rounded-full flex justify-center">
          <div className="w-1 h-3 bg-background rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;