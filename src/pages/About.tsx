import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { GraduationCap, Target, Users, Award } from "lucide-react";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About - LearnHub | Srinivas University</title>
        <meta
          name="description"
          content="Learn about LearnHub, Srinivas University's unified learning platform for students and faculty."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-24 pb-16">
          {/* Hero Section */}
          <section className="py-16 gradient-hero">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
                About LearnHub
              </h1>
              <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
                Empowering education through technology at Srinivas University
              </p>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="inline-block px-4 py-1.5 bg-accent rounded-full text-sm font-medium text-primary mb-4">
                    Our Mission
                  </span>
                  <h2 className="text-3xl font-display font-bold text-foreground mb-6">
                    Transforming Learning Through Innovation
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    LearnHub is Srinivas University's dedicated learning management platform, 
                    designed to bridge the gap between students and faculty through seamless 
                    resource sharing and collaboration.
                  </p>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Our platform enables students to access study materials, download question 
                    papers, upload their notes, and participate in virtual meetings - all in 
                    one unified space.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: GraduationCap, value: "10,000+", label: "Students" },
                    { icon: Users, value: "500+", label: "Faculty Members" },
                    { icon: Target, value: "5,000+", label: "Resources" },
                    { icon: Award, value: "35+", label: "Years of Excellence" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-card rounded-2xl p-6 shadow-card text-center">
                      <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                      <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-16 bg-muted/50">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-3xl font-display font-bold text-foreground mb-4">
                  Our Core Values
                </h2>
                <p className="text-muted-foreground text-lg">
                  The principles that guide everything we do at LearnHub
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Accessibility",
                    description: "Making quality education accessible to every student, anywhere and anytime.",
                  },
                  {
                    title: "Collaboration",
                    description: "Fostering a community where students and faculty work together to achieve excellence.",
                  },
                  {
                    title: "Innovation",
                    description: "Continuously improving our platform to meet the evolving needs of modern education.",
                  },
                ].map((value) => (
                  <div key={value.title} className="bg-card rounded-2xl p-8 shadow-card">
                    <h3 className="text-xl font-semibold text-card-foreground mb-3">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* University Section */}
          <section className="py-16">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-display font-bold text-foreground mb-6">
                Srinivas University
              </h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
                Established in 1988, Srinivas University has been a beacon of excellence in education. 
                With the motto "Samagra Gnana" (Complete Knowledge), we are committed to providing 
                holistic education that prepares students for the challenges of tomorrow. LearnHub 
                is our latest initiative to leverage technology for enhancing the learning experience.
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;
