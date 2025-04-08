
import { SearchCheck, Shield, MessageSquare } from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureProps) {
  return (
    <div className="glass-card rounded-xl p-6 hover-scale shadow-md">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-3 rounded-full bg-gradient-to-br from-red-500 to-red-700 text-white">
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export default function FeatureCards() {
  const features = [
    {
      icon: <SearchCheck className="h-6 w-6" />,
      title: "Compara precios",
      description: "Encontramos las mejores ofertas de múltiples tiendas en línea.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Productos verificados",
      description: "Todos los productos son verificados por nuestra comunidad.",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Reseñas reales",
      description: "Lee opiniones de usuarios reales antes de comprar.",
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid gap-8 md:grid-cols-3">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
}
