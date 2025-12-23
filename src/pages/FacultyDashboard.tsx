import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  Upload,
  FileText,
  Video,
  Search,
  Bell,
  LogOut,
  Plus,
  Eye,
  Users,
  BookOpen,
  BarChart3,
  File,
} from "lucide-react";
import logo from "@/assets/srinivas-logo.webp";

const myUploads = [
  {
    id: 1,
    title: "Advanced Algorithms - Complete Notes",
    type: "PDF",
    downloads: 234,
    date: "Dec 20, 2024",
  },
  {
    id: 2,
    title: "Database Systems Final Exam 2023",
    type: "PDF",
    downloads: 567,
    date: "Dec 18, 2024",
  },
  {
    id: 3,
    title: "Machine Learning Lab Manual",
    type: "DOC",
    downloads: 189,
    date: "Dec 15, 2024",
  },
  {
    id: 4,
    title: "Software Engineering - Unit Tests",
    type: "PDF",
    downloads: 312,
    date: "Dec 12, 2024",
  },
];

const scheduledLectures = [
  {
    id: 1,
    title: "Data Mining - Guest Lecture",
    time: "Today, 3:00 PM",
    enrolled: 85,
  },
  {
    id: 2,
    title: "Cloud Computing Workshop",
    time: "Dec 24, 10:00 AM",
    enrolled: 120,
  },
  {
    id: 3,
    title: "AI Ethics Discussion",
    time: "Dec 26, 2:00 PM",
    enrolled: 45,
  },
];

const FacultyDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

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
        <title>Faculty Dashboard - LearnHub</title>
        <meta
          name="description"
          content="Manage your course materials, upload resources, and host virtual lectures."
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
                Faculty Portal
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search..."
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                  Welcome, {user?.name || "Professor"}! 📚
                </h1>
                <p className="text-muted-foreground">
                  Manage your course materials and connect with students.
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">
                  <Video className="w-4 h-4 mr-2" />
                  Schedule Lecture
                </Button>
                <Button variant="hero">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Material
                </Button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                {
                  icon: FileText,
                  label: "Materials Uploaded",
                  value: "124",
                  color: "bg-primary/10 text-primary",
                },
                {
                  icon: Eye,
                  label: "Total Views",
                  value: "15.2K",
                  color: "bg-secondary/20 text-gold-dark",
                },
                {
                  icon: Users,
                  label: "Students Reached",
                  value: "2,847",
                  color: "bg-primary/10 text-primary",
                },
                {
                  icon: Video,
                  label: "Lectures Hosted",
                  value: "38",
                  color: "bg-secondary/20 text-gold-dark",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card rounded-2xl p-5 shadow-card"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mb-4`}
                  >
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <p className="text-2xl font-bold text-card-foreground">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* My Uploads */}
              <div className="lg:col-span-2 bg-card rounded-2xl shadow-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-card-foreground">
                    My Uploads
                  </h2>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-muted-foreground border-b border-border">
                        <th className="pb-3 font-medium">Material</th>
                        <th className="pb-3 font-medium hidden sm:table-cell">
                          Type
                        </th>
                        <th className="pb-3 font-medium">Downloads</th>
                        <th className="pb-3 font-medium hidden md:table-cell">
                          Date
                        </th>
                        <th className="pb-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {myUploads.map((upload) => (
                        <tr
                          key={upload.id}
                          className="border-b border-border/50 last:border-0"
                        >
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                                <File className="w-5 h-5 text-primary" />
                              </div>
                              <span className="font-medium text-card-foreground truncate max-w-[200px]">
                                {upload.title}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 hidden sm:table-cell">
                            <span className="px-2 py-1 bg-muted rounded text-xs">
                              {upload.type}
                            </span>
                          </td>
                          <td className="py-4 text-muted-foreground">
                            {upload.downloads}
                          </td>
                          <td className="py-4 text-muted-foreground hidden md:table-cell">
                            {upload.date}
                          </td>
                          <td className="py-4">
                            <Button variant="ghost" size="sm">
                              <BarChart3 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Scheduled Lectures */}
              <div className="bg-card rounded-2xl shadow-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-card-foreground">
                    Scheduled Lectures
                  </h2>
                  <Button variant="ghost" size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  {scheduledLectures.map((lecture) => (
                    <div
                      key={lecture.id}
                      className="p-4 rounded-xl border border-border hover:border-primary/30 transition-colors"
                    >
                      <h3 className="font-medium text-card-foreground mb-2">
                        {lecture.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span>{lecture.time}</span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {lecture.enrolled} enrolled
                        </span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        Start Lecture
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default FacultyDashboard;
