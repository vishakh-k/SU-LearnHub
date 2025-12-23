import { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  GraduationCap,
  BookUser,
  ShieldCheck,
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Loader2,
} from "lucide-react";
import logo from "@/assets/srinivas-logo.webp";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

type UserRole = "student" | "faculty" | "admin";

const roles = [
  {
    id: "student" as UserRole,
    icon: GraduationCap,
    title: "Student",
    description: "Access study materials, upload notes, and join meetings",
  },
  {
    id: "faculty" as UserRole,
    icon: BookUser,
    title: "Faculty",
    description: "Share course materials and host virtual lectures",
  },
  {
    id: "admin" as UserRole,
    icon: ShieldCheck,
    title: "Admin",
    description: "Manage users and monitor platform activity",
  },
];

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp, signIn, user } = useAuth();

  const [isSignUp, setIsSignUp] = useState(
    searchParams.get("mode") === "signup"
  );
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(
    (searchParams.get("role") as UserRole) || null
  );
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const dashboardMap: Record<UserRole, string> = {
        student: "/student",
        faculty: "/faculty",
        admin: "/admin",
      };
      if (user.role && user.role in dashboardMap) {
        navigate(dashboardMap[user.role]);
      }
    }
  }, [user, navigate]);

  useEffect(() => {
    setIsSignUp(searchParams.get("mode") === "signup");
    const roleParam = searchParams.get("role") as UserRole;
    if (roleParam && ["student", "faculty", "admin"].includes(roleParam)) {
      setSelectedRole(roleParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignUp && !selectedRole) {
      toast({
        title: "Please select a role",
        description: "Choose whether you're a student, faculty, or admin.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.email || !formData.password) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (isSignUp && !formData.name) {
      toast({
        title: "Name required",
        description: "Please enter your full name.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      if (isSignUp) {
        await signUp(
          formData.email,
          formData.password,
          formData.name,
          selectedRole!
        );
        toast({
          title: "Account created!",
          description:
            "Your account has been created successfully. Please check your email to verify.",
        });
        // Reset form
        setFormData({ name: "", email: "", password: "" });
        setSelectedRole(null);
        setIsSignUp(false);
      } else {
        await signIn(formData.email, formData.password);
        toast({
          title: "Welcome back!",
          description: "You have been logged in successfully.",
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Authentication failed";
      toast({
        title: "Authentication failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{isSignUp ? "Sign Up" : "Sign In"} - LearnHub</title>
        <meta
          name="description"
          content={`${
            isSignUp ? "Create an account" : "Sign in"
          } to access LearnHub learning platform.`}
        />
      </Helmet>

      <div className="min-h-screen bg-background flex">
        {/* Left side - Form */}
        <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-12 xl:px-24 py-12">
          <div className="w-full max-w-md mx-auto">
            {/* Back button */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 mb-8">
              <img
                src={logo}
                alt="Srinivas University"
                className="h-12 w-auto"
              />
              <span className="font-display text-xl font-semibold text-foreground">
                LearnHub
              </span>
            </Link>

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-display font-bold text-foreground mb-2">
                {isSignUp ? "Create your account" : "Welcome back"}
              </h1>
              <p className="text-muted-foreground">
                {isSignUp
                  ? "Join the learning community at Srinivas University"
                  : "Sign in to continue to your dashboard"}
              </p>
            </div>

            {/* Role selection for signup */}
            {isSignUp && (
              <div className="mb-8">
                <Label className="text-sm font-medium mb-3 block">
                  I am a...
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                        selectedRole === role.id
                          ? "border-primary bg-accent"
                          : "border-border hover:border-primary/50 bg-card"
                      }`}
                    >
                      <role.icon
                        className={`w-6 h-6 mx-auto mb-2 ${
                          selectedRole === role.id
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium ${
                          selectedRole === role.id
                            ? "text-primary"
                            : "text-foreground"
                        }`}
                      >
                        {role.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="pl-10"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {isSignUp ? "Create Account" : "Sign In"}
              </Button>
            </form>

            {/* Toggle */}
            <p className="mt-8 text-center text-sm text-muted-foreground">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="font-medium text-primary hover:underline"
              >
                {isSignUp ? "Sign in" : "Sign up"}
              </button>
            </p>
          </div>
        </div>

        {/* Right side - Decorative */}
        <div className="hidden lg:flex flex-1 gradient-hero items-center justify-center p-12 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-gold/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-indigo-light/30 rounded-full blur-2xl" />

          <div className="relative text-center max-w-md">
            <h2 className="text-3xl font-display font-bold text-primary-foreground mb-4">
              Empowering Education
            </h2>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              Join the Srinivas University learning community. Access study
              materials, share resources, and collaborate with students and
              faculty.
            </p>

            <div className="mt-12 grid grid-cols-3 gap-6">
              {[
                { value: "10K+", label: "Students" },
                { value: "500+", label: "Faculty" },
                { value: "5K+", label: "Resources" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-secondary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-primary-foreground/70">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
