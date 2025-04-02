
import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

export default function PriceSearchForm() {
  const { toast } = useToast();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");
  const [currency, setCurrency] = useState("MXN");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simulamos la búsqueda con un setTimeout
    setTimeout(() => {
      // Generamos resultados ficticios basados en los criterios
      const min = parseInt(minPrice) || 0;
      const max = parseInt(maxPrice) || 50000;
      
      const mockProducts = [
        { id: 1, name: "Smartphone XYZ", price: 8999, category: "smartphones" },
        { id: 2, name: "Laptop Pro", price: 24999, category: "laptops" },
        { id: 3, name: "Tablet Ultra", price: 12499, category: "tablets" },
        { id: 4, name: "Audífonos NK300", price: 2999, category: "audio" },
        { id: 5, name: "Consola Next Gen", price: 9999, category: "gaming" },
        { id: 6, name: "Smartwatch Tech", price: 4599, category: "wearables" },
      ];
      
      const filteredProducts = mockProducts.filter(product => {
        const matchesCategory = !category || product.category === category;
        const matchesPrice = product.price >= min && product.price <= max;
        return matchesCategory && matchesPrice;
      });
      
      setSearchResults(filteredProducts);
      setIsSearching(false);
      
      // Mostramos un toast con los resultados
      toast({
        title: `${filteredProducts.length} productos encontrados`,
        description: `Se encontraron ${filteredProducts.length} productos en el rango de precio ${currencySymbols[currency]}${min} - ${currencySymbols[currency]}${max}${category ? ` en la categoría ${getCategoryName(category)}` : ''}`,
      });
    }, 800);
  };

  const getCategoryName = (id: string) => {
    const found = categories.find(cat => cat.id === id);
    return found ? found.name : id;
  };

  const currencySymbols: Record<string, string> = {
    MXN: "$",
    USD: "US$",
    EUR: "€",
  };

  const categories = [
    { id: "smartphones", name: "Smartphones" },
    { id: "laptops", name: "Laptops" },
    { id: "tablets", name: "Tablets" },
    { id: "audio", name: "Audífonos" },
    { id: "gaming", name: "Gaming" },
    { id: "wearables", name: "Wearables" },
  ];

  return (
    <form onSubmit={handleSearch} className="w-full max-w-4xl mx-auto">
      <div className="glass-card rounded-2xl p-6 shadow-lg">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full md:w-auto bg-gradient-to-r from-techblue-500 to-techpurple-500 hover:from-techblue-600 hover:to-techpurple-600"
            disabled={isSearching}
          >
            {isSearching ? (
              <>Buscando...</>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Buscar
              </>
            )}
          </Button>
          
          {searchResults.length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold">Resultados ({searchResults.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map(product => (
                  <div key={product.id} className="bg-card p-4 rounded-lg shadow-sm border">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-lg font-bold text-gradient">
                      {currencySymbols[currency]}{product.price}
                    </div>
                    <div className="text-sm text-muted-foreground">{getCategoryName(product.category)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
