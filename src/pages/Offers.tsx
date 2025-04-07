
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const Offers = () => {
  const offers = [
    {
      id: 1,
      title: "MacBook Air M2",
      discount: "20%",
      price: 19999,
      oldPrice: 24999,
      store: "Amazon",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2066&auto=format&fit=crop",
      url: "https://www.amazon.com.mx/Apple-MacBook-Chip-256GB-Almacenamiento/dp/B0CB64RKBV/"
    },
    {
      id: 2,
      title: "Samsung Galaxy S23",
      discount: "15%",
      price: 12999,
      oldPrice: 15299,
      store: "Samsung Shop",
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=2071&auto=format&fit=crop",
      url: "https://www.samsung.com/mx/smartphones/galaxy-s23/buy/"
    },
    {
      id: 3,
      title: "Sony WH-1000XM5",
      discount: "25%",
      price: 5999,
      oldPrice: 7999,
      store: "Best Buy",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1932&auto=format&fit=crop",
      url: "https://www.bestbuy.com.mx/p/sony-audifonos-noise-cancelling-wh-1000xm5-negro/1000279288"
    },
    {
      id: 4,
      title: "iPad Pro 12.9\"",
      discount: "10%",
      price: 23999,
      oldPrice: 26599,
      store: "Apple Store",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=2033&auto=format&fit=crop",
      url: "https://www.apple.com/mx/shop/buy-ipad/ipad-pro"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Ofertas Destacadas</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {offers.map((offer) => (
            <div 
              key={offer.id}
              className="bg-card text-card-foreground rounded-xl overflow-hidden shadow-md hover-scale"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img 
                  src={offer.image} 
                  alt={offer.title}
                  className="h-full w-full object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-pink-500">
                  -{offer.discount}
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{offer.title}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-primary">${offer.price.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground line-through">${offer.oldPrice.toLocaleString()}</span>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Disponible en {offer.store}
                </div>
                <div className="mt-3">
                  <a href={offer.url} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full" variant="outline">
                      Ver oferta <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
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

export default Offers;
