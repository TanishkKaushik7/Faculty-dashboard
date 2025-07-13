import { useState } from "react";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";
import { 
  Home, 
  User, 
  BookOpen, 
  Calendar, 
  FileText, 
  Bell,
  Mail,
  Image,
  List,
  X,
  Menu
} from "lucide-react";

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "profile", label: "Faculty Profile", icon: User },
  { id: "courses", label: "My Courses", icon: BookOpen },
  { id: "attendance", label: "Attendance", icon: Calendar },
  { id: "assignments", label: "Assignments", icon: FileText, badge: 3 },
  { id: "feedback", label: "Student Feedback", icon: FileText },
  { id: "leave", label: "Leave Approval", icon: Calendar, badge: 2 },
  { id: "messaging", label: "Messaging", icon: Mail, badge: 5 },
  { id: "grievance", label: "Grievance Portal", icon: List },
  { id: "eoffice", label: "E-Office", icon: FileText },
  { id: "wellness", label: "Wellness", icon: Image },
  { id: "residence", label: "Residence", icon: Home },
  { id: "startup", label: "Startup & Innovation", icon: Home },
  { id: "clubs", label: "Clubs & Societies", icon: User },
  { id: "social", label: "Social Impact", icon: User }
];

const FacultySidebar = ({ isOpen, activeTab, onTabChange, onClose }) => {
  const handleItemClick = (itemId) => {
    if (onTabChange) {
      onTabChange(itemId);
    }
    // Close sidebar when an item is clicked on mobile
    if (window.innerWidth < 1280) {
      onClose?.();
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 xl:hidden"
          onClick={handleClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col z-50",
        "fixed xl:static inset-y-0 left-0",
        // Mobile styles
        "xl:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0",
        // Width - fixed for desktop, responsive for mobile
        "w-80 max-w-[85vw] xl:w-64"
      )}>
        <div className="p-4 border-b border-gray-200 flex-shrink-0 flex items-center justify-between">
          <h2 className="font-semibold text-blue-900">
            Faculty Portal
          </h2>
          
          {/* Close Button - Only visible on mobile when sidebar is open */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="flex-shrink-0 h-8 w-8 p-0 xl:hidden"
            title="Close sidebar"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start border border-transparent rounded-lg transition-all duration-200",
                "hover:bg-gray-100 hover:border-gray-200",
                activeTab === item.id && "bg-blue-50 border-blue-200 text-blue-700"
              )}
              onClick={() => handleItemClick(item.id)}
            >
              <item.icon className={cn(
                "h-5 w-5 flex-shrink-0 mr-3",
                activeTab === item.id ? "text-blue-600" : "text-gray-600"
              )} />
              
              <span className={cn(
                "truncate",
                activeTab === item.id ? "font-medium" : "font-normal"
              )}>
                {item.label}
              </span>
              
              {item.badge && (
                <span className={cn(
                  "ml-auto text-xs rounded-full px-2 py-1 min-w-[20px] text-center flex-shrink-0",
                  activeTab === item.id 
                    ? "bg-blue-100 text-blue-700" 
                    : "bg-red-100 text-red-700"
                )}>
                  {item.badge}
                </span>
              )}
            </Button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-200 text-center text-xs text-gray-500 flex-shrink-0">
          MyGBU Smart Campus v2.0.1
        </div>
      </aside>
    </>
  );
};

export default FacultySidebar;