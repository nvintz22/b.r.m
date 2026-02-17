import { useState } from "react";
import { Link } from "react-router";
import { MapPin, Users, Cog, Hammer, Wrench, Building2, HandHelping, ChevronRight } from "lucide-react";
import { ServiceModal } from "~/components/service-modal";
import type { Route } from "./+types/services";

import MiningImg from "~/assets/mining1.png";
import MiningImg2 from "~/assets/mining2.png";
import Sand from "~/assets/sand.png";
import Gravel from "~/assets/gravel.png";
import Cargo from '~/assets/cargo.png';
import Shipping from '~/assets/shipping.png';
import Repair1 from '~/assets/repair1.png';
import Repair2 from '~/assets/repair2.png';
import Support1 from '~/assets/support1.png';
import Support2 from '~/assets/support2.png';
import Support3 from '~/assets/support3.png';
import Support4 from '~/assets/support4.png';


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Services - BRM" },
    { name: "description", content: "Comprehensive maritime services and solutions" },
  ];
}

interface Service {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: typeof Hammer;
  images: string[];
}

export default function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const services: Service[] = [
    {
      id: "mining",
      title: "Chartering Minerals",
      shortDescription: "We assist major Mining Corporations with Chartering vessels for the transportation of minerals, ore, sand, gravel, and other raw materials.",
      description: "We specialize in providing comprehensive chartering services for mining corporations, facilitating the transportation of minerals, ore, and other raw materials. Our vessels are specifically designed to handle heavy cargo loads and navigate challenging maritime routes. We work closely with mining companies to ensure efficient, safe, and timely delivery of materials from extraction sites to processing facilities or export terminals.",
      icon: Hammer,
      images: [MiningImg, MiningImg2, Sand, Gravel],
    },
    {
      id: "repairs",
      title: "Repairs Solutions",
      shortDescription: "Our ship repair solutions help maintain mining support vessels, ensuring operational reliability and compliance with safety standards.",
      description: "Our comprehensive ship repair services are designed to keep mining support vessels in optimal condition. We provide maintenance, repairs, and upgrades for various vessel types, ensuring operational reliability and compliance with international safety standards. Our experienced team of marine engineers and technicians work around the clock to minimize downtime and maximize vessel performance.",
      icon: Wrench,
      images: [Repair1, Repair2],
    },
    {
      id: "construction",
      title: "Chartering & Cargos",
      shortDescription: "We collaborate with construction firms to provide vessels chartering for transporting Sand and Gravel, heavy Machinery, construction Materials, and project equipments.",
      description: "We partner with construction firms to provide specialized vessel chartering services for transporting construction materials, heavy machinery, and project equipment. Our services are essential for large-scale construction projects, especially those in coastal or island locations. We handle everything from sand and gravel transport to heavy equipment delivery, ensuring your construction projects stay on schedule.",
      icon: Building2,
      images: [Cargo, Shipping],
    },
    {
      id: "maintenance",
      title: "Supporting Communities",
      shortDescription: "We are proud to have partnered with humanitarian organizations, Government agencies, and local groups to make a meaningful difference in the lives.",
      description: `In the wake of typhoon Odette, B.R.M Chartering and Maritime Services, stepped up to provide critical support to heavily affected communities in the areas of Siargao, Surigao Del Norte, and Dinagat Islands. Understanding the urgent need for relief and recovery, we offered Free vessel chartering Services to transport essential goods, medical supplies, and relief personnel to the hardest hit areas.
We are proud to have partnered with humanitarian organizations, Government agencies, and local groups to make a meaningful difference in the lives of those impacted by Typhoon Odette. B.R.M, we believe in using our expertise and resources to contribute to the Greater Good.`,
      icon: HandHelping,
      images: [Support1, Support2, Support3, Support4],
    }
  ];

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  const benefits = [
    {
      icon: MapPin,
      title: "Global & Nation Wide Reach",
      description: "Experienced in International and Domestic Shipping Operations ",
    },
    {
      icon: Cog,
      title: "Trusted & Reliable",
      description: "We're here to assist with your chartering and ship repair needs.",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Experienced professionals dedicated to your success",
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#001f3f] to-[#003d7a] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 px-4">
            Our Services
          </h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto px-4">
            Comprehensive maritime solutions tailored to your business needs
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    onClick={() => handleServiceClick(service)}
                    className="flex items-center gap-6 p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all hover:border-[#001f3f] cursor-pointer group"
                  >
                    <div className="flex-shrink-0 w-16 h-16 bg-[#001f3f] rounded-lg flex items-center justify-center group-hover:bg-[#003d7a] transition-colors">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold mb-2 text-[#001f3f] group-hover:text-[#003d7a] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {service.shortDescription}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-[#001f3f] transition-colors" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#001f3f] mb-12 px-4">
            Why Choose Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-[#001f3f] rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#001f3f]">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#001f3f] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 px-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto px-4">
            Contact us today to learn more about our services and how we can help your business.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-[#001f3f] px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* Service Modal */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          isOpen={selectedService !== null}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
