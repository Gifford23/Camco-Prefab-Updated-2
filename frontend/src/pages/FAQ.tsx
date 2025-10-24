import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import {
  Search,
  HelpCircle,
  MessageSquare,
  Phone,
  Mail,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Zap,
  Shield,
  Clock,
} from "lucide-react";

// FAQ data grouped by categories
const faqData = [
  {
    category: "General Questions",
    icon: HelpCircle,
    color: "from-blue-500 to-indigo-600",
    questions: [
      {
        id: "q1",
        question: "What is Camco Prefab?",
        answer:
          "CamcoPrefab is a leading provider of high-quality prefabricated structures in the Philippines. We specialize in modern, sustainable, and cost-effective building solutions for residential, commercial, and industrial applications using advanced manufacturing techniques.",
      },
      {
        id: "q2",
        question:
          "Are prefab containers comfortable to stay in, or do they get hot inside?",
        answer:
          "No, unlike the conventional shipping container van, ours uses Sandwich Panel Board Walls, which prevent the heat from entering the interior.",
      },
      {
        id: "q3",
        question: "What types of projects can I build with Camco Prefab?",
        answer:
          "We offer versatile solutions including residential homes, office buildings, retail spaces, warehouses, educational facilities, healthcare centers, and specialized structures. Our modular approach allows for complete customization to meet your specific requirements.",
      },
      {
        id: "q4",
        question: "Do you serve areas outside Cagayan de Oro?",
        answer:
          "Yes, we serve clients throughout Northern Mindanao and other regions in the Philippines. Delivery costs and logistics vary by location. Contact us for specific information about serving your area and associated costs.",
      },
    ],
  },
  {
    category: "Design & Customization",
    icon: MessageSquare,
    color: "from-emerald-500 to-teal-600",
    questions: [
      {
        id: "q5",
        question: "Do you offer customization?",
        answer:
          "Yes, we can customize designs; you may also provide your own or have our staffs suggest a design for you.",
      },
      {
        id: "q6",
        question: "How customizable are your prefab structures?",
        answer:
          "Our structures are highly customizable. You can modify layouts, choose from various materials and finishes, adjust dimensions, add specialized features, and integrate custom fixtures. We work closely with you to achieve your vision while maintaining structural integrity.",
      },
      {
        id: "q7",
        question: "Whare the Specifications bare unit? ",
        answer:
          "Galvanized Steel Frame, Sandwich Panel Board Walls - 1 Door - 2 Sliding Windows - Ceiling - Roofing - Cement Board Flooring.",
      },
      {
        id: "q8",
        question: "Do you provide 3D visualizations of designs?",
        answer:
          "Yes, we provide detailed 3D renderings and visualizations for all projects. This helps you see exactly how your structure will look before construction begins, allowing for adjustments and ensuring complete satisfaction with the final design.",
      },
      {
        id: "q9",
        question: "How long will it last?",
        answer:
          "At least 20 years, but it can last longer if you perform regular checks, repaint to prevent rusting, and take care of any maintenance issues right away.",
      },
    ],
  },
  {
    category: "Pricing & Payment",
    icon: Phone,
    color: "from-purple-500 to-pink-600",
    questions: [
      {
        id: "q10",
        question: "How is pricing determined for prefab projects?",
        answer:
          "Pricing depends on structure size, materials selected, customization level, site conditions, and location. We provide transparent, detailed quotations that break down all costs including manufacturing, delivery, and installation.",
      },
      {
        id: "q11",
        question: "Do you offer financing options?",
        answer:
          "We work with several financial partners to provide flexible payment terms and financing solutions. Options vary based on project size, timeline, and individual circumstances. Contact us to discuss financing arrangements that work for your budget.",
      },
      {
        id: "q12",
        question: "What is included in the project cost?",
        answer:
          "Our comprehensive pricing typically includes design development, manufacturing, quality control, delivery to site, basic installation, and initial warranty. Additional services like site preparation, utilities connection, and extended warranties are available separately.",
      },
    ],
  },
  {
    category: "Installation & Delivery",
    icon: Mail,
    color: "from-orange-500 to-red-600",
    questions: [
      {
        id: "q13",
        question: "How are prefab structures delivered and installed?",
        answer:
          "We use specialized transport vehicles and professional installation teams. The process includes site preparation verification, precise module placement using cranes, connection of utilities, final assembly, and quality inspection. Our team manages the entire installation process.",
      },
      {
        id: "q14",
        question: "What site preparation is required?",
        answer:
          "Site preparation typically includes foundation work, utility rough-ins, access road preparation, and obtaining necessary permits. We provide detailed site preparation guidelines and can recommend qualified local contractors for these services.",
      },
      {
        id: "q15",
        question: "How long does it take to assemble?",
        answer:
          "Installation timeframes vary by project complexity. Simple structures may be completed in 2-3 days, while larger or more complex projects can take 1-2 weeks. Weather conditions and site accessibility can affect timelines. We provide realistic schedules during planning.",
      },
    ],
  },
  {
    category: "Technical Support",
    icon: HelpCircle,
    color: "from-cyan-500 to-blue-600",
    questions: [
      {
        id: "q16",
        question: "What warranty do you provide?",
        answer:
          "We offer comprehensive warranties including 2-year structural warranty, 5-year materials warranty, and 2-year fixtures and finishes warranty. Extended warranty options are available. All warranty terms are clearly outlined in your contract.",
      },
      {
        id: "q17",
        question: "How do I get support after installation?",
        answer:
          "Our customer support team is available via phone, email, and on-site visits when necessary. We provide maintenance guidelines, troubleshooting assistance, and can arrange professional service calls for complex issues.",
      },
      {
        id: "q18",
        question: "Can I expand or modify my structure later?",
        answer:
          "Yes, our modular design philosophy allows for future expansions and modifications. Additional modules can be integrated, and interior renovations are possible. We recommend consulting with our team to ensure any changes maintain structural integrity and compliance.",
      },
    ],
  },
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [scrollY, setScrollY] = useState(0);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter questions based on search and category
  const getFilteredQuestions = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();

    const filtered = faqData
      .map((category) => {
        const filteredQuestions = category.questions.filter(
          (q) =>
            (activeCategory === "all" ||
              category.category === activeCategory) &&
            (searchQuery === "" ||
              q.question.toLowerCase().includes(lowerCaseQuery) ||
              q.answer.toLowerCase().includes(lowerCaseQuery))
        );

        return {
          ...category,
          questions: filteredQuestions,
        };
      })
      .filter((category) => category.questions.length > 0);

    return filtered;
  };

  const filteredFAQs = getFilteredQuestions();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 text-white py-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Circles with Parallax */}
          <div
            className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          ></div>
          <div
            className="absolute w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse"
            style={{
              transform: `translateY(${scrollY * -0.2}px)`,
              animationDelay: "1s",
            }}
          ></div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>

          {/* Floating Particles */}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge with animation */}
            <div
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-8 border border-white/20 shadow-xl animate-fade-in-down hover:bg-white/20 transition-all duration-300 cursor-pointer group"
              style={{ animationDelay: "0.2s" }}
            >
              <HelpCircle className="w-4 h-4 animate-pulse" />
              <span className="text-sm font-semibold tracking-wider uppercase">
                Help Center
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>

            {/* Main Heading with staggered animation */}
            <h1
              className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white animate-gradient">
                Frequently Asked
              </span>
              <br />
              <span className="text-blue-300">Questions</span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-xl md:text-2xl text-gray-100 leading-relaxed max-w-3xl mx-auto mb-8 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              Find comprehensive answers to common questions about our
              prefabricated solutions, design process, installation, and
              services.
            </p>

            {/* Stats Section */}
            <div
              className="flex flex-wrap justify-center gap-8 mt-12 animate-fade-in-up"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">
                  {faqData.reduce((acc, cat) => acc + cat.questions.length, 0)}+
                </div>
                <div className="text-blue-300 text-sm uppercase tracking-wider">
                  Questions Answered
                </div>
              </div>
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">
                  {faqData.length}
                </div>
                <div className="text-blue-300 text-sm uppercase tracking-wider">
                  Categories
                </div>
              </div>
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">
                  24/7
                </div>
                <div className="text-blue-300 text-sm uppercase tracking-wider">
                  Support Available
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Help Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-prefab-400 to-prefab-600 rounded-2xl mb-6 shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                How Can We Help You?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Browse our comprehensive FAQ or jump directly to the topics you
                need
              </p>
            </div>

            {/* Quick Access Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {/* Popular Questions - Scroll to Search */}
              <button
                onClick={() => {
                  setActiveCategory("all");
                  window.scrollTo({ top: 900, behavior: "smooth" });
                }}
                className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 p-8 hover:shadow-xl hover:border-prefab-300 transition-all duration-300 text-left cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-prefab-400/5 to-prefab-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Quick Answers
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Get instant answers to the most common questions about our
                    prefab solutions
                  </p>
                  <div className="flex items-center text-prefab-600 font-semibold group-hover:translate-x-2 transition-transform">
                    <span>Browse FAQs</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </button>

              {/* Support Hours - Navigate to Contact */}
              <Link
                to="/contact"
                className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 p-8 hover:shadow-xl hover:border-prefab-300 transition-all duration-300 block"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-teal-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Support Hours
                  </h3>
                  <p className="text-gray-600 mb-2 leading-relaxed">
                    <strong>Monday - Friday</strong>
                  </p>
                  <p className="text-gray-600 mb-4">8:30 AM - 5:30 PM</p>
                  <div className="flex items-center text-prefab-600 font-semibold group-hover:translate-x-2 transition-transform">
                    <span>Contact Support</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>

              {/* Expert Guidance - Navigate to Contact */}
              <Link
                to="/contact"
                className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 p-8 hover:shadow-xl hover:border-prefab-300 transition-all duration-300 block"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-pink-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Expert Guidance
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Our team of specialists is ready to provide personalized
                    assistance
                  </p>
                  <div className="flex items-center text-prefab-600 font-semibold group-hover:translate-x-2 transition-transform">
                    <span>Get Help Now</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>
            </div>

            {/* Popular Topics */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-prefab-400 to-prefab-600 rounded-lg flex items-center justify-center mr-3">
                  <HelpCircle className="w-5 h-5 text-white" />
                </div>
                Popular Topics
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    question: "What is Camco Prefab?",
                    category: "General Questions",
                    id: "q1",
                  },
                  {
                    question: "How customizable are your structures?",
                    category: "Design & Customization",
                    id: "q6",
                  },
                  {
                    question: "How is pricing determined?",
                    category: "Pricing & Payment",
                    id: "q10",
                  },
                  {
                    question: "What warranty do you provide?",
                    category: "Technical Support",
                    id: "q16",
                  },
                  {
                    question: "How long does installation take?",
                    category: "Installation & Delivery",
                    id: "q15",
                  },
                  {
                    question: "Do you offer financing options?",
                    category: "Pricing & Payment",
                    id: "q11",
                  },
                ].map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      // Set the category filter
                      const category = faqData.find(
                        (cat) => cat.category === topic.category
                      );
                      if (category) setActiveCategory(category.category);

                      // Wait for state update and DOM render, then scroll to specific question
                      setTimeout(() => {
                        // Find the accordion item by its value attribute
                        const accordionItem = document.querySelector(
                          `[value="${topic.id}"]`
                        );

                        if (accordionItem) {
                          // Scroll to the element
                          accordionItem.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                          });

                          // Wait a bit more, then click to open the accordion
                          setTimeout(() => {
                            const trigger =
                              accordionItem.querySelector("button");
                            if (trigger) {
                              trigger.click();
                            }
                          }, 500);
                        } else {
                          console.log(
                            "Accordion item not found for ID:",
                            topic.id
                          );
                        }
                      }, 300);
                    }}
                    className="flex items-start p-4 rounded-xl border border-gray-200 hover:border-prefab-300 hover:bg-prefab-50/50 transition-all duration-200 text-left group"
                  >
                    <div className="w-2 h-2 bg-prefab-500 rounded-full mt-2 mr-3 group-hover:scale-150 transition-transform"></div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-prefab-600 transition-colors">
                        {topic.question}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {topic.category}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-prefab-500 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="relative mb-12">
              <div className="absolute inset-0 bg-gradient-to-r from-prefab-300/20 to-prefab-400/20 rounded-2xl blur-xl" />
              <div className="relative bg-white rounded-2xl border border-gray-200/50 shadow-xl backdrop-blur-sm">
                <div className="flex items-center p-2">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-prefab-300 to-prefab-400 rounded-xl ml-2">
                    <Search className="w-5 h-5 text-white" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search for questions, keywords, or topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-0 text-lg bg-transparent focus:ring-0 focus:outline-none placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              <Button
                variant={activeCategory === "all" ? "default" : "outline"}
                className={`group relative overflow-hidden transition-all duration-300 ${
                  activeCategory === "all"
                    ? "bg-gradient-to-r from-prefab-400 to-prefab-500 text-white shadow-lg hover:shadow-xl border-0"
                    : "bg-white border-gray-200 hover:border-prefab-300 hover:bg-prefab-50"
                }`}
                onClick={() => setActiveCategory("all")}
              >
                <div className="relative z-10 flex items-center">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  All Categories
                </div>
              </Button>

              {faqData.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <Button
                    key={index}
                    variant={
                      activeCategory === category.category
                        ? "default"
                        : "outline"
                    }
                    className={`group relative overflow-hidden transition-all duration-300 ${
                      activeCategory === category.category
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg hover:shadow-xl border-0`
                        : "bg-white border-gray-200 hover:border-prefab-300 hover:bg-prefab-50"
                    }`}
                    onClick={() => setActiveCategory(category.category)}
                  >
                    <div className="relative z-10 flex items-center">
                      <IconComponent className="w-4 h-4 mr-2" />
                      {category.category}
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          {filteredFAQs.length > 0 ? (
            <div className="space-y-12">
              {filteredFAQs.map((category, categoryIndex) => {
                const IconComponent = category.icon;
                return (
                  <div key={categoryIndex} className="max-w-4xl mx-auto">
                    {/* Category Header */}
                    <div className="flex items-center mb-8">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center shadow-lg`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <h2 className="text-3xl font-bold text-gray-900">
                          {category.category}
                        </h2>
                        <div
                          className={`h-1 w-20 bg-gradient-to-r ${category.color} rounded-full mt-2`}
                        />
                      </div>
                    </div>

                    {/* Questions */}
                    <div className="space-y-4">
                      {category.questions.map((faq, faqIndex) => (
                        <div key={faq.id} className="group">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-50 rounded-2xl shadow-md group-hover:shadow-xl transition-all duration-300" />
                            <div className="relative bg-white rounded-2xl border border-gray-100 overflow-hidden">
                              <Accordion type="single" collapsible>
                                <AccordionItem
                                  value={faq.id}
                                  className="border-0"
                                >
                                  <AccordionTrigger className="px-8 py-6 hover:bg-gray-50/50 transition-colors group">
                                    <div className="flex items-start text-left">
                                      <div
                                        className={`w-8 h-8 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center mr-4 flex-shrink-0 mt-1`}
                                      >
                                        <span className="text-white font-semibold text-sm">
                                          {String(faqIndex + 1).padStart(
                                            2,
                                            "0"
                                          )}
                                        </span>
                                      </div>
                                      <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-prefab-600 transition-colors">
                                          {faq.question}
                                        </h3>
                                      </div>
                                    </div>
                                    <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-prefab-500 transition-colors ml-4" />
                                  </AccordionTrigger>
                                  <AccordionContent className="px-8 pb-8">
                                    <div className="ml-12">
                                      <div
                                        className={`w-1 h-full bg-gradient-to-b ${category.color} rounded-full absolute left-12 top-0 opacity-20`}
                                      />
                                      <p className="text-gray-700 leading-relaxed text-base">
                                        {faq.answer}
                                      </p>
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-500" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                No Results Found
              </h3>
              <p className="text-gray-600 mb-8">
                We couldn't find any FAQs matching your search criteria. Try
                different keywords or browse all categories.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="bg-white border-prefab-300 text-prefab-600 hover:bg-prefab-50"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-prefab-600 via-prefab-700 to-prefab-800 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

        <div className="relative container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-8">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-4xl font-bold mb-6">Still Have Questions?</h2>
            <p className="text-xl text-prefab-100 mb-12 leading-relaxed">
              Can't find what you're looking for? Our expert team is ready to
              provide personalized assistance for your prefabricated
              construction needs.
            </p>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Link to="/contact">
                <Button className="w-full bg-white text-prefab-700 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 py-4 text-lg font-semibold group">
                  <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Contact Us
                </Button>
              </Link>

              <a href="tel:+63-997-951-7188">
                <Button
                  variant="outline"
                  className="w-full bg-white text-prefab-700 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 py-4 text-lg font-semibold group"
                >
                  <Phone className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Call: 0997-951-7188
                </Button>
              </a>
            </div>

            <div className="mt-8 text-prefab-200">
              <p>Available Monday - Friday, 8:30 AM - 5:30 PM</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default FAQ;
