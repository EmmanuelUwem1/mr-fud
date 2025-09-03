"use client";
import AntiGeetToggle from "./anti-geet-toggle";
import { useTokenForm } from "../context/TokenFormContext";

function Form() {
  const { payload, setPayload } = useTokenForm();
  return (
    <div className="max-w-4xl w-full mx-auto text-[#F8F8F8]">
      {/* Form container */}
      {/* sm:bg-[#141414] bg-[#212121] */}
      <div className="border my-6 input-border cardthreebg rounded-[10px] p-6 space-y-4">
        {/* Coin Name & Ticker */}
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <label className="block mb-3 text-[#F8F8F8] font-medium text-sm">
              Coin Name
            </label>
            <input
              type="text"
              value={payload.name}
              onChange={(e) => setPayload({ ...payload, name: e.target.value })}
              className="w-full border input-border input-bg rounded-md px-3 py-2"
              placeholder="name your coin"
              title="name"
              // border-[#777777]
              // sm:border-[#2A2A2A] 
            />
          </div>
          <div className="flex-1">
            <label className="block mb-3 text-[#F8F8F8] font-medium text-sm">
              Ticker
            </label>
            <input
              type="text"
              value={payload.ticker}
              onChange={(e) =>
                setPayload({ ...payload, ticker: e.target.value })
              }
              className="w-full border input-border rounded-md input-bg px-3 py-2"
              title="ticker"
              placeholder="add a coin ticker (e.g. Pepe)"
              // border-[#777777] sm:border-[#2A2A2A]
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-3 text-[#F8F8F8] font-medium text-sm">
            Description
          </label>
          <textarea
            rows={4}
            value={payload.description}
            onChange={(e) =>
              setPayload({ ...payload, description: e.target.value })
            }
            className="w-full border input-border rounded-md input-bg px-3 py-2 resize-none"
            title="description"
            // placeholder="Briefly describe your coin..."
            //  border-[#777777] sm:border-[#2A2A2A]
          ></textarea>
        </div>

        <AntiGeetToggle />
      </div>
    </div>
  );
};

export default Form;
