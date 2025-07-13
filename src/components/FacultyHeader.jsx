import { useState } from "react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Bell, User, Settings, LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FacultyHeader = ({ onMenuToggle, isSidebarOpen }) => {
  const navigate = useNavigate();
  const [notifications] = useState([
    {
      id: 1,
      title: "New research grant opportunity",
      time: "2 hours ago"
    },
    {
      id: 2,
      title: "Student meeting reminder",
      time: "1 day ago"
    },
    {
      id: 3,
      title: "Department seminar tomorrow",
      time: "3 days ago"
    }
  ]);

  const handleLogout = () => {
    navigate('/faculty-login');
  };

  return (
    <header className="bg-white border-b border-gray-200 px-2 sm:px-4 py-3 flex items-center justify-between w-full">
      {/* Left Section */}
      <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
        {/* Menu Toggle - Only visible on mobile */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuToggle}
          className="xl:hidden flex-shrink-0"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-lg sm:text-xl font-bold text-blue-900 hidden sm:block truncate">
          Faculty Dashboard
        </h1>
        {/* Mobile title - shorter version */}
        <h1 className="text-lg font-bold text-blue-900 sm:hidden truncate">
          Dashboard
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
        {/* Notifications Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="relative flex-shrink-0">
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {notifications.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72 sm:w-80 bg-white mr-2 sm:mr-0" align="end">
            <div className="space-y-3">
              <h3 className="font-semibold text-blue-900">Notifications</h3>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-3 border rounded-lg bg-white hover:bg-gray-50 transition-colors">
                    <h4 className="font-medium text-sm line-clamp-2">{notification.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full">
                View All Notifications
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full flex-shrink-0">
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                <AvatarImage src="/placeholder-avatar.jpg" alt="Dr. Rajesh Kumar" />
                <AvatarFallback className="text-xs sm:text-sm">RK</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 sm:w-56 bg-white mr-2 sm:mr-0" align="end">
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none min-w-0">
                <p className="font-medium text-sm truncate">Dr. Rajesh Kumar</p>
                <p className="w-full truncate text-xs text-muted-foreground">
                  rajesh.kumar@gbu.ac.in
                </p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-gray-100 text-sm">
              <User className="mr-2 h-4 w-4 flex-shrink-0" />
              <span>View Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-100 text-sm">
              <Settings className="mr-2 h-4 w-4 flex-shrink-0" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-gray-100 text-sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4 flex-shrink-0" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default FacultyHeader;