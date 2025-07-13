import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { 
  FileText, Send, Download, Eye, Clock, CheckCircle, ArrowRight, User, Calendar,
  AlertTriangle, Shield, Lock, FileSignature, Search, Filter, Bell, Archive,
  CheckSquare, XCircle, MessageSquare, Settings, History, FileCheck
} from "lucide-react";

const EOfficeModule = () => {
  const [documents] = useState([
    {
      id: 1,
      fileNo: "GBU/ADM/2024/001",
      title: "Faculty Promotion Case - Dr. Sharma",
      type: "HR Document",
      department: "Computer Science",
      confidentiality: "confidential",
      priority: "high",
      status: "pending-review",
      submittedDate: "2024-01-15",
      responseDeadline: "2024-02-15",
      attachments: 3,
      escalated: true,
      workflow: [
        { step: "Initiated", status: "completed", person: "You", date: "2024-01-15", timestamp: "10:30 AM", action: "Created" },
        { step: "Department Review", status: "current", person: "HOD (CS)", date: "2024-01-16", timestamp: "Pending", action: "Pending" },
        { step: "Dean Approval", status: "pending", person: "Dean (Engg)", date: "", timestamp: "", action: "" },
        { step: "Final Approval", status: "pending", person: "Registrar", date: "", timestamp: "", action: "" }
      ],
      auditTrail: [
        { timestamp: "2024-01-15 10:30 AM", user: "You", action: "File Created", ip: "192.168.1.1" },
        { timestamp: "2024-01-15 11:45 AM", user: "You", action: "Document Uploaded", ip: "192.168.1.1" }
      ]
    },
    {
      id: 2,
      fileNo: "GBU/RES/2024/002",
      title: "Research Grant Application - AI Project",
      type: "Research Proposal",
      department: "Computer Science",
      confidentiality: "normal",
      priority: "medium",
      status: "in-progress",
      submittedDate: "2024-01-10",
      responseDeadline: "2024-03-01",
      attachments: 5,
      escalated: false,
      workflow: [
        { step: "Initiated", status: "completed", person: "You", date: "2024-01-10", timestamp: "02:15 PM", action: "Created" },
        { step: "Department Review", status: "completed", person: "HOD (CS)", date: "2024-01-12", timestamp: "11:30 AM", action: "Approved" },
        { step: "Research Committee", status: "current", person: "Dr. Gupta", date: "2024-01-15", timestamp: "Pending", action: "Pending" },
        { step: "Final Approval", status: "pending", person: "Dean (Research)", date: "", timestamp: "", action: "" }
      ]
    }
  ]);

  const [inboxItems] = useState([
    {
      id: 1,
      fileNo: "GBU/ADM/2024/003",
      title: "Leave Application - Prof. Kumar",
      type: "HR Document",
      from: "Physics Department",
      dueDate: "2024-01-20",
      priority: "medium",
      confidentiality: "normal",
      requiresAction: true
    },
    {
      id: 2,
      fileNo: "GBU/INF/2024/004",
      title: "Lab Equipment Purchase",
      type: "Financial Request",
      from: "Electronics Department",
      dueDate: "2024-01-25",
      priority: "high",
      confidentiality: "restricted",
      requiresAction: false
    }
  ]);

  const [escalatedFiles] = useState([
    {
      id: 1,
      fileNo: "GBU/ADM/2023/045",
      title: "Faculty Promotion Case - Dr. Smith",
      currentHolder: "Dean (Engg)",
      daysPending: 12,
      slaBreached: true,
      priority: "urgent",
      escalaltedTo: "Registrar"
    },
    {
      id: 2,
      fileNo: "GBU/RES/2023/032",
      title: "Research Grant - AI Project",
      currentHolder: "Research Committee",
      daysPending: 8,
      slaBreached: false,
      priority: "high",
      escalaltedTo: "Dean (Research)"
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "current": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-gray-100 text-gray-800";
      case "marked": return "bg-purple-100 text-purple-800";
      case "approved": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      case "archived": return "bg-gray-100 text-gray-600";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getConfidentialityColor = (level) => {
    switch (level) {
      case "confidential": return "bg-red-100 text-red-800";
      case "restricted": return "bg-orange-100 text-orange-800";
      case "normal": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStepIcon = (status) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "current": return <Clock className="h-5 w-5 text-blue-600" />;
      default: return <div className="h-5 w-5 rounded-full border-2 border-gray-300"></div>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">E-Office File Management System</h1>
          <p className="text-gray-600">NIC-compliant digital office workflow with enhanced security and audit trails</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Advanced Search
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter Files
          </Button>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="my-files">My Files</TabsTrigger>
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="escalated">Escalated</TabsTrigger>
          <TabsTrigger value="create-file">Create File</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
          <TabsTrigger value="archive">Archive</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">8</div>
                <div className="text-sm text-gray-600">Pending Files</div>
                <Clock className="h-6 w-6 mx-auto mt-2 text-blue-600" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">3</div>
                <div className="text-sm text-gray-600">Escalated</div>
                <AlertTriangle className="h-6 w-6 mx-auto mt-2 text-red-600" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">15</div>
                <div className="text-sm text-gray-600">Completed</div>
                <CheckCircle className="h-6 w-6 mx-auto mt-2 text-green-600" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">12</div>
                <div className="text-sm text-gray-600">Sent Files</div>
                <Send className="h-6 w-6 mx-auto mt-2 text-purple-600" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-gray-600">45</div>
                <div className="text-sm text-gray-600">Archived</div>
                <Archive className="h-6 w-6 mx-auto mt-2 text-gray-600" />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                  SLA Alerts & Escalations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {escalatedFiles.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg bg-red-50">
                      <div>
                        <p className="font-medium text-sm">{file.title}</p>
                        <p className="text-xs text-gray-600">File No: {file.fileNo}</p>
                      </div>
                      <Badge className={getPriorityColor(file.priority)}>
                        {file.priority.toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-blue-600" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <FileSignature className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">DOC001 digitally signed</p>
                      <p className="text-xs text-gray-600">Faculty Promotion • 30 mins ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Eye className="h-5 w-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">DOC002 viewed by Dean</p>
                      <p className="text-xs text-gray-600">Research Grant • 1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Send className="h-5 w-5 text-purple-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">DOC003 forwarded to Registrar</p>
                      <p className="text-xs text-gray-600">Leave Application • 2 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="my-files" className="space-y-6">
          <div className="space-y-4">
            {documents.map((doc) => (
              <Card key={doc.id} className={doc.escalated ? 'ring-2 ring-red-200' : ''}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center">
                        {doc.title}
                        {doc.escalated && (
                          <AlertTriangle className="h-4 w-4 ml-2 text-red-600" />
                        )}
                      </CardTitle>
                      <CardDescription>
                        File No: {doc.fileNo} • {doc.type} • Dept: {doc.department}
                      </CardDescription>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge className={getConfidentialityColor(doc.confidentiality)}>
                          {doc.confidentiality.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-gray-500">{doc.attachments} attachments</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Badge className={getPriorityColor(doc.priority)}>
                        {doc.priority.toUpperCase()}
                      </Badge>
                      <Badge className={getStatusColor(doc.status)}>
                        {doc.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Created: {doc.submittedDate}</span>
                      <span>Response Due: {doc.responseDeadline}</span>
                    </div>
                  </div>

                  {/* Enhanced Workflow Timeline */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-3">File Lifecycle & Audit Trail:</h4>
                    <div className="space-y-3">
                      {doc.workflow.map((step, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          {getStepIcon(step.status)}
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <span className={`text-sm ${step.status === 'current' ? 'font-medium text-blue-600' : ''}`}>
                                {step.step}
                              </span>
                              <span className="text-xs text-gray-500">{step.person}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              {step.date && (
                                <div className="text-xs text-gray-400">{step.date} • {step.timestamp}</div>
                              )}
                              <div className="text-xs text-gray-500">{step.action}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline">
                        <History className="h-4 w-4 mr-2" />
                        Audit Trail
                      </Button>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <FileSignature className="h-4 w-4 mr-2" />
                        e-Sign
                      </Button>
                      <Button size="sm">
                        <Send className="h-4 w-4 mr-2" />
                        Forward
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="inbox" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Inbox - Files Requiring Action</h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <CheckSquare className="h-4 w-4 mr-2" />
                Approve Selected
              </Button>
              <Button variant="outline" size="sm">
                <XCircle className="h-4 w-4 mr-2" />
                Reject Selected
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {inboxItems.map((item) => (
              <Card key={item.id} className={item.requiresAction ? 'ring-2 ring-yellow-200' : ''}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium flex items-center">
                        {item.title}
                        {item.requiresAction && (
                          <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Action Required</span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600">File No: {item.fileNo} • From: {item.from}</p>
                      <p className="text-xs text-gray-500">{item.type} • Due: {item.dueDate}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getPriorityColor(item.priority)}>
                        {item.priority.toUpperCase()}
                      </Badge>
                      <Badge className={getConfidentialityColor(item.confidentiality)}>
                        {item.confidentiality.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Review
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Comment
                    </Button>
                    {item.requiresAction && (
                      <>
                        <Button size="sm" variant="outline" className="text-green-600 border-green-600">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-600">
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="escalated" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                Escalated Files - SLA Breach Alert
              </CardTitle>
              <CardDescription>Files that have exceeded their SLA timelines and require immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File No.</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Current Holder</TableHead>
                    <TableHead>Days Pending</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Escalated To</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {escalatedFiles.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell className="font-medium">{file.fileNo}</TableCell>
                      <TableCell>{file.title}</TableCell>
                      <TableCell>{file.currentHolder}</TableCell>
                      <TableCell>
                        <span className={file.slaBreached ? 'text-red-600 font-medium' : ''}>
                          {file.daysPending} days
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(file.priority)}>
                          {file.priority.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>{file.escalaltedTo}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Bell className="h-4 w-4 mr-2" />
                            Remind
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create-file" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New E-File</CardTitle>
              <CardDescription>Initiate a new digital file with enhanced metadata and security features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">File Type</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>HR Document</option>
                    <option>Academic Document</option>
                    <option>Administrative Form</option>
                    <option>Research Proposal</option>
                    <option>Financial Request</option>
                    <option>Infrastructure Request</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Priority Level</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Normal</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Urgent</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Department</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Computer Science</option>
                    <option>Electronics</option>
                    <option>Mechanical</option>
                    <option>Civil</option>
                    <option>Research Office</option>
                    <option>HR Department</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Confidentiality Level</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Normal</option>
                    <option>Confidential</option>
                    <option>Restricted</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Reference Number</label>
                  <input className="w-full p-2 border rounded-md" placeholder="Enter reference number (optional)" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Response Deadline</label>
                  <input type="date" className="w-full p-2 border rounded-md" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject/Title</label>
                <input className="w-full p-2 border rounded-md" placeholder="Enter descriptive title for the file" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea className="w-full p-2 border rounded-md h-24" placeholder="Provide detailed description of the request/application..."></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Attach Supporting Documents</label>
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Upload Multiple Documents (PDF, DOC, XLS)
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Auto-Assignment Preview:</h4>
                <div className="flex items-center space-x-2 text-sm text-gray-600 p-3 bg-gray-50 rounded-md">
                  <span>You</span> <ArrowRight className="h-4 w-4" />
                  <span>Auto-Diarise</span> <ArrowRight className="h-4 w-4" />
                  <span>Department Head</span> <ArrowRight className="h-4 w-4" />
                  <span>Dean</span> <ArrowRight className="h-4 w-4" />
                  <span>Final Approval</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1">
                  <Send className="h-4 w-4 mr-2" />
                  Submit for Processing
                </Button>
                <Button variant="outline" className="flex-1">
                  <Archive className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <History className="h-5 w-5 mr-2" />
                Audit Trail & Access Logs
              </CardTitle>
              <CardDescription>Complete tracking of file activities and user access</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <input className="flex-1 p-2 border rounded-md" placeholder="Search by File No., User, or Action..." />
                  <Button>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>File No.</TableHead>
                      <TableHead>IP Address</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents[0].auditTrail.map((log, index) => (
                      <TableRow key={index}>
                        <TableCell>{log.timestamp}</TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell>{documents[0].fileNo}</TableCell>
                        <TableCell>{log.ip}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archive" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Archive className="h-5 w-5 mr-2" />
                File Archive & Knowledge Repository
              </CardTitle>
              <CardDescription>Access completed files and related knowledge base</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Year</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>2024</option>
                    <option>2023</option>
                    <option>2022</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Department</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>All Departments</option>
                    <option>Computer Science</option>
                    <option>Electronics</option>
                    <option>Research Office</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">File Type</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>All Types</option>
                    <option>HR Document</option>
                    <option>Academic Document</option>
                    <option>Administrative Form</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Completed</option>
                    <option>Approved</option>
                    <option>Archived</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Faculty Promotion - Dr. Smith</h3>
                    <p className="text-sm text-gray-600">GBU/FAC/2023/045 • Completed on 2023-12-15</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileCheck className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Research Grant - AI Project</h3>
                    <p className="text-sm text-gray-600">GBU/RES/2023/032 • Approved on 2023-11-28</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileCheck className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EOfficeModule;