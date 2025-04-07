
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

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
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Categorías</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="group overflow-hidden rounded-xl shadow-md hover-scale cursor-pointer"
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="relative h-60 w-full overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                  <p className="text-sm text-gray-200">{category.description}</p>
                  <Button 
                    className="mt-2 bg-primary/80 hover:bg-primary"
                    size="sm"
                  >
                    Ver productos
                  </Button>
                </div>
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
