import TokenAvatar from "./token-avatar";
import TokenPrice from "./tokenPrice";

type TokenProps = {
  address: string;
  tokenName: string;
    tokenTicker: string;
    image: string;
};
export default function Token({address, tokenName, tokenTicker, image}: TokenProps) {
    return (
        <div className="flex w-full items-center gap-3 justify-start">
            <TokenAvatar tokenName={tokenName } tokenTicker={tokenTicker} image={image} />
            <TokenPrice tokenAddress={address} />
        </div>
    )
}