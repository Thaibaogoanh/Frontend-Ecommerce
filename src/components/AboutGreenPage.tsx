import { Header } from './Header';
import { Footer } from './Footer';
import { Leaf, Droplets, Recycle, Heart, Award, TreePine, ChevronRight } from 'lucide-react';

export function AboutGreenPage() {
  const materials = [
    {
      name: "Organic Cotton",
      icon: <Leaf className="w-8 h-8" />,
      description: "100% certified organic cotton grown without harmful pesticides or synthetic fertilizers",
      features: ["GOTS Certified", "Biodegradable", "Soft & Breathable"],
    },
    {
      name: "Recycled Polyester",
      icon: <Recycle className="w-8 h-8" />,
      description: "Made from recycled plastic bottles, reducing waste and environmental impact",
      features: ["GRS Certified", "Durable", "Moisture-wicking"],
    },
    {
      name: "Bamboo Blend",
      icon: <TreePine className="w-8 h-8" />,
      description: "Sustainable bamboo fiber that grows rapidly without pesticides",
      features: ["Naturally Antibacterial", "Ultra-soft", "Temperature Regulating"],
    },
  ];

  const certifications = [
    {
      name: "GOTS",
      fullName: "Global Organic Textile Standard",
      description: "Ensures organic status of textiles from harvesting to manufacturing",
    },
    {
      name: "OEKO-TEX",
      fullName: "Standard 100",
      description: "Certifies products are free from harmful substances",
    },
    {
      name: "Fair Trade",
      fullName: "Fair Trade Certified",
      description: "Ensures fair wages and safe working conditions",
    },
  ];

  const impactStats = [
    { value: "2.5kg", label: "CO₂ Saved per Product" },
    { value: "500L", label: "Water Saved" },
    { value: "95%", label: "Less Waste vs Fast Fashion" },
    { value: "10k+", label: "Trees Planted" },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <div className="flex-1">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <a href="#home" className="hover:text-black">Home</a>
              <ChevronRight className="w-4 h-4" />
              <span className="text-black">Green Commitment</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#BCF181] to-[#ca6946] text-black py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6">
              <Leaf className="w-10 h-10 text-green-700" />
            </div>
            <h1 className="font-['Lora'] mb-6">Our Green Commitment</h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              We believe fashion shouldn't cost the Earth. Every product we create is designed with 
              sustainability at its core, from materials to manufacturing.
            </p>
            <p className="font-medium">YOUR STYLE. OUR PLANET. 🌍</p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-['Lora'] mb-6">Why We're Green</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              The fashion industry is one of the world's largest polluters. We're here to change that. 
              Through Print-on-Demand technology, sustainable materials, and eco-friendly practices, 
              we're proving that style and sustainability can go hand in hand.
            </p>
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {impactStats.map((stat, index) => (
              <div key={index} className="bg-[#BCF181]/20 rounded-xl p-6 text-center">
                <p className="font-bold text-3xl text-green-900 mb-2">{stat.value}</p>
                <p className="text-sm text-gray-700">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sustainable Materials */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-['Lora'] mb-4">Sustainable Materials</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We carefully select every material to ensure minimal environmental impact 
                without compromising on quality or comfort.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {materials.map((material, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="w-16 h-16 bg-[#BCF181] rounded-full flex items-center justify-center mb-6 text-green-800">
                    {material.icon}
                  </div>
                  <h3 className="font-['Lato'] uppercase tracking-wider mb-3">{material.name}</h3>
                  <p className="text-gray-600 mb-6">{material.description}</p>
                  <div className="space-y-2">
                    {material.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Eco-Friendly Inks */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#BCF181] px-4 py-2 rounded-full mb-6">
                <Droplets className="w-5 h-5 text-green-800" />
                <span className="font-medium text-green-900">Water-Based Inks</span>
              </div>
              <h2 className="font-['Lora'] mb-6">Eco-Friendly Printing</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We use only water-based, non-toxic inks that are free from harmful chemicals 
                like PVC and phthalates. Our printing process is designed to minimize waste 
                and energy consumption.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Leaf className="w-4 h-4 text-green-700" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">No Harmful Chemicals</p>
                    <p className="text-sm text-gray-600">Free from PVC, phthalates, and formaldehyde</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Droplets className="w-4 h-4 text-green-700" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Water-Based Formula</p>
                    <p className="text-sm text-gray-600">Biodegradable and safe for the environment</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="w-4 h-4 text-green-700" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Soft & Durable</p>
                    <p className="text-sm text-gray-600">Long-lasting prints that feel great on skin</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#BCF181] to-[#ca6946] rounded-2xl p-12 text-white">
              <h3 className="font-['Lato'] uppercase tracking-wider mb-4">Print-on-Demand Advantage</h3>
              <p className="mb-6">
                Unlike traditional fashion, we only produce what's ordered. This means:
              </p>
              <div className="space-y-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <p className="font-bold mb-1">Zero Overproduction</p>
                  <p className="text-sm text-white/90">No wasted inventory or unsold stock</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <p className="font-bold mb-1">Reduced Carbon Footprint</p>
                  <p className="text-sm text-white/90">Less transportation and storage</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <p className="font-bold mb-1">Lower Water Usage</p>
                  <p className="text-sm text-white/90">Only use resources when needed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#BCF181] px-4 py-2 rounded-full mb-6">
                <Award className="w-5 h-5 text-green-800" />
                <span className="font-medium text-green-900">Certified & Verified</span>
              </div>
              <h2 className="font-['Lora'] mb-4">Our Green Certifications</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We don't just talk about sustainability—we prove it with internationally 
                recognized certifications.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {certifications.map((cert, index) => (
                <div key={index} className="bg-white rounded-xl p-8 text-center shadow-lg">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="w-10 h-10 text-green-700" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">{cert.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{cert.fullName}</p>
                  <p className="text-sm text-gray-700">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-[#BCF181] to-[#ca6946] rounded-2xl p-12 text-center">
            <h2 className="font-['Lora'] text-white mb-6">Join Our Green Mission</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Every purchase you make helps plant trees, reduce waste, and support sustainable practices.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#blanks"
                className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-full transition-all"
              >
                Shop Sustainable Products
              </a>
              <a
                href="#contact"
                className="bg-white hover:bg-gray-100 text-black px-8 py-4 rounded-full transition-all"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
