"use client";
import { useEffect, useRef, useState } from "react";
import Turnstile from "@/components/Turnstile";
import { useTokenForm } from "../context/TokenFormContext";
import { motion, AnimatePresence } from "framer-motion";
import { fromWei, toWei } from "@/lib/utils";
import { BaseError } from "viem";
import Image from "next/image";
import { createToken } from "@/lib/api";
import { useImageContext } from "../context/ImageContext";
import toast from "react-hot-toast";
import { useCampaignForm } from "../context/campaignFormContext";
import { createCampaign } from "@/lib/api";
import { generateFakeAddress } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useBannerImageContext } from "../context/BannerImageContext";
import { CampaignPayload } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useTokens } from "@/context/TokensContext";
import { useCreateCountdown } from "@/web3/hooks/mr-fud/useCreateCountdown";
import { useAdvertFee } from "@/web3/hooks/mr-fud/useReadAdvertFee";
        

export default function CreateCoinModal({ onClose }: { onClose: () => void }) {
  const { payload, setPayload } = useTokenForm();
  const {campaignPayload } = useCampaignForm();
  const modalRef = useRef<HTMLDivElement>(null);
  const [bnbAmount, setBnbAmount] = useState("0");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("BNB");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedHardCap, setSelectedHardCap] = useState(
    selectedCurrency === "BNB" ? 10 : 0.01
  );
  const pathName = usePathname();
  const router = useRouter();
  const isCampaign = pathName === "/create/campaign";
  const { file } = useImageContext();
  const { bannerImage } = useBannerImageContext();
  const { refetchTokens } = useTokens();
  const { advertFee } = useAdvertFee();
  const { createCountdown } = useCreateCountdown();


    const handleCreateToken = async () => {
      if (!file) return;

      setIsLoading(true);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const imageOneRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const result = await imageOneRes.json();
        const image = result.ipfsUrl;
        setPayload({ image });
        setPayload({ initialPrice: 2 });
        setPayload({ totalSupply: 200000 });

        const tokenCa = generateFakeAddress();
        setPayload({ contractAddress: tokenCa });

        const finalCreateTokenPayload = {
          ...payload,
          image,
          contractAddress: tokenCa,
          initialPrice: 2,
          totalSupply: 200000,
        };

        const response = await createToken(finalCreateTokenPayload);
        if (response) {
          if (response.success) {
            toast.success("Coin created successfully");
            onClose();
            refetchTokens();
            router.push('/feed');
          } else {
            toast.error(
              `An error occurred: ${
                (response.error &&
                  typeof response.error === "object" &&
                  "response" in response.error &&
                  (
                    response.error as {
                      response?: { data?: { message?: string } };
                    }
                  ).response?.data?.message) ||
                (typeof response.error === "object" &&
                response.error !== null &&
                "message" in response.error
                  ? (response.error as { message?: string }).message
                  : undefined) ||
                "Unknown error"
              }`
            );
          }
        }
      } catch (error) {
        toast.error(
          `Unexpected error: 
         Something went wrong ${error}
       `
        );
      } finally {
        setIsLoading(false);
      }
  };
  



 

   const handleCreateCampaign = async () => {
     if (!file || !bannerImage) return;

     setIsLoading(true);

     try {
       // Upload banner image
       const bannerFormData = new FormData();
       bannerFormData.append("file", bannerImage);

       const bannerRes = await fetch("/api/upload", {
         method: "POST",
         body: bannerFormData,
       });

       const bannerResult = await bannerRes.json();
       const campaignBanner = bannerResult.ipfsUrl;

       // Upload project image
       const imageFormData = new FormData();
       imageFormData.append("file", file);

       const imageRes = await fetch("/api/upload", {
         method: "POST",
         body: imageFormData,
       });

       const imageResult = await imageRes.json();
       const image = imageResult.ipfsUrl;

       // Convert startDate to bigint (Unix timestamp)
       const startTimeBigInt = BigInt(
         Math.floor(new Date(campaignPayload.startDate).getTime() / 1000)
       );

       // Create on-chain campaign

       const tx = await createCountdown({
         title: payload.name,
         description: payload.description,
         startTime: startTimeBigInt,
         payableAmount: fromWei(String(advertFee),18), // string in ETH
         account:payload.creatorWallet as `0x${string}`,
       });

       if (!tx) {
         toast.error("Failed to initiate transaction");
         return;
       }


       // Build backend payload
       const finalCampaignPayload: CampaignPayload = {
         coinName: payload.name,
         ticker: payload.ticker,
         description: payload.description,
         campaignTitle: campaignPayload.campaignTitle,
         campaignBanner,
         image,
         creatorWallet: payload.creatorWallet,
         startDate: campaignPayload.startDate,
         endDate: campaignPayload.endDate,
         twitter: payload.twitter,
         website: payload.website,
         telegram: payload.telegram,
       };

       // Create campaign in backend
       const response = await createCampaign(finalCampaignPayload);

       if (response?.success) {
         toast.success("Campaign created successfully");
         onClose();
         router.push("/campaigns");
       } else {
         const errorMessage =
           (response?.error &&
             typeof response.error === "object" &&
             "response" in response.error &&
             (
               response.error as {
                 response?: { data?: { message?: string } };
               }
             ).response?.data?.message) ||
           (typeof response.error === "object" &&
           response.error !== null &&
           "message" in response.error
             ? (response.error as { message?: string }).message
             : undefined) ||
           "Unknown error";

         toast.error(`Backend error: ${errorMessage}`);
       }
     } catch (error) {
       const message =
         error instanceof BaseError && error.cause instanceof Error
           ? error.cause.message
           : "Unexpected error occurred";

       toast.error(`Error: ${message}`);
     } finally {
       setIsLoading(false);
     }
   };



  const handleSubmit = isCampaign ? handleCreateCampaign : handleCreateToken;



  const currencies = [
    {
      name: "BNB",
      image: "/IMG_5135 1.png",
      hardCap: [10, 20, 30, 40],
      chain: "BSC",
    },
    {
      name: "ETH",
      image: "/eth.png",
      hardCap: [0.01, 0.5, 1, 2],
      chain: "ETH",
    },
  ];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  // const formatInput = (amount: number) => setBnbAmount(amount.toString());

  return (
    <div className="fixed inset-0 z-50 bg-[#0077D3] bg-opacity-60 flex items-center justify-center">
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          ref={modalRef}
          className="box-bg mx-4 p-6 rounded-lg w-full max-w-sm text-white overflow-hidden"
        >
          {/* Optional purchase message */}
          <p className="text-base text-white font-normal mb-2">
            Choose how many [DES] you want to buy (optional){" "}
          </p>
          <p className="text-sm font-normal text-[#FFFFFF] mb-4">
            Tip: It’s optional, but buying a small amount of coins helps protect
            your coin from snipers.
          </p>

          <div className="relative w-full mb-4">
            {/* Input Field */}
            <input
              type="number"
              min="0"
              step="0.0001"
              value={bnbAmount}
              onChange={(e) => setBnbAmount(e.target.value)}
              onWheel={(e) => e.currentTarget.blur()}
              placeholder={`1.0000`}
              className="w-full bg-[#013253] input-border text-white px-4 py-3 pr-[90px] rounded-[6px] border-[1px] placeholder-[#87DDFF] appearance-none"
            />
            {/* bg-[#1B1B1B] */}
            {/* border-[#626262] */}

            {/* Custom Dropdown */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="bg-[#297DAB] text-white px-3 py-1 rounded-[7px] text-sm cursor-pointer flex items-center justify-center gap-1"
              >
                {(() => {
                  const selected = currencies.find(
                    (value) => value.name === selectedCurrency
                  );
                  return selected ? (
                    <>
                      <span className="mr-1">{selected.chain}</span>
                      <span className="relative flex items-center justify-center h-4 w-4">
                        <Image
                          alt=""
                          src={selected.image}
                          layout="fill"
                          objectFit="contain"
                          objectPosition="center"
                        />
                      </span>
                    </>
                  ) : (
                    ""
                  );
                })()}
                <span
                  className={`relative mx-1 h-6 w-6 flex items-center justify-center transition-all duration-300 ${
                    dropdownOpen ? "rotate-0" : "rotate-180"
                  }`}
                >
                  <Image
                    alt=""
                    src="/arrow-down.png"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                  />
                </span>
              </button>

              {dropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bg-[#013253] right-0 mt-1 space-y-1.5 p-1 rounded-[7px] shadow-lg overflow-hidden"
                >
                  {currencies.map((currency) => (
                    <li
                      key={currency.name}
                      className="px-4 gap-1 py-2 hover:bg-[#297eabc6] text-sm flex items-center justify-center cursor-pointer bg-[#297DAB] rounded-full text-white"
                      onClick={() => {
                        setSelectedCurrency(currency.name);
                        setPayload({
                          chain: currency.chain as "BSC" | "ETH" | undefined,
                        });
                        setDropdownOpen(false);
                      }}
                    >
                      {currency.name}{" "}
                      <span className="relative flex items-center justify-center h-4 w-4">
                        <Image
                          alt=""
                          src={currency.image}
                          layout="fill"
                          objectFit="contain"
                          objectPosition="center"
                        />
                      </span>
                    </li>
                  ))}
                </motion.ul>
              )}
            </div>
          </div>

          {/* Hardcap */}
          <p className="text-sm font-bold text-[#00C3FE] mb-2">
            Choose Hardcap
          </p>

          <div className="flex gap-2 mb-4">
            {currencies
              .find((value) => value.name === selectedCurrency)
              ?.hardCap.map((val, index, arr) => {
                const isDisabled = index >= arr.length - 2; // Disable last two
                const isSelected = selectedHardCap === val;

                return (
                  <button
                    key={val}
                    onClick={() => !isDisabled && setSelectedHardCap(val)}
                    disabled={isDisabled}
                    className={`text-xs transition-class px-2 py-2 rounded-full cursor-pointer
    ${
      isDisabled
        ? "bg-[#52525254] text-gray-400 cursor-not-allowed"
        : isSelected
        ? "bg-white text-black"
        : "bg-[#52525280] hover:bg-white text-white hover:text-black"
    }`}
                  >
                    {val} {selectedCurrency}
                  </button>
                );
              })}
          </div>

          <p>You receive: 342810.12 ${payload.ticker}</p>
          {Number(advertFee) && isCampaign && (
            <p className="text-xs text-[#00C3FE] font-semibold">
              Advert fee: {fromWei(Number(advertFee),18)} BNB
            </p>
          )}
          {/* Buttons */}
          <div className="flex w-full justify-end gap-2">
            <button
              disabled={!captchaVerified || isLoading}
              onClick={handleSubmit}
              className={`px-4 py-3 rounded-md font-medium flex w-full items-center justify-center gap-2 ${
                captchaVerified
                  ? "bg-[#00C3FE] text-white hover:opacity-90 cursor-pointer"
                  : "bg-[#1b1b1bb5] text-gray-400 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white" />
                </div>
              ) : (
                "Create Coin"
              )}
            </button>
          </div>
          <div className="relative w-full h-18 flex items-center justify-center mt-2">
            {/* Loader Layer */}
            {!captchaVerified && (
              <div className="absolute inset-0 flex items-center justify-center z-0 mx-auto">
                {/* loader */}
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#38B9FF]" />
              </div>
            )}

            {/* CAPTCHA Layer */}
            <div className="relative z-10">
              <Turnstile onSuccess={() => setCaptchaVerified(true)} />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
