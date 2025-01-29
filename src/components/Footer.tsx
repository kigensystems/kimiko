'use client';

export default function Footer() {
  return (
    <footer className="py-8 mt-16 border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2">
          <p className="text-[#F5F2ED]/60 text-sm">
            Copyright © 2025 Kimiko. All rights reserved.
          </p>
          <p className="text-[#F5F2ED]/40 text-xs">
            This platform utilizes artificial intelligence for data analysis and predictions. 
            Results should be used as supplementary information only.
          </p>
        </div>
      </div>
    </footer>
  );
}