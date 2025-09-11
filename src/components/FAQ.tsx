import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Vocês fazem entregas em toda região de Itanhaém?",
      answer: "Sim, atendemos Itanhaém e toda a região. Entre em contato conosco pelo WhatsApp para verificar as condições de entrega para sua localidade."
    },
    {
      question: "Os equipamentos possuem garantia?",
      answer: "Todos os nossos equipamentos possuem garantia conforme especificação do fabricante. Fornecemos o certificado de garantia junto com a nota fiscal."
    },
    {
      question: "Vocês trabalham com instalação dos equipamentos?",
      answer: "Sim, oferecemos serviço de instalação e configuração para diversos tipos de equipamentos. Consulte nossa equipe técnica para mais detalhes."
    },
    {
      question: "É possível parcelar a compra?",
      answer: "Trabalhamos com diversas formas de pagamento, incluindo parcelamento. Entre em contato para conhecer as condições disponíveis."
    },
    {
      question: "Vocês oferecem assistência técnica?",
      answer: "Sim, possuímos equipe técnica especializada para manutenção e reparo dos equipamentos que comercializamos."
    },
    {
      question: "Como posso ver todos os produtos disponíveis?",
      answer: "Nosso catálogo completo está disponível no WhatsApp. Clique no botão 'Ver Catálogo' para acessar todos os produtos e preços atualizados."
    }
  ];

  return (
    <section id="faq" className="py-20 section-animate">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-roboto font-bold text-4xl md:text-5xl text-foreground mb-4">
              <span className="gradient-text">Perguntas</span> Frequentes
            </h2>
            <p className="font-open-sans text-lg text-muted-foreground">
              Tire suas dúvidas sobre nossos produtos e serviços
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full animate-scale-in" style={{ animationDelay: "0.3s" }}>
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border-border animate-fade-in" 
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <AccordionTrigger className="font-open-sans font-medium text-left hover:text-primary transition-colors duration-200">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-open-sans text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;