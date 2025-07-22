export default function TokenDescription({
  description,
}: {
  description: string;
}) {
  return (
    <div className="card p-4 rounded-md bg-[#1C1C1C] text-white">
      <h2 className="text-xl mb-2 font-semibold">Token Description</h2>
      <p>{description}</p>
    </div>
  );
}
