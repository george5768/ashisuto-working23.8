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
    link: '/robotics-iot'
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
    <section className="bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-light text-black text-center mb-12">
          Our <span className="font-medium text-primary text-4xl">Solutions</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {solutions.map((solution, idx) => (
            <Link href={solution.link} key={idx} className="group">
              <div className="bg-gradient-to-br from-orange-200 via-orange-300 to-orange-400 backdrop-blur-md rounded-xl p-6 text-slate-700 shadow-md flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:bg-white/30 h-[400px]">
                <div className="w-40 h-40 mb-4 bg-white/30 rounded-full flex items-center justify-center">
                  <Image src={solution.image} alt={solution.title} width={80} height={80} className="object-contain" />
                </div>
                <h3 className="text-lg font-semibold group-hover:underline h-[60px] flex items-center justify-center">
                  {solution.title}
                </h3>
                <p className="text-sm flex-grow text-left pt-10">{solution.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
