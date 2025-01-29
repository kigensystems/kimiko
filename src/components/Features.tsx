'use client';

import { useEffect } from 'react';
import anime from 'animejs';

const features = [
  {
    title: 'Meet Your AI Trading Companion',
    description: "Meet Kimiko and her clever companion Sushi, your dedicated crypto trading team. Through sophisticated AI analysis, Kimiko provides personalized trading guidance tailored to your goals. She's always alert, monitoring market conditions and helping you make informed decisions with confidence."
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
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight font-['Orbitron'] text-[#F5F2ED]
            drop-shadow-[0_2px_10px_rgba(255,78,45,0.3)]">
            Features
          </h2>
          <p className="mt-6 text-xl leading-8 text-[#F5F2ED]/80 max-w-2xl mx-auto">
            Discover how Kimiko enhances your crypto trading experience
          </p>
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