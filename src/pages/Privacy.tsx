import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, UserCheck, Trash2, Download, Settings } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground mb-4 leading-relaxed">
              Your privacy is fundamental to Atelier. This policy explains how we collect, use, and protect 
              your personal information.
            </p>
            <p className="text-sm text-muted-foreground mb-12">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            {/* Overview */}
            <section className="mb-16">
              <div className="bg-card rounded-2xl p-8 border border-border shadow-card">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl font-semibold mb-3">Our Commitment to Your Privacy</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      At Atelier, we believe privacy is a fundamental right, not a luxury. We collect only 
                      the data necessary to provide our services, we're transparent about how we use it, and 
                      we give you control over your information. We never sell your data to third parties, 
                      and we use industry-standard security measures to protect it.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* What We Collect */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-semibold mb-6 flex items-center gap-3">
                <Database className="w-8 h-8 text-primary" />
                Information We Collect
              </h2>
              <div className="space-y-6">
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="font-serif text-xl font-semibold mb-3">Account Information</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    When you create an account, we collect:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="list-disc">Email address (for authentication and notifications)</li>
                    <li className="list-disc">Name (displayed on your profile)</li>
                    <li className="list-disc">Password (encrypted and never stored in plain text)</li>
                    <li className="list-disc">Optional: Avatar, bio, and profile information you choose to share</li>
                  </ul>
                </div>

                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="font-serif text-xl font-semibold mb-3">Activity Data</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    To provide personalized recommendations and community features, we track:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="list-disc">Artworks you like, save, and comment on</li>
                    <li className="list-disc">Artists you follow</li>
                    <li className="list-disc">Your interactions with other users (comments, follows)</li>
                    <li className="list-disc">Search queries and browsing behavior (to improve recommendations)</li>
                  </ul>
                </div>

                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="font-serif text-xl font-semibold mb-3">Technical Information</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    For security and platform functionality, we automatically collect:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="list-disc">IP address and device information</li>
                    <li className="list-disc">Browser type and version</li>
                    <li className="list-disc">Usage analytics (page views, feature usage)</li>
                    <li className="list-disc">Error logs and performance metrics</li>
                  </ul>
                </div>

                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="font-serif text-xl font-semibold mb-3">Artist-Specific Information</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    If you apply to become an artist, we collect:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="list-disc">Portfolio submissions (images, descriptions, metadata)</li>
                    <li className="list-disc">Artist bio, specialty, and location</li>
                    <li className="list-disc">Social media links and website (optional)</li>
                    <li className="list-disc">Application status and moderation notes</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Data */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-semibold mb-6 flex items-center gap-3">
                <Eye className="w-8 h-8 text-primary" />
                How We Use Your Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="font-serif text-lg font-semibold mb-3">Core Services</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>Providing personalized art recommendations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>Enabling peer validation and trust scores</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>Facilitating artist verification and moderation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>Managing your account and preferences</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="font-serif text-lg font-semibold mb-3">Platform Improvement</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>Analyzing usage patterns to improve features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>Detecting and preventing fraud or abuse</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>Ensuring platform security and stability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>Providing customer support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Sharing */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-semibold mb-6 flex items-center gap-3">
                <Lock className="w-8 h-8 text-primary" />
                Data Sharing & Third Parties
              </h2>
              <div className="bg-card rounded-xl p-6 border border-border">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <strong className="text-foreground">We never sell your personal data.</strong> We only share 
                  information in the following limited circumstances:
                </p>
                <ul className="space-y-3 text-sm text-muted-foreground ml-4">
                  <li className="list-disc">
                    <strong className="text-foreground">Service Providers:</strong> We use trusted third-party 
                    services (hosting, analytics, email) that process data on our behalf under strict confidentiality 
                    agreements. These providers are bound by our privacy standards.
                  </li>
                  <li className="list-disc">
                    <strong className="text-foreground">Legal Requirements:</strong> We may disclose information 
                    if required by law, court order, or to protect the rights and safety of our users.
                  </li>
                  <li className="list-disc">
                    <strong className="text-foreground">Public Information:</strong> Information you choose to 
                    make public (profile, comments, artworks) is visible to other users as intended.
                  </li>
                  <li className="list-disc">
                    <strong className="text-foreground">Business Transfers:</strong> In the event of a merger, 
                    acquisition, or sale, user data may be transferred, but privacy protections will continue.
                  </li>
                </ul>
              </div>
            </section>

            {/* Your Rights */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-semibold mb-6 flex items-center gap-3">
                <UserCheck className="w-8 h-8 text-primary" />
                Your Privacy Rights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <Eye className="w-5 h-5 text-primary" />
                    <h3 className="font-serif text-lg font-semibold">Access Your Data</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You can view all data we have about you through your account settings. 
                    We provide a complete export of your information upon request.
                  </p>
                </div>

                <div className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <Settings className="w-5 h-5 text-primary" />
                    <h3 className="font-serif text-lg font-semibold">Update Your Information</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You can update your profile, preferences, and account information at any time 
                    through your account settings.
                  </p>
                </div>

                <div className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <Trash2 className="w-5 h-5 text-primary" />
                    <h3 className="font-serif text-lg font-semibold">Delete Your Account</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You can delete your account at any time. This permanently removes your personal 
                    information, though some data may be retained for legal or security purposes.
                  </p>
                </div>

                <div className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <Download className="w-5 h-5 text-primary" />
                    <h3 className="font-serif text-lg font-semibold">Export Your Data</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Request a complete copy of your data in a machine-readable format. 
                    We'll provide this within 30 days of your request.
                  </p>
                </div>
              </div>
            </section>

            {/* Security */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-semibold mb-6">Data Security</h2>
              <div className="bg-card rounded-xl p-6 border border-border">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We implement industry-standard security measures to protect your information:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc">Encryption in transit (HTTPS/TLS) and at rest</li>
                  <li className="list-disc">Secure password hashing (never stored in plain text)</li>
                  <li className="list-disc">Regular security audits and vulnerability assessments</li>
                  <li className="list-disc">Access controls limiting who can view sensitive data</li>
                  <li className="list-disc">Monitoring and incident response procedures</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  However, no system is 100% secure. We encourage you to use strong passwords and 
                  report any security concerns immediately.
                </p>
              </div>
            </section>

            {/* Cookies & Tracking */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-semibold mb-6">Cookies & Tracking</h2>
              <div className="bg-card rounded-xl p-6 border border-border">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use cookies and similar technologies to:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4 mb-4">
                  <li className="list-disc">Maintain your login session</li>
                  <li className="list-disc">Remember your preferences</li>
                  <li className="list-disc">Analyze platform usage (anonymized)</li>
                  <li className="list-disc">Improve security and prevent fraud</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  You can control cookies through your browser settings. Note that disabling cookies 
                  may affect some platform functionality. We do not use third-party advertising cookies 
                  or tracking pixels.
                </p>
              </div>
            </section>

            {/* Children's Privacy */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-semibold mb-6">Children's Privacy</h2>
              <div className="bg-card rounded-xl p-6 border border-border">
                <p className="text-muted-foreground leading-relaxed">
                  Atelier is not intended for users under the age of 18. We do not knowingly collect 
                  personal information from children. If we become aware that we have collected 
                  information from a child under 18, we will delete that information immediately. 
                  If you believe we have collected information from a child, please contact us.
                </p>
              </div>
            </section>

            {/* Changes to Policy */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-semibold mb-6">Changes to This Policy</h2>
              <div className="bg-card rounded-xl p-6 border border-border">
                <p className="text-muted-foreground leading-relaxed">
                  We may update this privacy policy from time to time. When we make significant changes, 
                  we'll notify you through email or a prominent notice on the platform. The "Last updated" 
                  date at the top of this page indicates when the policy was last revised. We encourage 
                  you to review this policy periodically.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-border">
              <h2 className="font-serif text-2xl font-semibold mb-4">Questions About Privacy?</h2>
              <p className="text-muted-foreground mb-6">
                If you have questions about this privacy policy or how we handle your data, please contact us. 
                We're committed to transparency and will respond to your inquiries promptly.
              </p>
              <Button asChild variant="outline">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </section>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Icon component
const CheckCircle2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default Privacy;


