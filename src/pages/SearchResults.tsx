import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Filter, ExternalLink } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { PRODUCTS } from "@/data/products";

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [minPrice, setMinPrice] = useState(searchParams.get("min") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("max") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [currency, setCurrency] = useState(searchParams.get("currency") || "MXN");
  const [searchResults, setSearchResults] = useState<typeof PRODUCTS>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [view, setView] = useState<"table" | "grid">("table");

  const categories = [
    { id: "celulares", name: "Celulares" },
    { id: "laptops", name: "Computadoras" },
    { id: "tablets", name: "Tablets" },
    { id: "audio", name: "Audio" },
  ];

  const currencySymbols: Record<string, string> = {
    MXN: "$",
    USD: "US$",
    EUR: "€",
  };

  const getCategoryName = (id: string) => {
    const found = categories.find(cat => cat.id === id);
    return found ? found.name : id;
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSearching(true);

    const min = minPrice ? parseFloat(minPrice) : 0;
    const max = maxPrice ? parseFloat(maxPrice) : Infinity;

    const filtered = PRODUCTS.filter(p => {
      const matchesCategory = category === "all" || p.category === category;
      const matchesPrice = p.price >= min && p.price <= max;
      return matchesCategory && matchesPrice;
    });

    setSearchResults(filtered);
    setIsSearching(false);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Resultados de búsqueda</h1>

        <div className="glass-card rounded-xl p-6 shadow-md mb-8">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minPrice">Precio mínimo</Label>
              <Input
                id="minPrice"
                type="number"
                placeholder="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxPrice">Precio máximo</Label>
              <Input
                id="maxPrice"
                type="number"
                placeholder="50000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Moneda</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger>
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
                <SelectTrigger>
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
              <Button type="submit" className="w-full">
                {isSearching ? "Buscando..." : <> <Filter className="w-4 h-4 mr-2" /> Filtrar</>}
              </Button>
            </div>
          </form>
        </div>

        <Tabs value={view} onValueChange={(v) => setView(v as "table" | "grid")} className="w-full">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {searchResults.length} productos encontrados
            </h2>
            <TabsList className="grid w-[200px] grid-cols-2">
              <TabsTrigger value="table">Tabla</TabsTrigger>
              <TabsTrigger value="grid">Cuadrícula</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="table">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Plataforma</TableHead>
                  <TableHead>Ver</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {searchResults.map(product => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{getCategoryName(product.category)}</TableCell>
                    <TableCell>{currencySymbols[currency]}{product.price}</TableCell>
                    <TableCell>{product.platform}</TableCell>
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
          </TabsContent>

          <TabsContent value="grid" className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {searchResults.map(product => (
              <div key={product.id} className="border rounded-lg shadow p-4">
                <img src={`/${product.image}`} alt={product.name} className="w-full h-40 object-cover mb-2" />

                <h3 className="font-semibold text-base mb-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{getCategoryName(product.category)}</p>
                <p className="text-lg font-bold my-2">{currencySymbols[currency]}{product.price}</p>
                <a href={product.url} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full">Ver producto</Button>
                </a>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default SearchResults;
