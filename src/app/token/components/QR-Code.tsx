import QRCode from "react-qr-code";

interface QRBoxProps {
  url: string;
}

export default function QRBox({ url }: QRBoxProps) {
  return (
    <div className="bg-white p-2 rounded-xl shadow-md w-fit mx-auto">
      <QRCode
        value={url}
        size={80}
        bgColor="#ffffff"
        fgColor="#000000"
        level="H"
      />
     
    </div>
  );
}
