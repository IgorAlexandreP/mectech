import { Card, CardContent } from "@/components/ui/card";
import { Award, Shield, Users, Clock } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Qualidade",
      description: "Produtos de alta qualidade e tecnologia"
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Confiabilidade", 
      description: "Equipamentos duráveis e resistentes"
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Atendimento",
      description: "Relacionamento próximo com clientes"
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Experiência",
      description: "Anos de experiência no mercado"
    }
  ];

  return (
    <section id="sobre" className="py-20 section-animate">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-roboto font-bold text-4xl md:text-5xl text-foreground mb-6">
              Sobre a <span className="gradient-text">MecTech Equipamentos</span>
            </h2>
            <p className="font-open-sans text-lg text-muted-foreground leading-relaxed">
              A MecTech Equipamentos é referência em soluções para equipamentos de qualidade. 
              Nosso compromisso é oferecer tecnologia, confiabilidade e atendimento próximo aos clientes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className="text-center card-hover animate-scale-in" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4 transition-transform duration-300 hover:scale-110">
                    {value.icon}
                  </div>
                  <h3 className="font-roboto font-semibold text-lg mb-2">
                    {value.title}
                  </h3>
                  <p className="font-open-sans text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;