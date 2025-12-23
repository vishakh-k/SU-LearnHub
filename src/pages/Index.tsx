import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import RolesSection from "@/components/landing/RolesSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>LearnHub - Srinivas University Learning Platform</title>
        <meta
          name="description"
          content="LearnHub is a unified learning platform for students and faculty to share resources, access study materials, download question papers, and collaborate through virtual meetings."
        />
        <meta name="keywords" content="LearnHub, Srinivas University, learning platform, study materials, question papers, virtual meetings" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <FeaturesSection />
          <RolesSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
