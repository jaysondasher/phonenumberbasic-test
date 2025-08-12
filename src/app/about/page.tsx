import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - PhoneLookup Pro',
  description: 'Learn about PhoneLookup Pro, your trusted source for reverse phone number lookups and caller identification.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About PhoneLookup Pro</h1>
        
        <div className="prose prose-lg max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Your Trusted Phone Number Lookup Service</h2>
            <p className="text-gray-700 leading-relaxed">
              PhoneLookup Pro is a comprehensive reverse phone lookup service that helps you identify unknown callers 
              and protect yourself from unwanted calls. Our extensive database contains millions of phone numbers 
              with associated contact information.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              We believe everyone deserves to know who's calling them. Our mission is to provide accurate, up-to-date 
              phone number information to help you make informed decisions about answering calls and protecting your privacy.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">How We Work</h3>
            <p className="text-gray-700 leading-relaxed">
              Our platform aggregates phone number data from various public sources and user contributions to provide 
              comprehensive caller information. We continuously update our database to ensure accuracy and relevance.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Privacy & Security</h3>
            <p className="text-gray-700 leading-relaxed">
              We take your privacy seriously. All searches are secure and confidential. We never share your search 
              history or personal information with third parties.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Features</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Comprehensive phone number database</li>
              <li>Instant search results</li>
              <li>Caller identification</li>
              <li>Business information lookup</li>
              <li>Location details</li>
              <li>Mobile-friendly interface</li>
              <li>Secure and private searches</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
            <p className="text-gray-700 leading-relaxed">
              Have questions or feedback? We'd love to hear from you. Reach out to our support team for assistance 
              with any inquiries about our service.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}