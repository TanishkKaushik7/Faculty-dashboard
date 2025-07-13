import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "../ui/tabs";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../ui/table";
import {
  Calendar,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  FileText,
  Filter,
  Eye,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Menu
} from "lucide-react";

const AttendanceModule = () => {
  const [selectedCourse, setSelectedCourse] = useState("CS-201");
  const [topicDiscussed, setTopicDiscussed] = useState("");
  const [remarks, setRemarks] = useState("");
  const [leaveFilter, setLeaveFilter] = useState({ course: "all", semester: "all", status: "all" });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sample data
  const courses = [
    { code: "CS-201", name: "Data Structures", time: "10 AM", students: 30 },
    { code: "CS-401", name: "Machine Learning", time: "2 PM", students: 25 }
  ];

  const [studentLeaveRequests, setStudentLeaveRequests] = useState([
    {
      id: 1,
      studentName: "Amit Sharma",
      studentId: "S1001",
      course: "CS-201",
      semester: "3rd",
      leaveType: "Medical",
      reason: "Fever and doctor appointment",
      fromDate: "2023-05-15",
      toDate: "2023-05-16",
      appliedDate: "2023-05-14",
      status: "pending",
      leaveBalance: { medical: 5, casual: 3 },
      attachment: true
    },
    // Add more sample leave requests as needed
  ]);

  const [attendanceData, setAttendanceData] = useState({
    "CS-201": Array(30).fill().map((_, i) => ({
      id: i + 1,
      name: `Student ${i + 1}`,
      rollNo: `S${1000 + i}`,
      disciplineCode: i % 3 === 0 ? "flagged" : i % 2 === 0 ? "cautioned" : "normal",
      lastClassStatus: ["present", "absent", "late"][i % 3],
      cgpa: (3.5 + Math.random()).toFixed(1),
      attendancePercent: Math.floor(70 + Math.random() * 30),
      status: "present"
    })),
    "CS-401": Array(25).fill().map((_, i) => ({
      id: i + 1,
      name: `Student ${i + 31}`,
      rollNo: `S${1030 + i}`,
      disciplineCode: i % 3 === 0 ? "flagged" : i % 2 === 0 ? "cautioned" : "normal",
      lastClassStatus: ["present", "absent", "late"][i % 3],
      cgpa: (3.5 + Math.random()).toFixed(1),
      attendancePercent: Math.floor(70 + Math.random() * 30),
      status: "present"
    }))
  });

  const markAttendance = (studentId, status) => {
    setAttendanceData(prev => ({
      ...prev,
      [selectedCourse]: prev[selectedCourse].map(student =>
        student.id === studentId ? { ...student, status } : student
      )
    }));
  };

  const handleLeaveAction = (leaveId, action, comment) => {
    setStudentLeaveRequests(prev =>
      prev.map(leave =>
        leave.id === leaveId
          ? { ...leave, status: action, comments: comment || leave.comments }
          : leave
      )
    );
  };

  const exportData = (format) => {
    console.log(`Exporting attendance data as ${format}`);
    alert(`Attendance data exported as ${format.toUpperCase()}`);
  };

  const exportLeaveData = (format) => {
    console.log(`Exporting leave data as ${format}`);
    alert(`Leave requests exported as ${format.toUpperCase()}`);
  };

  const saveAttendance = () => {
    console.log("Saving attendance with topic", topicDiscussed);
    alert(`Attendance saved for ${courses.find(c => c.code === selectedCourse)?.name}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "present": return "bg-green-100 text-green-800";
      case "absent": return "bg-red-100 text-red-800";
      case "late": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getLeaveStatusColor = (status) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getDisciplineColor = (code) => {
    switch (code) {
      case "normal": return "bg-green-500";
      case "cautioned": return "bg-yellow-500";
      case "flagged": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getLastClassIcon = (status) => {
    switch (status) {
      case "present": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "absent": return <XCircle className="h-4 w-4 text-red-600" />;
      case "late": return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredLeaveRequests = studentLeaveRequests.filter((leave) => {
    return (
      (leaveFilter.course === "all" || leave.course === leaveFilter.course) &&
      (leaveFilter.semester === "all" || leave.semester === leaveFilter.semester) &&
      (leaveFilter.status === "all" || leave.status === leaveFilter.status)
    );
  });

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header with responsive date display */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-900">Attendance & Class Summary</h1>
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
          <Calendar className="h-5 w-5 text-blue-600" />
          <span className="text-sm sm:text-base text-gray-600">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>
      </div>

      {/* Enhanced Responsive Tabs */}
      <Tabs defaultValue="mark-attendance" className="space-y-6">
        {/* Mobile Tabs Dropdown */}
      <div className="sm:hidden relative">
  <Button 
    variant="outline" 
    className="w-full justify-between"
    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  >
    <span>Select View</span>
    {mobileMenuOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
  </Button>
  
  {mobileMenuOpen && (
    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
      <TabsList className="flex flex-col p-2 space-y-1 w-full">
        <TabsTrigger 
          value="mark-attendance"
          className="w-full justify-start px-4 py-2 text-sm"
          onClick={() => setMobileMenuOpen(false)}
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Mark Attendance
        </TabsTrigger>
        <TabsTrigger 
          value="attendance-reports"
          className="w-full justify-start px-4 py-2 text-sm"
          onClick={() => setMobileMenuOpen(false)}
        >
          <FileText className="h-4 w-4 mr-2" />
          Reports
        </TabsTrigger>
        <TabsTrigger 
          value="class-summary"
          className="w-full justify-start px-4 py-2 text-sm"
          onClick={() => setMobileMenuOpen(false)}
        >
          <Calendar className="h-4 w-4 mr-2" />
          Class Summary
        </TabsTrigger>
        <TabsTrigger 
          value="student-leave"
          className="w-full justify-start px-4 py-2 text-sm"
          onClick={() => setMobileMenuOpen(false)}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Leave Requests
        </TabsTrigger>
      </TabsList>
    </div>
  )}
</div>

        {/* Desktop Tabs */}
        <TabsList className="hidden sm:grid w-full grid-cols-4 gap-2 bg-gray-50 p-1 rounded-lg">
          <TabsTrigger 
            value="mark-attendance"
            className="py-2 text-sm flex items-center justify-center"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            <span>Mark Attendance</span>
          </TabsTrigger>
          <TabsTrigger 
            value="attendance-reports"
            className="py-2 text-sm flex items-center justify-center"
          >
            <FileText className="h-4 w-4 mr-2" />
            <span>Reports</span>
          </TabsTrigger>
          <TabsTrigger 
            value="class-summary"
            className="py-2 text-sm flex items-center justify-center"
          >
            <Calendar className="h-4 w-4 mr-2" />
            <span>Class Summary</span>
          </TabsTrigger>
          <TabsTrigger 
            value="student-leave"
            className="py-2 text-sm flex items-center justify-center"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            <span>Leave Requests</span>
          </TabsTrigger>
        </TabsList>

        {/* Mark Attendance Tab */}
        <TabsContent value="mark-attendance" className="pt-4 sm:pt-6 space-y-6">
          {/* Course Selection - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {courses.map((course) => (
              <Card
                key={course.code}
                className={`cursor-pointer transition-all hover:border-blue-300 ${
                  selectedCourse === course.code 
                    ? 'ring-2 ring-blue-500 border-blue-300' 
                    : 'border-gray-200'
                }`}
                onClick={() => setSelectedCourse(course.code)}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg sm:text-xl">{course.name}</CardTitle>
                      <Badge variant="outline" className="mt-2">{course.code}</Badge>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{course.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{course.students} students</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Student Attendance List */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-xl">
                    {courses.find(c => c.code === selectedCourse)?.name} Attendance
                  </CardTitle>
                  <CardDescription>
                    Mark attendance for today's class
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full sm:w-auto"
                    onClick={() => exportData('csv')}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    <span className="text-xs sm:text-sm">Export CSV</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full sm:w-auto"
                    onClick={() => exportData('pdf')}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    <span className="text-xs sm:text-sm">Export PDF</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {attendanceData[selectedCourse]?.map((student) => (
                  <div key={student.id} className="p-4 rounded-lg shadow-2xs transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${getDisciplineColor(student.disciplineCode)}`}></div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium">{student.name}</p>
                            {getLastClassIcon(student.lastClassStatus)}
                          </div>
                          <p className="text-sm text-gray-600">{student.rollNo}</p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                        <div className="flex gap-4">
                          <div className="text-center">
                            <p className="text-xs text-gray-500">CGPA</p>
                            <p className="font-medium text-sm">{student.cgpa}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-500">Attendance</p>
                            <p className={`font-medium text-sm ${student.attendancePercent < 75 ? 'text-red-600' : 'text-green-600'}`}>
                              {student.attendancePercent}%
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(student.status)}>
                            {student.status}
                          </Badge>
                          <div className="flex space-x-1">
                            <Button
                              size="sm"
                              variant={student.status === "present" ? "default" : "outline"}
                              onClick={() => markAttendance(student.id, "present")}
                              className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
                            >
                              <CheckCircle className="h-4 w-4" />
                              <span className="sr-only sm:not-sr-only sm:ml-1">Present</span>
                            </Button>
                            <Button
                              size="sm"
                              variant={student.status === "late" ? "default" : "outline"}
                              onClick={() => markAttendance(student.id, "late")}
                              className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
                            >
                              <AlertCircle className="h-4 w-4" />
                              <span className="sr-only sm:not-sr-only sm:ml-1">Late</span>
                            </Button>
                            <Button
                              size="sm"
                              variant={student.status === "absent" ? "default" : "outline"}
                              onClick={() => markAttendance(student.id, "absent")}
                              className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
                            >
                              <XCircle className="h-4 w-4" />
                              <span className="sr-only sm:not-sr-only sm:ml-1">Absent</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Topic and Remarks Section */}
              <div className="mt-6 space-y-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium mb-2">Topic Discussed Today</label>
                  <Input
                    placeholder="Enter topic covered in today's class"
                    value={topicDiscussed}
                    onChange={(e) => setTopicDiscussed(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Remarks (Optional)</label>
                  <Textarea
                    placeholder="Add any additional remarks about today's class"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
              <Button className="w-full mt-4" onClick={saveAttendance}>
                Save Attendance & Class Details
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="attendance-reports" className="pt-4 sm:pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Reports & Analytics</CardTitle>
              <CardDescription>View detailed attendance statistics and reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">85%</div>
                  <div className="text-sm text-gray-600">Average Attendance</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">156</div>
                  <div className="text-sm text-gray-600">Classes Conducted</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">12</div>
                  <div className="text-sm text-gray-600">Low Attendance Alerts</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">8</div>
                  <div className="text-sm text-gray-600">Students Below 75%</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button variant="outline" className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Detailed Report
                </Button>
                <Button variant="outline" className="flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Download Analytics
                </Button>
              </div>
              
              {/* Sample Chart Placeholder */}
              <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Attendance Trend (Last 30 Days)</h3>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CS-201">CS-201</SelectItem>
                      <SelectItem value="CS-401">CS-401</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="h-64 bg-white rounded border p-4 flex items-center justify-center text-gray-400">
                  [Attendance Chart Placeholder]
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Class Summary Tab */}
        <TabsContent value="class-summary" className="pt-4 sm:pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Class Summary</CardTitle>
              <CardDescription>Add comprehensive notes and summary for today's class</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Course</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map(course => (
                        <SelectItem key={course.code} value={course.code}>
                          {course.name} ({course.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <Input type="date" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Topic Covered</label>
                  <Input placeholder="Enter topic covered in class" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Duration</label>
                  <Input placeholder="Class duration (e.g., 50 minutes)" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Detailed Class Notes</label>
                <Textarea 
                  className="min-h-[150px]" 
                  placeholder="Add comprehensive class notes, key concepts discussed, student interactions, etc." 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Homework/Assignment</label>
                <Input placeholder="Assignment details and due date" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Next Class Preparation</label>
                <Textarea 
                  placeholder="Topics to prepare for next class, materials needed, etc." 
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline">Save Draft</Button>
                <Button>Publish Summary</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Student Leave Tab */}
        <TabsContent value="student-leave" className="pt-4 sm:pt-6 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle>Student Leave Requests</CardTitle>
                  <CardDescription>Review and approve student leave applications</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => exportLeaveData('csv')}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    <span className="text-xs sm:text-sm">Export CSV</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => exportLeaveData('pdf')}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    <span className="text-xs sm:text-sm">Export PDF</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium mb-2">Course</label>
                  <Select 
                    value={leaveFilter.course} 
                    onValueChange={(value) => setLeaveFilter(prev => ({...prev, course: value}))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Courses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Courses</SelectItem>
                      {courses.map(course => (
                        <SelectItem key={course.code} value={course.code}>
                          {course.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Semester</label>
                  <Select 
                    value={leaveFilter.semester} 
                    onValueChange={(value) => setLeaveFilter(prev => ({...prev, semester: value}))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Semesters" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Semesters</SelectItem>
                      <SelectItem value="3rd">3rd Semester</SelectItem>
                      <SelectItem value="5th">5th Semester</SelectItem>
                      <SelectItem value="7th">7th Semester</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <Select 
                    value={leaveFilter.status} 
                    onValueChange={(value) => setLeaveFilter(prev => ({...prev, status: value}))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button variant="outline" className="w-full flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Apply Filters
                  </Button>
                </div>
              </div>

              {/* Leave Requests Table */}
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="w-[200px]">Student Details</TableHead>
                      <TableHead>Leave Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Leave Balance</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeaveRequests.map((leave) => (
                      <TableRow key={leave.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div>
                            <p className="font-medium">{leave.studentName}</p>
                            <p className="text-sm text-gray-600">{leave.studentId} • {leave.course}</p>
                            <p className="text-xs text-gray-500">{leave.semester} Semester</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <Badge variant="outline" className="mb-1">{leave.leaveType}</Badge>
                            <p className="text-sm text-gray-600 line-clamp-1">{leave.reason}</p>
                            {leave.attachment && (
                              <div className="flex items-center mt-1">
                                <FileText className="h-3 w-3 mr-1" />
                                <span className="text-xs text-blue-600">View Attachment</span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm font-medium">{leave.fromDate}</p>
                            <p className="text-sm text-gray-600">to {leave.toDate}</p>
                            <p className="text-xs text-gray-500">Applied: {leave.appliedDate}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getLeaveStatusColor(leave.status)}>
                            {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                          </Badge>
                          {leave.comments && (
                            <p className="text-xs text-gray-600 mt-1 line-clamp-1">{leave.comments}</p>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>Medical: {leave.leaveBalance?.medical}</p>
                            <p>Casual: {leave.leaveBalance?.casual}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex flex-col sm:flex-row sm:justify-end gap-1">
                            {leave.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-green-600 hover:bg-green-50"
                                  onClick={() => handleLeaveAction(leave.id, "approved")}
                                >
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  <span className="sr-only sm:not-sr-only">Approve</span>
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600 hover:bg-red-50"
                                  onClick={() => handleLeaveAction(leave.id, "rejected", "Please provide more details")}
                                >
                                  <XCircle className="h-3 w-3 mr-1" />
                                  <span className="sr-only sm:not-sr-only">Reject</span>
                                </Button>
                              </>
                            )}
                            <Button size="sm" variant="outline" className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              <span className="sr-only sm:not-sr-only">View</span>
                            </Button>
                            <Button size="sm" variant="outline" className="flex items-center">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              <span className="sr-only sm:not-sr-only">Comment</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {studentLeaveRequests.filter(l => l.status === "pending").length}
                  </div>
                  <div className="text-sm text-gray-600">Pending Requests</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {studentLeaveRequests.filter(l => l.status === "approved").length}
                  </div>
                  <div className="text-sm text-gray-600">Approved</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {studentLeaveRequests.filter(l => l.status === "rejected").length}
                  </div>
                  <div className="text-sm text-gray-600">Rejected</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{studentLeaveRequests.length}</div>
                  <div className="text-sm text-gray-600">Total Requests</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AttendanceModule;