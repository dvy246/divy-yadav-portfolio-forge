import { useState } from "react";
import { ChevronDown, Download, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-bg.jpg";

interface HeroSectionProps {
  isAdmin: boolean;
  content: {
    name: string;
    tagline: string;
    description: string;
  };
  onContentChange: (field: string, value: string) => void;
}

export const HeroSection = ({ isAdmin, content, onContentChange }: HeroSectionProps) => {
  const [editingField, setEditingField] = useState<string | null>(null);

  const handleEdit = (field: string, value: string) => {
    onContentChange(field, value);
    setEditingField(null);
  };

  const EditableText = ({ 
    field, 
    value, 
    className, 
    as: Component = "div" 
  }: { 
    field: string; 
    value: string; 
    className: string; 
    as?: any; 
  }) => {
    if (isAdmin && editingField === field) {
      return (
        <input
          className={`${className} bg-transparent border border-electric-blue rounded px-2 py-1`}
          value={value}
          onChange={(e) => onContentChange(field, e.target.value)}
          onBlur={() => setEditingField(null)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setEditingField(null);
            }
          }}
          autoFocus
        />
      );
    }

    return (
      <Component
        className={`${className} ${isAdmin ? 'cursor-pointer hover:bg-secondary/20 rounded px-2 py-1' : ''}`}
        onClick={() => isAdmin && setEditingField(field)}
      >
        {value}
      </Component>
    );
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Content */}
      <div className="relative z-10 text-center space-y-8 animate-slide-up">
        <div className="space-y-4">
          <EditableText
            field="name"
            value={content.name}
            className="text-6xl md:text-8xl font-bold text-glow"
            as="h1"
          />
          <EditableText
            field="tagline"
            value={content.tagline}
            className="text-xl md:text-2xl text-electric-blue font-medium"
            as="h2"
          />
          <EditableText
            field="description"
            value={content.description}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            as="p"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="glow-primary animate-pulse-glow">
            <Download className="mr-2" size={20} />
            Download Resume
          </Button>
          <div className="flex gap-4">
            <Button variant="outline" size="lg">
              <Github className="mr-2" size={20} />
              GitHub
            </Button>
            <Button variant="outline" size="lg">
              <Linkedin className="mr-2" size={20} />
              LinkedIn
            </Button>
          </div>
        </div>

        <div className="animate-float">
          <button 
            onClick={scrollToAbout}
            className="mt-16 text-electric-blue hover:text-foreground transition-all-smooth"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </div>
    </section>
  );
};