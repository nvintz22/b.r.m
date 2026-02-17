import { useState, useRef } from "react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Upload, FileText, ArrowLeft, Send } from "lucide-react";
import type { Route } from "./+types/apply-now";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Apply Now - BRM" },
    { name: "description", content: "Apply for a position at BRM" },
  ];
}

export default function ApplyNow() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+63",
    phone: "",
    position: "",
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

  const [cvFile, setCvFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setCvFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Log form data (for development/debugging)
    console.log("Form submitted:", formData);
    console.log("CV File:", cvFile);
    
    // Show confirmation
    alert("Thank you for your application! We'll review it and get back to you soon.");
    
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      countryCode: "+63",
      phone: "",
      position: "",
    });
    setCvFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#001f3f] to-[#003d7a] text-white py-20">
        <div className="container mx-auto px-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-white hover:text-gray-200 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Contact</span>
          </Link>
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 px-4">
              Apply Now
            </h1>
            <p className="text-lg sm:text-xl max-w-3xl mx-auto px-4">
              Join our team and be part of the maritime industry's future
            </p>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-[#001f3f] mb-4">Personal Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#001f3f] focus:border-transparent outline-none"
                    placeholder="John"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#001f3f] focus:border-transparent outline-none"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address *
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
                  htmlFor="position"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Position Applied For *
                </label>
                <select
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#001f3f] focus:border-transparent outline-none bg-white"
                >
                  <option value="">Select a position</option>
                  <option value="Marine Engineer">Marine Engineer</option>
                  <option value="Operations Manager">Operations Manager</option>
                  <option value="Vessel Captain">Vessel Captain</option>
                  <option value="Port Operations Specialist">Port Operations Specialist</option>
                  <option value="Maritime Consultant">Maritime Consultant</option>
                  <option value="Fleet Manager">Fleet Manager</option>
                  <option value="Marine Surveyor">Marine Surveyor</option>
                  <option value="Safety Officer">Safety Officer</option>
                  <option value="Logistics Coordinator">Logistics Coordinator</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* CV Upload Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-[#001f3f] mb-4">Attach Your CV</h2>
              <div
                onClick={handleFileClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-[#001f3f] hover:bg-gray-50 transition-all"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {cvFile ? (
                  <div className="space-y-2">
                    <FileText className="w-12 h-12 text-[#001f3f] mx-auto" />
                    <p className="text-lg font-medium text-[#001f3f]">{cvFile.name}</p>
                    <p className="text-sm text-gray-500">Click to change file</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                    <p className="text-lg font-medium text-gray-700">Attached you CV here</p>
                    <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400 mt-2">PDF, DOC, DOCX (Max 10MB)</p>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#001f3f] hover:bg-[#003d7a] text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Application
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
