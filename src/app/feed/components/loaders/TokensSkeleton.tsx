
export default function TokensSkeleton() {
  return (
    <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(6)
        .fill(null)
        .map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-[15px] bg-[#f3f4f6b5] py-3 pl-3 pr-6 shadow-md w-full min-w-80 flex flex-col gap-4 h-[200px]"
          >
            <div className="flex gap-3 w-full">
              <div className="w-[64px] h-[64px] rounded-[10px] bg-[#e5e7eb]" />
              <div className="flex flex-col gap-2 w-full">
                <div className="h-4 w-1/3 bg-[#e5e7eb] rounded" />
                <div className="h-3 w-2/3 bg-[#d1d5db] rounded" />
                <div className="h-3 w-1/2 bg-[#e5e7eb] rounded" />
                <div className="h-3 w-full bg-[#d1d5db] rounded" />
              </div>
            </div>
            <div className="h-3 w-2/3 bg-[#e5e7eb] rounded" />
          </div>
        ))}
    </div>
  );
}

