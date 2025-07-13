import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Mail, Send, Paperclip, Search, Users, MessageSquare, Bell } from "lucide-react";

const MessagingModule = () => {
  const [conversations] = useState([
    {
      id: 1,
      name: "John Doe",
      avatar: "JD",
      role: "Student",
      lastMessage: "Hi there, I have a question about the assignment",
      time: "10:30 AM",
      unread: 2
    },
    {
      id: 2,
      name: "Professor Smith",
      avatar: "PS",
      role: "Faculty",
      lastMessage: "The exam schedule has been posted",
      time: "Yesterday",
      unread: 0
    },
    {
      id: 3,
      name: "CS-201 Group",
      avatar: "CS",
      role: "Group",
      lastMessage: "Alice: I'll be late for the meeting",
      time: "2 days ago",
      unread: 5
    }
  ]);

  const [messages] = useState([
    {
      id: 1,
      sender: "John Doe",
      content: "Hi there, I have a question about the assignment",
      time: "10:30 AM",
      type: "received"
    },
    {
      id: 2,
      sender: "You",
      content: "Sure, what would you like to know?",
      time: "10:32 AM",
      type: "sent"
    },
    {
      id: 3,
      sender: "John Doe",
      content: "When is the deadline for the project submission?",
      time: "10:33 AM",
      type: "received"
    }
  ]);

  const [announcements] = useState([
    {
      id: 1,
      title: "Exam Schedule Update",
      audience: "All CS-201 Students",
      content: "The final exam has been rescheduled to June 15th",
      date: "May 20, 2023",
      status: "sent"
    },
    {
      id: 2,
      title: "Office Hours Change",
      audience: "My Students",
      content: "My office hours will change to Wednesdays 2-4 PM starting next week",
      date: "May 18, 2023",
      status: "draft"
    }
  ]);

  const [selectedConversation, setSelectedConversation] = useState(1);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-900">Internal Messaging</h1>

      <Tabs defaultValue="conversations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
          <TabsTrigger value="compose">Compose</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
        </TabsList>

        <TabsContent value="conversations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
            {/* Conversations List */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Messages</CardTitle>
                  <Button size="sm" variant="outline">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {conversations.map((conversation) => (
                    <div 
                      key={conversation.id}
                      className={`p-3 cursor-pointer hover:bg-gray-50 border-l-4 ${
                        selectedConversation === conversation.id ? 'border-l-blue-500 bg-blue-50' : 'border-l-transparent'
                      }`}
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {conversation.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium truncate">{conversation.name}</p>
                            {conversation.unread > 0 && (
                              <Badge className="bg-red-500 text-white text-xs">
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-600">{conversation.role}</p>
                          <p className="text-xs text-gray-500 truncate">{conversation.lastMessage}</p>
                          <p className="text-xs text-gray-400">{conversation.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat Window */}
            <Card className="lg:col-span-2 flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {conversations.find(c => c.id === selectedConversation)?.avatar}
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      {conversations.find(c => c.id === selectedConversation)?.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      {conversations.find(c => c.id === selectedConversation)?.role}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.type === 'sent' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs mt-1 opacity-70">{message.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <div className="border-t p-4">
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <input 
                    className="flex-1 p-2 border rounded-md" 
                    placeholder="Type your message..."
                  />
                  <Button size="sm">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compose" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compose New Message</CardTitle>
              <CardDescription>Send a message to students, faculty, or departments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Recipient Type</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Individual Student</option>
                    <option>Multiple Students</option>
                    <option>Faculty Member</option>
                    <option>Department</option>
                    <option>Course Group</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Select Recipient(s)</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Rahul Sharma (2021001)</option>
                    <option>Priya Singh (2021002)</option>
                    <option>All CS-201 Students</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input className="w-full p-2 border rounded-md" placeholder="Enter message subject" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea className="w-full p-2 border rounded-md h-32" placeholder="Type your message here..."></textarea>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline">
                  <Paperclip className="h-4 w-4 mr-2" />
                  Attach File
                </Button>
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Announcements</h2>
            <Button>
              <Bell className="h-4 w-4 mr-2" />
              Create Announcement
            </Button>
          </div>

          <div className="space-y-4">
            {announcements.map((announcement) => (
              <Card key={announcement.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{announcement.title}</CardTitle>
                      <CardDescription>To: {announcement.audience}</CardDescription>
                    </div>
                    <Badge variant={announcement.status === 'sent' ? 'default' : 'secondary'}>
                      {announcement.status === 'sent' ? 'Sent' : 'Draft'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">{announcement.content}</p>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>{announcement.date}</span>
                    {announcement.status === 'sent' && (
                      <Button size="sm" variant="outline">View Recipients</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="groups" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Message Groups
              </CardTitle>
              <CardDescription>Manage your messaging groups and contact lists</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 shadow-2xs rounded-lg">
                  <h3 className="font-medium mb-2">CS-201 Students</h3>
                  <p className="text-sm text-gray-600 mb-2">45 members</p>
                  <Button size="sm" variant="outline">Manage Group</Button>
                </div>
                <div className="p-4 shadow-2xs rounded-lg">
                  <h3 className="font-medium mb-2">CS-401 Students</h3>
                  <p className="text-sm text-gray-600 mb-2">32 members</p>
                  <Button size="sm" variant="outline">Manage Group</Button>
                </div>
                <div className="p-4 shadow-2xs rounded-lg">
                  <h3 className="font-medium mb-2">Faculty Colleagues</h3>
                  <p className="text-sm text-gray-600 mb-2">12 members</p>
                  <Button size="sm" variant="outline">Manage Group</Button>
                </div>
                <div className="p-4 shadow-2xs rounded-lg border-dashed">
                  <div className="text-center">
                    <h3 className="font-medium mb-2">Create New Group</h3>
                    <Button size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      Add Group
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

export default MessagingModule;