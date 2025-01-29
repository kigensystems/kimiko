'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import anime from 'animejs';

export default function Hero() {
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Animate left card sliding in from left
    anime({
      targets: leftCardRef.current,
      translateX: [-100, 0],
      opacity: [0, 1],
      duration: 1200,
      easing: 'easeOutExpo'
    });

    // Animate right card sliding in from right
    anime({
      targets: rightCardRef.current,
      translateX: [100, 0],
      opacity: [0, 1],
      duration: 1200,
      easing: 'easeOutExpo'
    });

    // Animate text fade in
    anime({
      targets: textRef.current,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 1000,
      delay: 300,
      easing: 'easeOutExpo'
    });
  }, []);

  const cardClasses = `
    h-[600px] max-w-xl mx-auto w-full 
    backdrop-blur-sm bg-white/[0.02] 
    border border-white/10 rounded-2xl p-12 
    shadow-[0_0_15px_rgba(255,255,255,0.05)] 
    hover:shadow-[0_0_20px_rgba(255,78,45,0.1)] 
    transform hover:scale-[1.02] 
    transition-all duration-300
  `;

  return (
    <div className="relative pt-32 pb-12 sm:pt-40 md:pt-48">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Card - Text Content */}
          <div 
            ref={leftCardRef}
            className={`${cardClasses} flex flex-col justify-center`}
          >
            <h1 className="font-['Orbitron'] font-bold tracking-tight text-[#FFC300]
              text-3xl sm:text-4xl lg:text-5xl
              drop-shadow-[0_2px_10px_rgba(255,195,0,0.3)]
              leading-tight">
              Meet Kimiko & Sushi
            </h1>
            <div ref={textRef} className="space-y-6">
              <p className="mt-8 text-lg text-[#F5F2ED]/90 leading-relaxed">
                Powered by Deep-seek R1 Reasoning model. Kimiko and her clever companion Sushi are here to revolutionize your trading experience with advanced market analysis and personalized strategies.
              </p>
              <p className="text-lg text-[#F5F2ED]/90 leading-relaxed">
                Together, they combine cutting-edge AI technology with intuitive design to help you navigate the complex world of cryptocurrency trading with confidence.
              </p>
            </div>
          </div>

          {/* Right Card - Characters */}
          <div 
            ref={rightCardRef}
            className={cardClasses}
          >
            <div className="relative h-full w-full">
              {/* Kimiko */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[70%] h-[90%] transform hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/kimiko-hero.svg"
                    alt="Kimiko"
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
                    className="filter drop-shadow-[0_5px_15px_rgba(255,195,0,0.3)]"
                  />
                </div>
              </div>
              {/* Sushi */}
              <div className="absolute bottom-4 right-4 w-[30%] h-[30%] transform hover:scale-110 transition-transform duration-300">
                <Image
                  src="/kimiko-snake.svg"
                  alt="Sushi"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                  className="filter drop-shadow-[0_5px_15px_rgba(255,78,45,0.3)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#FF4E2D] to-[#FFC300] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>
    </div>
  );
}