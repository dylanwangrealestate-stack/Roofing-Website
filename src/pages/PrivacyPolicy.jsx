import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link to="/" className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary hover:text-primary-light transition-colors mb-10 inline-block">
          ← Back to home
        </Link>
        <h1 className="font-display font-black text-4xl text-ink mb-6 tracking-tight">Privacy Policy</h1>
        <p className="text-muted text-sm mb-8">Last updated: January 2025</p>
        <div className="prose prose-invert max-w-none">
          <p className="text-muted leading-relaxed mb-6">
            Cornerstone Growth ("we," "us," or "our") is committed to protecting your privacy. This policy explains how we collect, use, and protect your information.
          </p>
          <h2 className="font-display font-black text-xl text-ink mt-8 mb-3 tracking-tight">Information We Collect</h2>
          <p className="text-muted leading-relaxed mb-6">
            We collect information you provide directly to us, such as your name, email address, phone number, and business information when you contact us or book a call.
          </p>
          <h2 className="font-display font-black text-xl text-ink mt-8 mb-3 tracking-tight">How We Use Your Information</h2>
          <p className="text-muted leading-relaxed mb-6">
            We use the information we collect to respond to your inquiries, provide our services, and communicate with you about updates and offerings.
          </p>
          <h2 className="font-display font-black text-xl text-ink mt-8 mb-3 tracking-tight">Contact Us</h2>
          <p className="text-muted leading-relaxed">
            If you have questions about this privacy policy, contact us at hello@cornerstonegrowth.ai.
          </p>
        </div>
      </div>
    </div>
  )
}
