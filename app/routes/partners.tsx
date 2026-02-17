import { Link } from "react-router";
import type { Route } from "./+types/partners";
import OceanSailors from '~/assets/ocean-sailors.png';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Partners - BRM" },
    { name: "description", content: "Our trusted partners and collaborators" },
  ];
}

// Partner data - in a real app, this would come from an API or database
export const partners = [
  {
    id: "ocean-sailors",
    name: "Ocean Sailors",
    logo: OceanSailors,
    description: "Our commitment to quality, integrity, and customer satisfaction is evident in every aspect of our operations.",
    industry: "Maritime Services",
    contactNo: "0917-114-2988, 0945-578-5355",
    email: "oceansailorsmaritime@gmail.com",
    address: "39 St. Sampaguita Sta Rita Village, Sta Rita, Guiguinto, Bulacan"
  }
];

export default function Partners() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#001f3f] to-[#003d7a] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 px-4">
            Our Partners
          </h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto px-4">
            We work with industry leaders to deliver exceptional maritime solutions
          </p>
        </div>
      </section>

      {/* Partners List */}
      <section className="py-20 min-h-[720px] bg-white">
        <div className="container  mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 max-w-7xl mx-auto">
            {partners.map((partner) => (
              <Link
                key={partner.id}
                to={`/partners/${partner.id}`}
                className="group p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all hover:border-[#001f3f] bg-white"
              >
                <div className="flex flex-row items-start gap-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-[#001f3f] mb-2 group-hover:text-[#003d7a] transition-colors">
                      {partner.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{partner.industry}</p>
                    <p className="text-sm text-gray-500 line-clamp-3">{partner.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#001f3f] mb-4 px-4">
            Become a Partner
          </h2>
          <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto px-4 text-gray-700">
            Interested in partnering with us? Let's explore how we can work together.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-[#001f3f] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#003d7a] transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
