type LabelValuePairProps = {
  label: string;
  value: string;
};

export const LabelValuePair = ({ label, value }: LabelValuePairProps) => {
  return (
    <div className="flex flex-col items-start p-2">
      <span className="text-xs text-[#626262] font-normal">{label}</span>
      <span className="text-sm md:text-lg text-white font-bold">{value}</span>
    </div>
  );
};
