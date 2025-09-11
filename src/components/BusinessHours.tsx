import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

const BusinessHours = () => {
  const schedule = [
    { day: "Segunda-feira", hours: "07:00 – 12:00 | 13:30 – 17:00" },
    { day: "Terça-feira", hours: "07:00 – 12:00 | 13:30 – 17:00" },
    { day: "Quarta-feira", hours: "07:00 – 12:00 | 13:30 – 17:00" },
    { day: "Quinta-feira", hours: "07:00 – 12:00 | 13:30 – 17:00" },
    { day: "Sexta-feira", hours: "07:00 – 12:00 | 13:30 – 17:00" },
    { day: "Sábado", hours: "08:00 – 12:00" },
    { day: "Domingo", hours: "Fechado" }
  ];

  return (
    <section className="py-20 bg-muted/30 section-animate">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="font-roboto font-bold text-4xl md:text-5xl text-foreground mb-4">
              <span className="gradient-text">Horário</span> de Funcionamento
            </h2>
          </div>

          <Card className="shadow-lg card-hover animate-scale-in" style={{ animationDelay: "0.3s" }}>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-3">
                <Clock className="w-6 h-6 text-primary" />
                <span className="font-roboto text-xl">Nosso Horário</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {schedule.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex justify-between items-center py-3 border-b border-border last:border-b-0 animate-fade-in transition-all duration-200 hover:bg-muted/50 rounded px-2"
                    style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                  >
                    <span className="font-open-sans font-medium text-foreground">
                      {item.day}
                    </span>
                    <span className={`font-open-sans ${item.hours === 'Fechado' ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BusinessHours;