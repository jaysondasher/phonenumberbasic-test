import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold flex items-center gap-2">
              <span>📞</span>
              <span>PhoneLookup Pro</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link 
              href="/" 
              className="hover:bg-white/20 px-4 py-2 rounded-md transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="hover:bg-white/20 px-4 py-2 rounded-md transition-colors"
            >
              About
            </Link>
            <Link 
              href="/faq" 
              className="hover:bg-white/20 px-4 py-2 rounded-md transition-colors"
            >
              FAQ
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}