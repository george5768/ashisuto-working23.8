// components/SolutionsSection.tsx

import Link from "next/link"
import Image from "next/image"

const solutions = [
  {
    title: 'Digitalize Past Records & Documents',
    description: 'Transform physical records into searchable digital files with high-speed scanning and AI-powered character recognition. Your data is safely stored in the cloud or storage device.',
    image: '/icons/digitise-past-records.png',
    link: '/digitize-records'
  },
  {
    title: 'Workflow Management System',
    description: 'Eliminate Excel dependency with a digital platform that delivers data traceability and powerful visualization for smarter decisions.',
    image: '/icons/docKITA.png',
    link: '/docKITA'
  },
  {
    title: 'AI Data Prediction & Optimization',
    description: 'Harness AI to find patterns, forecast trends, and optimize operations - cut costs, boost performance, and make smarter decisions.',
    image: '/icons/ai-prediction.png',
    link: '/ai-prediction-optimization'
  },
  {
    title: 'AI Applications Development',
    description: 'Deploy AI agents to automate tasks, save time, and cut costs - customized to your needs and seamlessly integrated with your systems.',
    image: '/icons/AI-agent.png',
    link: '/ai-applications-development'
  },
  {
    title: 'Robtics & IoT System Development',
    description: 'We create AI-driven robotics and IoT solutions, including cobots and AGVs, to boost productivity, accuracy, and operational efficiency.',
    image: '/icons/robot-arm.svg',
    link: '/robotics'
  },
  {
    title: 'Manufacturing Operation',
    description: 'Our focus solution, Mfg Execution System (MES), Advance Planning Schedule & CMMS provides effective planning and maintenance.',
    image: '/icons/operation-management.png',
    link: '/manufacturing-operation'
  },
  {
    title: 'Cybersecurity – Secure Port Access',
    description: 'Secure Port Access technology prevents cyberattacks without requiring a global IP, ensuring safe and reliable operations.',
    image: '/icons/cyber-security.png',
    link: '/cyber-security'
  },
  {
    title: 'Industrial Design & UI/UX Design',
    description: 'With our Concept Convergence activities to turn ideas into reality using creativity design to create the real world impact.',
    image: '/icons/industrial-design.png',
    link: '/industrial-design'
  }
]

export default function SolutionsSection() {
  return (
    <section className="bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light text-black mb-4">
            Our <span className="font-semibold text-primary text-5xl md:text-6xl">Solutions</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
          {solutions.map((solution, idx) => (
            <Link href={solution.link} key={idx} className="group">
              <div className="bg-gradient-to-br from-orange-200 via-orange-300 to-orange-400 backdrop-blur-md rounded-2xl p-8 text-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-white/40 h-full flex flex-col">
                <div className="w-32 h-32 sm:w-36 sm:h-36 mb-6 bg-white/40 rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300">
                  <Image
                    src={solution.image}
                    alt={solution.title}
                    width={120}
                    height={120}
                    className="object-contain p-2"
                  />
                </div>
                <h3 className="text-xl font-bold text-center mb-4 group-hover:text-primary transition-colors duration-300 h-16 flex items-center justify-center">
                  {solution.title}
                </h3>
                <p className="text-sm sm:text-base flex-grow text-gray-600 leading-relaxed">
                  {solution.description}
                </p>
                <div className="mt-6 text-center">
                  <span className="inline-flex items-center text-primary font-semibold group-hover:underline">
                    Learn more
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
