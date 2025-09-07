import { useState } from "react";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface ContactSectionProps {
  isAdmin: boolean;
  content: {
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
  onContentChange: (field: string, value: any) => void;
}

export const ContactSection = ({ isAdmin, content, onContentChange }: ContactSectionProps) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

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
          className={`${className} bg-transparent border border-electric-blue rounded px-2 py-1 w-full`}
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast("Message sent successfully! I'll get back to you soon.");
    setFormData({ name: '', email: '', message: '' });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20 px-4 bg-secondary/20">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <EditableText
              field="title"
              value={content.title}
              className="text-4xl md:text-5xl font-bold text-glow mb-4"
              as="h2"
            />
            <EditableText
              field="subtitle"
              value={content.subtitle}
              className="text-lg text-muted-foreground"
              as="p"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="card-gradient card-shadow p-6">
                <h3 className="text-xl font-semibold text-electric-blue mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Mail className="text-electric-blue" size={20} />
                    <EditableText
                      field="email"
                      value={content.email}
                      className="text-foreground"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="text-electric-blue" size={20} />
                    <EditableText
                      field="phone"
                      value={content.phone}
                      className="text-foreground"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <MapPin className="text-electric-blue" size={20} />
                    <EditableText
                      field="location"
                      value={content.location}
                      className="text-foreground"
                    />
                  </div>
                </div>
              </Card>

              <Card className="card-gradient card-shadow p-6">
                <h3 className="text-xl font-semibold text-electric-blue mb-6">Connect With Me</h3>
                <div className="flex gap-4">
                  <Button variant="outline" size="lg" className="flex-1">
                    <Github className="mr-2" size={20} />
                    GitHub
                  </Button>
                  <Button variant="outline" size="lg" className="flex-1">
                    <Linkedin className="mr-2" size={20} />
                    LinkedIn
                  </Button>
                  <Button variant="outline" size="lg" className="flex-1">
                    <Twitter className="mr-2" size={20} />
                    Twitter
                  </Button>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="card-gradient card-shadow p-6">
              <h3 className="text-xl font-semibold text-electric-blue mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-secondary/50"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-secondary/50"
                    required
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="bg-secondary/50 min-h-[120px] resize-none"
                    required
                  />
                </div>
                <Button type="submit" className="w-full glow-primary">
                  <Send className="mr-2" size={20} />
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};