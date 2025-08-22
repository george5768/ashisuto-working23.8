import Image from 'next/image';
import ContactSection from './ContactSection';

export default function ContactPage() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      {/* Heading */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-semibold tracking-tight">
          Let’s <span className="text-primary">Connect</span>
        </h1>
        <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">
          We’re always open to partnerships, projects, and conversation. Reach out to the team closest to you.
        </p>
      </div>

      {/* Location Cards */}
      <div className="grid md:grid-cols-2 gap-12 mb-24">
        {/* Location 1 */}
        <div className="bg-muted p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <h2 className="text-xl font-semibold mb-2">BUSINESS OFFICE</h2>
          <p className="text-muted-foreground mb-4">
            Tun Razak Exchange (TRX) @ Exchange 106,
            <br />
            Level 23 - Spaces, 
            <br />
            Jalan Tun Razak, 55188
            <br />
            Kuala Lumpur, Malaysia
            <br />
            <br />
          </p>
          <div className="aspect-[4/2] rounded-md overflow-hidden bg-slate-200">
            <Image
              src="/images/TRX.jpg"
              alt="KL location"
              width={600}
              height={300}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Location 2 */}
        <div className="bg-muted p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <h2 className="text-xl font-semibold mb-2">OPERATION, R & D CENTER</h2>
          <p className="text-muted-foreground mb-4">
            Sains@USM, CREST Place Block A
            <br />
            No.10, Persiaran Bukit Jambul
            <br />
            11900 Bayan Lepas
            <br />
            Penang, Malaysia
            <br />
            <span className="font-medium text-foreground">Office:</span> +604 – 643 5561   </p>
          <div className="aspect-[4/2] rounded-md overflow-hidden bg-slate-200">
            <Image
              src="/images/Crest.jpg"
              alt="Penang location"
              width={600}
              height={300}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      <ContactSection />
    </section>
  );
}