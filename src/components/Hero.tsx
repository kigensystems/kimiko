import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative pt-24 pb-16 sm:pt-32 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-left">
            <h1 className="text-4xl font-bold tracking-tight font-['Orbitron'] sm:text-6xl">
              Transform Your Ideas with
              <span className="block text-[#FF4E2D]">Artificial Intelligence</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#F5F2ED]/80 max-w-2xl">
              Harness the power of AI to create, innovate, and accelerate your projects.
              Our platform provides cutting-edge solutions for your creative needs.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <button className="rounded-md bg-[#FF4E2D] px-6 py-3 text-lg font-semibold text-[#F5F2ED] shadow-sm hover:bg-[#FFC300] transition-colors font-['Orbitron']">
                Get started
              </button>
              <button className="text-lg font-semibold leading-6 text-[#F5F2ED] hover:text-[#FFC300] transition-colors font-['Orbitron']">
                Learn more <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          {/* Image and Description Box */}
          <div className="relative">
            {/* Character Heading */}
            <h2 className="text-2xl font-['Orbitron'] text-center mb-6 text-[#FF4E2D] animate-glow">
              Meet Kimiko & Ryu
            </h2>

            <div className="relative w-full h-[500px] rounded-lg overflow-hidden border border-[#FF4E2D]/20 bg-gradient-to-b from-[#1C1B20] to-[#1C1B20]/50">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Kimiko with 3D effect */}
                <div className="relative w-[60%] h-full transform hover:scale-105 transition-transform duration-300 filter drop-shadow-[0_0_15px_rgba(255,78,45,0.3)]">
                  <Image
                    src="/kimiko-hero.svg"
                    alt="Kimiko - AI Assistant"
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
                    className="filter drop-shadow-[0_5px_15px_rgba(255,195,0,0.3)]"
                  />
                </div>
                {/* Ryu (Snake) with 3D effect */}
                <div className="relative w-[30%] h-full -ml-8 transform hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 flex items-end pb-12">
                    <Image
                      src="/kimiko-snake.svg"
                      alt="Ryu - Kimiko's Snake Companion"
                      fill
                      style={{ objectFit: 'contain' }}
                      priority
                      className="filter drop-shadow-[0_5px_15px_rgba(255,78,45,0.3)]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Description Box */}
            <div className="absolute bottom-4 left-4 right-4 bg-[#1C1B20]/90 backdrop-blur-sm p-6 rounded-lg border border-[#FF4E2D]/20">
              <h3 className="text-xl font-['Orbitron'] text-[#FF4E2D] mb-2">
                Your AI Companions
              </h3>
              <p className="text-[#F5F2ED]/80 text-sm">
                Meet Kimiko and her faithful companion Ryu. Together, they combine advanced 
                machine learning with intuitive design to help bring your ideas to life.
              </p>
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