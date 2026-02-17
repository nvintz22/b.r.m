import { useState } from "react";
import { ImageModal } from "~/components/image-modal";
import type { Route } from "./+types/licenses";
import Cert1 from '~/assets/crt1.jpg';
import Cert2 from '~/assets/crt2.jpg';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Licenses & Certifications - BRM" },
    { name: "description", content: "View our licenses and certifications" },
  ];
}

export default function Licenses() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Sample license images - replace with actual license images
  const licenses = [
    {
      id: 1,
      title: "Business Permit",
      imageUrl: Cert1,
    },
    {
      id: 2,
      title: "Certificate of Registration",
      imageUrl: Cert2,
    }
  ];

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#001f3f] to-[#003d7a] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 px-4">
            Licenses & Certifications
          </h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto px-4">
            Our credentials and certifications demonstrate our commitment to excellence and compliance
          </p>
        </div>
      </section>

      {/* Licenses Gallery */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {licenses.map((license) => (
              <div
                key={license.id}
                className="group cursor-pointer overflow-hidden rounded-lg border border-gray-200 hover:shadow-xl transition-all hover:border-[#001f3f]"
                onClick={() => handleImageClick(license.imageUrl)}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={license.imageUrl}
                    alt={license.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#001f3f]/0 group-hover:bg-[#001f3f]/60 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-semibold text-lg">
                      Click to View
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#001f3f] mb-1">
                    {license.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#001f3f] mb-8 px-4">
            Our Commitment to Compliance
          </h2>
          <p className="text-lg text-gray-700 text-center mb-6">
            At BRM, we maintain the highest standards of compliance and certification.
            Our licenses and certifications demonstrate our commitment to:
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="p-6 bg-white rounded-lg">
              <h3 className="text-xl font-semibold text-[#001f3f] mb-3">
                Quality Assurance
              </h3>
              <p className="text-gray-600">
                We adhere to international quality standards to ensure consistent, reliable service delivery.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg">
              <h3 className="text-xl font-semibold text-[#001f3f] mb-3">
                Safety & Security
              </h3>
              <p className="text-gray-600">
                Our safety management systems protect our clients, crew, and assets at all times.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg">
              <h3 className="text-xl font-semibold text-[#001f3f] mb-3">
                Environmental Responsibility
              </h3>
              <p className="text-gray-600">
                We are committed to sustainable practices and environmental protection.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg">
              <h3 className="text-xl font-semibold text-[#001f3f] mb-3">
                Regulatory Compliance
              </h3>
              <p className="text-gray-600">
                We stay current with all maritime regulations and industry standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <ImageModal
        imageUrl={selectedImage || ""}
        isOpen={selectedImage !== null}
        onClose={handleCloseModal}
      />
    </div>
  );
}
