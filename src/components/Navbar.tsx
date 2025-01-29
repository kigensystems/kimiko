
'use client';

import { useEffect, useState } from 'react';
import PhantomButton from './PhantomButton';
import anime from 'animejs';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type NavItem = {
  name: string;
  href?: string;
  isButton?: boolean;
  isHash?: boolean;
  isExternal?: boolean;
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Animate nav items fading in
    anime({
      targets: '.nav-item',
      opacity: [0, 1],
      translateY: [-20, 0],
      delay: anime.stagger(100),
      easing: 'easeOutExpo'
    });

    // Handle navbar background on scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { name: 'Features', href: '#features', isHash: true },
    { name: 'About', href: '#about', isHash: true },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Feed', href: '#feed', isHash: true },
    { name: 'button', isButton: true },
    {
      name: 'X',
      href: 'https://x.com/kimikosushi',
      isExternal: true
    }
  ];

  const NavLink = ({ item }: { item: NavItem }) => {
    const baseClasses = `
      nav-item px-6 py-2
      ${pathname === item.href ? 'text-[#FFC300]' : 'text-[#F5F2ED]'}
      transition-colors duration-300 hover:text-[#FFC300]
    `;

    const content = (
      <span className="relative z-10 text-base uppercase tracking-[0.2em] font-semibold transition-colors duration-300">
        {item.name}
      </span>
    );

    if (item.isExternal) {
      return (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
        >
          <span className="relative z-10 text-base transition-colors duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="inline-block"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </span>
        </a>
      );
    }
    
    if (item.isHash) {
      // If we're not on the home page and it's a hash link, prefix with /
      const href = pathname === '/' ? (item.href || '') : '/';
      return (
        <Link
          href={href}
          className={baseClasses}
          onClick={(e) => {
            if (pathname !== '/') {
              // Don't append hash when going to home page
              return;
            }
            // Only handle hash scrolling on home page
            e.preventDefault();
            const element = document.querySelector(item.href || '');
            element?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          {content}
        </Link>
      );
    }
    
    return (
      <Link href={item.href || ''} className={baseClasses}>
        {content}
      </Link>
    );
  };

  return (
    <nav className={`
      fixed top-0 w-full z-50 transition-all duration-500
      ${isScrolled 
        ? 'bg-gradient-to-b from-[#1C1B20]/95 to-[#1C1B20]/80 backdrop-blur-xl py-4 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)]' 
        : 'bg-transparent backdrop-blur-none py-6'
      }
    `}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          {/* Navigation + Button Container */}
          <div className="hidden md:flex items-center space-x-14">
            {navItems.map((item) => (
              item.isButton ? (
                <div key="button" className="nav-item">
                  <PhantomButton />
                </div>
              ) : (
                <NavLink key={item.name} item={item} />
              )
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="nav-item md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#F5F2ED]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Gradient Border Bottom */}
      <div className={`
        absolute bottom-0 left-0 right-0 h-[1px] 
        bg-gradient-to-r from-transparent via-[#FF4E2D]/20 to-transparent
        transition-opacity duration-500
        ${isScrolled ? 'opacity-100' : 'opacity-0'}
      `} />
    </nav>
  );
}