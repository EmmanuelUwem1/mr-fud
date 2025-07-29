import Image from "next/image";
interface TradeTableProps{
  token: string;
}

const sampleTrades = [
  {
    trader: "0x4FC...1818",
    action: "Buy",
    bnbAmount: 1.25,
    tokenAmount: 42000,
    date: "Jul 29 2025 15:48",
    txHash: "0xabc123...",
  },
  {
    trader: "0x928...cccc",
    action: "Sell",
    bnbAmount: 0.75,
    tokenAmount: 31000,
    date: "Jul 28 2025 12:33",
    txHash: "0xdef456...",
  },
];

function TradesTable({token}:TradeTableProps) {
  return (
    <div className="w-full bg-[#1C1C1C] border border-black rounded-[18px] text-white">
      <div className="overflow-x-auto lg:max-h-[400px] lg:overflow-y-auto px-4 md:px-6 py-4">
        <table className="min-w-[800px] w-full max-w-6xl table-auto border-collapse">
          <thead>
            <tr className="text-xs font-semibold text-[#FFFFFF]">
              <th className="text-left min-w-[120px] px-3 pb-4">Trader</th>
              <th className="text-left min-w-[100px] px-3 pb-4">Action</th>
              <th className="text-right min-w-[80px] px-3 pb-4">BNB</th>
              <th className="text-right min-w-[100px] px-3 pb-4">${token}</th>
              <th className="text-left min-w-[160px] px-3 pb-4">Date</th>
              <th className="text-left min-w-[40px] px-3 pb-4">Tx</th>
            </tr>
          </thead>
          <tbody>
            {sampleTrades.map((trade, idx) => (
              <tr
                key={idx}
                className="border-t border-t-[#2A2A2A] text-xs font-semibold transition-class"
              >
                <td className="py-4 px-3 text-[#626262]">{trade.trader}</td>
                <td
                  className={`py-4 px-3 font-semibold ${
                    trade.action === "Buy" ? "text-[#4ADE80]" : "text-[#D92C2A]"
                  }`}
                >
                  {trade.action}
                </td>
                <td className="py-4 px-3 text-right">{trade.bnbAmount}</td>
                <td className="py-4 px-3 text-right">{trade.tokenAmount}</td>
                <td className="py-4 px-3">{trade.date}</td>
                <td className="py-4 px-3">
                  <a
                    href={`https://bscscan.com/tx/${trade.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative h-7 w-7 flex items-center justify-center cursor-pointer"
                  >
                    <Image
                      src="/Frame 75.png"
                      alt=""
                      layout="fill"
                      objectFit="contain"
                      objectPosition="center"
                    />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TradesTable;
