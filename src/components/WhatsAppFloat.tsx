import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const WhatsAppFloat = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        size="lg"
        className="rounded-full w-16 h-16 bg-green-500 hover:bg-green-600 text-white shadow-2xl hover:shadow-green-500/25 transition-all duration-300 animate-float btn-glow"
        asChild
      >
        <a 
          href="https://wa.me/5513991670473" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Entrar em contato pelo WhatsApp"
          className="flex items-center justify-center"
        >
          <MessageCircle className="w-8 h-8" />
        </a>
      </Button>
    </div>
  );
};

export default WhatsAppFloat;