import Link from "next/link";


export default function GalleryFeature() {
  return (
    <section className="mx-auto max-w-7xl px-10 md:px-5 lg:px-0">
      <h1 className="font-bold text-2xl">Latest</h1><span className="font-bold text-2xl text-primary">Events & News</span>
      <div className="grid sm:grid-cols-2 mt-15 gap-5 lg:grid-cols-3 auto-rows-fr">
        {/* Gallery content will be loaded on the server side */}
        <div className="col-span-full text-center py-8">
          <p className="text-gray-500">Loading gallery content...</p>
        </div>
      </div>
      <Link href="/gallery" className="flex items-center mx-auto my-5 text-primary font-medium">Read More ...</Link>
    </section>
  );
}