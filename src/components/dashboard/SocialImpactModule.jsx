import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Heart, Users, TreePine, BookOpen, Award, Calendar, MapPin, Upload, Download, Plus, Eye } from "lucide-react";
import { useToast } from "../../hooks/use-toast";

const SocialImpactModule = () => {
  const { toast } = useToast();
  
  const [socialProjects] = useState([
    {
      id: 1,
      title: "Community Education Program",
      type: "Education",
      location: "Mumbai, India",
      status: "Active",
      startDate: "15 Jan 2024",
      beneficiaries: 120,
      nextActivity: "Workshop on Digital Literacy - 25 Jun 2024",
      description: "Providing free education and skill development to underprivileged children and adults in urban slums.",
      impact: "Improved literacy rates by 35% in target communities"
    },
    {
      id: 2,
      title: "Green Earth Initiative",
      type: "Environmental",
      location: "Bangalore, India",
      status: "Completed",
      startDate: "05 Mar 2023",
      beneficiaries: 250,
      nextActivity: "Final report preparation",
      description: "Tree plantation drive and environmental awareness campaigns in urban areas.",
      impact: "Planted 1,200 trees with 85% survival rate"
    }
  ]);

  const [impactMetrics] = useState({
    totalBeneficiaries: 850,
    activeProjects: 3,
    completedProjects: 5,
    volunteersEngaged: 45,
    hoursContributed: 320,
    partnershipsFormed: 8
  });

  const [activities] = useState([
    {
      id: 1,
      date: "15 Jun 2024",
      project: "Community Education Program",
      activity: "Digital Literacy Workshop",
      participants: 35,
      photos: 12,
      feedback: "Participants showed great enthusiasm and engagement with the material."
    },
    {
      id: 2,
      date: "05 Jun 2024",
      project: "Green Earth Initiative",
      activity: "Tree Plantation Drive",
      participants: 20,
      photos: 25,
      feedback: "Planted 150 saplings with local community participation."
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Completed": return "bg-blue-100 text-blue-800";
      case "Planning": return "bg-yellow-100 text-yellow-800";
      case "On Hold": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Community Outreach": return "bg-purple-100 text-purple-800";
      case "Environmental": return "bg-green-100 text-green-800";
      case "Education": return "bg-blue-100 text-blue-800";
      case "Healthcare": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleNewProject = () => {
    toast({
      title: "New Project",
      description: "Create a new social impact project",
      variant: "default"
    });
  };

  const handleLogActivity = () => {
    toast({
      title: "Log Activity",
      description: "Record a new activity for your project",
      variant: "default"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-900">Social Impact Activities</h1>
        <Button onClick={handleNewProject}>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Impact Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{impactMetrics.totalBeneficiaries}</div>
            <div className="text-sm text-gray-600">Total Beneficiaries</div>
            <Users className="h-6 w-6 mx-auto mt-2 text-blue-600" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{impactMetrics.activeProjects}</div>
            <div className="text-sm text-gray-600">Active Projects</div>
            <Heart className="h-6 w-6 mx-auto mt-2 text-green-600" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{impactMetrics.completedProjects}</div>
            <div className="text-sm text-gray-600">Completed Projects</div>
            <Award className="h-6 w-6 mx-auto mt-2 text-purple-600" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{impactMetrics.volunteersEngaged}</div>
            <div className="text-sm text-gray-600">Volunteers Engaged</div>
            <Users className="h-6 w-6 mx-auto mt-2 text-orange-600" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{impactMetrics.hoursContributed}</div>
            <div className="text-sm text-gray-600">Hours Contributed</div>
            <Calendar className="h-6 w-6 mx-auto mt-2 text-red-600" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-teal-600">{impactMetrics.partnershipsFormed}</div>
            <div className="text-sm text-gray-600">Partnerships</div>
            <Heart className="h-6 w-6 mx-auto mt-2 text-teal-600" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="my-projects" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="my-projects">My Projects</TabsTrigger>
          <TabsTrigger value="activities">Activity Log</TabsTrigger>
          <TabsTrigger value="partnerships">Partnerships</TabsTrigger>
          <TabsTrigger value="reports">Impact Reports</TabsTrigger>
        </TabsList>

        {/* My Projects Tab */}
        <TabsContent value="my-projects" className="space-y-6">
          <div className="space-y-4">
            {socialProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center">
                        <Heart className="h-5 w-5 mr-2" />
                        {project.title}
                      </CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Badge className={getTypeColor(project.type)}>
                          {project.type}
                        </Badge>
                        <span className="mx-2">•</span>
                        <MapPin className="h-4 w-4 mr-1" />
                        {project.location}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-sm font-medium text-gray-600">Start Date</div>
                      <div className="text-sm">{project.startDate}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-600">Beneficiaries</div>
                      <div className="text-sm">{project.beneficiaries}+ people</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-600">Next Activity</div>
                      <div className="text-sm">{project.nextActivity}</div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-600 mb-1">Description</div>
                    <p className="text-sm text-gray-700">{project.description}</p>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-600 mb-1">Impact Achieved</div>
                    <p className="text-sm text-green-700 font-medium">{project.impact}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      <Upload className="h-4 w-4 mr-1" />
                      Upload Photos
                    </Button>
                    {project.status === "Active" && (
                      <Button size="sm" onClick={handleLogActivity}>
                        <Plus className="h-4 w-4 mr-1" />
                        Log Activity
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Activity Log Tab */}
        <TabsContent value="activities" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Activity Log</CardTitle>
                  <CardDescription>Record your social impact activities and events</CardDescription>
                </div>
                <Button onClick={handleLogActivity}>
                  <Plus className="h-4 w-4 mr-2" />
                  Log New Activity
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>Photos</TableHead>
                    <TableHead>Feedback</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>{activity.date}</TableCell>
                      <TableCell className="font-medium">{activity.project}</TableCell>
                      <TableCell>{activity.activity}</TableCell>
                      <TableCell>{activity.participants}</TableCell>
                      <TableCell>{activity.photos} photos</TableCell>
                      <TableCell className="max-w-xs truncate">{activity.feedback}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Partnerships Tab */}
        <TabsContent value="partnerships" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Community Partnerships</CardTitle>
              <CardDescription>Collaborate with NGOs, government bodies, and community organizations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">Smile Foundation</div>
                        <div className="text-sm text-gray-600">NGO Partner</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">Education and skill development programs</p>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </CardContent>
                </Card>
                <Card className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <TreePine className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">Green Earth Initiative</div>
                        <div className="text-sm text-gray-600">Environmental NGO</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">Tree plantation and conservation projects</p>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </CardContent>
                </Card>
                <Card className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <BookOpen className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium">District Collector Office</div>
                        <div className="text-sm text-gray-600">Government Body</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">Digital literacy and governance awareness</p>
                    <Badge className="bg-blue-100 text-blue-800">MoU Signed</Badge>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Impact Reports & Documentation</CardTitle>
                  <CardDescription>Generate and download social impact reports</CardDescription>
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border border-gray-200">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3">Annual Impact Summary 2024</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Projects Completed:</span>
                        <span className="font-medium">8</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Total Beneficiaries:</span>
                        <span className="font-medium">725+</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Volunteer Hours:</span>
                        <span className="font-medium">240</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Fund Raised:</span>
                        <span className="font-medium">₹2,50,000</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      <Download className="h-4 w-4 mr-1" />
                      Download PDF
                    </Button>
                  </CardContent>
                </Card>
                <Card className="border border-gray-200">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3">Media & Documentation</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Photo Gallery:</span>
                        <span className="font-medium">150+ photos</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Video Testimonials:</span>
                        <span className="font-medium">12 videos</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Press Releases:</span>
                        <span className="font-medium">5 articles</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Certificates:</span>
                        <span className="font-medium">3 awards</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      <Eye className="h-4 w-4 mr-1" />
                      View Gallery
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialImpactModule;