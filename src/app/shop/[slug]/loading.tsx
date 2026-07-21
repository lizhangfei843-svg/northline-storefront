export default function ProductLoading() {
  return (
    <main id="main-content" className="site-container grid gap-10 py-12 lg:grid-cols-2" role="status" aria-label="Loading product">
      <div className="aspect-[4/3] animate-pulse rounded-[6px] bg-[#edf0ec]" />
      <div className="space-y-5 pt-4"><div className="h-4 w-28 animate-pulse bg-[#edf0ec]" /><div className="h-14 w-4/5 animate-pulse bg-[#edf0ec]" /><div className="h-7 w-24 animate-pulse bg-[#edf0ec]" /><div className="h-32 w-full animate-pulse bg-[#edf0ec]" /></div>
    </main>
  );
}
