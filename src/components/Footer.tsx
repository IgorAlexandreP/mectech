import logoMechtechIcon from "@/assets/logo-mectech-icon.png";
import { MapPin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12 section-animate">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Company Info */}
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center space-x-3">
              <img 
                src={logoMechtechIcon} 
                alt="MecTech Equipamentos Logo" 
                className="h-12 w-12 transition-transform duration-300 hover:scale-105"
              />
              <div>
                <h3 className="font-roboto font-bold text-2xl text-primary">MecTech</h3>
                <p className="font-open-sans text-secondary-foreground/80">Equipamentos</p>
              </div>
            </div>
            <p className="font-open-sans text-secondary-foreground/80 max-w-sm">
              Soluções em equipamentos de qualidade para o seu negócio. 
              Atendendo com excelência em Itanhaém e região.
            </p>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h4 className="font-roboto font-semibold text-lg mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#inicio" className="font-open-sans text-secondary-foreground/80 hover:text-primary transition-colors duration-200">Início</a></li>
              <li><a href="#produtos" className="font-open-sans text-secondary-foreground/80 hover:text-primary transition-colors duration-200">Produtos</a></li>
              <li><a href="#sobre" className="font-open-sans text-secondary-foreground/80 hover:text-primary transition-colors duration-200">Sobre Nós</a></li>
              <li><a href="#contato" className="font-open-sans text-secondary-foreground/80 hover:text-primary transition-colors duration-200">Contato</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <h4 className="font-roboto font-semibold text-lg mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="font-open-sans text-secondary-foreground/80 text-sm">
                  Rua João Pedron Nº50<br />
                  Cidade Anchieta, Itanhaém - SP
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="font-open-sans text-secondary-foreground/80 text-sm">
                  equipamentosmectech@gmail.com
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="font-open-sans text-secondary-foreground/80 text-sm">
                  (13) 99167-0473
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 pt-8 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <p className="font-open-sans text-center text-secondary-foreground/60">
            © 2024 MecTech Equipamentos - Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;