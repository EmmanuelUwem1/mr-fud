
export interface TokenMetadata {
  name: string;
  ticker: string;
  image: string;
  contractAddress: string;
}

export interface TokenHolding {
  tokenAddress: string;
  balance: number;
  totalBought: number;
  totalSold: number;
  firstInteraction: string;
  lastInteraction: string;
  token: TokenMetadata;
}

export interface TradingStats {
  totalVolume: number;
  totalTrades: number;
  totalBuys: number;
  totalSells: number;
  buyVolume: number;
  sellVolume: number;
  pnl: number;
  winRate: number;
}

export interface Rewards {
  total: number;
  referral: number;
  trading: number;
}

export interface UserProfile {
  walletAddress: string;
  tradingStats: TradingStats;
  tokenHoldings: TokenHolding[];
  tokensCreated: unknown[];
    totalRewards: number;
    referralRewards: number;
    tradingRewards: number;
  achievements: unknown[]; 
}
