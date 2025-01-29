'use client';

import { usePhantomContext } from '@/context/PhantomProvider';
import { useTokens } from '@/hooks/useTokens';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { isConnected, publicKey } = usePhantomContext();
  const { tokens, isLoading, error } = useTokens(publicKey);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isConnected) {
      router.replace('/');
    }
  }, [mounted, isConnected, router]);

  if (!mounted || !isConnected || !publicKey) {
    return null;
  }

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}