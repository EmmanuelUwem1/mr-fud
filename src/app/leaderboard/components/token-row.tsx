
import Link from "next/link";
import TokenAvatar from "@/components/avaters/token-avatar";
import MarketCap from "@/components/market-cap";
import UserAvatar from "@/components/avaters/user-avatar";
import {formatDaysAgo} from "@/lib/utils";
import { formatWalletAddress } from "@/lib/utils";
import { Token } from "@/context/TokensContext";

interface TokenRowProps{
    token: Token,
    index: number,
    
}
const TokenRow = ({ token, index }: TokenRowProps) => {
  // Generate random market cap between $10M and $500M
  const randomMarketCap =
    Math.floor(Math.random() * (500_000 - 440_000 + 1)) + 1_000;
  return (
    <Link
      href={`/token/${token._id}`}
      key={index}
      className="grid grid-cols-3 py-4 border-t border-[#38B9FF] items-center cursor-pointer hover:bg-[#1d1d1d33] transition-class"
    >
      <TokenAvatar
        index={index}
        imageUrl={token.image}
        ticker={token.ticker}
        name={token.name}
      />
      <UserAvatar
        username={formatWalletAddress(token.creatorWallet) || ""}
        subtitle={formatDaysAgo(token.createdAt)}
      />
      <MarketCap marketCap={randomMarketCap} />
    </Link>
  );
};

export default TokenRow;
