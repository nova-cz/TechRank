
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Mail, UserCircle } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: ""
  });

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login functionality
    setIsLoggedIn(true);
    setUser({
      name: loginEmail.split('@')[0],
      email: loginEmail,
      avatar: "" // Empty string for default avatar
    });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock signup functionality
    setIsLoggedIn(true);
    setUser({
      name: loginEmail.split('@')[0],
      email: loginEmail,
      avatar: "" // Empty string for default avatar
    });
  };

  const handleLogout = () => {
    // Mock logout functionality
    setIsLoggedIn(false);
    setUser({
      name: "",
      email: "",
      avatar: ""
    });
    setLoginEmail("");
    setLoginPassword("");
  };

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Categorías", path: "/categorias" },
    { name: "Ofertas", path: "/ofertas" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="font-bold text-2xl text-gradient">TechRank</div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors uppercase tracking-wide"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            {/* Profile dropdown - Simplified */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  {isLoggedIn ? (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <UserCircle className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 p-4">
                {isLoggedIn ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-bold">{user.name}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={isLoginMode ? handleLogin : handleSignup} className="space-y-4">
                    <h2 className="text-lg font-bold">{isLoginMode ? "Iniciar sesión" : "Crear cuenta"}</h2>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo electrónico</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="tu@correo.com" 
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Contraseña</Label>
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="********" 
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                    </div>
                    
                    <Button type="submit" variant="accent" className="w-full">
                      <Mail className="mr-2 h-4 w-4" />
                      {isLoginMode ? "Iniciar sesión" : "Crear cuenta"}
                    </Button>
                    
                    <div className="text-center">
                      <button 
                        type="button"
                        onClick={() => setIsLoginMode(!isLoginMode)} 
                        className="text-sm text-primary hover:underline"
                      >
                        {isLoginMode ? "¿No tienes una cuenta? Crear cuenta" : "¿Ya tienes una cuenta? Iniciar sesión"}
                      </button>
                    </div>
                  </form>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary transition-colors uppercase tracking-wide"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile login/profile */}
            <div className="mt-4 px-3 py-4 border-t border-border">
              {isLoggedIn ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-bold">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </Button>
                </div>
              ) : (
                <form onSubmit={isLoginMode ? handleLogin : handleSignup} className="space-y-4">
                  <h2 className="text-lg font-bold">{isLoginMode ? "Iniciar sesión" : "Crear cuenta"}</h2>
                  
                  <div className="space-y-2">
                    <Label htmlFor="m-email">Correo electrónico</Label>
                    <Input 
                      id="m-email" 
                      type="email" 
                      placeholder="tu@correo.com" 
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="m-password">Contraseña</Label>
                    <Input 
                      id="m-password" 
                      type="password" 
                      placeholder="********" 
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  </div>
                  
                  <Button type="submit" variant="accent" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    {isLoginMode ? "Iniciar sesión" : "Crear cuenta"}
                  </Button>
                  
                  <div className="text-center">
                    <button 
                      type="button"
                      onClick={() => setIsLoginMode(!isLoginMode)} 
                      className="text-sm text-primary hover:underline"
                    >
                      {isLoginMode ? "¿No tienes una cuenta? Crear cuenta" : "¿Ya tienes una cuenta? Iniciar sesión"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
