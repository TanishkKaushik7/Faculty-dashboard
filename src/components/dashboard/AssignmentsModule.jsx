import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "../ui/tabs";
import {
  FileText,
  Upload,
  Download,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react";

const AssignmentsModule = () => {
  const [assignments] = useState([
    {
      id: 1,
      title: "Assignment 1",
      course: "CS-201",
      due: "2024-07-01",
      status: "active",
      submissions: 10,
      totalStudents: 30
    }
  ]);

  const [submissions] = useState([
    {
      id: 1,
      studentName: "John Doe",
      rollNo: "CS201001",
      submittedAt: "2024-06-28",
      status: "submitted",
      grade: "A"
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800";
      case "grading":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "submitted":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "graded":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "late":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-900">
        Assignment & Project Evaluation
      </h1>

      <Tabs defaultValue="assignments" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="assignments">My Assignments</TabsTrigger>
          <TabsTrigger value="create">Create Assignment</TabsTrigger>
          <TabsTrigger value="submissions">Review Submissions</TabsTrigger>
        </TabsList>

        <TabsContent value="assignments" className="space-y-6">
          <div className="grid gap-4">
            {assignments.map((assignment) => (
              <Card key={assignment.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{assignment.title}</CardTitle>
                      <CardDescription>
                        {assignment.course} • Due {assignment.due}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(assignment.status)}>
                      {assignment.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-sm">
                        <span className="font-medium">{assignment.submissions}</span>
                        <span className="text-gray-600">
                          /{assignment.totalStudents} submitted
                        </span>
                      </div>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${
                              (assignment.submissions / assignment.totalStudents) * 100
                            }%`
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm">Review Submissions</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Assignment</CardTitle>
              <CardDescription>
                Set up a new assignment for your students
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Assignment Title
                  </label>
                  <input
                    className="w-full p-2  rounded-md"
                    placeholder="Enter assignment title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Course</label>
                  <select className="w-full p-2  rounded-md">
                    <option>CS-201 - Data Structures</option>
                    <option>CS-401 - Machine Learning</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  className="w-full p-2  rounded-md h-32"
                  placeholder="Assignment description and requirements..."
                ></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Due Date</label>
                  <input type="date" className="w-full p-2  rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Max Points</label>
                  <input
                    type="number"
                    className="w-full p-2  rounded-md"
                    placeholder="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">File Upload</label>
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Files
                  </Button>
                </div>
              </div>
              <Button className="w-full">Create Assignment</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Submissions</CardTitle>
              <CardDescription>Review and grade student submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {submissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="flex items-center justify-between p-4  rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(submission.status)}
                      <div>
                        <p className="font-medium">{submission.studentName}</p>
                        <p className="text-sm text-gray-600">
                          {submission.rollNo} • Submitted: {submission.submittedAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {submission.grade && (
                        <Badge variant="outline">{submission.grade}</Badge>
                      )}
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button size="sm">
                          {submission.status === "graded" ? "Re-grade" : "Grade"}
                        </Button>
                      </div>
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

export default AssignmentsModule;
