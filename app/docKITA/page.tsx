'use client';

import { ScanEye, CircleAlert, SearchCode, BrainCircuit } from 'lucide-react';
import HeroDockita from './components/HeroDockita';
import HowItWorksSection from './components/HowItWorks';
import SolutionShowcase from './components/SolutionShowcase';
import GifTextBlock from './components/GifTextBlock';
import NineGridCards from './components/NineGridCards';
import FaqSection from './components/FAQ';

export default function DocKita () {
  return (
    <main><HeroDockita
      heading="DocKITA® - Transform the Way You Manage Workflows"
      tagline="Smarter. Faster. Traceable. Custom-Built for You."
      description="DocKITA® is a next-generation Workflow Management System that upgrades your existing Microsoft 365 or Excel-based processes into a smart, integrated digital platform. With full data traceability, powerful visualization, and complete customization to match your organization’s unique needs and workflows."
      ctaPrimary="Start Digitizing"
      ctaSecondary="Watch Demo"
      videoSrc="/videos/DocKITA2.gif"
      imageSrc="/images/docKITA-pyramid.png"
      features={[
        {
          icon: <CircleAlert size={36} className="text-red-500" />,
          title: 'Problem statement faced by customers',
          description:
            'Standard ERP and MES systems struggle to digitize shopfloor processes and workflows that rely heavily on Excel, hardcopy forms, and checklists, offering only limited flexibility for achieving extended data traceability and delivering powerful, customized visualizations.',
        },
        {
          icon: <BrainCircuit size={36} className="text-orange-500" />,
          title: 'DocKITA® AI Workflow Management System',
          description:
            'DocKITA® helps organizations eliminate reliance on Excel and hardcopy-based workflows by seamlessly connecting shopfloor processes to ERP or MES systems, delivering system-based data traceability and powerful visualization capabilities.',
        },
        {
          icon: <SearchCode size={36} className="text-orange-500" />,
          title: 'Data Traceability',
          description:
            'Help organizations maintain and improve data quality and integrity.',
        },
        {
          icon: <ScanEye size={36} className="text-orange-500" />,
          title: 'Data Visualization',
          description:
            'Custom dashboards that meaningfully interpret data.',
        },
      ]}
    />
  
    <HowItWorksSection/>
    <SolutionShowcase
    title="Customized Solution in action"
    description="Our digitalization solution provides you with the most flexibility and our technology is adapted to help you retain all of your existing document management workflows."
    gifSrc="/videos/DocKITA.gif"
    youtubeId="XqzgRntcqQE" // Replace with your actual YouTube video ID
    />
    <GifTextBlock
    gifSrc="/videos/digital_signature.gif"
    title="Real-Time Signature Workflow"
    description="A digital application built on your existing forms and checklist.  Easily manage and assign required signatories with multi-level approval features. Sign on-the-go from anywhere and anytime."
    />
    <NineGridCards/>
    <FaqSection/>
    </main>
    
  );
}