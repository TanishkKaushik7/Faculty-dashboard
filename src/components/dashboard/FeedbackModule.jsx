import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Star, TrendingUp, MessageSquare, Award, BarChart3 } from "lucide-react";

const FeedbackModule = () => {
  const [feedbackData] = useState([
    {
      id: 1,
      studentName: "Rahul Sharma",
      rollNo: "2021001",
      course: "CS-201 - Data Structures",
      rating: 5,
      date: "2024-05-15",
      feedback: "Excellent understanding of complex concepts and active participation in class discussions."
    },
    {
      id: 2,
      studentName: "Priya Singh",
      rollNo: "2021002",
      course: "CS-401 - Machine Learning",
      rating: 4,
      date: "2024-05-10",
      feedback: "Shows great potential but needs to work on assignment deadlines."
    },
    {
      id: 3,
      studentName: "Amit Kumar",
      rollNo: "2021003",
      course: "CS-201 - Data Structures",
      rating: 3,
      date: "2024-05-05",
      feedback: "Average performance, needs to participate more in practical sessions."
    }
  ]);

  const [performanceData] = useState([
    {
      student: "Rahul Sharma",
      rollNo: "2021001",
      attendance: 95,
      assignments: 90,
      participation: 88,
      overall: "A+"
    },
    {
      student: "Priya Singh",
      rollNo: "2021002",
      attendance: 85,
      assignments: 92,
      participation: 78,
      overall: "A"
    },
    {
      student: "Amit Kumar",
      rollNo: "2021003",
      attendance: 75,
      assignments: 80,
      participation: 65,
      overall: "B"
    }
  ]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getPerformanceColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case "A+":
        return "bg-green-100 text-green-800";
      case "A":
        return "bg-blue-100 text-blue-800";
      case "B":
        return "bg-yellow-100 text-yellow-800";
      case "C":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-900">Student Performance Feedback</h1>

      <Tabs defaultValue="feedback-received" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="feedback-received">Feedback Received</TabsTrigger>
          <TabsTrigger value="performance-tracking">Performance Tracking</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="give-feedback">Give Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="feedback-received" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">4.7</div>
                <div className="text-sm text-gray-600">Average Rating</div>
                <div className="flex justify-center mt-2">
                  {renderStars(5)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">89%</div>
                <div className="text-sm text-gray-600">Positive Feedback</div>
                <TrendingUp className="h-6 w-6 mx-auto mt-2 text-green-600" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">124</div>
                <div className="text-sm text-gray-600">Total Reviews</div>
                <MessageSquare className="h-6 w-6 mx-auto mt-2 text-purple-600" />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            {feedbackData.map((feedback) => (
              <Card key={feedback.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-medium">{feedback.studentName}</p>
                      <p className="text-sm text-gray-600">{feedback.rollNo} • {feedback.course}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex">{renderStars(feedback.rating)}</div>
                      <span className="text-sm text-gray-600">{feedback.date}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{feedback.feedback}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance-tracking" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Performance Overview</CardTitle>
              <CardDescription>Track individual student progress and performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceData.map((student, index) => (
                  <div key={index} className="p-4 shadow-2xl rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <p className="font-medium">{student.student}</p>
                        <p className="text-sm text-gray-600">{student.rollNo}</p>
                      </div>
                      <Badge className={getGradeColor(student.overall)}>
                        Overall: {student.overall}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className={`text-lg font-bold ${getPerformanceColor(student.attendance)}`}>
                          {student.attendance}%
                        </div>
                        <div className="text-sm text-gray-600">Attendance</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-lg font-bold ${getPerformanceColor(student.assignments)}`}>
                          {student.assignments}%
                        </div>
                        <div className="text-sm text-gray-600">Assignments</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-lg font-bold ${getPerformanceColor(student.participation)}`}>
                          {student.participation}%
                        </div>
                        <div className="text-sm text-gray-600">Participation</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Course Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>CS-201 (Data Structures)</span>
                    <span className="font-bold text-green-600">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>CS-401 (Machine Learning)</span>
                    <span className="font-bold text-blue-600">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Teaching Excellence Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-xl font-bold text-yellow-600">4.8/5.0</div>
                    <div className="text-sm text-gray-600">Student Satisfaction</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">96%</div>
                    <div className="text-sm text-gray-600">Course Completion Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="give-feedback" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Provide Student Feedback</CardTitle>
              <CardDescription>Give personalized feedback to students</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Student</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Rahul Sharma - 2021001</option>
                    <option>Priya Singh - 2021002</option>
                    <option>Amit Kumar - 2021003</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Course</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>CS-201 - Data Structures</option>
                    <option>CS-401 - Machine Learning</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Feedback Category</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Academic Performance</option>
                  <option>Class Participation</option>
                  <option>Assignment Quality</option>
                  <option>Overall Progress</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Detailed Feedback</label>
                <textarea className="w-full p-2 border rounded-md h-32" placeholder="Provide constructive feedback..."></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Performance Rating</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Excellent (A+)</option>
                    <option>Very Good (A)</option>
                    <option>Good (B)</option>
                    <option>Average (C)</option>
                    <option>Needs Improvement (D)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Recommendations</label>
                  <input className="w-full p-2 border rounded-md" placeholder="Suggestions for improvement" />
                </div>
              </div>
              <Button className="w-full">Submit Feedback</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FeedbackModule;