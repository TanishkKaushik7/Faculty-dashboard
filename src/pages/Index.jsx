import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { useNavigate } from "react-router-dom";
import { GraduationCap, User, BookOpen } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <GraduationCap className="h-16 w-16 text-blue-600 mr-4" />
            <div>
              <h1 className="text-4xl font-bold text-blue-900">MyGBU Smart Campus</h1>
              <p className="text-xl text-blue-700">ERP System</p>
            </div>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Welcome to the integrated campus management system for Gautam Buddha University
          </p>
        </div>

        {/* Login Options */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <User className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-xl text-blue-900">Faculty Portal</CardTitle>
              <CardDescription>
                Access your teaching dashboard, course management, and academic tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => navigate('/faculty-login')}
              >
                Faculty Login
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <BookOpen className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-xl text-green-900">Student Portal</CardTitle>
              <CardDescription>
                Access your academic records, courses, and campus services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => window.open('https://student.gbu.ac.in', '_blank')}
              >
                Student Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap justify-center space-x-6 text-sm text-gray-600">
            <a href="#" className="hover:text-blue-600">IT Helpdesk</a>
            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
            <span>Version 2.0.1</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;