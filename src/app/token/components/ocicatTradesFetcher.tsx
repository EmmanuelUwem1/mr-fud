'use client';
import { useEffect } from 'react';
import { useTradeStore } from '@/store/tradeStore';
import { fetchOcicatTradesFromNodeReal } from '@/lib/api/nodeRealTrades';
import { CONSTANTS } from '@/web3/config/constants';

const OCICAT_CA = CONSTANTS.OCICAT_TOKEN_ADDRESS.toLowerCase();

export default function OcicatTradeFetcher() {
  const loaded = useTradeStore((state) => state.loaded);
  const setTrades = useTradeStore((state) => state.setTrades);
  const setLoaded = useTradeStore((state) => state.setLoaded);

  useEffect(() => {
    const loadTrades = async () => {
      if (!loaded) {
        try {
          const trades = await fetchOcicatTradesFromNodeReal(20);
          setTrades(trades ?? []);
          setLoaded(true);
        } catch (err) {
          console.error('Failed to fetch Ocicat trades:', err);
        }
      }
    };

    loadTrades();
  }, [loaded, setTrades, setLoaded]);

  return null; 
}
