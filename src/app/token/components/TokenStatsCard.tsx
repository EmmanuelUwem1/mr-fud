
type TokenStatsProps = {
  price: number;
  marketCap: number;
  volume24h: number;
  creatorReward: number;
  referralReward: number;
};

export default function TokenStatsCard({
  price,
  marketCap,
  volume24h,
  creatorReward,
  referralReward,
}: TokenStatsProps) {
  return (
    <div className="card p-4 rounded-md bg-[#1C1C1C] text-white">
      <h2 className="text-xl mb-2 font-semibold">Token Metrics</h2>
      <p>Price: ${price.toFixed(4)}</p>
      <p>Market Cap: ${marketCap.toLocaleString()}</p>
      <p>24h Volume: ${volume24h.toLocaleString()}</p>
      <p>Creator Reward: {creatorReward}%</p>
      <p>Referral Reward: {referralReward}%</p>
    </div>
  );
}
