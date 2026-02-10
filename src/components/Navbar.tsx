import { Link, useLocation } from "react-router-dom";
import { Home, Archive, FileText, User, Heart, Code } from "lucide-react";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/archives", label: "Archives", icon: Archive },
  { to: "/writeups", label: "Writeups", icon: FileText },
  { to: "/research", label: "Research", icon: User },
  { to: "/projects", label: "Projects", icon: Code },
  { to: "/about", label: "About", icon: Heart },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
        <Link to="/" className="font-heading text-xl font-bold text-foreground hover:text-primary transition-colors">
          cryptokiddo
        </Link>
        <div className="flex items-center gap-6">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-1.5 text-sm transition-colors ${
                location.pathname === to
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon size={14} />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
