
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/use-toast";

const LoginForm = () => {
  const [facultyId, setFacultyId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  // Simulate login validation
  setTimeout(() => {
    if (facultyId && password) {
      toast({
        title: "Login successful!",
      });
      navigate('/faculty-dashboard');
    } else {
      toast({
        title: "Please enter Faculty ID and Password",
      });
    }
    setIsLoading(false);
  }, 1500);
};

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-blue-900">Faculty Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your dashboard
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="facultyId">Faculty ID / GBU Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="facultyId"
                  type="text"
                  placeholder="Enter your Faculty ID or Email"
                  value={facultyId}
                  onChange={(e) => setFacultyId(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked)}
                />
                <Label htmlFor="remember" className="text-sm">Remember me</Label>
              </div>
              
              <div className="text-sm space-x-2">
                <a href="#" className="text-blue-600 hover">Forgot Password?</a>
                <span className="text-gray-400">|</span>
                <a href="#" className="text-blue-600 hover">Reset via OTP</a>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Login"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Need help? Contact <a href="#" className="text-blue-600 hover">IT Helpdesk</a></p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
