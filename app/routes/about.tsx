import { Link } from "react-router";
import { Hammer, Wrench, Building2, Settings } from "lucide-react";
import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Us - BRM" },
    { name: "description", content: "Learn about BRM and our commitment to excellence" },
  ];
}

export default function About() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#001f3f] to-[#003d7a] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 px-4">About BRM</h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto px-4">
            We are proud partners of leading organizations in the Chartering and Maritime services industry.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#001f3f] mb-8">Our Company</h2>
            <div className="space-y-6 text-lg text-gray-700">
              <p>
                B.R.M Chartering and Maritime Services, is an independent Company having its principal office in Sta Rita, Guiguinto, Bulacan.
                B.R.M Chartering offers Vessels Chartering, including Time Charters, Voyage Charters, Bareboat Charters, and Ship Repair
                ensuring efficient, and cost effective transportation for various types of Cargo. 
              </p>
              <p>
                Our extensive network and  In-depth Industry knowledge enables us to provide tailored solutions that align with your Business Goals.
                B.R.M Management Team has extensive experience both in actual on-board technical and management operations, as well as land-based 
                technical and management operations.
              </p>
              <p>
                Experience both in International and Domestic Shipping Operations in all forms of vessels, such as Petroleum Tankers, Containe Ships,
                and General Cargo Vessels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#001f3f] mb-12 px-4">Our Esteemed Clients</h2>
          <div>
            <p className="text-lg text-gray-700 text-center mb-14">
              At B.R.M Chartering and Maritime Services, we are proud to partner with leading organizations in the Mining and Construction sectors, 
              providing specialized chartering and ship repair solutions to support their operations. 
              Our reliable services ensure the seamless transportation of Nickel Ore, Equipments, Sand and Gravel.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Hammer className="w-16 h-16 text-[#001f3f] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-[#001f3f]">Chartering Minerals</h3>
              <p className="text-gray-600">
                We assist major Mining Corporations with Chartering LCT vessels for the transportation of minerals, ore, and other raw materials.
              </p>
            </div>
            <div className="text-center">
              <Wrench className="w-16 h-16 text-[#001f3f] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-[#001f3f]">Repairs Solutions</h3>
              <p className="text-gray-600">
                Our ship repair solutions help maintain mining support vessels, ensuring operational reliability and compliance with safety standards.
              </p>
            </div>
            <div className="text-center">
              <Building2 className="w-16 h-16 text-[#001f3f] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-[#001f3f]">Chartering Construction Firms</h3>
              <p className="text-gray-600">
                We collaborate with construction firms to provide vessels chartering for transporting Sand and Gravel, heavy Machinery, construction Materials, and project equipments.
              </p>
            </div>
            <div className="text-center">
              <Settings className="w-16 h-16 text-[#001f3f] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-[#001f3f]">Maintenance Services</h3>
              <p className="text-gray-600">
                Our maintenance services for vessels helps clients meet project deadline with minimal disruptions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#001f3f] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 px-4">Join Us on Our Journey</h2>
          <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto px-4">
            Whether you're a client, partner, or potential team member, we'd love to hear from you.
          </p>
          <Link to="/contact">
            <button className="bg-white text-[#001f3f] px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
              Get in Touch
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
