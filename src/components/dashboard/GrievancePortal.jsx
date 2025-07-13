import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { AlertTriangle, Clock, CheckCircle, FileText, Camera, Wifi, Lightbulb, Car } from "lucide-react";

const GrievancePortal = () => {
  const [grievances] = useState([
    {
      id: 1,
      title: "Broken Desk in Classroom",
      studentName: "John Doe",
      rollNo: "STU2023001",
      category: "Infrastructure",
      subcategory: "Furniture",
      description: "The desk in room 205B is broken and needs replacement. The right side is completely detached.",
      submittedDate: "2023-05-15",
      assignedTo: "Facility Team A",
      priority: "medium",
      status: "in-progress",
      images: true
    },
    {
      id: 2,
      title: "WiFi Connectivity Issues",
      studentName: "Jane Smith",
      rollNo: "STU2023002",
      category: "Internet & IT",
      subcategory: "Network",
      description: "Consistent WiFi drops in the library area, particularly in the west wing.",
      submittedDate: "2023-05-18",
      assignedTo: "IT Support",
      priority: "high",
      status: "pending",
      images: false
    },
    {
      id: 3,
      title: "Bus Schedule Irregularities",
      studentName: "Robert Johnson",
      rollNo: "STU2023003",
      category: "Transportation",
      subcategory: "Campus Shuttle",
      description: "The 5pm shuttle to downtown campus is frequently 15-20 minutes late.",
      submittedDate: "2023-05-20",
      assignedTo: "Transport Office",
      priority: "medium",
      status: "resolved",
      images: true
    }
  ]);

  const [facilityIssues] = useState([
    {
      id: 1,
      issue: "Leaking Pipe in Restroom",
      location: "Main Building, 2nd Floor Men's Restroom",
      reportedBy: "Janitorial Staff",
      priority: "high",
      status: "in-progress"
    },
    {
      id: 2,
      issue: "Flickering Lights",
      location: "Science Wing, Corridor B",
      reportedBy: "Security Guard",
      priority: "medium",
      status: "pending"
    },
    {
      id: 3,
      issue: "Broken Window",
      location: "Library, Study Room 3",
      reportedBy: "Librarian",
      priority: "low",
      status: "resolved"
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "resolved": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "escalated": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Infrastructure": return <Lightbulb className="h-5 w-5" />;
      case "Internet & IT": return <Wifi className="h-5 w-5" />;
      case "Transportation": return <Car className="h-5 w-5" />;
      default: return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const handleStatusUpdate = (id, newStatus) => {
    console.log(`Updating grievance ${id} status to ${newStatus}`);
    // Here you would typically update the status in your state management
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-900">Grievance Portal (FIRS)</h1>
      <p className="text-gray-600">Facility & Issue Reporting System - Track and resolve campus issues efficiently</p>

      <Tabs defaultValue="student-grievances" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="student-grievances">Student Grievances</TabsTrigger>
          <TabsTrigger value="facility-issues">Facility Issues</TabsTrigger>
          <TabsTrigger value="create-ticket">Create Ticket</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="student-grievances" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">8</div>
                <div className="text-sm text-gray-600">Pending Review</div>
                <Clock className="h-6 w-6 mx-auto mt-2 text-yellow-600" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">15</div>
                <div className="text-sm text-gray-600">In Progress</div>
                <AlertTriangle className="h-6 w-6 mx-auto mt-2 text-blue-600" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">47</div>
                <div className="text-sm text-gray-600">Resolved</div>
                <CheckCircle className="h-6 w-6 mx-auto mt-2 text-green-600" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">3</div>
                <div className="text-sm text-gray-600">Escalated</div>
                <AlertTriangle className="h-6 w-6 mx-auto mt-2 text-red-600" />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            {grievances.map((grievance) => (
              <Card key={grievance.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-3">
                      {getCategoryIcon(grievance.category)}
                      <div>
                        <CardTitle className="text-lg">{grievance.title}</CardTitle>
                        <CardDescription>
                          {grievance.studentName} ({grievance.rollNo}) • {grievance.category} - {grievance.subcategory}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Badge className={getPriorityColor(grievance.priority)}>
                        {grievance.priority.toUpperCase()}
                      </Badge>
                      <Badge className={getStatusColor(grievance.status)}>
                        {grievance.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Issue Description:</h4>
                      <p className="text-sm text-gray-700">{grievance.description}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Details:</h4>
                      <div className="text-sm space-y-1">
                        <p><span className="font-medium">Ticket ID:</span> {grievance.id}</p>
                        <p><span className="font-medium">Submitted:</span> {grievance.submittedDate}</p>
                        <p><span className="font-medium">Assigned to:</span> {grievance.assignedTo}</p>
                        {grievance.images && (
                          <div className="flex items-center text-blue-600">
                            <Camera className="h-4 w-4 mr-1" />
                            <span>Photos attached</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        Contact Reporter
                      </Button>
                    </div>
                    <div className="flex space-x-2">
                      {grievance.status === "pending" && (
                        <Button 
                          size="sm" 
                          onClick={() => handleStatusUpdate(grievance.id, "in-progress")}
                        >
                          Assign & Start
                        </Button>
                      )}
                      {grievance.status === "in-progress" && (
                        <Button 
                          size="sm" 
                          onClick={() => handleStatusUpdate(grievance.id, "resolved")}
                        >
                          Mark Resolved
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="facility-issues" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Facility Maintenance Issues</h2>
            <Button>
              <AlertTriangle className="h-4 w-4 mr-2" />
              Report New Issue
            </Button>
          </div>

          <div className="space-y-4">
            {facilityIssues.map((issue) => (
              <Card key={issue.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{issue.issue}</h3>
                      <p className="text-sm text-gray-600">{issue.location}</p>
                      <p className="text-xs text-gray-500">Reported by {issue.reportedBy}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Badge className={getPriorityColor(issue.priority)}>
                        {issue.priority.toUpperCase()}
                      </Badge>
                      <Badge className={getStatusColor(issue.status)}>
                        {issue.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create-ticket" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Grievance/Issue Ticket</CardTitle>
              <CardDescription>Report facility issues or create tickets on behalf of students</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Reporter Type</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Faculty (on behalf of student)</option>
                    <option>Facility Staff</option>
                    <option>Self Report</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Infrastructure</option>
                    <option>Internet & IT</option>
                    <option>Transportation</option>
                    <option>Cafeteria</option>
                    <option>Hostel</option>
                    <option>Library</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Priority Level</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <input className="w-full p-2 border rounded-md" placeholder="Specific location of the issue" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Issue Title</label>
                <input className="w-full p-2 border rounded-md" placeholder="Brief title describing the issue" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Detailed Description</label>
                <textarea className="w-full p-2 border rounded-md h-32" placeholder="Provide detailed description of the issue..."></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Attach Photos/Documents</label>
                <Button variant="outline" className="w-full">
                  <Camera className="h-4 w-4 mr-2" />
                  Upload Files
                </Button>
              </div>
              <Button className="w-full">Submit Ticket</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Issue Categories Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Infrastructure</span>
                    <span className="font-bold">32%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '32%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Internet & IT</span>
                    <span className="font-bold">28%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '28%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Transportation</span>
                    <span className="font-bold">18%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '18%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resolution Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">2.3 days</div>
                    <div className="text-sm text-gray-600">Average Resolution Time</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">94%</div>
                    <div className="text-sm text-gray-600">Resolution Rate</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">4.6/5</div>
                    <div className="text-sm text-gray-600">Satisfaction Score</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold">73</div>
                  <div className="text-sm text-gray-600">This Month</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">68</div>
                  <div className="text-sm text-gray-600">Last Month</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">+7%</div>
                  <div className="text-sm text-gray-600">Growth</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">15</div>
                  <div className="text-sm text-gray-600">Active Cases</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GrievancePortal;