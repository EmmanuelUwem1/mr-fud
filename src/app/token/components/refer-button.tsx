import Image from "next/image";

interface ReferButtonProps{
    setShowModal: (show: boolean) => void;

}

export default function ReferButton({setShowModal}:ReferButtonProps) {
    return (
      <div className="flex items-center justify-start gap-3">
        <button
          onClick={() => setShowModal(true)}
          className="text-xs font-medium flex items-center justify-center gap-2 w-fit lg:w-40 bg-[#FF3C38] lg:rounded-full rounded-md p-3 transition-class hover:opacity-90 cursor-pointer"
        >
          <span className="lg:flex hidden"> Refer a friend</span>
          <span className="relative flex items-center justify-center h-4 w-4">
            <Image
              alt=""
              src="/export.png"
              layout="fill"
              objectFit="contain"
              objectPosition="center"
            />
          </span>
        </button>
      </div>
    );
}