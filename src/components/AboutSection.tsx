import { useState } from "react";
import { Card } from "@/components/ui/card";

interface AboutSectionProps {
  isAdmin: boolean;
  content: {
    title: string;
    description: string;
    highlights: string[];
  };
  onContentChange: (field: string, value: any) => void;
}

export const AboutSection = ({ isAdmin, content, onContentChange }: AboutSectionProps) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editingHighlight, setEditingHighlight] = useState<number | null>(null);

  const EditableText = ({ 
    field, 
    value, 
    className, 
    as: Component = "div",
    multiline = false
  }: { 
    field: string; 
    value: string; 
    className: string; 
    as?: any;
    multiline?: boolean;
  }) => {
    if (isAdmin && editingField === field) {
      const InputComponent = multiline ? 'textarea' : 'input';
      return (
        <InputComponent
          className={`${className} bg-transparent border border-electric-blue rounded px-2 py-1 w-full ${multiline ? 'min-h-[100px] resize-none' : ''}`}
          value={value}
          onChange={(e) => onContentChange(field, e.target.value)}
          onBlur={() => setEditingField(null)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !multiline) {
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

  const EditableHighlight = ({ index, value }: { index: number; value: string }) => {
    if (isAdmin && editingHighlight === index) {
      return (
        <input
          className="bg-transparent border border-electric-blue rounded px-2 py-1 w-full"
          value={value}
          onChange={(e) => {
            const newHighlights = [...content.highlights];
            newHighlights[index] = e.target.value;
            onContentChange('highlights', newHighlights);
          }}
          onBlur={() => setEditingHighlight(null)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setEditingHighlight(null);
            }
          }}
          autoFocus
        />
      );
    }

    return (
      <div
        className={`${isAdmin ? 'cursor-pointer hover:bg-secondary/20 rounded px-2 py-1' : ''}`}
        onClick={() => isAdmin && setEditingHighlight(index)}
      >
        {value}
      </div>
    );
  };

  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <EditableText
              field="title"
              value={content.title}
              className="text-4xl md:text-5xl font-bold mb-6 text-glow"
              as="h2"
            />
            <EditableText
              field="description"
              value={content.description}
              className="text-lg text-muted-foreground leading-relaxed"
              as="p"
              multiline
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {content.highlights.map((highlight, index) => (
              <Card key={index} className="card-gradient card-shadow p-6 text-center transition-all-smooth hover:elevated-shadow hover:scale-105">
                <EditableHighlight index={index} value={highlight} />
                {isAdmin && (
                  <button
                    className="mt-2 text-xs text-destructive hover:text-destructive/80"
                    onClick={() => {
                      const newHighlights = content.highlights.filter((_, i) => i !== index);
                      onContentChange('highlights', newHighlights);
                    }}
                  >
                    Remove
                  </button>
                )}
              </Card>
            ))}
            {isAdmin && (
              <Card className="card-gradient card-shadow p-6 text-center border-dashed border-electric-blue transition-all-smooth hover:bg-secondary/20">
                <button
                  className="text-electric-blue font-medium"
                  onClick={() => {
                    const newHighlights = [...content.highlights, 'New highlight'];
                    onContentChange('highlights', newHighlights);
                  }}
                >
                  + Add Highlight
                </button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};