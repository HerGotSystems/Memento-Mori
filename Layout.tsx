
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Calculator', icon: '🧮' },
    { href: '/compare', label: 'Compare', icon: '⚖️' },
    { href: '/resources', label: 'Resources', icon: '🤝' },
    { href: '/about', label: 'About', icon: 'ℹ️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">⏳</span>
              <span className="font-bold text-gray-900">Memento Mori</span>
            </Link>
            
            <div className="flex space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-1">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              "The fear of death follows from the fear of life. A man who lives fully is prepared to die at any time."
            </p>
            <p className="text-sm text-gray-500 mb-4">— Mark Twain</p>
            
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <span>📊 Statistical estimates only</span>
              <span>🔒 Privacy-first design</span>
              <span>💝 Made with philosophical care</span>
            </div>
            
            <p className="text-xs text-gray-400 mt-4">
              Not medical advice. For educational and philosophical reflection only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
