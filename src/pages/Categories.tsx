
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Categories = () => {
  const navigate = useNavigate();
  
  const categories = [
    { 
      id: "smartphones", 
      name: "Smartphones", 
      description: "Los últimos smartphones con tecnología de punta",
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=2070&auto=format&fit=crop"
    },
    { 
      id: "laptops", 
      name: "Laptops", 
      description: "Laptops para trabajo, diseño, gaming y más",
      image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=2070&auto=format&fit=crop"
    },
    { 
      id: "tablets", 
      name: "Tablets", 
      description: "Tablets para entretenimiento y productividad",
      image: "https://images.unsplash.com/photo-1623126908029-58cb08a2b272?q=80&w=2070&auto=format&fit=crop"
    },
    { 
      id: "audio", 
      name: "Audífonos", 
      description: "La mejor experiencia sonora con los mejores audífonos",
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065&auto=format&fit=crop"
    },
    { 
      id: "gaming", 
      name: "Gaming", 
      description: "Todo lo que necesitas para gaming de alto nivel",
      image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=2071&auto=format&fit=crop"
    },
    { 
      id: "wearables", 
      name: "Wearables", 
      description: "Smartwatches y otros dispositivos vestibles",
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072&auto=format&fit=crop"
    },
  ];

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/resultados?category=${categoryId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Apple-style hero section */}
      <div className="bg-background py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Categorías</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Explore nuestra colección de tecnología de última generación, diseñada para mejorar tu vida diaria.
        </p>
      </div>
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Apple-style category grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="group flex flex-col rounded-2xl overflow-hidden bg-card transition-all duration-300 hover:shadow-xl"
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="relative h-80 w-full overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="p-8 flex flex-col items-start">
                <h3 className="text-2xl font-semibold mb-2">{category.name}</h3>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <Button 
                  variant="ghost" 
                  className="group flex items-center gap-1 text-primary hover:text-primary/90 pl-0"
                >
                  Explorar
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Categories;
