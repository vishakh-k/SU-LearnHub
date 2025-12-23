import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  BookUser, 
  ShieldCheck,
  ArrowRight 
} from "lucide-react";

const roles = [
  {
    icon: GraduationCap,
    title: "For Students",
    description: "Upload your notes, download question papers, access study materials shared by peers, and join virtual study sessions.",
    features: [
      "Upload & share notes",
      "Download question papers",
      "Join virtual meetings",
      "Collaborate with peers",
    ],
    cta: "Student Portal",
    href: "/auth?mode=signup&role=student",
    gradient: "from-primary to-indigo-dark",
  },
  {
    icon: BookUser,
    title: "For Faculty",
    description: "Share course materials, upload previous question papers, create virtual lectures, and manage your teaching resources.",
    features: [
      "Upload course materials",
      "Share question papers",
      "Host virtual lectures",
      "Track student engagement",
    ],
    cta: "Faculty Portal",
    href: "/auth?mode=signup&role=faculty",
    gradient: "from-gold-dark to-secondary",
  },
  {
    icon: ShieldCheck,
    title: "For Administrators",
    description: "Manage users, monitor platform activity, view analytics, and ensure smooth operation of the learning ecosystem.",
    features: [
      "User management",
      "Activity monitoring",
      "Platform analytics",
      "Content moderation",
    ],
    cta: "Admin Portal",
    href: "/auth?mode=signup&role=admin",
    gradient: "from-indigo-dark to-primary",
  },
];

const RolesSection = () => {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-accent rounded-full text-sm font-medium text-primary mb-4">
            User Roles
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Tailored Experience for
            <span className="text-primary"> Everyone</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Whether you're a student, faculty member, or administrator, LearnHub provides the tools you need.
          </p>
        </div>

        {/* Roles cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {roles.map((role, index) => (
            <div
              key={role.title}
              className="relative bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group"
            >
              {/* Gradient header */}
              <div className={`h-2 bg-gradient-to-r ${role.gradient}`} />
              
              <div className="p-8">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${role.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <role.icon className="w-8 h-8 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-display font-bold text-card-foreground mb-3">
                  {role.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {role.description}
                </p>

                {/* Features list */}
                <ul className="space-y-3 mb-8">
                  {role.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-card-foreground">
                      <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${role.gradient}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button variant="outline" className="w-full group/btn" asChild>
                  <Link to={role.href}>
                    {role.cta}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RolesSection;
