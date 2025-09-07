import { useState, useRef } from "react";
import { ChevronDown, Download, Github, Linkedin, Upload, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import heroBackground from "@/assets/hero-bg.jpg";

interface HeroSectionProps {
  isAdmin: boolean;
  content: {
    name: string;
    tagline: string;
    description: string;
    profileImage?: string;
  };
  onContentChange: (field: string, value: string) => void;
}

export const HeroSection = ({ isAdmin, content, onContentChange }: HeroSectionProps) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size too large. Please choose an image under 5MB.");
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error("Please select a valid image file.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onContentChange('profileImage', result);
        toast.success("Profile photo updated!");
      };
      reader.onerror = () => {
        toast.error("Error reading file. Please try again.");
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

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
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-4">
              <EditableText
                field="name"
                value={content.name}
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-glow"
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
                className="text-lg md:text-xl text-muted-foreground leading-relaxed"
                as="p"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
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
          </div>

          {/* Right side - Profile photo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Photo container */}
              <div className="relative w-80 h-80 md:w-96 md:h-96">
                <div className="w-full h-full rounded-full overflow-hidden card-gradient card-shadow ring-4 ring-electric-blue/20 transition-all-smooth hover:ring-electric-blue/40">
                  {content.profileImage ? (
                    <img
                      src={content.profileImage}
                      alt="Divy Yadav"
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary to-secondary/50">
                      <div className="text-center space-y-4 text-muted-foreground">
                        <Camera size={48} className="mx-auto opacity-50" />
                        <p className="text-lg font-medium">Professional Photo</p>
                        {isAdmin && (
                          <p className="text-sm">Click to upload</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Upload overlay for admin */}
                {isAdmin && (
                  <>
                    <button
                      onClick={triggerImageUpload}
                      className="absolute inset-0 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 hover:opacity-100 transition-all-smooth group"
                    >
                      <div className="text-center space-y-2 text-electric-blue">
                        <Upload size={32} className="mx-auto group-hover:scale-110 transition-transform" />
                        <p className="font-medium">Upload Photo</p>
                        <p className="text-xs text-muted-foreground">Max 5MB</p>
                      </div>
                    </button>
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </>
                )}

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-electric-blue rounded-full animate-pulse-glow opacity-60"></div>
                <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-cyber-blue rounded-full animate-float opacity-40"></div>
                <div className="absolute top-1/2 -left-8 w-4 h-4 bg-neon-purple rounded-full animate-pulse opacity-30"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
          <button 
            onClick={scrollToAbout}
            className="text-electric-blue hover:text-foreground transition-all-smooth"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </div>
    </section>
  );
};