import { useState } from "react";
import { Link } from "react-router";
import { Mail, Phone, MapPin, Send, Briefcase } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { Route } from "./+types/contact";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact Us - BRM" },
    { name: "description", content: "Get in touch with BRM for all your maritime business needs" },
  ];
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+63",
    phone: "",
    message: "",
  });

  const countryCodes = [
    { code: "+63", country: "Philippines", flag: "🇵🇭" },
    { code: "+1", country: "United States", flag: "🇺🇸" },
    { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
    { code: "+61", country: "Australia", flag: "🇦🇺" },
    { code: "+65", country: "Singapore", flag: "🇸🇬" },
    { code: "+60", country: "Malaysia", flag: "🇲🇾" },
    { code: "+66", country: "Thailand", flag: "🇹🇭" },
    { code: "+62", country: "Indonesia", flag: "🇮🇩" },
    { code: "+84", country: "Vietnam", flag: "🇻🇳" },
    { code: "+86", country: "China", flag: "🇨🇳" },
    { code: "+81", country: "Japan", flag: "🇯🇵" },
    { code: "+82", country: "South Korea", flag: "🇰🇷" },
    { code: "+971", country: "UAE", flag: "🇦🇪" },
    { code: "+91", country: "India", flag: "🇮🇳" },
    { code: "+49", country: "Germany", flag: "🇩🇪" },
    { code: "+33", country: "France", flag: "🇫🇷" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", countryCode: "+63", phone: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#001f3f] to-[#003d7a] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 px-4">Contact Us</h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto px-4">
            We're here to help. Reach out to us for any questions or inquiries.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#001f3f] mb-8">Get in Touch</h2>

              <p className="text-lg text-gray-700 mb-8">
                Whether you have a question about our services, need support, or want to explore
                partnership opportunities, we're ready to assist you.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#001f3f] rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#001f3f] mb-1">Address</h3>
                    <p className="text-gray-600">
                      Sampaguita St. Sta Rita Village<br />
                      Sta Rita, Guiguinto<br />
                      Bulacan, Philippines
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#001f3f] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#001f3f] mb-1">Phone</h3>
                    <p className="text-gray-600">
                    0945-578-5355 <br />
                    0968-851-9338
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#001f3f] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#001f3f] mb-1">Email</h3>
                    <p className="text-gray-600">
                      brmchartering@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#001f3f] mb-8">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#001f3f] focus:border-transparent outline-none"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#001f3f] focus:border-transparent outline-none"
                    placeholder="john.doe@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#001f3f] focus:border-transparent outline-none bg-white"
                    >
                      {countryCodes.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#001f3f] focus:border-transparent outline-none"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#001f3f] focus:border-transparent outline-none resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#001f3f] hover:bg-[#003d7a] text-white"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="p-20 bg-gray-50">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#001f3f] mb-12 px-4">Join Our Team</h2>
      <p className="text-lg sm:text-xl max-w-3xl mx-auto px-4 mb-5 text-gray-700 text-center">Join our team and be part of the maritime industry's future</p>
        <div className="container mx-auto px-4">
          <div className="mb-8 flex justify-center">
            <Link to="/apply-now">
              <Button
                size="lg"
                className="w-full bg-[#001f3f] hover:bg-[#003d7a] text-white text-lg py-6 px-8"
              >
                <Briefcase className="w-5 h-5 mr-2" />
                Apply Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#001f3f] mb-12 px-4">Find Us</h2>
          <div className="max-w-6xl mx-auto">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3850.123456789!2d120.8765!3d14.7890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDQ3JzIwLjQiTiAxMjDCsDUyJzM1LjQiRQ!5e0!3m2!1sen!2sph!4v1234567890123!5m2!1sen!2sph&q=Sampaguita+St.+Sta+Rita+Village,+Sta+Rita,+Guiguinto,+Bulacan"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-96"
                title="BRM Location"
              ></iframe>
              <div className="mt-4 text-center">
                <a
                  href="https://maps.app.goo.gl/zgCg3yvXnSM7QJ188"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#001f3f] hover:text-[#003d7a] underline text-sm"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-700">
                <MapPin className="w-5 h-5 inline mr-2 text-[#001f3f]" />
                Sampaguita St. Sta Rita Village, Sta Rita, Guiguinto, Bulacan
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
