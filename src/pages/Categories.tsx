
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
      
      {/* Nike-style hero section */}
      <div className="bg-secondary py-16 px-4">
        <div className="container mx-auto">
          <h1 className="nike-title mb-4">CATEGORÍAS</h1>
          <p className="nike-subtitle max-w-3xl">
            Explora nuestra colección de tecnología de última generación, diseñada para mejorar tu vida diaria.
          </p>
        </div>
      </div>
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Nike-style category grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="nike-card group cursor-pointer"
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="relative h-80 w-full overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-2xl font-bold uppercase text-white mb-1">{category.name}</h3>
                    <p className="text-white/80 mb-4">{category.description}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 flex flex-col items-start">
                <h3 className="text-2xl font-bold uppercase mb-2">{category.name}</h3>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <Button 
                  variant="ghost" 
                  className="group flex items-center gap-1 text-primary hover:text-primary/80 pl-0 uppercase font-medium"
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
