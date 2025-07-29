import React from "react";

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
  // More fake trades if needed
];

function TradesTable() {
  return (
    <div className="w-full overflow-x-auto bg-[#1C1C1C] border border-black rounded-[18px] p-4 md:p-6 text-white">
      <h3 className="text-lg font-semibold mb-4">Recent Trades</h3>
      <table className="min-w-full table-auto border-separate border-spacing-y-3">
        <thead>
          <tr className="text-sm text-gray-300">
            <th className="text-left px-3">Trader</th>
            <th className="text-left px-3">Action</th>
            <th className="text-right px-3">BNB</th>
            <th className="text-right px-3">Token</th>
            <th className="text-left px-3">Date</th>
            <th className="text-left px-3">Tx</th>
          </tr>
        </thead>
        <tbody>
          {sampleTrades.map((trade, idx) => (
            <tr
              key={idx}
              className="bg-[#2A2A2A] hover:bg-[#333] rounded-lg text-sm"
            >
              <td className="py-2 px-3">{trade.trader}</td>
              <td
                className={`py-2 px-3 font-semibold ${
                  trade.action === "Buy" ? "text-green-400" : "text-red-400"
                }`}
              >
                {trade.action}
              </td>
              <td className="py-2 px-3 text-right">{trade.bnbAmount}</td>
              <td className="py-2 px-3 text-right">{trade.tokenAmount}</td>
              <td className="py-2 px-3">{trade.date}</td>
              <td className="py-2 px-3">
                <a
                  href={`https://bscscan.com/tx/${trade.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline"
                >
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TradesTable;
