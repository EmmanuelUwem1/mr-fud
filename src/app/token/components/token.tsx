"use client";
import TokenAvatar from "./token-avatar";
import TokenPrice from "./tokenPrice";
import ReferButton from "./refer-button";
import { useState } from "react";
import ReferModal from "./ReferModal";


type TokenProps = {
  address: string;
  tokenName: string;
    tokenTicker: string;
    image: string;
};
export default function Token({ address, tokenName, tokenTicker, image }: TokenProps) {
      const [showModal, setShowModal] = useState(false);
    
    return (
      <>
        <div className="flex w-full items-center gap-3 justify-start">
          <TokenAvatar
            tokenName={tokenName}
            tokenTicker={tokenTicker}
            image={image}
          />
          <TokenPrice tokenAddress={address} />
          <span className="justify-self-end">
            <ReferButton setShowModal={setShowModal} />
          </span>
        </div>
        {showModal && <ReferModal onClose={() => setShowModal(false)} />}
      </>
    );
}