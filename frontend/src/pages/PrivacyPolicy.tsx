import React from 'react';
import Layout from '@/components/Layout';
import { Shield, Lock, Eye, FileText, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPolicy = () => {
  const lastUpdated = "October 20, 2025";

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
            <p className="text-xl text-slate-600">
              Your privacy is important to us. This policy outlines how we collect, use, and protect your information.
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-slate-500">
              <Calendar className="h-4 w-4" />
              <span>Last Updated: {lastUpdated}</span>
            </div>
          </div>

          {/* Quick Links */}
          <Card className="mb-8 border-2 border-blue-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-slate-50">
              <CardTitle className="text-lg">Quick Navigation</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  'Information We Collect',
                  'How We Use Your Data',
                  'Data Protection',
                  'Your Rights',
                  'Cookies Policy',
                  'Contact Us',
                ].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-blue-600 hover:text-blue-700 hover:underline text-sm font-medium"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Content Sections */}
          <div className="space-y-8">
            {/* Introduction */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <FileText className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">Introduction</h2>
                    <p className="text-slate-700 leading-relaxed mb-4">
                      CAMCO Prefabricated Structures ("we," "our," or "us") is committed to protecting your privacy. 
                      This Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
                      you visit our website or use our services.
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                      By using our website, you consent to the data practices described in this policy. If you do not 
                      agree with this policy, please do not access or use our services.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card className="shadow-lg border-0" id="information-we-collect">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <Eye className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Information We Collect</h2>
                    
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Personal Information</h3>
                    <p className="text-slate-700 leading-relaxed mb-3">
                      We may collect personal information that you voluntarily provide to us, including:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-slate-700 mb-4 ml-4">
                      <li>Name and contact information (email, phone number, address)</li>
                      <li>Company name and business information</li>
                      <li>Project details and requirements</li>
                      <li>Payment and billing information</li>
                      <li>Communication preferences</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Automatically Collected Information</h3>
                    <p className="text-slate-700 leading-relaxed mb-3">
                      When you visit our website, we automatically collect certain information:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                      <li>IP address and browser type</li>
                      <li>Device information and operating system</li>
                      <li>Pages visited and time spent on pages</li>
                      <li>Referring website and exit pages</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Your Data */}
            <Card className="shadow-lg border-0" id="how-we-use-your-data">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <FileText className="h-6 w-6 text-green-600 mt-1" />
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">How We Use Your Data</h2>
                    <p className="text-slate-700 leading-relaxed mb-3">
                      We use the information we collect for the following purposes:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                      <li>To provide and maintain our services</li>
                      <li>To process your orders and manage contracts</li>
                      <li>To communicate with you about projects and inquiries</li>
                      <li>To send newsletters and marketing communications (with your consent)</li>
                      <li>To improve our website and user experience</li>
                      <li>To analyze website usage and trends</li>
                      <li>To detect and prevent fraud or security issues</li>
                      <li>To comply with legal obligations</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Protection */}
            <Card className="shadow-lg border-0" id="data-protection">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <Lock className="h-6 w-6 text-purple-600 mt-1" />
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Protection & Security</h2>
                    <p className="text-slate-700 leading-relaxed mb-3">
                      We implement appropriate technical and organizational measures to protect your personal data:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-slate-700 mb-4 ml-4">
                      <li>SSL/TLS encryption for data transmission</li>
                      <li>Secure servers with firewall protection</li>
                      <li>Regular security audits and updates</li>
                      <li>Access controls and authentication</li>
                      <li>Employee training on data protection</li>
                      <li>Regular backups and disaster recovery plans</li>
                    </ul>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                      <p className="text-sm text-yellow-800">
                        <strong>Important:</strong> While we strive to protect your data, no method of transmission 
                        over the internet is 100% secure. We cannot guarantee absolute security.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Your Rights (GDPR) */}
            <Card className="shadow-lg border-0" id="your-rights">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <Shield className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Rights Under GDPR</h2>
                    <p className="text-slate-700 leading-relaxed mb-3">
                      If you are a resident of the European Economic Area (EEA), you have certain data protection rights:
                    </p>
                    <div className="space-y-3">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 mb-1">Right to Access</h4>
                        <p className="text-sm text-slate-700">
                          You can request copies of your personal data.
                        </p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 mb-1">Right to Rectification</h4>
                        <p className="text-sm text-slate-700">
                          You can request correction of inaccurate or incomplete data.
                        </p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 mb-1">Right to Erasure</h4>
                        <p className="text-sm text-slate-700">
                          You can request deletion of your personal data under certain conditions.
                        </p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 mb-1">Right to Restrict Processing</h4>
                        <p className="text-sm text-slate-700">
                          You can request limitation of how we process your data.
                        </p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 mb-1">Right to Data Portability</h4>
                        <p className="text-sm text-slate-700">
                          You can request transfer of your data to another organization.
                        </p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 mb-1">Right to Object</h4>
                        <p className="text-sm text-slate-700">
                          You can object to processing of your data for certain purposes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cookies Policy */}
            <Card className="shadow-lg border-0" id="cookies-policy">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <FileText className="h-6 w-6 text-orange-600 mt-1" />
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Cookies Policy</h2>
                    <p className="text-slate-700 leading-relaxed mb-3">
                      We use cookies and similar tracking technologies to enhance your experience:
                    </p>
                    <div className="space-y-3 mb-4">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-semibold text-slate-900">Necessary Cookies</h4>
                        <p className="text-sm text-slate-700">Essential for website functionality</p>
                      </div>
                      <div className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-semibold text-slate-900">Analytics Cookies</h4>
                        <p className="text-sm text-slate-700">Help us understand website usage</p>
                      </div>
                      <div className="border-l-4 border-purple-500 pl-4">
                        <h4 className="font-semibold text-slate-900">Marketing Cookies</h4>
                        <p className="text-sm text-slate-700">Used for targeted advertising</p>
                      </div>
                      <div className="border-l-4 border-yellow-500 pl-4">
                        <h4 className="font-semibold text-slate-900">Functional Cookies</h4>
                        <p className="text-sm text-slate-700">Enable enhanced features and personalization</p>
                      </div>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      You can manage your cookie preferences through our cookie consent banner or your browser settings.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Third-Party Services */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Third-Party Services</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  We may use third-party services that collect, monitor, and analyze data:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                  <li>Google Analytics for website analytics</li>
                  <li>Payment processors for secure transactions</li>
                  <li>Email service providers for communications</li>
                  <li>Cloud storage providers for data hosting</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Retention */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Retention</h2>
                <p className="text-slate-700 leading-relaxed">
                  We retain your personal data only for as long as necessary to fulfill the purposes outlined in this 
                  policy, unless a longer retention period is required by law. When data is no longer needed, we will 
                  securely delete or anonymize it.
                </p>
              </CardContent>
            </Card>

            {/* Children's Privacy */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Children's Privacy</h2>
                <p className="text-slate-700 leading-relaxed">
                  Our services are not intended for individuals under the age of 18. We do not knowingly collect 
                  personal information from children. If you believe we have collected data from a child, please 
                  contact us immediately.
                </p>
              </CardContent>
            </Card>

            {/* Changes to Policy */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Changes to This Policy</h2>
                <p className="text-slate-700 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                  the new policy on this page and updating the "Last Updated" date. We encourage you to review this 
                  policy periodically.
                </p>
              </CardContent>
            </Card>

            {/* Contact Us */}
            <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-slate-50" id="contact-us">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Us</h2>
                <p className="text-slate-700 leading-relaxed mb-6">
                  If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-semibold text-slate-900">Email</p>
                      <a href="mailto:privacy@camcoprefab.com" className="text-blue-600 hover:underline">
                        privacy@camcoprefab.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-semibold text-slate-900">Phone</p>
                      <a href="tel:+639123456789" className="text-blue-600 hover:underline">
                        +63 912 345 6789
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-semibold text-slate-900">Address</p>
                      <p className="text-slate-700">
                        CAMCO Prefabricated Structures<br />
                        Manila, Philippines
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500">
              This privacy policy is compliant with GDPR, CCPA, and other applicable data protection regulations.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
