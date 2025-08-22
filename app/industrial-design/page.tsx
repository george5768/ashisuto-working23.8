import SolutionPage from '../components/SolutionPage';
import { CircleAlert, Eye } from 'lucide-react';

export default function IndustrialDesign() {
  return (
    <main>
      <SolutionPage
        title="Industrial Design & UI/UX Design"
        subtitle="Converge your concept to creative reality"
        description=""
        imageUrl="/images/UIUX-design.png"
        features={[
          {
            icon: <CircleAlert size={100} className="text-red-600" />,
            title: 'Problem Statement Faced by Customer',
            text: 'Customers struggle to create impressive designs for their products that catch the end users eyes and providing a good user experience.',
          },
          {
            icon: <Eye size={100} className="text-orange-500" />,
            title: 'Concept Convergence',
            text: 'Our Concept Convergence converges your idea into an impressive and sellable design through Industrial Design and UI/UX design. Industrial Design or Product Design focus on designing physical products for products, devices, objects, and services used by millions of people around the world every day. UI/UX Design focus on designing Graphic User Interface of applications software or mobile applications with the consideration of User Experiences (UX).',
          },
        ]}
      />
    </main>
  );
}