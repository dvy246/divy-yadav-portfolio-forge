import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SkillsSectionProps {
  isAdmin: boolean;
  content: {
    title: string;
    categories: {
      name: string;
      skills: string[];
    }[];
  };
  onContentChange: (field: string, value: any) => void;
}

export const SkillsSection = ({ isAdmin, content, onContentChange }: SkillsSectionProps) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [newSkill, setNewSkill] = useState("");
  const [editingCategory, setEditingCategory] = useState<number | null>(null);

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

  const addSkill = (categoryIndex: number) => {
    if (newSkill.trim()) {
      const newCategories = [...content.categories];
      newCategories[categoryIndex].skills.push(newSkill.trim());
      onContentChange('categories', newCategories);
      setNewSkill("");
    }
  };

  const removeSkill = (categoryIndex: number, skillIndex: number) => {
    const newCategories = [...content.categories];
    newCategories[categoryIndex].skills.splice(skillIndex, 1);
    onContentChange('categories', newCategories);
  };

  const updateCategoryName = (categoryIndex: number, newName: string) => {
    const newCategories = [...content.categories];
    newCategories[categoryIndex].name = newName;
    onContentChange('categories', newCategories);
    setEditingCategory(null);
  };

  return (
    <section id="skills" className="py-20 px-4 bg-secondary/20">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <EditableText
              field="title"
              value={content.title}
              className="text-4xl md:text-5xl font-bold text-glow"
              as="h2"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.categories.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="card-gradient card-shadow p-6 transition-all-smooth hover:elevated-shadow">
                <div className="mb-4">
                  {isAdmin && editingCategory === categoryIndex ? (
                    <input
                      className="text-xl font-semibold text-electric-blue bg-transparent border border-electric-blue rounded px-2 py-1 w-full"
                      value={category.name}
                      onChange={(e) => updateCategoryName(categoryIndex, e.target.value)}
                      onBlur={() => setEditingCategory(null)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setEditingCategory(null);
                        }
                      }}
                      autoFocus
                    />
                  ) : (
                    <h3 
                      className={`text-xl font-semibold text-electric-blue ${isAdmin ? 'cursor-pointer hover:bg-secondary/20 rounded px-2 py-1' : ''}`}
                      onClick={() => isAdmin && setEditingCategory(categoryIndex)}
                    >
                      {category.name}
                    </h3>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="relative group">
                      <Badge variant="secondary" className="transition-all-smooth hover:bg-electric-blue hover:text-primary-foreground">
                        {skill}
                      </Badge>
                      {isAdmin && (
                        <button
                          className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-4 h-4 text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                          onClick={() => removeSkill(categoryIndex, skillIndex)}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  
                  {isAdmin && (
                    <div className="flex gap-2 mt-2 w-full">
                      <input
                        type="text"
                        placeholder="Add skill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        className="flex-1 bg-secondary/50 border border-border rounded px-2 py-1 text-sm"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            addSkill(categoryIndex);
                          }
                        }}
                      />
                      <Button
                        size="sm"
                        onClick={() => addSkill(categoryIndex)}
                        className="px-2"
                      >
                        <Plus size={14} />
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
            
            {isAdmin && (
              <Card className="card-gradient card-shadow p-6 border-dashed border-electric-blue transition-all-smooth hover:bg-secondary/20">
                <button
                  className="w-full h-full flex items-center justify-center text-electric-blue font-medium"
                  onClick={() => {
                    const newCategories = [...content.categories, { name: 'New Category', skills: [] }];
                    onContentChange('categories', newCategories);
                  }}
                >
                  <Plus className="mr-2" size={20} />
                  Add Category
                </button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};