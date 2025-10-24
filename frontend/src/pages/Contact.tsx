import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SiTiktok } from "react-icons/si";
import { SiYoutube } from "react-icons/si";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  TicketCheckIcon,
  MessageCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { toast } = useToast();

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create message object
    const contactMessage = {
      id: Date.now().toString(),
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
      status: "unread" as const,
      type: "contact_form" as const,
    };

    // Store in localStorage (in real app, this would be sent to backend)
    const existingMessages = JSON.parse(
      localStorage.getItem("contactMessages") || "[]"
    );
    existingMessages.push(contactMessage);
    localStorage.setItem("contactMessages", JSON.stringify(existingMessages));

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon.",
        duration: 5000,
      });

      // Reset form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 1500);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-800 text-white py-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Circles with Parallax */}
          <div
            className="absolute w-96 h-96 bg-blue-400/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          ></div>
          <div
            className="absolute w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse"
            style={{
              transform: `translateY(${scrollY * -0.2}px)`,
              animationDelay: "1s",
            }}
          ></div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>

          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 5}s`,
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge with animation */}
            <div
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-8 border border-white/20 shadow-xl animate-fade-in-down hover:bg-white/20 transition-all duration-300 cursor-pointer group"
              style={{ animationDelay: "0.2s" }}
            >
              <MessageCircle className="w-4 h-4 animate-pulse" />
              <span className="text-sm font-semibold tracking-wider uppercase">
                We're Here to Help
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>

            {/* Main Heading with staggered animation */}
            <h1
              className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white animate-gradient">
                Get in Touch
              </span>
              <br />
              <span className="text-blue-200">With Our Team</span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto mb-8 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              Have questions about our prefab solutions or need help with your
              project? Our dedicated team is ready to bring your vision to life.
            </p>

            {/* Stats Section */}
            <div
              className="flex flex-wrap justify-center gap-8 mt-12 animate-fade-in-up"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">
                  24/7
                </div>
                <div className="text-blue-200 text-sm uppercase tracking-wider">
                  Support Available
                </div>
              </div>
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">
                  &lt;24h
                </div>
                <div className="text-blue-200 text-sm uppercase tracking-wider">
                  Response Time
                </div>
              </div>
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">
                  100%
                </div>
                <div className="text-blue-200 text-sm uppercase tracking-wider">
                  Satisfaction Rate
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white relative -mt-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-xl border-0 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
              <CardContent className="pt-10 pb-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-800">Phone</h3>
                <p className="text-gray-600 mb-4">
                  Call us during business hours
                </p>
                <a
                  href="tel:+15551234567"
                  className="text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors"
                >
                  0997-951-7188
                </a>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-xl border-0 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
              <CardContent className="pt-10 pb-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-800">Email</h3>
                <p className="text-gray-600 mb-4">Send us an email anytime</p>
                <a
                  href="mailto:info@prefabplus.com"
                  className="text-emerald-600 hover:text-emerald-700 font-semibold text-lg transition-colors"
                >
                  camcomegasales@gmail.com
                </a>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-xl border-0 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
              <CardContent className="pt-10 pb-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-800">
                  Office Location
                </h3>
                <p className="text-gray-600 mb-4">Visit our main office</p>
                <address className="text-orange-600 not-italic font-semibold">
                  Mastersons Ave., Upper Balulang Cagayan de Oro City,
                  Philippines.
                  <br />
                  <br />
                </address>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-slate-100">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-800">
                Send Us a Message
              </h2>
              <Card className="bg-white shadow-lg border-0">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="text-sm font-semibold text-gray-700 uppercase tracking-wide"
                        >
                          Your Name *
                        </label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-colors rounded-lg"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-semibold text-gray-700 uppercase tracking-wide"
                        >
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-colors rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="subject"
                        className="text-sm font-semibold text-gray-700 uppercase tracking-wide"
                      >
                        Subject *
                      </label>
                      <Select
                        value={subject}
                        onValueChange={setSubject}
                        required
                      >
                        <SelectTrigger className="w-full h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg">
                          <SelectValue placeholder="Select a subject for your message" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">
                            General Inquiry
                          </SelectItem>
                          <SelectItem value="quote">Request a Quote</SelectItem>
                          <SelectItem value="support">
                            Technical Support
                          </SelectItem>
                          <SelectItem value="career">Delivery</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-sm font-semibold text-gray-700 uppercase tracking-wide"
                      >
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Write your message here... Please provide as much detail as possible to help us assist you better."
                        rows={6}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="w-full resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-colors rounded-lg"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-prefab-600 to-blue-600 hover:from-prefab-700 hover:to-blue-700 text-white w-full md:w-auto px-8 py-3 h-12 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sending...
                        </div>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-800">
                Our Location
              </h2>
              <div className="bg-white rounded-lg overflow-hidden shadow-lg mb-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.916202696478!2d124.61738977596039!3d8.437315893920475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32fff3c6287d889f%3A0x4ccbb8a1ebd5c5e5!2sCamco%20Prefabricated%20Structures!5e0!3m2!1sen!2sus!4v1715240461509!5m2!1sen!2sus"
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Camco Prefabricated Structures Location"
                ></iframe>
              </div>

              <Card className="bg-white shadow-lg border-0">
                <CardContent className="p-8">
                  <h3 className="font-bold text-xl mb-4 text-gray-800">
                    Connect With Us
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Follow us on social media to stay updated with our latest
                    projects, design trends, and company news.
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-white"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-white"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>

                    {/* Email */}
                    <a
                      href="mailto:camcomegasales@gmail.com"
                      aria-label="Send us an email"
                      className="group relative w-12 h-12 rounded-full flex items-center justify-center overflow-hidden bg-sky-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(56,189,248,0.8)]"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
                      <Mail className="relative z-10 w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" />
                    </a>
                    <a
                      href="https://www.youtube.com/@camcowarehouseracking1669"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit our YouTube channel"
                      className="group relative w-12 h-12 rounded-full flex items-center justify-center overflow-hidden bg-[#FF0000] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,0,0,0.8)]"
                    >
                      {/* Subtle red glow when hovered */}
                      <span className="absolute inset-0 bg-gradient-to-r from-[#FF0000] via-[#FF1E00] to-[#FF4444] opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />

                      {/* YouTube Icon */}
                      <span className="relative z-10 w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110 flex items-center justify-center">
                        <SiYoutube size={24} color="white" />
                      </span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
              Office Hours
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <h3 className="font-bold text-xl mb-6 text-gray-800 flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center mr-3">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    Main Office
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center py-2 border-b border-blue-100">
                      <span className="font-medium text-gray-700">
                        Monday - Friday
                      </span>
                      <span className="text-blue-600 font-semibold">
                        8:30 AM - 5:30 PM
                      </span>
                    </li>
                    <li className="flex justify-between items-center py-2 border-b border-blue-100">
                      <span className="font-medium text-gray-700">
                        Saturday
                      </span>
                      <span className="text-blue-600 font-semibold">
                        8:30 AM - 5:30 PM
                      </span>
                    </li>
                    <li className="flex justify-between items-center py-2">
                      <span className="font-medium text-gray-700">Sunday</span>
                      <span className="text-gray-500 font-semibold">
                        Closed
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <h3 className="font-bold text-xl mb-6 text-gray-800 flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center mr-3">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    Showroom
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center py-2 border-b border-emerald-100">
                      <span className="font-medium text-gray-700">
                        Monday - Friday
                      </span>
                      <span className="text-emerald-600 font-semibold">
                        9:30 AM - 5:30 PM
                      </span>
                    </li>
                    <li className="flex justify-between items-center py-2 border-b border-emerald-100">
                      <span className="font-medium text-gray-700">
                        Saturday
                      </span>
                      <span className="text-emerald-600 font-semibold">
                        9:30 AM - 5:30 PM
                      </span>
                    </li>
                    <li className="flex justify-between items-center py-2">
                      <span className="font-medium text-gray-700">Sunday</span>
                      <span className="text-gray-500 font-semibold">
                        Closed
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
