import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Main Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="font-['Orbitron'] font-bold tracking-tight text-[#F5F2ED]
            text-[28px] sm:text-[36px] lg:text-[48px]
            drop-shadow-[0_2px_10px_rgba(255,78,45,0.3)]">
            Meet Kimiko & Sushi
          </h1>
        </div>

        {/* Characters Container */}
        <div className="relative">
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] rounded-lg overflow-hidden bg-gradient-to-b from-[#1C1B20] via-[#1C1B20]/90 to-[#1C1B20]/70">
            {/* Radial Gradient Overlay */}
            <div className="absolute inset-0 bg-radial-gradient from-[#FF4E2D]/5 to-transparent"></div>
            
            <div className="absolute inset-0 flex items-center">
              {/* Kimiko */}
              <div className="relative w-[42%] sm:w-[45%] md:w-[48%] h-full transform hover:scale-105 transition-transform duration-300 filter drop-shadow-[0_0_15px_rgba(255,78,45,0.3)] ml-[20%]">
                <Image
                  src="/kimiko-hero.svg"
                  alt="Kimiko"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                  className="filter drop-shadow-[0_5px_15px_rgba(255,195,0,0.3)]"
                />
              </div>
              {/* Sushi */}
              <div className="absolute bottom-2 sm:bottom-4 left-[60%] w-[22%] sm:w-[24%] md:w-[26%] h-[42%] transform hover:scale-105 transition-transform duration-300">
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