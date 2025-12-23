import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useMaterials } from "@/hooks/use-materials";
import { useMeetings } from "@/hooks/use-meetings";
import { UploadMaterialDialog } from "@/components/UploadMaterialDialog";
import { StudyChatbot } from "@/components/StudyChatbot";
import { AlumniMentoringDialog } from "@/components/AlumniMentoringDialog";
import {
  Upload,
  Download,
  Video,
  BookOpen,
  FileText,
  Search,
  Bell,
  LogOut,
  Plus,
  Calendar,
  Clock,
  Users,
  File,
} from "lucide-react";
import logo from "@/assets/srinivas-logo.webp";

const StudentDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"materials" | "meetings">(
    "materials"
  );
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    materials,
    fetchMaterials,
    downloadMaterial,
    isLoading: materialsLoading,
  } = useMaterials();
  const {
    meetings,
    fetchMeetings,
    joinMeeting,
    isLoading: meetingsLoading,
  } = useMeetings();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await fetchMaterials();
    await fetchMeetings({ upcomingOnly: true, status: "SCHEDULED" });
  };

  const filteredMaterials = materials.filter(
    (m) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.course?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Student Dashboard - LearnHub</title>
        <meta
          name="description"
          content="Access your study materials, upload notes, and join virtual meetings."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Top Navigation */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between px-6 h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <img
                  src={logo}
                  alt="Srinivas University"
                  className="h-8 w-auto"
                />
                <span className="font-display font-semibold text-foreground hidden sm:block">
                  LearnHub
                </span>
              </Link>
              <div className="h-6 w-px bg-border hidden sm:block" />
              <span className="text-sm text-muted-foreground hidden sm:block">
                Student Portal
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search materials..."
                  className="pl-9 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <button onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="w-5 h-5" />
                </button>
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-24 pb-12 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                Welcome back, {user?.name || "Student"}! 👋
              </h1>
              <p className="text-muted-foreground">
                Here's what's happening in your learning journey today.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                {
                  icon: Upload,
                  label: "Upload Notes",
                  color: "bg-primary/10 text-primary",
                  component: "upload",
                },
                {
                  icon: BookOpen,
                  label: "Study Chatbot",
                  color: "bg-blue-500/10 text-blue-600",
                  component: "chatbot",
                },
                {
                  icon: Users,
                  label: "Alumni Mentors",
                  color: "bg-amber-500/10 text-amber-600",
                  component: "alumni",
                },
                {
                  icon: Video,
                  label: "Join Meeting",
                  color: "bg-secondary/20 text-gold-dark",
                  href: "#",
                },
              ].map((action) => {
                if (action.component === "upload") {
                  return (
                    <UploadMaterialDialog
                      key={action.label}
                      onMaterialUploaded={() => loadData()}
                    >
                      <div className="flex flex-col items-center gap-3 p-6 bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
                        <div
                          className={`w-14 h-14 rounded-xl ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                        >
                          <action.icon className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-medium text-card-foreground">
                          {action.label}
                        </span>
                      </div>
                    </UploadMaterialDialog>
                  );
                }
                if (action.component === "chatbot") {
                  return (
                    <div
                      key={action.label}
                      className="flex flex-col items-center gap-3 p-6 bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
                      onClick={() => {}} // StudyChatbot is a floating button
                    >
                      <div
                        className={`w-14 h-14 rounded-xl ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                      >
                        <action.icon className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-medium text-card-foreground">
                        {action.label}
                      </span>
                    </div>
                  );
                }
                if (action.component === "alumni") {
                  return (
                    <AlumniMentoringDialog key={action.label}>
                      <div className="flex flex-col items-center gap-3 p-6 bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group cursor-pointer w-full">
                        <div
                          className={`w-14 h-14 rounded-xl ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                        >
                          <action.icon className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-medium text-card-foreground">
                          {action.label}
                        </span>
                      </div>
                    </AlumniMentoringDialog>
                  );
                }
                return (
                  <Link
                    key={action.label}
                    to={action.href || "#"}
                    className="flex flex-col items-center gap-3 p-6 bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div
                      className={`w-14 h-14 rounded-xl ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <action.icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium text-card-foreground">
                      {action.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                {
                  icon: FileText,
                  label: "Materials Downloaded",
                  value: "47",
                  trend: "+5 this week",
                },
                {
                  icon: Upload,
                  label: "Notes Uploaded",
                  value: "12",
                  trend: "+2 this month",
                },
                {
                  icon: Video,
                  label: "Meetings Attended",
                  value: "28",
                  trend: "3 scheduled",
                },
                {
                  icon: BookOpen,
                  label: "Courses Enrolled",
                  value: "6",
                  trend: "Active",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card rounded-2xl p-5 shadow-card"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {stat.trend}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-card-foreground">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Tabs for Materials and Meetings */}
            <div className="bg-card rounded-2xl shadow-card p-6">
              <div className="flex gap-4 border-b border-border mb-6">
                <button
                  onClick={() => setActiveTab("materials")}
                  className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                    activeTab === "materials"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  📚 Study Materials
                </button>
                <button
                  onClick={() => setActiveTab("meetings")}
                  className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                    activeTab === "meetings"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  📹 Meetings
                </button>
              </div>

              {/* Materials Tab */}
              {activeTab === "materials" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-card-foreground">
                      Available Materials
                    </h2>
                    <UploadMaterialDialog
                      onMaterialUploaded={() => loadData()}
                    />
                  </div>

                  {materialsLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <p className="text-muted-foreground">
                        Loading materials...
                      </p>
                    </div>
                  ) : filteredMaterials.length > 0 ? (
                    <div className="space-y-4">
                      {filteredMaterials.map((material) => (
                        <div
                          key={material.id}
                          className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center shrink-0">
                            <File className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-card-foreground truncate">
                              {material.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {material.course} • {material.subject}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => downloadMaterial(material.id)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">
                        No materials available yet
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Meetings Tab */}
              {activeTab === "meetings" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-card-foreground">
                      Upcoming Meetings
                    </h2>
                  </div>

                  {meetingsLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <p className="text-muted-foreground">
                        Loading meetings...
                      </p>
                    </div>
                  ) : meetings.length > 0 ? (
                    <div className="space-y-4">
                      {meetings.map((meeting) => (
                        <div
                          key={meeting.id}
                          className="p-4 rounded-xl border border-border hover:border-primary/30 transition-colors"
                        >
                          <h3 className="font-medium text-card-foreground mb-2">
                            {meeting.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(
                                meeting.start_time
                              ).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {new Date(
                                meeting.start_time
                              ).toLocaleTimeString()}
                            </span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => joinMeeting(meeting.id)}
                          >
                            Join Meeting
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Video className="w-12 h-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">
                        No upcoming meetings
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Study Chatbot Floating Button */}
        <StudyChatbot />
      </div>
    </>
  );
};

export default StudentDashboard;
