import { useState } from "react";
import FacultyHeader from "../components/FacultyHeader";
import FacultySidebar from "../components/FacultySidebar";
import DashboardHome from "../components/dashboard/DashboardHome";
import FacultyProfile from "../components/dashboard/FacultyProfile";
import MyCourses from "../components/dashboard/MyCourses";
import AttendanceModule from "../components/dashboard/AttendanceModule";
import AssignmentsModule from "../components/dashboard/AssignmentsModule";
import FeedbackModule from "../components/dashboard/FeedbackModule";
import LeaveApproval from "../components/dashboard/LeaveApproval";
import MessagingModule from "../components/dashboard/MessagingModule";
import GrievancePortal from "../components/dashboard/GrievancePortal";
import EOfficeModule from "../components/dashboard/EOfficeModule";
import WellnessModule from "../components/dashboard/WellnessModule";
import ResidenceModule from "../components/dashboard/ResidenceModule";
import StartupModule from "../components/dashboard/StartupModule";
import ClubsModule from "../components/dashboard/ClubsModule";
import SocialImpactModule from "../components/dashboard/SocialImpactModule";

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Start closed on mobile

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardHome />;
      case "profile":
        return <FacultyProfile />;
      case "courses":
        return <MyCourses />;
      case "attendance":
        return <AttendanceModule />;
      case "assignments":
        return <AssignmentsModule />;
      case "feedback":
        return <FeedbackModule />;
      case "leave":
        return <LeaveApproval />;
      case "messaging":
        return <MessagingModule />;
      case "grievance":
        return <GrievancePortal />;
      case "eoffice":
        return <EOfficeModule />;
      case "wellness":
        return <WellnessModule />;
      case "residence":
        return <ResidenceModule />;
      case "startup":
        return <StartupModule />;
      case "clubs":
        return <ClubsModule />;
      case "social":
        return <SocialImpactModule />;
      default:
        return <DashboardHome />;
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // Close sidebar after selecting a tab on mobile
    if (window.innerWidth < 1280) {
      setIsSidebarOpen(false);
    }
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <FacultySidebar 
        isOpen={isSidebarOpen}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onClose={handleSidebarClose}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <FacultyHeader 
          onMenuToggle={handleSidebarToggle}
          isSidebarOpen={isSidebarOpen}
        />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default FacultyDashboard;