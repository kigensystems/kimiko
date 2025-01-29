'use client';

import { useEffect, useState } from 'react';
import { useKimikoLiveFeed } from '../hooks/useKimikoLiveFeed';

interface TokenEvent {
  signature?: string;
  timestamp?: string;
  name?: string;
  symbol?: string;
  marketCapSol?: number;
  initialBuy?: number;
  solAmount?: number;
  mint?: string;
  traderPublicKey?: string;
  uri?: string;
}

export default function KimikoLiveFeed() {
  const { isConnected, data, error, connect, disconnect } = useKimikoLiveFeed();
  const [displayData, setDisplayData] = useState<TokenEvent[]>([]);

  useEffect(() => {
    setDisplayData(data || []);
  }, [data]);

  const formatNumber = (num: number | undefined) => {
    if (typeof num !== 'number') return 'N/A';
    return num.toLocaleString();
  };

  return (
    <div className="p-6 rounded-2xl backdrop-blur-sm bg-white/[0.02] border border-white/10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-['Orbitron'] text-[#FFC300] font-semibold
            drop-shadow-[0_2px_10px_rgba(255,195,0,0.3)]">
            Kimiko Live Feed Analysis
          </h2>
          {isConnected && (
            <div className="flex items-center space-x-2 px-2 py-1 rounded-full bg-[#1C1B20]/50">
              <span className="inline-block w-2 h-2 rounded-full bg-[#4CAF50] animate-pulse"></span>
              <span className="text-xs text-[#4CAF50]">Live</span>
            </div>
          )}
        </div>
        <button
          onClick={isConnected ? disconnect : connect}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300
            ${isConnected 
              ? 'bg-[#FF4E2D]/20 text-[#FF4E2D] hover:bg-[#FF4E2D]/30 hover:scale-105' 
              : 'bg-[#FFC300]/20 text-[#FFC300] hover:bg-[#FFC300]/30 hover:scale-105'
            }`}
        >
          {isConnected ? 'Disconnect' : 'Connect to WebSocket'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-6 rounded-lg bg-[#FF4E2D]/10 border border-[#FF4E2D]/20">
          <div className="flex items-start space-x-3">
            <div className="text-[#FF4E2D] mt-1">⚠️</div>
            <div>
              <h3 className="text-[#FF4E2D] font-semibold mb-1">Connection Error</h3>
              <p className="text-[#FF4E2D]/80 text-sm">{error}</p>
              <button
                onClick={connect}
                className="mt-3 px-4 py-1.5 rounded text-sm font-medium bg-[#FF4E2D]/20 text-[#FF4E2D] 
                  hover:bg-[#FF4E2D]/30 transition-colors duration-300"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      {!isConnected && (
        <div className="text-center py-12 px-4 rounded-lg backdrop-blur-sm bg-white/[0.02] border border-white/10">
          <div className="text-4xl mb-4">🔌</div>
          <h3 className="text-xl font-semibold text-[#FFC300]">Connect to Start Monitoring</h3>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayData?.slice(0, 6).map((event, index) => (
          <div
            key={event?.signature || index}
            className="p-4 rounded-lg backdrop-blur-sm bg-[#FFC300]/5 border border-[#FFC300]/20
              animate-[fadeIn_0.3s_ease-in-out]"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-[#FFC300]">
                  {event?.name || 'Unnamed Token'}
                </h3>
                <div className="text-xs text-[#F5F2ED]/60 mt-0.5">
                  {event?.symbol || 'N/A'} • {event?.marketCapSol ? `${event.marketCapSol.toFixed(2)} SOL` : 'N/A'}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-[#F5F2ED]/60 text-xs text-right">
                  {event?.timestamp ? new Date(event.timestamp).toLocaleTimeString() : 'Just now'}
                </div>
                <span className="inline-block w-2 h-2 rounded-full bg-[#FFC300] animate-pulse"></span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
              <div>
                <div className="text-[#F5F2ED]/60">Initial Buy</div>
                <div className="text-[#F5F2ED]">
                  {event?.initialBuy ? `${formatNumber(event.initialBuy)}` : 'N/A'}
                </div>
              </div>
              <div>
                <div className="text-[#F5F2ED]/60">SOL Amount</div>
                <div className="text-[#F5F2ED]">
                  {event?.solAmount ? `${event.solAmount} SOL` : 'N/A'}
                </div>
              </div>
            </div>

            <div className="mt-2 text-xs">
              {event?.mint && (
                <a
                  href={`https://solscan.io/token/${event.mint}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F5F2ED]/60 hover:text-[#FFC300] transition-colors duration-300 block truncate"
                >
                  {`${event.mint.slice(0, 16)}...${event.mint.slice(-16)}`}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {isConnected && (!displayData || displayData.length === 0) && (
        <div className="text-center py-8 text-[#F5F2ED]/60">
          Waiting for events...
        </div>
      )}
    </div>
  );
}