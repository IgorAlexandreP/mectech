import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Carlos Silva",
      company: "Metalúrgica Silva & Cia",
      text: "Excelente atendimento e produtos de qualidade. A MecTech sempre atende nossas necessidades com rapidez e eficiência.",
      rating: 5
    },
    {
      name: "Ana Maria Santos",
      company: "Indústria Santos",
      text: "Parceria de anos com a MecTech. Confiança total nos equipamentos e no pós-venda. Recomendo sem hesitar.",
      rating: 5
    },
    {
      name: "Roberto Oliveira",
      company: "Oficina Oliveira",
      text: "Preços justos, equipamentos de qualidade e entrega rápida. A MecTech é nossa primeira opção sempre.",
      rating: 5
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 transition-colors duration-200 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section id="depoimentos" className="py-20 bg-muted/30 section-animate">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-roboto font-bold text-4xl md:text-5xl text-foreground mb-4">
            O que nossos <span className="gradient-text">clientes</span> dizem
          </h2>
          <p className="font-open-sans text-lg text-muted-foreground">
            Confira alguns depoimentos de quem já confia na MecTech
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="card-hover animate-slide-up" 
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Quote className="w-8 h-8 text-primary mr-3" />
                  <div className="flex">{renderStars(testimonial.rating)}</div>
                </div>
                <p className="font-open-sans text-muted-foreground mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-roboto font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="font-open-sans text-sm text-primary">
                    {testimonial.company}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;