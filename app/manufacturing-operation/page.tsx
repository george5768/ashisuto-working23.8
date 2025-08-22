import SolutionPage from '../components/SolutionPage';
import { CircleAlert, KeyRound, CircleFadingArrowUp, HandCoins } from 'lucide-react';
import MajorSolutionsBlock from './components/MajorSolutionsBlock';

export default function ManufacturingOperation() {
  return (
    <main>
      <SolutionPage
        title="Manufacturing Operation"
        subtitle="Leverage on Japanese Monotsukuri (物作り) know-hows"
        description="Operational efficiency is vital, but when success means embracing economic diversification. Our solutions are aligned with Industry 4.0 and ESG pillars, empowering businesses to thrive across diverse sectors while promoting sustainable growth"
        imageUrl="/images/shop-floor-1.jpg"
        features={[
          {
            icon: <CircleAlert size={100} className="text-red-600" />,
            title: 'Problem Statement Faced by Customer',
            text: 'Balancing operational efficiency with economic diversification poses a significant challenge for businesses. The need to optimize processes while adapting to diverse demands complicates strategic planning and resource allocation.',
          },
          {
            icon: <KeyRound size={100} className="text-orange-500" />,
            title: 'Harnessing Japanese Monotsukuri (物作り)',
            text: 'Innovative expertise in manufacturing to address manufacturing challenges.',
          },
          {
            icon: <CircleFadingArrowUp size={100} className="text-orange-500" />,
            title: 'Improve Operational Efficiency',
            text: 'By leveraging traditional Monotsukuri principles in modern processes.',
            
          },
          {
            icon: <HandCoins size={100} className="text-orange-500" />,
            title: 'Cost Effective Solution',
            text: 'Achieved through improving operational efficiency.',
          },
        ]}
      />

      <MajorSolutionsBlock/>
    </main>
  );
}