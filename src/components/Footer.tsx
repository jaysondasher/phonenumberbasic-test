import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">PhoneLookup Pro</h4>
            <p className="text-sm">Your trusted source for phone number information</p>
          </div>
          
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              <Link href="/" className="text-sm hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-sm hover:text-white transition-colors">
                About
              </Link>
              <Link href="/faq" className="text-sm hover:text-white transition-colors">
                FAQ
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Legal</h4>
            <div className="flex flex-col space-y-2">
              <Link href="#privacy" className="text-sm hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#terms" className="text-sm hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm">&copy; 2024 PhoneLookup Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}