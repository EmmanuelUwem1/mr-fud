import TokenAvatar from "./token-avatar";
import TokenPrice from "./tokenPrice";

type TokenProps = {
  address: string;
  tokenName: string;
  tokenTicker: string;
};
export default function Token({address, tokenName, tokenTicker}: TokenProps) {
    return (
        <div className="flex w-full items-center gap-3 justify-start">
            <TokenAvatar tokenName={tokenName } tokenTicker={tokenTicker} />
            <TokenPrice tokenAddress={address} />
        </div>
    )
}