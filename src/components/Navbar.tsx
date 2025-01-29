'use client';

import { useEffect, useState } from 'react';
import PhantomButton from './PhantomButton';
import anime from 'animejs';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <nav className={`
      fixed top-0 w-full z-50 transition-all duration-300
      ${isScrolled 
        ? 'bg-[#1C1B20]/80 backdrop-blur-md py-4 shadow-lg' 
        : 'bg-transparent py-6'
      }
    `}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Spacer for left side */}
          <div className="w-[140px]" />

          {/* Centered Navigation */}
          <div className="hidden md:flex items-center space-x-14">
            {[
              { name: 'Features', href: '#features' },
              { name: 'About', href: '#about' },
              { name: 'Contact', href: '#contact' }
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="nav-item relative group px-6 py-2"
              >
                {/* Glass background on hover */}
                <span className="absolute inset-0 rounded-lg bg-white/0 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/[0.02]" />
                
                {/* Text */}
                <span className="relative z-10 text-[#F5F2ED] text-base uppercase tracking-[0.2em] font-semibold transition-colors duration-300 group-hover:text-[#FFC300]">
                  {item.name}
                </span>

                {/* Animated underline with glow */}
                <span className="absolute -bottom-1 left-1/2 w-0 h-[2px] bg-gradient-to-r from-[#FF4E2D] to-[#FFC300] transition-all duration-300 group-hover:w-4/5 group-hover:left-[10%]" />
                <span className="absolute -bottom-1 left-1/2 w-0 h-[2px] bg-[#FFC300] blur-sm transition-all duration-300 group-hover:w-4/5 group-hover:left-[10%]" />
              </a>
            ))}
          </div>

          {/* Connect Button */}
          <div className="nav-item w-[140px] flex justify-end">
            <PhantomButton />
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
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF4E2D]/20 to-transparent" />
    </nav>
  );
}