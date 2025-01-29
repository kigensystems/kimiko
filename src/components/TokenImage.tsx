'use client';

import { useEffect, useState } from 'react';

type MetadataValue = string | number | boolean | null | undefined | Array<{
  trait_type?: string;
  value?: string | number;
}>;

interface TokenMetadata {
  name?: string;
  description?: string;
  image?: string;
  attributes?: Array<{
    trait_type?: string;
    value?: string | number;
  }>;
  [key: string]: MetadataValue; // For any additional fields in the metadata
}

interface TokenImageProps {
  uri: string;
}

export default function TokenImage({ uri }: TokenImageProps) {
  const [metadata, setMetadata] = useState<TokenMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setIsLoading(true);
        // Extract IPFS hash from URI
        const hash = uri.replace('ipfs://', '').replace('https://ipfs.io/ipfs/', '');
        console.log('Fetching metadata for hash:', hash);
        
        // Use our proxy endpoint
        const response = await fetch(`/.netlify/functions/proxy-ipfs?hash=${hash}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch metadata: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received metadata:', data);
        setMetadata(data);
      } catch (error) {
        console.error('Error fetching metadata:', error);
        setMetadata(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (uri) {
      fetchMetadata();
    }
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

  if (!metadata) {
    return (
      <div className="mt-4">
        <div className="relative aspect-square w-full max-w-[200px] mx-auto rounded-lg overflow-hidden bg-[#1C1B20]/50
          flex items-center justify-center">
          <div className="text-[#F5F2ED]/40 text-sm">No metadata available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-2 text-sm">
      <div className="text-[#F5F2ED]/60">Raw Metadata:</div>
      <pre className="p-4 rounded-lg bg-[#1C1B20]/50 overflow-x-auto text-[#F5F2ED]/80">
        {JSON.stringify(metadata, null, 2)}
      </pre>
    </div>
  );
}