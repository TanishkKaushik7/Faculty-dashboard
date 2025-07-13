import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Calendar, BookOpen, Clock, User, Download } from "lucide-react";

const MyCourses = () => {
  const courses = [
    {
      id: 1,
      name: "Data Structures",
      code: "CS-201",
      semester: "3rd Semester",
      students: 45,
      type: "Theory",
      schedule: "Mon, Wed, Fri - 10 AM",
      room: "LH-101",
      status: "Ongoing"
    },
    {
      id: 2,
      name: "Machine Learning",
      code: "CS-401",
      semester: "7th Semester",
      students: 32,
      type: "Theory + Lab",
      schedule: "Tue, Thu - 2 PM",
      room: "LH-201",
      status: "Ongoing"
    },
    {
      id: 3,
      name: "Research Methodology",
      code: "CS-501",
      semester: "9th Semester",
      students: 18,
      type: "Theory",
      schedule: "Wed - 4 PM",
      room: "CR-301",
      status: "Ongoing"
    }
  ];

  const timetable = [
    { day: "Monday", time: "10 AM", subject: "Data Structures", room: "LH-101", type: "Lecture" },
    { day: "Monday", time: "2 PM", subject: "Office Hours", room: "Faculty Room", type: "Consultation" },
    { day: "Tuesday", time: "2 PM", subject: "Machine Learning", room: "LH-201", type: "Lecture" },
    { day: "Tuesday", time: "4 PM", subject: "ML Lab", room: "Lab-A", type: "Practical" },
    { day: "Wednesday", time: "10 AM", subject: "Data Structures", room: "LH-101", type: "Lecture" },
    { day: "Wednesday", time: "4 PM", subject: "Research Methodology", room: "CR-301", type: "Lecture" },
    { day: "Thursday", time: "2 PM", subject: "Machine Learning", room: "LH-201", type: "Lecture" },
    { day: "Friday", time: "10 AM", subject: "Data Structures", room: "LH-101", type: "Lecture" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-900">My Courses</h1>
        <Button className="flex items-center">
          <Download className="h-4 w-4 mr-2" />
          Download Timetable
        </Button>
      </div>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="courses">Course Cards</TabsTrigger>
          <TabsTrigger value="timetable">Timetable View</TabsTrigger>
          <TabsTrigger value="calendar">Session Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{course.name}</CardTitle>
                      <CardDescription>{course.code} • {course.semester}</CardDescription>
                    </div>
                    <Badge variant={course.status === "Ongoing" ? "default" : "secondary"}>
                      {course.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center text-sm">
                    <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{course.type}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{course.schedule}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <User className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{course.students} students</span>
                  </div>
                  <div className="pt-4">
                    <Button variant="outline" className="w-full">
                      View Course
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timetable" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Weekly Timetable
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border p-3 bg-gray-50 text-left">Time</th>
                      <th className="border p-3 bg-gray-50 text-center">Monday</th>
                      <th className="border p-3 bg-gray-50 text-center">Tuesday</th>
                      <th className="border p-3 bg-gray-50 text-center">Wednesday</th>
                      <th className="border p-3 bg-gray-50 text-center">Thursday</th>
                      <th className="border p-3 bg-gray-50 text-center">Friday</th>
                    </tr>
                  </thead>
                  <tbody>
                    {["10 AM", "2 PM", "4 PM"].map((time) => (
                      <tr key={time}>
                        <td className="border p-3 font-medium bg-blue-50">{time}</td>
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => {
                          const session = timetable.find(t => t.day === day && t.time === time);
                          return (
                            <td key={day} className="border p-3 text-center">
                              {session ? (
                                <div className={`p-2 rounded text-sm ${
                                  session.type === "Lecture" ? "bg-blue-100 text-blue-800" :
                                  session.type === "Practical" ? "bg-green-100 text-green-800" :
                                  "bg-purple-100 text-purple-800"
                                }`}>
                                  {session.subject}
                                  <div className="text-xs mt-1">{session.room}</div>
                                </div>
                              ) : (
                                <div className="text-gray-400">-</div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Session Calendar</CardTitle>
              <CardDescription>View all your scheduled sessions and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timetable.map((session, index) => (
                  <div key={index} className="flex items-center p-4 shadow-2xl rounded-lg hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                      <span className="text-sm font-bold text-blue-800">
                        {session.day.slice(0, 3)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{session.subject}</h3>
                      <p className="text-sm text-gray-600">{session.time} • {session.room}</p>
                      <Badge variant="outline" className="mt-1">
                        {session.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyCourses;