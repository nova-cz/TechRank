
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, LogIn, LogOut, UserCircle } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    name: "Usuario",
    email: "usuario@ejemplo.com",
    avatar: "" // Empty string for default avatar
  });

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogin = () => {
    // Mock login functionality
    setIsLoggedIn(true);
    setUser({
      name: "Juan Pérez",
      email: "juan.perez@ejemplo.com",
      avatar: "https://i.pravatar.cc/150?img=3" // Random avatar for demonstration
    });
  };

  const handleGoogleLogin = () => {
    // Mock Google login functionality
    setIsLoggedIn(true);
    setUser({
      name: "María González",
      email: "maria.gonzalez@gmail.com",
      avatar: "https://i.pravatar.cc/150?img=5" // Random avatar for demonstration
    });
  };

  const handleCreateAccount = () => {
    // Mock account creation
    setIsLoggedIn(true);
    setUser({
      name: "Nuevo Usuario",
      email: "nuevo.usuario@ejemplo.com",
      avatar: "" // Empty string for default avatar
    });
  };

  const handleLogout = () => {
    // Mock logout functionality
    setIsLoggedIn(false);
    setUser({
      name: "Usuario",
      email: "usuario@ejemplo.com",
      avatar: ""
    });
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
                  className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
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
              <DropdownMenuContent align="end" className="w-56">
                {isLoggedIn ? (
                  <>
                    <div className="flex items-center gap-2 p-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{user.name}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Cerrar sesión</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <div className="p-3">
                      <h4 className="text-sm font-semibold mb-2">Iniciar sesión</h4>
                      <div className="space-y-2">
                        <Button 
                          onClick={handleLogin} 
                          variant="outline" 
                          className="w-full justify-start"
                        >
                          <LogIn className="mr-2 h-4 w-4" />
                          <span>Con email y contraseña</span>
                        </Button>
                        <Button 
                          onClick={handleGoogleLogin} 
                          variant="outline" 
                          className="w-full justify-start"
                        >
                          <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="mr-2 h-4 w-4" />
                          <span>Continuar con Google</span>
                        </Button>
                      </div>
                      <DropdownMenuSeparator className="my-2" />
                      <p className="text-xs text-center text-muted-foreground mb-2">¿No tienes una cuenta?</p>
                      <Button 
                        onClick={handleCreateAccount} 
                        variant="default" 
                        className="w-full"
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>Crear cuenta</span>
                      </Button>
                    </div>
                  </>
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

      {/* Mobile menu - Simplified */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="px-3 py-2">
              {isLoggedIn ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold mb-2">Iniciar sesión</h4>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleLogin}
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    <span>Con email y contraseña</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleGoogleLogin}
                  >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="mr-2 h-4 w-4" />
                    <span>Continuar con Google</span>
                  </Button>
                  <div className="py-2">
                    <p className="text-xs text-center text-muted-foreground mb-2">¿No tienes una cuenta?</p>
                    <Button 
                      variant="default" 
                      className="w-full"
                      onClick={handleCreateAccount}
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Crear cuenta</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
