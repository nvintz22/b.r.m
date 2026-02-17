import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { MapPin, Cog, Users, Hammer, Wrench, Building2, Settings } from "lucide-react";
import Ship from "~/assets/sunset-ship.jpg";

import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "BRM - Chartering and Maritime Services" },
    { name: "description", content: "We are proud partners of leading organizations in the Chartering and Maritime services industry." },
  ];
}

export default function Home() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const parallaxBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
      
      if (heroRef.current) {
        const opacity = Math.max(0, 1 - scrolled / 500);
        heroRef.current.style.opacity = opacity.toString();
      }
      
      if (parallaxBgRef.current) {
        parallaxBgRef.current.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          ref={parallaxRef}
          className="absolute inset-0 bg-gradient-to-b from-[#001f3f] via-[#003d7a] to-[#001f3f]"
          style={{ willChange: "transform" }}
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div
          ref={heroRef}
          className="relative z-10 text-center text-white px-4"
          style={{ willChange: "opacity" }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 animate-fade-in px-4">
              B.R.M
          </h1>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold mb-6 animate-fade-in px-4 text-center">
            Chartering and Maritime Services
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto px-4">
          We are proud partners of leading organizations in the Chartering and Maritime services industry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-[#001f3f] hover:bg-[#001f3f] hover:text-white w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" className="bg-white text-[#001f3f] hover:bg-[#001f3f] hover:text-white w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="pt-20 pb-8 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#001f3f] mb-10 px-4">
            Our Services
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <Hammer className="w-12 h-12 text-[#001f3f] mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-[#001f3f]">Chartering Minerals</h3>
              <p className="text-gray-600">
                We assist major Mining Corporations with Chartering LCT vessels for the transportation of minerals, ore, and other raw materials.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <Wrench className="w-12 h-12 text-[#001f3f] mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-[#001f3f]">Repairs Solutions</h3>
              <p className="text-gray-600">
                Our ship repair solutions help maintain mining support vessels, ensuring operational reliability and compliance with safety standards.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <Building2 className="w-12 h-12 text-[#001f3f] mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-[#001f3f]">Chartering for Construction Firms</h3>
              <p className="text-gray-600">
                We collaborate with construction firms to provide vessels chartering for transporting Sand and Gravel, heavy Machinery, construction Materials, and project equipments.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <Settings className="w-12 h-12 text-[#001f3f] mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-[#001f3f]">Maintenance Services</h3>
              <p className="text-gray-600">
                Our maintenance services for vessels helps clients meet project deadline with minimal disruptions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Section */}
      <section className="relative h-[200vh] md:h-[200vh] lg:h-[150vh] overflow-hidden">
        <div
          ref={parallaxBgRef}
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url(${Ship})`,
            transform: "translateY(0px)",
            willChange: "transform",
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-[#001f3f]/60"></div>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-4">
              Excellence in Every Voyage
            </h2>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto px-4">
              We're here to assist with your chartering and ship repair needs.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#001f3f] mb-12 px-4">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-[#001f3f] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-[#001f3f]">Global & Nation Wide Reach</h3>
              <p className="text-gray-600">
                Experienced in International and Domestic Shipping Operations
              </p>
            </div>
            <div className="text-center">
              <Cog className="w-16 h-16 text-[#001f3f] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-[#001f3f]">Trusted & Reliable</h3>
              <p className="text-gray-600">
                We're here to assist with your chartering and ship repair needs.
              </p>
            </div>
            <div className="text-center">
              <Users className="w-16 h-16 text-[#001f3f] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-[#001f3f]">Expert Team</h3>
              <p className="text-gray-600">
                Experienced professionals dedicated to your success
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#001f3f] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 px-4">Ready to Set Sail?</h2>
          <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto px-4">
            Contact us today to discover how we can help your maritime business thrive.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-[#001f3f] hover:bg-gray-100">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
