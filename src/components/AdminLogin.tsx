import { useState } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AdminLoginProps {
  onLogin: (success: boolean) => void;
}

export const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      onLogin(true);
      setError("");
    } else {
      setError("Invalid password");
      onLogin(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-lg flex items-center justify-center z-50">
      <Card className="w-full max-w-md card-gradient card-shadow">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-electric-blue">
            <Lock size={24} />
            Admin Access
          </CardTitle>
          <CardDescription>
            Enter the admin password to edit content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-secondary/50"
              />
              {error && (
                <p className="text-destructive text-sm mt-2">{error}</p>
              )}
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                Login
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onLogin(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};