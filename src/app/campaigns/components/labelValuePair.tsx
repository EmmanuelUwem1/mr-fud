type LabelValuePairProps = {
  label: string;
  value: string;
};

export const LabelValuePair = ({ label, value }: LabelValuePairProps) => {
  return (
    <div className="flex flex-col items-start sm:p-2 p-1">
      <span className="text-xs text-[#87DDFF] font-normal">{label}</span>
      <span className="text-sm text-white font-bold">{value}</span>
    </div>
  );
};
