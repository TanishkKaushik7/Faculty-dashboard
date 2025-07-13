import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Calendar, Clock, CheckCircle, XCircle, FileText, User, Upload, Download, Bell, Filter, Eye } from "lucide-react";
import { useToast } from "../../hooks/use-toast";

const LeaveApproval = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState(null);
  const [leaveForm, setLeaveForm] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
    proofRequired: false
  });

  // Leave balance data
  const leaveBalance = {
    CL: { used: 2, total: 12, remaining: 10 },
    EL: { used: 5, total: 15, remaining: 10 },
    DL: { used: 0, total: 5, remaining: 5 },
    AL: { used: 1, total: 10, remaining: 9 },
    ML: { used: 0, total: 30, remaining: 30 }
  };

  // Leave history data
  const [leaveHistory] = useState([
    {
      id: 1,
      dateRange: "2024-04-15 to 2024-04-16",
      leaveType: "CL",
      duration: "2 days",
      status: "approved",
      remarks: "Personal work",
      appliedDate: "2024-04-10",
      approvedBy: "Dr. Sharma (HoD)"
    },
    {
      id: 2,
      dateRange: "2024-05-10 to 2024-05-12",
      leaveType: "ML",
      duration: "3 days",
      status: "approved",
      remarks: "Medical treatment",
      appliedDate: "2024-05-08",
      approvedBy: "Dr. Sharma (HoD)"
    },
    {
      id: 3,
      dateRange: "2024-07-01 to 2024-07-02",
      leaveType: "EL",
      duration: "2 days",
      status: "pending",
      remarks: "Family function",
      appliedDate: "2024-06-25",
      approvedBy: "-"
    }
  ]);

  // Approval requests (for HoD/Dean view)
  const [approvalRequests] = useState([
    {
      id: 1,
      facultyName: "Dr. Rajesh Kumar",
      department: "Computer Science",
      leaveType: "CL",
      dateRange: "2024-06-15 to 2024-06-16",
      duration: "2 days",
      status: "pending",
      reason: "Attending conference",
      appliedDate: "2024-06-10",
      proofAttached: true
    },
    {
      id: 2,
      facultyName: "Dr. Priya Sharma",
      department: "Mathematics",
      leaveType: "ML",
      dateRange: "2024-06-18 to 2024-06-20",
      duration: "3 days",
      status: "pending",
      reason: "Medical checkup",
      appliedDate: "2024-06-12",
      proofAttached: true
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getLeaveTypeColor = (type) => {
    const colors = {
      CL: "bg-blue-100 text-blue-800",
      EL: "bg-green-100 text-green-800",
      DL: "bg-purple-100 text-purple-800",
      AL: "bg-orange-100 text-orange-800",
      ML: "bg-red-100 text-red-800"
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  const handleLeaveTypeChange = (value) => {
    setLeaveForm({
      ...leaveForm,
      leaveType: value,
      proofRequired: value === "ML" || value === "DL"
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmitLeave = () => {
    if (!leaveForm.leaveType || !leaveForm.fromDate || !leaveForm.toDate || !leaveForm.reason) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    if (leaveForm.proofRequired && !selectedFile) {
      toast({
        title: "Proof Required",
        description: "Please upload supporting document for this leave type",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Leave Submitted",
      description: "Your leave request has been submitted for approval"
    });

    // Reset form
    setLeaveForm({
      leaveType: "",
      fromDate: "",
      toDate: "",
      reason: "",
      proofRequired: false
    });
    setSelectedFile(null);
  };

  const handleApprovalAction = (id, action, remarks) => {
    toast({
      title: `Leave ${action}`,
      description: `Request #${id} has been ${action}${remarks ? ` with remarks: ${remarks}` : ''}`
    });
  };

  const calculateProgress = (used, total) => {
    return Math.round((used / total) * 100);
  };

  const downloadLeaveRecord = () => {
    toast({
      title: "Download Initiated",
      description: "Your leave record is being prepared for download"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-900">Faculty Leave Management</h1>
        <Button variant="outline" onClick={downloadLeaveRecord}>
          <Download className="h-4 w-4 mr-2" />
          Download Full Record
        </Button>
      </div>

      <Tabs defaultValue="apply-leave" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="apply-leave">Apply Leave</TabsTrigger>
          <TabsTrigger value="my-balance">My Balance</TabsTrigger>
          <TabsTrigger value="my-history">My History</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
        </TabsList>

        {/* Apply Leave Tab */}
        <TabsContent value="apply-leave" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Apply for Leave</CardTitle>
              <CardDescription>Submit your leave request with required details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="leaveType">Leave Type *</Label>
                  <Select value={leaveForm.leaveType} onValueChange={handleLeaveTypeChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CL">CL - Casual Leave</SelectItem>
                      <SelectItem value="EL">EL - Earned Leave</SelectItem>
                      <SelectItem value="DL">DL - Duty Leave</SelectItem>
                      <SelectItem value="AL">AL - Academic Leave</SelectItem>
                      <SelectItem value="ML">ML - Medical Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="fromDate">From Date *</Label>
                  <Input 
                    id="fromDate" 
                    type="date" 
                    value={leaveForm.fromDate}
                    onChange={(e) => setLeaveForm({...leaveForm, fromDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="toDate">To Date *</Label>
                  <Input 
                    id="toDate" 
                    type="date" 
                    value={leaveForm.toDate}
                    onChange={(e) => setLeaveForm({...leaveForm, toDate: e.target.value})}
                  />
                </div>
                {leaveForm.proofRequired && (
                  <div>
                    <Label htmlFor="proof">Upload Proof * (PDF/Image)</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="proof" 
                        type="file" 
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                      />
                      <Upload className="h-5 w-5 text-gray-400" />
                    </div>
                    {selectedFile && (
                      <p className="text-sm text-green-600 mt-1">
                        File selected: {selectedFile.name}
                      </p>
                    )}
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="reason">Reason *</Label>
                <Textarea 
                  id="reason" 
                  placeholder="Please provide reason for leave"
                  value={leaveForm.reason}
                  onChange={(e) => setLeaveForm({...leaveForm, reason: e.target.value})}
                />
              </div>
              <Button onClick={handleSubmitLeave} className="w-full">
                Submit Leave Request
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* My Balance Tab */}
        <TabsContent value="my-balance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Leave Balance Overview</CardTitle>
              <CardDescription>Your current leave quota and utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(leaveBalance).map(([type, balance]) => (
                  <Card key={type} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <Badge className={getLeaveTypeColor(type)}>{type}</Badge>
                        <span className="text-sm text-gray-600">
                          {balance.remaining}/{balance.total} left
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Used: {balance.used}</span>
                          <span>{calculateProgress(balance.used, balance.total)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${calculateProgress(balance.used, balance.total)}%` }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* My History Tab */}
        <TabsContent value="my-history" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Leave History</CardTitle>
                  <CardDescription>Your complete leave application history</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadLeaveRecord}>
                    <Download className="h-4 w-4 mr-1" />
                    Export PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date Range</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Approved By</TableHead>
                    <TableHead>Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveHistory.map((leave) => (
                    <TableRow key={leave.id}>
                      <TableCell className="font-medium">{leave.dateRange}</TableCell>
                      <TableCell>
                        <Badge className={getLeaveTypeColor(leave.leaveType)}>
                          {leave.leaveType}
                        </Badge>
                      </TableCell>
                      <TableCell>{leave.duration}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(leave.status)}>
                          {leave.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>{leave.approvedBy}</TableCell>
                      <TableCell>{leave.remarks}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Approvals Tab (for HoD/Dean) */}
        <TabsContent value="approvals" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">8</div>
                <div className="text-sm text-gray-600">Pending Approvals</div>
                <Clock className="h-6 w-6 mx-auto mt-2 text-yellow-600" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">45</div>
                <div className="text-sm text-gray-600">Approved This Month</div>
                <CheckCircle className="h-6 w-6 mx-auto mt-2 text-green-600" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">3</div>
                <div className="text-sm text-gray-600">Rejected This Month</div>
                <XCircle className="h-6 w-6 mx-auto mt-2 text-red-600" />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            {approvalRequests.map((request) => (
              <Card key={request.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center">
                        <User className="h-5 w-5 mr-2" />
                        {request.facultyName}
                      </CardTitle>
                      <CardDescription>{request.department} • {request.leaveType}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(request.status)}>
                      {request.status.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <Calendar className="h-4 w-4 mr-2 text-gray-600" />
                        <span className="text-sm font-medium">Leave Period</span>
                      </div>
                      <p className="text-sm text-gray-600">{request.dateRange}</p>
                      <p className="text-sm text-gray-500">Duration: {request.duration}</p>
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <Clock className="h-4 w-4 mr-2 text-gray-600" />
                        <span className="text-sm font-medium">Applied On</span>
                      </div>
                      <p className="text-sm text-gray-600">{request.appliedDate}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Reason:</h4>
                    <p className="text-sm text-gray-700 italic">"{request.reason}"</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {request.proofAttached && (
                        <div className="flex items-center text-sm text-green-600">
                          <FileText className="h-4 w-4 mr-1" />
                          Proof document attached
                          <Button variant="link" size="sm" className="ml-2 p-0 h-auto">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </div>
                      )}
                    </div>
                    {request.status === "pending" && (
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleApprovalAction(request.id, "rejected")}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => handleApprovalAction(request.id, "approved")}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeaveApproval;