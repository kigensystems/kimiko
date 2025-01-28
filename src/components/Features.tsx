const features = [
  {
    title: 'Natural Language Processing',
    description: 'Advanced text understanding and generation capabilities powered by state-of-the-art language models.',
    icon: '🔤'
  },
  {
    title: 'Computer Vision',
    description: 'Intelligent image analysis and processing for enhanced visual understanding.',
    icon: '👁️'
  },
  {
    title: 'Automated Learning',
    description: 'Self-improving algorithms that adapt to your specific needs and use cases.',
    icon: '🧠'
  },
  {
    title: 'Real-time Analysis',
    description: 'Instant processing and feedback for immediate insights and decision-making.',
    icon: '⚡'
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
            Discover the capabilities that make our AI platform stand out
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="relative bg-[#1C1B20] p-6 rounded-xl border border-[#FF4E2D]/20 hover:border-[#FFC300]/50 transition-colors"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-['Orbitron'] text-[#FFC300] mb-2">
                {feature.title}
              </h3>
              <p className="text-[#F5F2ED]/70">
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