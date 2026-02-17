import { useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, Building2, Globe, Phone, Mail, MapPin, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { partners } from "./partners";
import { ServiceModal } from "~/components/service-modal";
import { ImageModal } from "~/components/image-modal";
import type { Route } from "./+types/partners.$partnerId";

import ShipRepair from '~/assets/oc-repair.png';
import ShipSalvage from '~/assets/oc-ship.png';
import ShipSalvage2 from '~/assets/oc-ship2.png';
import PitchPropeller from '~/assets/oc-repair2.png';
import Fab1 from '~/assets/oc-fab.png';
import Fab2 from '~/assets/oc-fab-ramp.png';
import Fab3 from '~/assets/oc-fab-ramp2.png';

import DTI from '~/assets/oc-business-perm.png';
import Cert2 from '~/assets/oc-bus-prov.png';
import Cert3 from '~/assets/oc-bus-auth.png';
import Cert4 from '~/assets/oc-bus-cor.png';
import Cert5 from '~/assets/oc-bus-perm24.png';
import Cert6 from '~/assets/oc-bus-mayr.png';
import Cert7 from '~/assets/oc-bus-phlhlt.png';
import Cert8 from '~/assets/oc-bus-sss.png';

interface Service {
  id: string;
  title: string;
  imageUrl: string;
  description?: string;
}

// Service data for partners - in a real app, this would come from an API
const partnerServices: Record<string, Service[]> = {
  "ocean-sailors": [
    {
      id: "1",
      title: "Ship Salvage",
      imageUrl: ShipSalvage,
    },
    {
      id: "2",
      title: "Ship Salvage",
      imageUrl: ShipSalvage2,
    },
    {
      id: "3",
      title: "Ship Repair and Welding",
      imageUrl: ShipRepair,
    },
    {
      id: "4",
      title: "Afloat Repair of Pitch Propeller",
      imageUrl: PitchPropeller,
    },
    {
      id: "5",
      title: "Fabrication of Rudder",
      imageUrl: Fab1,
    },
    {
      id: "6",
      title: "Fabrication of Ramp",
      imageUrl: Fab2,
    },
    {
      id: "7",
      title: "Fabrication of Ramp",
      imageUrl: Fab3,
    },
  ],
};

// Default services for partners without specific services
const defaultServices: Service[] = [
  {
    id: "1",
    title: "Maritime Solutions",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop",
  },
  {
    id: "2",
    title: "Fleet Management",
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop",
  },
  {
    id: "3",
    title: "Port Operations",
    imageUrl: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&h=800&fit=crop",
  },
];

interface License {
  id: string;
  title: string;
  type: string;
  imageUrl: string;
}

// License data for partners - in a real app, this would come from an API
const partnerLicenses: Record<string, License[]> = {
  "ocean-sailors": [
    {
      id: "1",
      title: "DTI Permit",
      type: "Business License",
      imageUrl: DTI,
    },
    {
      id: "2",
      title: "Provincial Certificate of Registration",
      type: "Business License",
      imageUrl: Cert2,
    },
    {
      id: "3",
      title: "Maritime Certificate",
      type: "Business License",
      imageUrl: Cert3,
    },
    {
      id: "4",
      title: "Certificate of Registration",
      type: "Business License",
      imageUrl: Cert4,
    },
    {
      id: "5",
      title: "Business Permit",
      type: "Business License",
      imageUrl: Cert5,
    },
    {
      id: "6",
      title: "Mayor's Permit",
      type: "Business License",
      imageUrl: Cert6,
    },
    {
      id: "7",
      title: "PhilHealth Certificate of Registration",
      type: "Business License",
      imageUrl: Cert7,
    },
    {
      id: "8",
      title: "SSS Certificate of Registration",
      type: "Business License",
      imageUrl: Cert8,
    },
  ],
};

// Default licenses for partners without specific licenses
const defaultLicenses: License[] = [
  {
    id: "1",
    title: "Business Permit",
    type: "Business License",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop",
  },
  {
    id: "2",
    title: "Certificate of Registration",
    type: "Registration",
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop",
  },
];

export function meta({ params }: Route.MetaArgs) {
  const partner = partners.find((p) => p.id === params.partnerId);
  return [
    { title: partner ? `${partner.name} - BRM` : "Partner - BRM" },
    { name: "description", content: partner?.description || "Partner details" },
  ];
}

export default function PartnerDetail() {
  const { partnerId } = useParams();
  const partner = partners.find((p) => p.id === partnerId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedLicenseImage, setSelectedLicenseImage] = useState<string | null>(null);

  const services = partnerId ? (partnerServices[partnerId] || defaultServices) : defaultServices;
  const licenses = partnerId ? (partnerLicenses[partnerId] || defaultLicenses) : defaultLicenses;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  const handleLicenseClick = (imageUrl: string) => {
    setSelectedLicenseImage(imageUrl);
  };

  const closeLicenseModal = () => {
    setSelectedLicenseImage(null);
  };

  if (!partner) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#001f3f] mb-4">Partner Not Found</h1>
          <p className="text-gray-600 mb-8">The partner you're looking for doesn't exist.</p>
          <Link
            to="/partners"
            className="inline-block bg-[#001f3f] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#003d7a] transition-colors"
          >
            Back to Partners
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#001f3f] to-[#003d7a] text-white py-20">
        <div className="container mx-auto px-4">
          <Link
            to="/partners"
            className="inline-flex items-center gap-2 text-white hover:text-gray-200 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Partners</span>
          </Link>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 rounded-lg overflow-hidden bg-white p-4 flex items-center justify-center flex-shrink-0">
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{partner.name}</h1>
              <p className="text-xl text-gray-200 mb-2">{partner.industry}</p>
              <p className="text-lg text-gray-300">{partner.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Details */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Company Information */}
            <div className="p-6 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-6 h-6 text-[#001f3f]" />
                <h2 className="text-2xl font-semibold text-[#001f3f]">Company Information</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Company Name</p>
                  <p className="text-gray-800 font-medium">{partner.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Industry</p>
                  <p className="text-gray-800 font-medium">{partner.industry}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Partnership Type</p>
                  <p className="text-gray-800 font-medium">Strategic Partner</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="p-6 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-6 h-6 text-[#001f3f]" />
                <h2 className="text-2xl font-semibold text-[#001f3f]">Contact Information</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#001f3f] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Address</p>
                    <p className="text-gray-800">
                      {partner.address}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#001f3f] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                    <p className="text-gray-800">{partner.contactNo}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#001f3f] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="text-gray-800">{partner.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Partnership Details */}
          <div className="mt-8 p-6 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-[#001f3f] mb-4">Our Company</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              OceanSailors presents inclusive maritime
              services, with a focus on ship management,
              administrative tasks, and crew support. We
              guarantee safe, efficient, and cost-effective
              operations by offering personalized options to
              the shipping and maritime industries.
            </p>
          </div>
        </div>
      </section>

      {/* Services Carousel Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#001f3f] mb-12 px-4">
            Services
          </h2>
          <div className="max-w-6xl mx-auto">
            <div className="relative w-full">
              {/* Carousel Container */}
              <div className="overflow-hidden rounded-lg w-full">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ 
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="min-w-full w-full flex-shrink-0"
                    >
                      <div
                        className="cursor-pointer group"
                        onClick={() => handleServiceClick(service)}
                      >
                        <div className="aspect-video w-full overflow-hidden bg-gray-100 rounded-t-lg">
                          <img
                            src={service.imageUrl}
                            alt={service.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="bg-white p-6 rounded-b-lg border border-gray-200 border-t-0">
                          <h3 className="text-2xl font-semibold text-[#001f3f] mb-2 group-hover:text-[#003d7a] transition-colors">
                            {service.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              {services.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#001f3f] p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10"
                    aria-label="Previous service"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#001f3f] p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10"
                    aria-label="Next service"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Dots Indicator */}
              {services.length > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  {services.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentIndex
                          ? "bg-[#001f3f] w-8"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Licenses Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center gap-3 mb-8">
            <FileText className="w-8 h-8 text-[#001f3f]" />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#001f3f]">Licenses</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b-2 border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#001f3f]">License Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#001f3f]">Type</th>
                </tr>
              </thead>
              <tbody>
                {licenses.map((license) => (
                  <tr
                    key={license.id}
                    onClick={() => handleLicenseClick(license.imageUrl)}
                    className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors group"
                  >
                    <td className="px-6 py-4 text-gray-800 font-medium group-hover:text-[#001f3f]">
                      {license.title}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{license.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#001f3f] mb-4 px-4">
            Interested in Partnership?
          </h2>
          <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto px-4 text-gray-700">
            Learn more about how you can become a partner with BRM.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-[#001f3f] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#003d7a] transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* Service Modal */}
      {selectedService && (
        <ServiceModal
          imageUrl={selectedService.imageUrl}
          title={selectedService.title}
          isOpen={selectedService !== null}
          onClose={closeModal}
        />
      )}

      {/* License Image Modal */}
      {selectedLicenseImage && (
        <ImageModal
          imageUrl={selectedLicenseImage}
          isOpen={selectedLicenseImage !== null}
          onClose={closeLicenseModal}
        />
      )}
    </div>
  );
}
