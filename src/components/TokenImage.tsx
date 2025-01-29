'use client';

import { useEffect, useState } from 'react';

interface TokenImageProps {
  uri: string;
  name?: string;
}

interface TokenMetadata {
  image?: string;
  properties?: {
    files?: Array<{ uri: string; type: string; }>;
  };
}

export default function TokenImage({ uri, name }: TokenImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setIsLoading(true);
        const metadataUrl = uri.startsWith('https://ipfs.io') 
          ? uri 
          : `https://ipfs.io/ipfs/${uri.replace('ipfs://', '')}`;

        const response = await fetch(metadataUrl);
        const metadata: TokenMetadata = await response.json();

        // Try to get image URL from metadata
        let finalImageUrl = metadata.image;
        
        // If no direct image, try to find it in files
        if (!finalImageUrl && metadata.properties?.files) {
          const imageFile = metadata.properties.files.find(
            file => file.type?.startsWith('image/')
          );
          if (imageFile) {
            finalImageUrl = imageFile.uri;
          }
        }

        // Convert IPFS URL if needed
        if (finalImageUrl?.startsWith('ipfs://')) {
          finalImageUrl = `https://ipfs.io/ipfs/${finalImageUrl.replace('ipfs://', '')}`;
        }

        setImageUrl(finalImageUrl || null);
      } catch (error) {
        console.error('Error fetching metadata:', error);
        setImageUrl(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetadata();
  }, [uri]);

  if (isLoading) {
    return (
      <div className="mt-4">
        <div className="relative aspect-square w-full max-w-[200px] mx-auto rounded-lg overflow-hidden bg-[#1C1B20]/50
          animate-pulse flex items-center justify-center">
          <div className="text-[#F5F2ED]/20">Loading...</div>
        </div>
      </div>
    );
  }

  if (!imageUrl) {
    return null;
  }

  return (
    <div className="mt-4">
      <div className="relative aspect-square w-full max-w-[200px] mx-auto rounded-lg overflow-hidden bg-[#1C1B20]/50">
        <img
          src={imageUrl}
          alt={name || 'Token Image'}
          className="object-cover w-full h-full"
          onError={(e) => {
            e.currentTarget.src = '/kimiko-hero.svg';
            e.currentTarget.className = 'object-contain w-full h-full p-4';
          }}
        />
      </div>
    </div>
  );
}