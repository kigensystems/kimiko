const features = [
  {
    title: 'Meet Your AI Trading Companion',
    description: "Meet Kimiko and her clever companion Sushi, your dedicated crypto trading team. Through sophisticated AI analysis, Kimiko provides personalized trading guidance tailored to your goals. She's always alert, monitoring market conditions and helping you make informed decisions with confidence.",
    icon: ''
  },
  {
    title: 'Real-Time Market Analysis',
    description: "Stay ahead of market movements with Kimiko's advanced market monitoring system. Get instant insights on price trends, volume patterns, and market sentiment analysis from social media and news sources. Receive timely alerts about potential opportunities and risks before they impact your portfolio.",
    icon: ''
  },
  {
    title: 'Smart Trading Signals',
    description: "Transform complex market data into clear trading strategies. Kimiko analyzes multiple data points across blockchain networks to generate actionable trading signals. Whether you're day trading or holding long-term, receive precise entry and exit recommendations backed by comprehensive market analysis.",
    icon: ''
  }
];

export default function Features() {
  return (
    <div id="features" className="py-24 bg-[#1C1B20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight font-['Orbitron'] text-[#FF4E2D] sm:text-4xl">
            Powerful AI Features
          </h2>
          <p className="mt-4 text-lg leading-8 text-[#F5F2ED]/80 max-w-2xl mx-auto">
            Discover how Kimiko enhances your crypto trading experience
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="relative bg-[#1C1B20] p-8 rounded-xl border border-[#FF4E2D]/20 hover:border-[#FFC300]/50 transition-colors"
            >
              <h3 className="text-lg font-['Orbitron'] text-[#FFC300] mb-4">
                {feature.title}
              </h3>
              <p className="text-[#F5F2ED]/70 leading-relaxed">
                {feature.description}
              </p>
              <div className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-lg" aria-hidden="true">
                <div className="relative aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#FF4E2D] to-[#FFC300] opacity-10"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}