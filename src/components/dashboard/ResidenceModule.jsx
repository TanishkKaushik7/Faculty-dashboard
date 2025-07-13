import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Progress } from "../ui/progress";
import { 
  Home, 
  Zap, 
  CreditCard, 
  Wrench, 
  Camera, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Upload,
  History,
  Plus
} from "lucide-react";

const ResidenceModule = () => {
  const [selectedComplaintType, setSelectedComplaintType] = useState("");
  const [complaintDescription, setComplaintDescription] = useState("");
  const [rechargeAmount, setRechargeAmount] = useState("");

  const residenceDetails = {
    block: "Faculty Quarters - Block A",
    roomNumber: "A-205",
    type: "2BHK",
    occupancy: "Family",
    allottedDate: "2020-08-01"
  };

  const electricityDetails = {
    currentBalance: 50,
    currentUnits: 120,
    lastRecharge: "2024-06-20",
    monthlyConsumption: 150
  };

  const rechargeHistory = [
    { id: 1, date: "2024-06-20", amount: 1000, units: 50, mode: "Online", status: "Completed" },
    { id: 2, date: "2024-05-15", amount: 1500, units: 75, mode: "UPI", status: "Completed" },
    { id: 3, date: "2024-04-10", amount: 2000, units: 100, mode: "Net Banking", status: "Completed" }
  ];

  const complaints = [
    {
      id: 1,
      type: "Electrical",
      description: "AC not working in bedroom",
      status: "In Process",
      submittedDate: "2024-06-22",
      priority: "High",
      technicianAssigned: "Ravi Kumar",
      expectedResolution: "2024-06-25"
    },
    {
      id: 2,
      type: "Plumbing",
      description: "Kitchen sink tap leaking",
      status: "Resolved",
      submittedDate: "2024-06-18",
      priority: "Medium",
      technicianAssigned: "Suresh Singh",
      resolvedDate: "2024-06-20"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Submitted": return "bg-blue-100 text-blue-800";
      case "In Process": return "bg-yellow-100 text-yellow-800";
      case "Resolved": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const submitComplaint = () => {
    console.log("Submitting complaint");
    // Implementation for complaint submission
  };

  const processRecharge = () => {
    console.log("Processing recharge of ₹", rechargeAmount);
    // Implementation for recharge processing
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-900">Residential Status & Electricity</h1>

      <Tabs defaultValue="residence-details" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="residence-details">Residence Details</TabsTrigger>
          <TabsTrigger value="electricity">Electricity Recharge</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="residence-details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Home className="h-5 w-5 mr-2 text-blue-600" />
                Residence Information
              </CardTitle>
              <CardDescription>Your current residence details and allocation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Block & Location</h3>
                  <p className="text-gray-700">{residenceDetails.block}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Room/Flat Number</h3>
                  <p className="text-gray-700">{residenceDetails.roomNumber}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Type</h3>
                  <p className="text-gray-700">{residenceDetails.type}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Occupancy</h3>
                  <p className="text-gray-700">{residenceDetails.occupancy}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Allotted Date</h3>
                  <p className="text-gray-700">{residenceDetails.allottedDate}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Status</h3>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex flex-col">
                  <Zap className="h-6 w-6 mb-2" />
                  <span className="text-xs">Recharge Electricity</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <Wrench className="h-6 w-6 mb-2" />
                  <span className="text-xs">Report Issue</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <History className="h-6 w-6 mb-2" />
                  <span className="text-xs">View History</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <Home className="h-6 w-6 mb-2" />
                  <span className="text-xs">Update Details</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="electricity" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Balance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-600" />
                  Current Electricity Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">₹{electricityDetails.currentBalance}</div>
                    <div className="text-sm text-gray-600">Current Balance</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{electricityDetails.currentUnits}</div>
                    <div className="text-sm text-gray-600">Units Remaining</div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Monthly Usage Progress</span>
                    <span>{electricityDetails.monthlyConsumption} units</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                <div className="text-sm text-gray-600">
                  Last Recharge: {electricityDetails.lastRecharge}
                </div>
              </CardContent>
            </Card>

            {/* Recharge Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-purple-600" />
                  Electricity Recharge
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Amount (₹)</label>
                  <Input 
                    type="number" 
                    placeholder="Enter amount"
                    value={rechargeAmount}
                    onChange={(e) => setRechargeAmount(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm" onClick={() => setRechargeAmount("1000")}>₹1000</Button>
                  <Button variant="outline" size="sm" onClick={() => setRechargeAmount("2000")}>₹2000</Button>
                  <Button variant="outline" size="sm" onClick={() => setRechargeAmount("3000")}>₹3000</Button>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Payment Mode</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>UPI</option>
                    <option>Net Banking</option>
                    <option>Credit Card</option>
                    <option>Debit Card</option>
                  </select>
                </div>
                <Button className="w-full" onClick={processRecharge}>
                  Proceed to Payment
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recharge History */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Recharge History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {rechargeHistory.map((recharge) => (
                  <div key={recharge.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">₹{recharge.amount}</p>
                      <p className="text-sm text-gray-600">{recharge.date} • {recharge.mode}</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-100 text-green-800">{recharge.status}</Badge>
                      <p className="text-sm text-gray-600 mt-1">{recharge.units} units</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* New Complaint Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 mr-2 text-blue-600" />
                  Log New Complaint
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Complaint Type</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={selectedComplaintType}
                    onChange={(e) => setSelectedComplaintType(e.target.value)}
                  >
                    <option value="">Select type</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Appliances">Appliances</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea 
                    placeholder="Describe the issue in detail"
                    value={complaintDescription}
                    onChange={(e) => setComplaintDescription(e.target.value)}
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Upload Image (Optional)</label>
                  <Button variant="outline" className="w-full">
                    <Camera className="h-4 w-4 mr-2" />
                    Upload Photo
                  </Button>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Priority</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Emergency</option>
                  </select>
                </div>
                <Button className="w-full" onClick={submitComplaint}>
                  Submit Complaint
                </Button>
              </CardContent>
            </Card>

            {/* Active Complaints */}
            <Card>
              <CardHeader>
                <CardTitle>Complaint Status Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-lg font-bold text-yellow-600">2</div>
                    <div className="text-xs text-gray-600">Open</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">1</div>
                    <div className="text-xs text-gray-600">In Process</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">5</div>
                    <div className="text-xs text-gray-600">Resolved</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Quick Tips:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Include photos for faster resolution</li>
                    <li>• Emergency issues ext. 2345</li>
                    <li>• Track status online 24/7</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Complaints List */}
          <Card>
            <CardHeader>
              <CardTitle>Your Maintenance Requests</CardTitle>
              <CardDescription>Track all your submitted complaints and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complaints.map((complaint) => (
                  <div key={complaint.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{complaint.type} Issue</h4>
                        <p className="text-sm text-gray-600">{complaint.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Badge className={getStatusColor(complaint.status)}>
                          {complaint.status}
                        </Badge>
                        <Badge className={getPriorityColor(complaint.priority)}>
                          {complaint.priority}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Submitted:</span>
                        <p>{complaint.submittedDate}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Technician:</span>
                        <p>{complaint.technicianAssigned}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">
                          {complaint.status === "Resolved" ? "Resolved:" : "Expected:"}
                        </span>
                        <p>{complaint.resolvedDate || complaint.expectedResolution}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Complete History</CardTitle>
              <CardDescription>View all your residence-related activities</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="recharge-history">
                <TabsList>
                  <TabsTrigger value="recharge-history">Recharge History</TabsTrigger>
                  <TabsTrigger value="maintenance-history">Maintenance History</TabsTrigger>
                </TabsList>
                <TabsContent value="recharge-history" className="mt-4">
                  <div className="space-y-3">
                    {rechargeHistory.map((recharge) => (
                      <div key={recharge.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Zap className="h-5 w-5 text-yellow-600" />
                          <div>
                            <p className="font-medium">₹{recharge.amount} Recharge</p>
                            <p className="text-sm text-gray-600">{recharge.date} • {recharge.mode}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-100 text-green-800">{recharge.status}</Badge>
                          <p className="text-sm text-gray-600 mt-1">{recharge.units} units added</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="maintenance-history" className="mt-4">
                  <div className="space-y-3">
                    {complaints.map((complaint) => (
                      <div key={complaint.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Wrench className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-medium">{complaint.type} - {complaint.description}</p>
                            <p className="text-sm text-gray-600">Submitted: {complaint.submittedDate}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(complaint.status)}>
                          {complaint.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResidenceModule;