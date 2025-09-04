import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center m-auto text-center p-4">
      <h1 className="font-bold text-3xl">404 – Not Found</h1>
      <p className='font-medium text-lg'>We couldn’t find that page.</p>
      <Link href="/" className="rounded-full mx-auto my-2 bg-white py-2.5 px-3.5 font-semibold relative text-[#0077D3]">Return to homepage</Link>
    </div>
  );
}
