import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
const BusinessHours = () => {
  const schedule = [{
    day: "Segunda-feira",
    hours: "07:00 – 12:00 | 13:30 – 17:00"
  }, {
    day: "Terça-feira",
    hours: "07:00 – 12:00 | 13:30 – 17:00"
  }, {
    day: "Quarta-feira",
    hours: "07:00 – 12:00 | 13:30 – 17:00"
  }, {
    day: "Quinta-feira",
    hours: "07:00 – 12:00 | 13:30 – 17:00"
  }, {
    day: "Sexta-feira",
    hours: "07:00 – 12:00 | 13:30 – 17:00"
  }, {
    day: "Sábado",
    hours: "08:00 – 12:00"
  }, {
    day: "Domingo",
    hours: "Fechado"
  }];

  return (
    <section id="horarios" className="py-20 bg-background section-animate">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-roboto font-bold text-4xl md:text-5xl text-foreground mb-4">
            Horário de <span className="gradient-text">Funcionamento</span>
          </h2>
        </div>

        <Card className="max-w-2xl mx-auto card-hover animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Clock className="w-5 h-5 text-primary" />
              Nossos Horários
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {schedule.map((item, index) => (
                <div 
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-border/50 last:border-0"
                >
                  <span className="font-roboto font-medium text-foreground">
                    {item.day}
                  </span>
                  <span className="font-open-sans text-muted-foreground">
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
export default BusinessHours;