import SolutionPage from '../components/SolutionPage';
import Image from 'next/image';
import { CircleAlert, HandCoins, Cable, ShieldCheck } from 'lucide-react';

export default function DigitizeRecordsPage() {
  return (
    <main>
      <SolutionPage
        title="Digitize Past Records & Documents"
        subtitle="Quickly convert hardcopy documents into a searchable digital archive"
        description="Centralize your document repository, reduce storage costs, and enable efficient data access with our digitization solution."
        imageUrl="/images/storage_room.jpeg"
        features={[
          {
            icon: <CircleAlert size={100} className="text-red-600" />,
            title: 'Problem Statement Faced by Customer',
            text: 'Large volumes of paper-based records were consuming physical storage and required manual retrieval.',
            list: [
              'High rental costs for archive storage',
              'Delayed access to time-sensitive documents',
              'Risk of physical degradation over time'
            ],
          },
          {
            icon: <Cable size={100} className="text-orange-500" />,
            title: 'End-to-End Document Management',
            text: 'We implemented a complete digitization pipeline with OCR and metadata tagging.',
            list: [
              'Batch scanning and indexing',
              'Cloud-based search and retrieval',
              'Secure document lifecycle policies'
            ],
          },
          {
            icon: <HandCoins size={100} className="text-orange-500" />,
            title: 'Cost Saving',
            text: 'By going digital, the customer reduced ongoing paper form expenses and manual admin hours.',
            
          },
          {
            icon: <ShieldCheck size={100} className="text-orange-500" />,
            title: 'Risk Mitigation',
            text: 'Digital records are encrypted, backed up, and access-controlled to meet regulatory standards.',
          },
        ]}
      />

      {/* Optional: Extra visual below */}
      <Image
        src="/images/digitization_workflow.png"
        alt="Digitization Workflow"
        width={800}
        height={800}
        className="mx-auto py-10 mb-20"
      />
    </main>
  );
}