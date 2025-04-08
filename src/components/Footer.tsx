
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="font-bold text-2xl text-gradient mb-4">TechRank</div>
            <p className="text-muted-foreground max-w-md">
              Encontramos y comparamos las mejores ofertas tecnológicas para ayudarte a tomar decisiones informadas.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/categorias" className="text-muted-foreground hover:text-primary transition-colors">
                  Categorías
                </Link>
              </li>
              <li>
                <Link to="/ofertas" className="text-muted-foreground hover:text-primary transition-colors">
                  Ofertas
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terminos" className="text-muted-foreground hover:text-primary transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link to="/privacidad" className="text-muted-foreground hover:text-primary transition-colors">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground">
          <p>© {currentYear} TechRank. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
