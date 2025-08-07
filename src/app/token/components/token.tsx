"use client";
import TokenAvatar from "./token-avatar";
import TokenPrice from "./tokenPrice";
import ReferButton from "./refer-button";
import { useState } from "react";
import ReferModal from "./modals/ReferModal";


type TokenProps = {
  address: string;
  tokenName: string;
    tokenTicker: string;
  image: string;
  tokenCreatedDate: string;
  tokenId: string;
};
export default function Token({ address, tokenName, tokenTicker, image, tokenCreatedDate, tokenId }: TokenProps) {
      const [showModal, setShowModal] = useState(false);
    
    return (
      <>
        <div className="flex w-full items-center gap-3 justify-between">
          <div className="w-full items-center gap-3  flex">
            <TokenAvatar
              tokenName={tokenName}
              tokenTicker={tokenTicker}
              image={image}
            />
            <TokenPrice tokenAddress={address} />
          </div>
          <span className="justify-self-end hidden max-sm:flex">
            <ReferButton setShowModal={setShowModal} />
          </span>
        </div>
        {showModal && (
          <ReferModal
            tokenCreatedDate={tokenCreatedDate}
            tokenId={tokenId}
            tokenImage={image}
            tokenName={tokenName}
            tokenTicker={tokenTicker}
            onClose={() => setShowModal(false)}
          />
        )}
      </>
    );
}