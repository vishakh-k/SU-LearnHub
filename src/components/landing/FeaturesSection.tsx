import { 
  Upload, 
  Download, 
  Video, 
  Users, 
  Shield, 
  BarChart3,
  FileText,
  Calendar
} from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Upload Materials",
    description: "Students and faculty can easily upload notes, study materials, and resources for the entire community.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Download,
    title: "Download Resources",
    description: "Access and download question papers, notes, and study materials shared by peers and professors.",
    color: "bg-secondary/20 text-gold-dark",
  },
  {
    icon: Video,
    title: "Virtual Meetings",
    description: "Create or join virtual meetings for collaborative study sessions, lectures, and discussions.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: FileText,
    title: "Question Papers",
    description: "Comprehensive archive of previous years' question papers organized by subject and semester.",
    color: "bg-secondary/20 text-gold-dark",
  },
  {
    icon: Users,
    title: "Role-Based Access",
    description: "Separate dashboards for students, faculty, and administrators with tailored functionality.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: BarChart3,
    title: "Admin Dashboard",
    description: "Track uploads, downloads, user activity, and platform analytics in real-time.",
    color: "bg-secondary/20 text-gold-dark",
  },
  {
    icon: Calendar,
    title: "Schedule Meetings",
    description: "Plan ahead with meeting scheduling and calendar integration for upcoming sessions.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description: "Enterprise-grade security ensuring your data and resources are always protected.",
    color: "bg-secondary/20 text-gold-dark",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-accent rounded-full text-sm font-medium text-primary mb-4">
            Platform Features
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Everything You Need to
            <span className="text-primary"> Learn & Teach</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A comprehensive suite of tools designed to enhance the learning experience for students and streamline content sharing for faculty.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
