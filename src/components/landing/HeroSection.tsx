import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Video } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-95" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gold/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-light/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-2 mb-8 animate-fade-up">
            <span className="text-sm font-medium text-primary-foreground">
              🎓 Srinivas University Learning Platform
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Empowering Education with
            <span className="block mt-2 text-secondary">LearnHub</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            A unified platform for students and faculty to share resources, 
            access study materials, download question papers, and collaborate through virtual meetings.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="gold" size="xl" asChild>
              <Link to="/auth?mode=signup">
                Get Started Free
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button variant="outline-light" size="xl" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center gap-4 bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4">
              <div className="w-12 h-12 rounded-lg gradient-gold flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-foreground" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-primary-foreground">Study Materials</h3>
                <p className="text-sm text-primary-foreground/70">Notes & Question Papers</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4">
              <div className="w-12 h-12 rounded-lg gradient-gold flex items-center justify-center">
                <Video className="w-6 h-6 text-foreground" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-primary-foreground">Virtual Meetings</h3>
                <p className="text-sm text-primary-foreground/70">Join or Create Sessions</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4">
              <div className="w-12 h-12 rounded-lg gradient-gold flex items-center justify-center">
                <Users className="w-6 h-6 text-foreground" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-primary-foreground">Collaboration</h3>
                <p className="text-sm text-primary-foreground/70">Students & Faculty</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
