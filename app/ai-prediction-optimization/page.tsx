import SolutionPage from '../components/SolutionPage';
import Image from 'next/image';
import { CircleAlert, HandCoins, Brain, ClockFading } from 'lucide-react';

export default function AiPrediction() {
  return (
    <main>
      <SolutionPage
        title="AI Data Prediction & Optimization"
        subtitle="Versatile for Multi-Purpose AI Applications"
        description=""
        imageUrl="/images/ai_prediction2.jpg"
        features={[
          {
            icon: <CircleAlert size={100} className="text-red-600" />,
            title: 'Problem Statement Faced by Customer',
            text: 'Traditional or manual data analysis is time consuming and prone to human errors resulting in inaccuracies and presents challenges to leverage on real-time data analysis',
          },
          {
            icon: <Brain size={100} className="text-orange-500" />,
            title: 'Leverage on AI to predict the future',
            text: 'Automated AI is a scientific method to analyze, optimize and predict data in short time frames with accuracy and cost effectiveness. With the following use cases:',
            list: [
              'Raw material price prediction',
              'Warehouse / Store optimization',
              'Sales funnel close rate prediction',
              'Turnover prediction',
              'Unique problem statements',
              'And more...',
            ],
          },
          {
            icon: <HandCoins size={100} className="text-orange-500" />,
            title: 'Cost Saving',
            text: '16 times of cost savings achieved.',
            
          },
          {
            icon: <ClockFading size={100} className="text-orange-500" />,
            title: 'Faster Deployment',
            text: '8 times quicker to deploy that other solutions.',
          },
        ]}
      />

      {/* Optional: Extra visual below */}
      <Image
        src="/images/ai_prediction.jpg"
        alt="ai prediction2"
        width={800}
        height={800}
        className="mx-auto mb-40 rounded-xl shadow-xl object-contain"
      />
    </main>
  );
}