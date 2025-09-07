import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Plus, Trash2 } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

interface ProjectsSectionProps {
  isAdmin: boolean;
  content: {
    title: string;
    projects: Project[];
  };
  onContentChange: (field: string, value: any) => void;
}

export const ProjectsSection = ({ isAdmin, content, onContentChange }: ProjectsSectionProps) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<string | null>(null);

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
          className={`${className} bg-transparent border border-electric-blue rounded px-2 py-1 w-full ${multiline ? 'min-h-[60px] resize-none' : ''}`}
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

  const EditableProjectField = ({ 
    projectId, 
    field, 
    value, 
    className, 
    multiline = false 
  }: { 
    projectId: string; 
    field: string; 
    value: string; 
    className: string; 
    multiline?: boolean; 
  }) => {
    const fieldKey = `${projectId}-${field}`;
    
    if (isAdmin && editingProject === fieldKey) {
      const InputComponent = multiline ? 'textarea' : 'input';
      return (
        <InputComponent
          className={`${className} bg-transparent border border-electric-blue rounded px-2 py-1 w-full ${multiline ? 'min-h-[60px] resize-none' : ''}`}
          value={value}
          onChange={(e) => {
            const newProjects = content.projects.map(p => 
              p.id === projectId ? { ...p, [field]: e.target.value } : p
            );
            onContentChange('projects', newProjects);
          }}
          onBlur={() => setEditingProject(null)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !multiline) {
              setEditingProject(null);
            }
          }}
          autoFocus
        />
      );
    }

    return (
      <div
        className={`${className} ${isAdmin ? 'cursor-pointer hover:bg-secondary/20 rounded px-2 py-1' : ''}`}
        onClick={() => isAdmin && setEditingProject(fieldKey)}
      >
        {value}
      </div>
    );
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: 'New Project',
      description: 'Project description',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=300&fit=crop',
      technologies: ['React', 'TypeScript'],
      liveUrl: '',
      githubUrl: ''
    };
    onContentChange('projects', [...content.projects, newProject]);
  };

  const removeProject = (projectId: string) => {
    const newProjects = content.projects.filter(p => p.id !== projectId);
    onContentChange('projects', newProjects);
  };

  return (
    <section id="projects" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <EditableText
              field="title"
              value={content.title}
              className="text-4xl md:text-5xl font-bold text-glow"
              as="h2"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.projects.map((project) => (
              <Card key={project.id} className="card-gradient card-shadow overflow-hidden transition-all-smooth hover:elevated-shadow hover:scale-105">
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  {isAdmin && (
                    <button
                      className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full w-8 h-8 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
                      onClick={() => removeProject(project.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                
                <div className="p-6">
                  <EditableProjectField
                    projectId={project.id}
                    field="title"
                    value={project.title}
                    className="text-xl font-semibold text-electric-blue mb-2"
                  />
                  
                  <EditableProjectField
                    projectId={project.id}
                    field="description"
                    value={project.description}
                    className="text-muted-foreground mb-4"
                    multiline
                  />
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    {project.liveUrl && (
                      <Button size="sm" variant="outline">
                        <ExternalLink size={16} className="mr-1" />
                        Live
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button size="sm" variant="outline">
                        <Github size={16} className="mr-1" />
                        Code
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
            
            {isAdmin && (
              <Card className="card-gradient card-shadow border-dashed border-electric-blue transition-all-smooth hover:bg-secondary/20">
                <button
                  className="w-full h-full min-h-[300px] flex items-center justify-center text-electric-blue font-medium"
                  onClick={addProject}
                >
                  <Plus className="mr-2" size={24} />
                  Add Project
                </button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};