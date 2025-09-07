import { useState, useEffect } from "react";
import { Navigation } from "./Navigation";
import { HeroSection } from "./HeroSection";
import { AboutSection } from "./AboutSection";
import { SkillsSection } from "./SkillsSection";
import { ProjectsSection } from "./ProjectsSection";
import { ContactSection } from "./ContactSection";
import { AdminLogin } from "./AdminLogin";

interface PortfolioData {
  hero: {
    name: string;
    tagline: string;
    description: string;
  };
  about: {
    title: string;
    description: string;
    highlights: string[];
  };
  skills: {
    title: string;
    categories: {
      name: string;
      skills: string[];
    }[];
  };
  projects: {
    title: string;
    projects: any[];
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    location: string;
    socialLinks: {
      github: string;
      linkedin: string;
      twitter: string;
    };
  };
}

const defaultData: PortfolioData = {
  hero: {
    name: "Divy Yadav",
    tagline: "Problem Solver in Data Science and AI",
    description: "Passionate about transforming complex data into actionable insights and building intelligent systems that make a difference. I combine analytical thinking with innovative approaches to solve real-world challenges."
  },
  about: {
    title: "About Me",
    description: "I'm a data science and AI enthusiast with a passion for solving complex problems through innovative technology solutions. My journey combines analytical rigor with creative problem-solving to deliver impactful results.",
    highlights: [
      "🧠 Advanced Machine Learning & Deep Learning expertise",
      "📊 Data Analysis & Visualization specialist",
      "🚀 AI/ML product development and deployment"
    ]
  },
  skills: {
    title: "Skills & Technologies",
    categories: [
      {
        name: "Programming Languages",
        skills: ["Python", "R", "SQL", "JavaScript", "TypeScript"]
      },
      {
        name: "Data Science & ML",
        skills: ["Pandas", "NumPy", "Scikit-learn", "TensorFlow", "PyTorch", "Keras"]
      },
      {
        name: "Data Visualization",
        skills: ["Matplotlib", "Seaborn", "Plotly", "Tableau", "D3.js"]
      },
      {
        name: "Big Data & Cloud",
        skills: ["Apache Spark", "Hadoop", "AWS", "Azure", "GCP"]
      },
      {
        name: "Web Development",
        skills: ["React", "Node.js", "FastAPI", "Flask", "Docker"]
      },
      {
        name: "Databases",
        skills: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch"]
      }
    ]
  },
  projects: {
    title: "Featured Projects",
    projects: [
      {
        id: "1",
        title: "AI-Powered Predictive Analytics Platform",
        description: "Developed a comprehensive machine learning platform for business forecasting with real-time data processing and interactive dashboards.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
        technologies: ["Python", "TensorFlow", "React", "AWS", "Docker"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com"
      },
      {
        id: "2",
        title: "Computer Vision Object Detection System",
        description: "Built an end-to-end object detection system using deep learning for automated quality control in manufacturing.",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=300&fit=crop",
        technologies: ["PyTorch", "OpenCV", "Flask", "PostgreSQL"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com"
      },
      {
        id: "3",
        title: "Natural Language Processing Chatbot",
        description: "Created an intelligent customer service chatbot using transformer models and deployed on cloud infrastructure.",
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=500&h=300&fit=crop",
        technologies: ["Transformers", "BERT", "FastAPI", "MongoDB"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com"
      }
    ]
  },
  contact: {
    title: "Let's Connect",
    subtitle: "Ready to collaborate on your next data science project? Let's discuss how we can turn your data into insights.",
    email: "divy.yadav@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    socialLinks: {
      github: "https://github.com/divyyadav",
      linkedin: "https://linkedin.com/in/divyyadav",
      twitter: "https://twitter.com/divyyadav"
    }
  }
};

export const Portfolio = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [data, setData] = useState<PortfolioData>(defaultData);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('portfolioData', JSON.stringify(data));
  }, [data]);

  const handleAdminToggle = () => {
    if (isAdmin) {
      setIsAdmin(false);
    } else {
      setShowLogin(true);
    }
  };

  const handleLogin = (success: boolean) => {
    setShowLogin(false);
    setIsAdmin(success);
  };

  const handleContentChange = (section: keyof PortfolioData, field: string, value: any) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  return (
    <div className="min-h-screen">
      <Navigation isAdmin={isAdmin} onAdminToggle={handleAdminToggle} />
      
      <HeroSection 
        isAdmin={isAdmin} 
        content={data.hero}
        onContentChange={(field, value) => handleContentChange('hero', field, value)}
      />
      
      <AboutSection 
        isAdmin={isAdmin} 
        content={data.about}
        onContentChange={(field, value) => handleContentChange('about', field, value)}
      />
      
      <SkillsSection 
        isAdmin={isAdmin} 
        content={data.skills}
        onContentChange={(field, value) => handleContentChange('skills', field, value)}
      />
      
      <ProjectsSection 
        isAdmin={isAdmin} 
        content={data.projects}
        onContentChange={(field, value) => handleContentChange('projects', field, value)}
      />
      
      <ContactSection 
        isAdmin={isAdmin} 
        content={data.contact}
        onContentChange={(field, value) => handleContentChange('contact', field, value)}
      />

      {showLogin && <AdminLogin onLogin={handleLogin} />}
      
      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 Divy Yadav. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};