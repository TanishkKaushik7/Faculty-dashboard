import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { 
  BookOpen, 
  Calendar, 
  Mail, 
  List, 
  Bell,
  Image,
  User,
  FileText,
  Award,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

const DashboardHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const motivationalQuotes = [
    "Teaching is the profession that creates all other professions.",
    "Education is the most powerful weapon which you can use to change the world.",
    "The art of teaching is the art of assisting discovery."
  ];

  const todayQuote = motivationalQuotes[new Date().getDate() % motivationalQuotes.length];

  const excellenceData = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      designation: "Professor, Computer Science",
      achievement: "Best Research Paper Award",
      school: "School of Engineering",
      date: "March 2024",
      image: "/placeholder.svg",
      type: "research"
    },
    {
      id: 2,
      name: "Prof. Amit Gupta",
      designation: "Associate Professor, Mathematics",
      achievement: "Excellence in Teaching Award",
      school: "School of Basic Sciences",
      date: "February 2024",
      image: "/placeholder.svg",
      type: "teaching"
    },
    {
      id: 3,
      name: "Rahul Kumar",
      designation: "M.Tech Student, CSE",
      achievement: "Patent Filed - AI in Education",
      school: "School of Engineering",
      date: "January 2024",
      image: "/placeholder.svg",
      type: "innovation"
    },
    {
      id: 4,
      name: "Dr. Neha Singh",
      designation: "Assistant Professor, Physics",
      achievement: "Young Scientist Award",
      school: "School of Basic Sciences",
      date: "December 2023",
      image: "/placeholder.svg",
      type: "research"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, excellenceData.length - 2));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.max(1, excellenceData.length - 2)) % Math.max(1, excellenceData.length - 2));
  };

  const getAwardIcon = (type) => {
    switch (type) {
      case "research": return "🏆";
      case "teaching": return "🥇";
      case "innovation": return "💡";
      default: return "⭐";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Motivational Quote */}
        <Card className="lg:col-span-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Quote of the Day</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg italic">"{todayQuote}"</p>
          </CardContent>
        </Card>

        {/* Email Alerts */}
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Email Alerts</CardTitle>
            <Mail className="h-4 w-4 ml-auto text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">3</div>
            <p className="text-xs text-muted-foreground">Unread messages</p>
            <div className="mt-2 space-y-1">
              <div className="text-xs p-2 bg-blue-50 rounded shadow-sm">Student Query - CS101</div>
              <div className="text-xs p-2 bg-blue-50 rounded shadow-sm">Meeting Reminder</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Tasks</CardTitle>
            <List className="h-4 w-4 ml-auto text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">7</div>
            <p className="text-xs text-muted-foreground">Actionable items</p>
            <Button size="sm" variant="shadow" className="black mt-2 w-full">View Tasks</Button>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <FileText className="h-4 w-4 ml-auto text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">12</div>
            <p className="text-xs text-muted-foreground">Assignments to grade</p>
            <Button size="sm" variant="shadow" className="black mt-2 w-full">Review Now</Button>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leave Requests</CardTitle>
            <Bell className="h-4 w-4 ml-auto text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">5</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
            <Button size="sm" variant="shadow" className="black mt-2 w-full">Review</Button>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
            <Bell className="h-4 w-4 ml-auto text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">8</div>
            <p className="text-xs text-muted-foreground">New alerts</p>
            <Button size="sm" variant="shadow" className="black mt-2 w-full">View All</Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Assigned Courses */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                Assigned Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 shadow-sm rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">Data Structures</h3>
                      <p className="text-sm text-gray-600">CS-201 • Semester 3</p>
                    </div>
                    <Badge variant="secondary">Ongoing</Badge>
                  </div>
                  <p className="text-sm text-blue-600 mb-2">Next Class 10 AM</p>
                  <Button size="sm" variant="shadow" className="black w-full">View Course</Button>
                </div>

                <div className="p-4 shadow-sm rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">Machine Learning</h3>
                      <p className="text-sm text-gray-600">CS-401 • Semester 7</p>
                    </div>
                    <Badge variant="secondary">Ongoing</Badge>
                  </div>
                  <p className="text-sm text-blue-600 mb-2">Next Class 2 PM</p>
                  <Button size="sm" variant="shadow" className="black w-full">View Course</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="shadow" className="black h-20 flex flex-col shadow-sm hover:shadow-md transition-shadow">
                  <FileText className="h-6 w-6 mb-2" />
                  <span className="text-xs">Upload Assignment</span>
                </Button>
                <Button variant="shadow" className="black h-20 flex flex-col shadow-sm hover:shadow-md transition-shadow">
                  <Calendar className="h-6 w-6 mb-2" />
                  <span className="text-xs">Mark Attendance</span>
                </Button>
                <Button variant="shadow" className="black h-20 flex flex-col shadow-sm hover:shadow-md transition-shadow">
                  <List className="h-6 w-6 mb-2" />
                  <span className="text-xs">View Requests</span>
                </Button>
                <Button variant="shadow" className="black h-20 flex flex-col shadow-sm hover:shadow-md transition-shadow">
                  <Bell className="h-6 w-6 mb-2" />
                  <span className="text-xs">Send Notice</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Goal & Progress Tracker */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Goal & Progress Tracker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Teaching Goal</span>
                  <span>16/20 lectures</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Research Goal</span>
                  <span>2/5 papers submitted</span>
                </div>
                <Progress value={40} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Wellness Activity</span>
                  <span>3/7 days completed</span>
                </div>
                <Progress value={43} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-green-600" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 shadow-sm rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <h4 className="font-medium text-sm">Faculty Meeting</h4>
                </div>
                <p className="text-xs text-gray-600">Tomorrow 3 PM • Conference Hall</p>
              </div>
              <div className="p-3 shadow-sm rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <h4 className="font-medium text-sm">Tech Workshop</h4>
                </div>
                <p className="text-xs text-gray-600">Friday 10 AM • IT Dept</p>
              </div>
              <Button size="sm" variant="shadow" className="black w-full">View All Events</Button>
            </CardContent>
          </Card>

          {/* Research Snapshot */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Research Snapshot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-blue-50 rounded shadow-sm">
                  <div className="text-lg font-bold text-blue-600">8</div>
                  <div className="text-xs text-gray-600">Publications</div>
                </div>
                <div className="p-2 bg-green-50 rounded shadow-sm">
                  <div className="text-lg font-bold text-green-600">3</div>
                  <div className="text-xs text-gray-600">Projects</div>
                </div>
                <div className="p-2 bg-purple-50 rounded shadow-sm">
                  <div className="text-lg font-bold text-purple-600">2</div>
                  <div className="text-xs text-gray-600">Grants</div>
                </div>
              </div>
              <Button size="sm" variant="shadow" className="black w-full">View Research Work</Button>
            </CardContent>
          </Card>

          {/* Wellness Widget */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Image className="h-5 w-5 mr-2 text-pink-600" />
                Wellness
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">
                "Take time to make your soul happy. A healthy mind leads to better teaching."
              </p>
              <div className="grid grid-cols-4 gap-2 mb-3">
                <Button size="sm" variant="shadow" className="black p-1 text-xs shadow-sm">😊</Button>
                <Button size="sm" variant="shadow" className="black p-1 text-xs shadow-sm">😐</Button>
                <Button size="sm" variant="shadow" className="black p-1 text-xs shadow-sm">😔</Button>
                <Button size="sm" variant="shadow" className="black p-1 text-xs shadow-sm">😴</Button>
              </div>
              <Button size="sm" variant="shadow" className="black w-full">View Weekly Summary</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Celebrating Excellence Section */}
      <Card className="mt-8 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-blue-900 flex items-center justify-center">
            <Award className="h-6 w-6 mr-2 text-yellow-600" />
            Celebrating GBU Excellence
          </CardTitle>
          <CardDescription>Recognizing outstanding achievements of our faculty and students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <Button 
                variant="shadow" 
                className="black"
                size="sm" 
                onClick={prevSlide}
                disabled={excellenceData.length <= 3}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-sm text-gray-600">
                Scroll to see more achievements
              </div>
              <Button 
                variant="shadow" 
                className="black"
                size="sm" 
                onClick={nextSlide}
                disabled={excellenceData.length <= 3}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out gap-4"
                style={{ transform: `translateX(-${currentSlide * 33.33}%)` }}
              >
                {excellenceData.map((person) => (
                  <div 
                    key={person.id} 
                    className="flex-none w-full md:w-1/2 lg:w-1/3 cursor-pointer group"
                  >
                    <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="relative mb-4">
                          <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full overflow-hidden shadow-md">
                            <img 
                              src={person.image} 
                              alt={person.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -top-2 -right-2 text-2xl">
                            {getAwardIcon(person.type)}
                          </div>
                        </div>
                        
                        <div className="text-center space-y-2">
                          <h3 className="font-bold text-lg text-gray-900">{person.name}</h3>
                          <p className="text-sm text-gray-600">{person.designation}</p>
                          
                          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-3 rounded-lg shadow-sm">
                            <h4 className="font-semibold text-yellow-800 mb-1">{person.achievement}</h4>
                            <p className="text-xs text-yellow-700">{person.school}</p>
                            <p className="text-xs text-yellow-600 font-medium">{person.date}</p>
                          </div>
                          
                          <Button 
                            variant="shadow" 
                            className="black mt-3 w-full group-hover:bg-blue-50"
                            size="sm"
                          >
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;