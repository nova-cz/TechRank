
import PriceSearchForm from "./PriceSearchForm";

export default function HeroBanner() {
  return (
    <div className="relative overflow-hidden bg-tech-pattern py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-float">
            <span className="text-gradient">Encuentra la mejor tecnología</span>
            <br /> al mejor precio
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Compara precios de múltiples tiendas en un solo lugar y encuentra las mejores ofertas
          </p>

          <PriceSearchForm />
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="hidden md:block absolute -top-24 -right-24 w-96 h-96 bg-techblue-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="hidden md:block absolute -bottom-24 -left-24 w-96 h-96 bg-techpurple-500/10 rounded-full blur-3xl animate-pulse-slow" />
    </div>
  );
}
