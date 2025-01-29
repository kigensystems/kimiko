'use client';

import { useEffect } from 'react';
import anime from 'animejs';

const features = [
  {
    title: 'Cross-Chain DeFi Integration',
    description: "Seamlessly interact with multiple blockchain ecosystems through our integrated platform. Access leading DeFi protocols, execute cross-chain swaps, and capitalize on arbitrage opportunities with ease. Kimiko navigates the complex world of decentralized finance for you, optimizing gas fees and suggesting the most efficient trading routes across networks."
  },
  {
    title: 'Real-Time Market Analysis',
    description: "Stay ahead of market movements with Kimiko's advanced market monitoring system. Get instant insights on price trends, volume patterns, and market sentiment analysis from social media and news sources. Receive timely alerts about potential opportunities and risks before they impact your portfolio."
  },
  {
    title: 'Smart Trading Signals',
    description: "Transform complex market data into clear trading strategies. Kimiko analyzes multiple data points across blockchain networks to generate actionable trading signals. Whether you're day trading or holding long-term, receive precise entry and exit recommendations backed by comprehensive market analysis."
  }
];

export default function Features() {
  useEffect(() => {
    // Animate features cards fading in
    anime({
      targets: '.feature-card',
      opacity: [0, 1],
      translateY: [50, 0],
      delay: anime.stagger(200),
      easing: 'easeOutExpo',
      duration: 1500
    });

    // Animate features cards fading in
    anime({
      targets: '.feature-card',
      opacity: [0, 1],
      translateY: [50, 0],
      delay: anime.stagger(200),
      easing: 'easeOutExpo',
      duration: 1500
    });
  }, []);

  const cardClasses = `
    feature-card relative p-10 rounded-2xl overflow-hidden min-h-[400px]
    backdrop-blur-sm bg-white/[0.02] border border-white/10
    transform hover:scale-[1.02] transition-all duration-300
    shadow-[0_0_15px_rgba(255,255,255,0.05)]
    hover:shadow-[0_0_20px_rgba(255,78,45,0.1)]
    flex flex-col justify-between
  `;

  return (
    <div id="features" className="py-32 sm:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight font-['Orbitron'] text-[#FFC300]
            drop-shadow-[0_2px_10px_rgba(255,195,0,0.3)]">
            Features
          </h2>
          <p className="mt-6 text-xl leading-8 text-[#F5F2ED]/80 max-w-2xl mx-auto">
            Discover how Kimiko enhances your crypto trading experience
          </p>
        </div>

        <div className="my-20 relative rounded-2xl overflow-hidden backdrop-blur-xl bg-white/[0.02] border border-[#1C1B20]/50
          transform hover:scale-[1.01] transition-all duration-700
          shadow-[0_0_30px_rgba(255,195,0,0.1)]
          hover:shadow-[0_0_50px_rgba(255,78,45,0.2)]
          max-w-3xl mx-auto
          border-t border-b border-[#1C1B20]/50">
          {/* Holographic Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,195,0,0.05)_50%,transparent_100%)] bg-[length:100%_4px] animate-scan pointer-events-none z-20"></div>
          {/* Glow Effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FF4E2D]/20 via-transparent to-[#FFC300]/20 opacity-50 mix-blend-overlay pointer-events-none z-20"></div>
          <div className="relative min-h-[200px] group">
            {/* Edge Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFC300]/50 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#FF4E2D]/50 to-transparent"></div>
              <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[#FFC300]/50 to-transparent"></div>
              <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-[#FF4E2D]/50 to-transparent"></div>
            </div>
            <video 
              className="w-full h-auto relative z-20 mix-blend-screen animate-flicker backdrop-blur-sm cursor-pointer"
              loop
              muted={false}
              playsInline
              preload="auto"
              onClick={(e) => {
                const video = e.currentTarget;
                const playIndicator = document.getElementById('play-indicator');
                if (video.paused) {
                  video.play();
                  playIndicator?.classList.add('opacity-0', 'pointer-events-none');
                } else {
                  video.pause();
                  playIndicator?.classList.remove('opacity-0', 'pointer-events-none');
                }
              }}
              onPause={(e) => {
                const video = e.currentTarget;
                const playIndicator = document.getElementById('play-indicator');
                video.style.opacity = '0.8';
                video.style.filter = 'brightness(0.9) contrast(1.1)';
                playIndicator?.classList.remove('opacity-0', 'pointer-events-none');
              }}
              onPlay={(e) => {
                const video = e.currentTarget;
                const playIndicator = document.getElementById('play-indicator');
                video.style.opacity = '1';
                video.style.filter = 'brightness(1.1) contrast(1.1)';
                playIndicator?.classList.add('opacity-0', 'pointer-events-none');
              }}
              onError={(e) => {
                console.error('Video failed to load:', e);
                e.currentTarget.style.display = 'none';
              }}
              onLoadedData={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
              style={{ 
                opacity: 0, 
                transition: 'all 0.5s ease-in-out',
                objectFit: 'contain',
                maxHeight: '80vh',
                filter: 'brightness(1.1) contrast(1.1)',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
                willChange: 'opacity, filter'
              }}
            >
              <source src="/Kimiko.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-[#1C1B20]/15 mix-blend-multiply pointer-events-none z-30"></div>
            {/* Error State */}
            <div className="absolute inset-0 flex items-center justify-center bg-[#1C1B20]/50" 
                 style={{ display: 'none' }}>
              <p className="text-[#F5F2ED]/80">Failed to load video</p>
            </div>
            {/* Play/Pause Indicator */}
            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 z-40 cursor-pointer group/play"
                 id="play-indicator"
                 onClick={(e) => {
                   const video = document.querySelector('video');
                   if (video) {
                     if (video.paused) {
                       video.play();
                       e.currentTarget.classList.add('opacity-0');
                       e.currentTarget.classList.add('pointer-events-none');
                     } else {
                       video.pause();
                       e.currentTarget.classList.remove('opacity-0');
                       e.currentTarget.classList.remove('pointer-events-none');
                     }
                   }
                 }}>
              <div className="w-24 h-24 rounded-full bg-[#1C1B20]/50 backdrop-blur-sm flex items-center justify-center border border-[#FFC300]/20
                           transform transition-all duration-300 group-hover/play:scale-110 group-hover/play:bg-[#1C1B20]/70">
                <div className="text-[#FFC300] text-6xl transform translate-x-0.5">▶</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={cardClasses}
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-['Orbitron'] text-[#FFC300] mb-6 font-semibold
                  drop-shadow-[0_2px_10px_rgba(255,195,0,0.3)]">
                  {feature.title}
                </h3>
                <p className="text-lg text-[#F5F2ED]/80 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}