import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, ExternalLink } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  platform: string;
  url: string;
  image?: string;
  rating?: number;
}

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  
  const [minPrice, setMinPrice] = useState(searchParams.get("min") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("max") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [currency, setCurrency] = useState(searchParams.get("currency") || "MXN");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [view, setView] = useState<"table" | "grid">("table");

  // Categorías disponibles
  const categories = [
    { id: "smartphones", name: "Smartphones" },
    { id: "laptops", name: "Laptops" },
    { id: "tablets", name: "Tablets" },
    { id: "audio", name: "Audífonos" },
    { id: "gaming", name: "Gaming" },
    { id: "wearables", name: "Wearables" },
  ];

  // Símbolos de moneda
  const currencySymbols: Record<string, string> = {
    MXN: "$",
    USD: "US$",
    EUR: "€",
  };

  // Plataformas de e-commerce
  const platforms = {
    all: "Todas las plataformas",
    amazon: "Amazon",
    mercadolibre: "Mercado Libre",
    liverpool: "Liverpool",
    walmart: "Walmart",
    bestbuy: "Best Buy",
    coppel: "Coppel",
  };

  // Obtener el nombre de la categoría según su ID
  const getCategoryName = (id: string) => {
    const found = categories.find(cat => cat.id === id);
    return found ? found.name : id;
  };

  // Función para buscar productos
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    setIsSearching(true);
    
    // Actualizar la URL con los parámetros de búsqueda
    const params = new URLSearchParams();
    if (minPrice) params.set("min", minPrice);
    if (maxPrice) params.set("max", maxPrice);
    if (category) params.set("category", category);
    params.set("currency", currency);
    
    navigate(`/resultados?${params.toString()}`, { replace: true });
    
    // Simulamos la búsqueda con un setTimeout
    setTimeout(() => {
      // Generamos resultados ficticios de varias plataformas basados en los criterios
      const min = parseInt(minPrice) || 0;
      const max = parseInt(maxPrice) || 50000;
      
      const mockProducts = [
        { 
          id: 1, 
          name: "Smartphone Galaxy S23", 
          price: 19999, 
          category: "smartphones", 
          platform: "amazon", 
          url: "https://www.amazon.com.mx/Samsung-Galaxy-S23-256GB-Phantom/dp/B0BLP45GY8/",
          image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=2071&auto=format&fit=crop",
          rating: 4.7
        },
        { 
          id: 2, 
          name: "MacBook Pro M2", 
          price: 34999, 
          category: "laptops", 
          platform: "liverpool", 
          url: "https://www.liverpool.com.mx/tienda/pdp/apple-macbook-pro-13-chip-m2-8-gb-256-gb-ssd-space-gray/1127999735",
          image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2066&auto=format&fit=crop",
          rating: 4.9 
        },
        { 
          id: 3, 
          name: "iPad Pro 12.9", 
          price: 22499, 
          category: "tablets", 
          platform: "amazon", 
          url: "https://www.amazon.com.mx/Apple-iPad-12-9-pulgadas-Wi-Fi-256GB/dp/B0C6Z1YYF8/",
          image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=2033&auto=format&fit=crop",
          rating: 4.8 
        },
        { 
          id: 4, 
          name: "AirPods Pro", 
          price: 4999, 
          category: "audio", 
          platform: "mercadolibre", 
          url: "https://www.mercadolibre.com.mx/apple-airpods-pro-2da-generacion-blanco/p/MLM19615244",
          image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1932&auto=format&fit=crop",
          rating: 4.6 
        },
        { 
          id: 5, 
          name: "Xbox Series X", 
          price: 12999, 
          category: "gaming", 
          platform: "walmart", 
          url: "https://www.walmart.com.mx/videojuegos/consolas/xbox/consola-xbox-series-x-1tb-negro_00088984713203",
          image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=2071&auto=format&fit=crop",
          rating: 4.5 
        },
        { 
          id: 6, 
          name: "Apple Watch Series 8", 
          price: 8599, 
          category: "wearables", 
          platform: "bestbuy", 
          url: "https://www.bestbuy.com.mx/p/apple-watch-series-8-gps-45mm-caja-de-aluminio-product-red-y-correa-deportiva-product-red/1000259264",
          image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072&auto=format&fit=crop",
          rating: 4.7 
        },
        { 
          id: 7, 
          name: "iPhone 14 Pro Max", 
          price: 25999, 
          category: "smartphones", 
          platform: "liverpool", 
          url: "https://www.liverpool.com.mx/tienda/pdp/apple-iphone-14-pro-max-256-gb/1126823979",
          image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=1780&auto=format&fit=crop",
          rating: 4.9 
        },
        { 
          id: 8, 
          name: "Laptop Gamer Alienware", 
          price: 42999, 
          category: "laptops", 
          platform: "mercadolibre", 
          url: "https://www.mercadolibre.com.mx/laptop-gamer-dell-alienware-m16-r1-negra-16-qhd-240hz-intel-core-i9-13900hx-32gb-de-ram-1tb-ssd-nvidia-geforce-rtx-4090-144-w-windows-11-home/p/MLM23181341",
          image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=1768&auto=format&fit=crop",
          rating: 4.4 
        },
        { 
          id: 9, 
          name: "Samsung Galaxy Tab S8", 
          price: 15499, 
          category: "tablets", 
          platform: "coppel", 
          url: "https://www.coppel.com/tablet-samsung-galaxy-tab-s8-pm-8025132",
          image: "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?q=80&w=1964&auto=format&fit=crop",
          rating: 4.5 
        },
        { 
          id: 10, 
          name: "Sony WH-1000XM5", 
          price: 7999, 
          category: "audio", 
          platform: "amazon", 
          url: "https://www.amazon.com.mx/Sony-Auriculares-cancelaci%C3%B3n-inal%C3%A1mbricos-WH-1000XM5/dp/B09XS7JWHH",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
          rating: 4.8 
        },
        { 
          id: 11, 
          name: "PlayStation 5", 
          price: 11999, 
          category: "gaming", 
          platform: "liverpool", 
          url: "https://www.liverpool.com.mx/tienda/pdp/consola-playstation-5-slim-825-gb/1136100144",
          image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=2070&auto=format&fit=crop",
          rating: 4.9 
        },
        { 
          id: 12, 
          name: "Samsung Galaxy Watch 5", 
          price: 5499, 
          category: "wearables", 
          platform: "walmart", 
          url: "https://www.walmart.com.mx/electronicos/gadgets-y-smartwatches/smartwatches/samsung-galaxy-watch5-44mm-smart-watch-bt-gray_00195434251788",
          image: "https://images.unsplash.com/photo-1560796952-f1c9b581b9a4?q=80&w=1974&auto=format&fit=crop",
          rating: 4.6 
        },
        { 
          id: 13, 
          name: "Xiaomi Redmi Note 12", 
          price: 4999, 
          category: "smartphones", 
          platform: "mercadolibre", 
          url: "https://www.mercadolibre.com.mx/xiaomi-redmi-note-12-dual-sim-128-gb-onyx-gray-4-gb-ram/p/MLM21819485",
          image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=1979&auto=format&fit=crop",
          rating: 4.4 
        },
        { 
          id: 14, 
          name: "Lenovo ThinkPad X1", 
          price: 32999, 
          category: "laptops", 
          platform: "bestbuy", 
          url: "https://www.bestbuy.com.mx/p/lenovo-laptop-thinkpad-x1-carbon-gen11-14-intel-core-i7-16gb-512gb-ssd-windows-11-pro/1000271903",
          image: "https://images.unsplash.com/photo-1636211930838-0441d0bcace1?q=80&w=1974&auto=format&fit=crop",
          rating: 4.7 
        },
        { 
          id: 15, 
          name: "Kindle Paperwhite", 
          price: 3299, 
          category: "tablets", 
          platform: "amazon", 
          url: "https://www.amazon.com.mx/kindle-paperwhite-16-gb-ahora-con-una-pantalla-de-68-y-ajuste-de-luz-calida-sin-publicidad/dp/B08N36XNTT",
          image: "https://images.unsplash.com/photo-1592803312586-775b10ab705c?q=80&w=1952&auto=format&fit=crop",
          rating: 4.8 
        },
      ];
      
      const filteredProducts = mockProducts.filter(product => {
        const matchesCategory = !category || category === "all" || product.category === category;
        const matchesPrice = product.price >= min && (max === 0 || product.price <= max);
        const matchesPlatform = selectedPlatform === "all" || product.platform === selectedPlatform;
        return matchesCategory && matchesPrice && matchesPlatform;
      });
      
      setSearchResults(filteredProducts);
      setIsSearching(false);
    }, 800);
  };

  // Cargar resultados al iniciar o cuando cambian los parámetros
  useEffect(() => {
    handleSearch();
  }, [selectedPlatform]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Resultados de búsqueda</h1>
          
          <div className="glass-card rounded-xl p-6 shadow-md mb-8">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minPrice">Precio mínimo</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">{currencySymbols[currency]}</span>
                  </div>
                  <Input
                    id="minPrice"
                    type="number"
                    placeholder="0"
                    className="pl-8"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maxPrice">Precio máximo</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">{currencySymbols[currency]}</span>
                  </div>
                  <Input
                    id="maxPrice"
                    type="number"
                    placeholder="50000"
                    className="pl-8"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currency">Moneda</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Seleccionar moneda" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MXN">Pesos (MXN)</SelectItem>
                    <SelectItem value="USD">Dólares (USD)</SelectItem>
                    <SelectItem value="EUR">Euros (EUR)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-techblue-500 to-techpurple-500 hover:from-techblue-600 hover:to-techpurple-600"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <>Buscando...</>
                  ) : (
                    <>
                      <Filter className="w-4 h-4 mr-2" />
                      Filtrar
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
          
          <div className="bg-card rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  {searchResults.length} productos encontrados
                </h2>
                <div className="flex items-center gap-4">
                  {searchResults.length > 0 && (
                    <div className="text-sm text-muted-foreground hidden md:block">
                      Precio: {currencySymbols[currency]}{minPrice || '0'} - {maxPrice ? `${currencySymbols[currency]}${maxPrice}` : 'Sin límite'}
                      {category && category !== 'all' && ` | Categoría: ${getCategoryName(category)}`}
                    </div>
                  )}
                  
                  <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Plataforma" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(platforms).map(([value, label]) => (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Tabs value={view} onValueChange={(value) => setView(value as "table" | "grid")} className="w-[200px]">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="table">Tabla</TabsTrigger>
                      <TabsTrigger value="grid">Cuadrícula</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </div>
            
            {searchResults.length > 0 ? (
              <Tabs value={view} defaultValue="table">
                <TabsContent value="table" className="mt-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Producto</TableHead>
                          <TableHead>Categoría</TableHead>
                          <TableHead>Plataforma</TableHead>
                          <TableHead className="text-right">Precio</TableHead>
                          <TableHead className="w-[100px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {searchResults.map(product => (
                          <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{getCategoryName(product.category)}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <span className={`font-medium ${product.platform === 'amazon' ? 'text-[#FF9900]' : 
                                                 product.platform === 'mercadolibre' ? 'text-[#FFE600]' : 
                                                 product.platform === 'liverpool' ? 'text-[#E10098]' : 
                                                 product.platform === 'walmart' ? 'text-[#0071CE]' :
                                                 product.platform === 'bestbuy' ? 'text-[#FFED00]' :
                                                 product.platform === 'coppel' ? 'text-[#01A0E9]' : ''}`}>
                                  {platforms[product.platform as keyof typeof platforms]}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-bold text-gradient">
                              {currencySymbols[currency]}{product.price.toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <a href={product.url} target="_blank" rel="noopener noreferrer">
                                <Button variant="ghost" size="sm">
                                  Ver <ExternalLink className="ml-1 h-4 w-4" />
                                </Button>
                              </a>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                
                <TabsContent value="grid" className="mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {searchResults.map(product => (
                      <div key={product.id} className="bg-background rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                        <div className="h-40 overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-1 line-clamp-1">{product.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{getCategoryName(product.category)}</p>
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-bold text-primary">
                              {currencySymbols[currency]}{product.price.toLocaleString()}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              product.platform === 'amazon' ? 'bg-[#FF990020] text-[#FF9900]' : 
                              product.platform === 'mercadolibre' ? 'bg-[#FFE60020] text-[#B8A200]' : 
                              product.platform === 'liverpool' ? 'bg-[#E1009820] text-[#E10098]' : 
                              product.platform === 'walmart' ? 'bg-[#0071CE20] text-[#0071CE]' :
                              product.platform === 'bestbuy' ? 'bg-[#FFED0020] text-[#B8A200]' :
                              product.platform === 'coppel' ? 'bg-[#01A0E920] text-[#01A0E9]' : ''
                            }`}>
                              {platforms[product.platform as keyof typeof platforms]}
                            </span>
                          </div>
                          <a href={product.url} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" className="w-full">
                              Ver producto <ExternalLink className="ml-1 h-3 w-3" />
                            </Button>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="p-8 text-center">
                <p className="text-lg text-muted-foreground">No se encontraron productos con los criterios seleccionados.</p>
                <p className="mt-2">Intenta ampliar tu búsqueda modificando los filtros.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchResults;
