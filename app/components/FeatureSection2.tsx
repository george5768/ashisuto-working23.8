import Image from 'next/image'


const features = [
  {
    title: 'Data Traceability',
    description: 'To ensure data integrity and compliance by tracking the source of each data point. Vital for maintaining transparency and reliability, especially in highly regulated industries.',
    image: '/icons/analyze.png'
  },
  {
    title: 'Data Visualization',
    description: 'We empower businesses to make confident, data-driven decisions and enhance operational efficiency, helping your business to gain a competitive edge in your respective industry.',
    image: '/icons/dashboard.png'
  }
]

export default function FeatureSection2() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Construction Image */}
        <div className="flex justify-center pt-12">
          <Image
            src="/images/Construction-2.png"
            alt="Construction"
            width={400}
            height={400}
            className="w-full max-w-md h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Right: Feature Images with Text */}
        <div className="space-y-10">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col md:flex-row items-center gap-6">
              <Image
                src={feature.image}
                alt={feature.title}
                width={300}
                height={300}
                className="w-full md:w-40 h-40 rounded-lg object-contain shadow-md"
              />
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{feature.title}</h4>
                <p className="text-gray-600 mt-2 text-lg">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}