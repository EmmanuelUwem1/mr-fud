import AntiGeetToggle from "./anti-geet-toggle";
function Form() {
  return (
    <div className="max-w-4xl w-full mx-auto text-[#F8F8F8]">
      {/* Heading */}
      <h1 className="text-xl font-semibold bg-clip-text text-transparent w-full text-center bg-gradient-to-r from-[#FA3C39] to-[#FFA393]">
        Create New Coin
      </h1>

      {/* Subheading */}
      <p className="text-sm w-full py-3 text-center font-light text-[#7B93D5]">
        {`choose carefully, these can't be changed once the coin is created`}
      </p>

      {/* Form container */}
      <div className="bg-[#141414] border my-6 border-[#FF3C38] rounded-[10px] p-6 space-y-4">
        {/* Coin Name & Ticker */}
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <label className="block mb-3 text-[#F8F8F8] font-medium text-sm">
              Coin Name
            </label>
            <input
              type="text"
              className="w-full border font-semibold border-[#2A2A2A] rounded-md bg-transparent px-3 py-2"
              //   placeholder="e.g. FUDCoin"
              title="name"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-3 text-[#F8F8F8] font-medium text-sm">
              Ticker
            </label>
            <input
              type="text"
              className="w-full GasoekOne-Regular border border-[#2A2A2A] rounded-md bg-transparent px-3 py-2"
              title="ticker"
              //   placeholder="e.g. FUD"
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
            className="w-full border border-[#2A2A2A] rounded-md bg-transparent px-3 py-2 resize-none"
            title="description"
            // placeholder="Briefly describe your coin..."
          ></textarea>
        </div>

        <AntiGeetToggle />
      </div>
    
    </div>
  );
};

export default Form;
