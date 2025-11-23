import { Header } from './Header';
import { Footer } from './Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Input } from './ui/input';
import { Search, ChevronRight, MessageCircle, Mail, Phone } from 'lucide-react';

const faqCategories = [
  {
    category: "Orders & Shipping",
    faqs: [
      {
        question: "How long does shipping take?",
        answer: "Standard shipping takes 5-7 business days. Express shipping (2-3 days) is available for an additional fee. All orders are carbon-neutral shipped!"
      },
      {
        question: "Can I track my order?",
        answer: "Yes! Once your order ships, you'll receive a tracking number via email. You can also track your order in your Dashboard under 'Orders'."
      },
      {
        question: "What if my order is late?",
        answer: "Please contact our support team if your order hasn't arrived within the estimated timeframe. We'll investigate and help resolve the issue."
      },
    ]
  },
  {
    category: "Customization & Design",
    faqs: [
      {
        question: "How do I customize my product?",
        answer: "Choose a blank product, click 'Start Designing', then use our customizer tool to upload images, add text, or choose from our design library."
      },
      {
        question: "What file formats do you accept?",
        answer: "We accept PNG, JPG, and SVG files. For best print quality, we recommend high-resolution images (300 DPI) with transparent backgrounds."
      },
      {
        question: "Can I preview my design before ordering?",
        answer: "Yes! Our customizer shows a real-time preview of your design on the product. You can adjust size, position, and rotation before adding to cart."
      },
    ]
  },
  {
    category: "Products & Quality",
    faqs: [
      {
        question: "What materials are your products made from?",
        answer: "We use 100% organic cotton, recycled polyester, and bamboo blends. All materials are certified (GOTS, OEKO-TEX, Fair Trade)."
      },
      {
        question: "How do I care for my eco-friendly products?",
        answer: "Wash in cold water, inside out, and air dry when possible. Use eco-friendly detergent. Avoid bleach and high heat to preserve print quality."
      },
      {
        question: "What sizes do you offer?",
        answer: "We offer sizes from S to XXL. Check our size guide on each product page for detailed measurements."
      },
    ]
  },
  {
    category: "Returns & Exchanges",
    faqs: [
      {
        question: "What is your return policy?",
        answer: "Custom products can be returned within 14 days if there's a quality issue or printing error. Contact us with photos and we'll make it right!"
      },
      {
        question: "Can I exchange for a different size?",
        answer: "Yes! If the product doesn't fit, contact us within 14 days and we'll arrange an exchange (subject to stock availability)."
      },
    ]
  },
  {
    category: "Green Points & Rewards",
    faqs: [
      {
        question: "How do I earn Green Points?",
        answer: "Earn 10 points per 100,000₫ spent, plus 50 bonus points for eco-friendly products, 100 points for reviews, and 200 points for referrals."
      },
      {
        question: "How do I redeem my points?",
        answer: "Go to your Dashboard > Rewards tab, choose a voucher, and apply the code at checkout. Points can be used for discounts and free shipping."
      },
      {
        question: "Do Green Points expire?",
        answer: "Points are valid for 12 months from the date earned. We'll send you a reminder before they expire."
      },
    ]
  },
];

export function HelpPage() {
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
              <span className="text-black">Help Center</span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-r from-[#BCF181] to-[#ca6946] text-black py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="font-['Lora'] mb-4">How Can We Help?</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Find answers to common questions or get in touch with our support team
            </p>
            
            {/* Search */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for answers..."
                className="pl-14 pr-4 py-4 rounded-full border-2 border-white/50 focus:border-white bg-white/90 backdrop-blur-sm text-lg"
              />
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="font-['Lora'] text-center mb-12">Frequently Asked Questions</h2>

          <div className="space-y-8">
            {faqCategories.map((category, idx) => (
              <div key={idx}>
                <h3 className="font-['Lato'] uppercase tracking-wider mb-4 text-[#ca6946]">
                  {category.category}
                </h3>
                <Accordion type="single" collapsible className="border rounded-xl overflow-hidden">
                  {category.faqs.map((faq, faqIdx) => (
                    <AccordionItem key={faqIdx} value={`${idx}-${faqIdx}`} className="border-b last:border-b-0">
                      <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 py-4 bg-gray-50 text-gray-700">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-['Lora'] mb-4">Still Need Help?</h2>
              <p className="text-gray-600">Our support team is here to assist you</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <a href="#contact" className="bg-white rounded-xl p-8 text-center hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-['Lato'] uppercase tracking-wider mb-2">Live Chat</h3>
                <p className="text-sm text-gray-600 mb-4">Chat with our team</p>
                <p className="text-sm font-medium text-[#ca6946]">Available 9AM - 6PM</p>
              </a>

              <a href="mailto:support@sustainique.com" className="bg-white rounded-xl p-8 text-center hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-['Lato'] uppercase tracking-wider mb-2">Email Us</h3>
                <p className="text-sm text-gray-600 mb-4">support@sustainique.com</p>
                <p className="text-sm font-medium text-[#ca6946]">Response within 24hrs</p>
              </a>

              <a href="tel:+841234567890" className="bg-white rounded-xl p-8 text-center hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-['Lato'] uppercase tracking-wider mb-2">Call Us</h3>
                <p className="text-sm text-gray-600 mb-4">+84 123 456 789</p>
                <p className="text-sm font-medium text-[#ca6946]">Mon-Fri 9AM - 6PM</p>
              </a>
            </div>
          </div>
        </div>

        {/* Popular Topics */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h3 className="font-['Lato'] uppercase tracking-wider text-center mb-8">Popular Topics</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['Size Guide', 'Shipping Info', 'Custom Orders', 'Green Certifications', 'Return Policy', 'Green Points', 'Payment Methods', 'Account Settings'].map((topic) => (
              <button
                key={topic}
                className="px-6 py-3 border-2 border-gray-300 rounded-full hover:border-[#ca6946] hover:text-[#ca6946] transition-all"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
