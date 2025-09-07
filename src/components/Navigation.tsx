import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  isAdmin: boolean;
  onAdminToggle: () => void;
}

export const Navigation = ({ isAdmin, onAdminToggle }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-bold text-electric-blue">
            Divy Yadav
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="hover:text-electric-blue transition-all-smooth"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-electric-blue transition-all-smooth"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="hover:text-electric-blue transition-all-smooth"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="hover:text-electric-blue transition-all-smooth"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="hover:text-electric-blue transition-all-smooth"
            >
              Contact
            </button>
          </div>

          {/* Admin Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant={isAdmin ? "default" : "outline"}
              size="sm"
              onClick={onAdminToggle}
              className="text-xs"
            >
              {isAdmin ? "Exit Admin" : "Admin"}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-electric-blue"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => scrollToSection('home')}
              className="block px-3 py-2 text-base hover:text-electric-blue transition-all-smooth w-full text-left"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block px-3 py-2 text-base hover:text-electric-blue transition-all-smooth w-full text-left"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="block px-3 py-2 text-base hover:text-electric-blue transition-all-smooth w-full text-left"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="block px-3 py-2 text-base hover:text-electric-blue transition-all-smooth w-full text-left"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block px-3 py-2 text-base hover:text-electric-blue transition-all-smooth w-full text-left"
            >
              Contact
            </button>
            <div className="px-3 py-2">
              <Button
                variant={isAdmin ? "default" : "outline"}
                size="sm"
                onClick={onAdminToggle}
                className="text-xs"
              >
                {isAdmin ? "Exit Admin" : "Admin"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};