
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, ArrowRight, Filter, ExternalLink } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  platform: string;
  url: string;
}

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  
  const [minPrice, setMinPrice] = useState(searchParams.get("min") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("max") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [currency, setCurrency] = useState(searchParams.get("currency") || "MXN");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

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
        { id: 1, name: "Smartphone Galaxy S23", price: 19999, category: "smartphones", platform: "amazon", url: "https://www.amazon.com.mx/" },
        { id: 2, name: "MacBook Pro M2", price: 34999, category: "laptops", platform: "liverpool", url: "https://www.liverpool.com.mx/" },
        { id: 3, name: "iPad Pro 12.9", price: 22499, category: "tablets", platform: "amazon", url: "https://www.amazon.com.mx/" },
        { id: 4, name: "AirPods Pro", price: 4999, category: "audio", platform: "mercadolibre", url: "https://www.mercadolibre.com.mx/" },
        { id: 5, name: "Xbox Series X", price: 12999, category: "gaming", platform: "walmart", url: "https://www.walmart.com.mx/" },
        { id: 6, name: "Apple Watch Series 8", price: 8599, category: "wearables", platform: "bestbuy", url: "https://www.bestbuy.com.mx/" },
        { id: 7, name: "iPhone 14 Pro Max", price: 25999, category: "smartphones", platform: "liverpool", url: "https://www.liverpool.com.mx/" },
        { id: 8, name: "Laptop Gamer Alienware", price: 42999, category: "laptops", platform: "mercadolibre", url: "https://www.mercadolibre.com.mx/" },
        { id: 9, name: "Samsung Galaxy Tab S8", price: 15499, category: "tablets", platform: "coppel", url: "https://www.coppel.com.mx/" },
        { id: 10, name: "Sony WH-1000XM5", price: 7999, category: "audio", platform: "amazon", url: "https://www.amazon.com.mx/" },
        { id: 11, name: "PlayStation 5", price: 11999, category: "gaming", platform: "liverpool", url: "https://www.liverpool.com.mx/" },
        { id: 12, name: "Samsung Galaxy Watch 5", price: 5499, category: "wearables", platform: "walmart", url: "https://www.walmart.com.mx/" },
        { id: 13, name: "Xiaomi Redmi Note 12", price: 4999, category: "smartphones", platform: "mercadolibre", url: "https://www.mercadolibre.com.mx/" },
        { id: 14, name: "Lenovo ThinkPad X1", price: 32999, category: "laptops", platform: "bestbuy", url: "https://www.bestbuy.com.mx/" },
        { id: 15, name: "Kindle Paperwhite", price: 3299, category: "tablets", platform: "amazon", url: "https://www.amazon.com.mx/" },
      ];
      
      const filteredProducts = mockProducts.filter(product => {
        const matchesCategory = !category || category === "all" || product.category === category;
        const matchesPrice = product.price >= min && (max === 0 || product.price <= max);
        return matchesCategory && matchesPrice;
      });
      
      setSearchResults(filteredProducts);
      setIsSearching(false);
    }, 800);
  };

  // Cargar resultados al iniciar o cuando cambian los parámetros
  useEffect(() => {
    handleSearch();
  }, []);

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
                {searchResults.length > 0 && (
                  <div className="text-sm text-muted-foreground">
                    Precio: {currencySymbols[currency]}{minPrice || '0'} - {maxPrice ? `${currencySymbols[currency]}${maxPrice}` : 'Sin límite'}
                    {category && category !== 'all' && ` | Categoría: ${getCategoryName(category)}`}
                  </div>
                )}
              </div>
            </div>
            
            {searchResults.length > 0 ? (
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
