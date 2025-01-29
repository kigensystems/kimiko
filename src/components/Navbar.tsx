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
    { name: 'button', isButton: true }
  ];

  const NavLink = ({ item }: { item: NavItem }) => {
    const baseClasses = `
      nav-item relative group px-6 py-2
      ${pathname === item.href ? 'text-[#FFC300]' : 'text-[#F5F2ED] hover:text-[#FFC300]'}
    `;

    const content = (
      <>
        {/* Text */}
        <span className="relative z-10 text-base uppercase tracking-[0.2em] font-semibold transition-colors duration-300">
          {item.name}
        </span>

        {/* Animated underline with glow */}
        <span className={`
          absolute -bottom-1 h-[2px] bg-gradient-to-r from-[#FF4E2D] to-[#FFC300] transition-all duration-300
          ${pathname === item.href 
            ? 'left-[10%] w-4/5' 
            : 'left-1/2 w-0 group-hover:w-4/5 group-hover:left-[10%]'
          }
        `} />
        <span className={`
          absolute -bottom-1 h-[2px] bg-[#FFC300] blur-sm transition-all duration-300
          ${pathname === item.href 
            ? 'left-[10%] w-4/5' 
            : 'left-1/2 w-0 group-hover:w-4/5 group-hover:left-[10%]'
          }
        `} />
      </>
    );

    return item.isHash ? (
      <a href={item.href} className={baseClasses}>
        {content}
      </a>
    ) : (
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