
import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PriceSearchForm() {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");
  const [currency, setCurrency] = useState("MXN");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ minPrice, maxPrice, currency, category });
    // Aquí iría la lógica para buscar productos según los criterios
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
          
          <Button type="submit" className="w-full md:w-auto bg-gradient-to-r from-techblue-500 to-techpurple-500 hover:from-techblue-600 hover:to-techpurple-600">
            <Search className="w-4 h-4 mr-2" />
            Buscar
          </Button>
        </div>
      </div>
    </form>
  );
}
