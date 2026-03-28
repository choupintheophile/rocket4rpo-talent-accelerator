import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  to?: string;
}

export const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => (
  <nav aria-label="Breadcrumb" className="container-wide py-4">
    <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <li><Link to="/" className="hover:text-foreground transition-colors">Accueil</Link></li>
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-1.5">
          <ChevronRight className="w-3.5 h-3.5" />
          {item.to ? (
            <Link to={item.to} className="hover:text-foreground transition-colors">{item.label}</Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);
