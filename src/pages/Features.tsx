import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeaturesSection from "@/components/landing/FeaturesSection";
import CTASection from "@/components/landing/CTASection";

const Features = () => {
  return (
    <>
      <Helmet>
        <title>Features - LearnHub | Srinivas University</title>
        <meta
          name="description"
          content="Explore the powerful features of LearnHub - upload materials, download resources, join meetings, and more."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-24">
          {/* Hero Section */}
          <section className="py-16 gradient-hero">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
                Platform Features
              </h1>
              <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
                Everything you need for a complete learning experience
              </p>
            </div>
          </section>

          <FeaturesSection />
          <CTASection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Features;
