import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  Users,
  FileText,
  Video,
  Search,
  Bell,
  LogOut,
  TrendingUp,
  Download,
  Upload,
  Shield,
  Activity,
  BarChart3,
  Eye,
  UserPlus,
} from "lucide-react";
import logo from "@/assets/srinivas-logo.webp";

const recentActivities = [
  {
    id: 1,
    user: "Dr. Ramesh",
    action: "uploaded",
    item: "Data Structures Notes",
    time: "2 mins ago",
    type: "upload",
  },
  {
    id: 2,
    user: "Priya Sharma",
    action: "downloaded",
    item: "OS Question Paper 2023",
    time: "5 mins ago",
    type: "download",
  },
  {
    id: 3,
    user: "Prof. Shalini",
    action: "created",
    item: "AI Workshop Meeting",
    time: "15 mins ago",
    type: "meeting",
  },
  {
    id: 4,
    user: "Rahul Kumar",
    action: "registered as",
    item: "Student",
    time: "30 mins ago",
    type: "registration",
  },
  {
    id: 5,
    user: "Dr. Prakash",
    action: "uploaded",
    item: "Computer Networks Lab",
    time: "1 hour ago",
    type: "upload",
  },
];

const topMaterials = [
  { id: 1, title: "DBMS Complete Notes", downloads: 1234, views: 5678 },
  {
    id: 2,
    title: "Data Structures Question Bank",
    downloads: 987,
    views: 4321,
  },
  { id: 3, title: "Operating Systems Lab Manual", downloads: 756, views: 3456 },
  {
    id: 4,
    title: "Computer Networks - Module 1-5",
    downloads: 654,
    views: 2987,
  },
];

const AdminDashboard = () => {
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
        <title>Admin Dashboard - LearnHub</title>
        <meta
          name="description"
          content="Monitor platform activity, manage users, and view analytics."
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
                Admin Portal
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search users, materials..."
                  className="pl-9 w-72"
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
                  Welcome, {user?.name || "Admin"}! 🛡️
                </h1>
                <p className="text-muted-foreground">
                  Monitor and manage the LearnHub platform.
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Reports
                </Button>
                <Button variant="hero">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                {
                  icon: Users,
                  label: "Total Users",
                  value: "12,847",
                  trend: "+234 this month",
                  color: "bg-primary/10 text-primary",
                },
                {
                  icon: FileText,
                  label: "Total Materials",
                  value: "5,423",
                  trend: "+89 this week",
                  color: "bg-secondary/20 text-gold-dark",
                },
                {
                  icon: Download,
                  label: "Total Downloads",
                  value: "156.7K",
                  trend: "+12.3K this month",
                  color: "bg-primary/10 text-primary",
                },
                {
                  icon: Video,
                  label: "Active Meetings",
                  value: "24",
                  trend: "Live now",
                  color: "bg-secondary/20 text-gold-dark",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card rounded-2xl p-5 shadow-card"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}
                    >
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <span className="flex items-center gap-1 text-xs text-emerald-600">
                      <TrendingUp className="w-3 h-3" />
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

            {/* User Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                {
                  role: "Students",
                  count: 10234,
                  icon: Users,
                  color: "from-primary to-indigo-dark",
                },
                {
                  role: "Faculty",
                  count: 2478,
                  icon: Shield,
                  color: "from-gold-dark to-secondary",
                },
                {
                  role: "Admins",
                  count: 135,
                  icon: Shield,
                  color: "from-indigo-dark to-primary",
                },
              ].map((item) => (
                <div
                  key={item.role}
                  className="bg-card rounded-2xl p-6 shadow-card"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {item.role}
                      </p>
                      <p className="text-3xl font-bold text-card-foreground">
                        {item.count.toLocaleString()}
                      </p>
                    </div>
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center`}
                    >
                      <item.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="lg:col-span-2 bg-card rounded-2xl shadow-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    Recent Activity
                  </h2>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === "upload"
                            ? "bg-primary/10 text-primary"
                            : activity.type === "download"
                            ? "bg-secondary/20 text-gold-dark"
                            : activity.type === "meeting"
                            ? "bg-accent text-primary"
                            : "bg-emerald-100 text-emerald-600"
                        }`}
                      >
                        {activity.type === "upload" && (
                          <Upload className="w-4 h-4" />
                        )}
                        {activity.type === "download" && (
                          <Download className="w-4 h-4" />
                        )}
                        {activity.type === "meeting" && (
                          <Video className="w-4 h-4" />
                        )}
                        {activity.type === "registration" && (
                          <UserPlus className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-card-foreground">
                          <span className="font-medium">{activity.user}</span>{" "}
                          <span className="text-muted-foreground">
                            {activity.action}
                          </span>{" "}
                          <span className="font-medium">{activity.item}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Materials */}
              <div className="bg-card rounded-2xl shadow-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-card-foreground">
                    Top Materials
                  </h2>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
                <div className="space-y-4">
                  {topMaterials.map((material, index) => (
                    <div
                      key={material.id}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors"
                    >
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                          index === 0
                            ? "bg-secondary text-secondary-foreground"
                            : index === 1
                            ? "bg-muted text-muted-foreground"
                            : index === 2
                            ? "bg-orange-100 text-orange-600"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-card-foreground truncate">
                          {material.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Download className="w-3 h-3" />
                            {material.downloads}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {material.views}
                          </span>
                        </div>
                      </div>
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

export default AdminDashboard;
