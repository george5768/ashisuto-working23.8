import SolutionPage from '../components/SolutionPage';
import { CircleAlert, HandCoins, Workflow, HeartHandshake } from 'lucide-react';
import MajorSolutionsBlock from './components/MajorSolutionsBlock';

export default function RoboticsIot() {
  return (
    <main>
      <SolutionPage
        title="Robotic System Development"
        subtitle="Building Intelligent, Connected Solutions for the Future"
        description="We design and deliver cutting-edge Robotics and IoT (Internet of Things) systems that bring automation, intelligence, and connectivity to your operations. Our solutions integrate advanced robotics with smart IoT sensors and AI-driven analytics to help businesses achieve higher efficiency, precision, and productivity."
        imageUrl="/images/robotic-systems.png"
        features={[
          {
            icon: <CircleAlert size={100} className="text-red-600" />,
            title: 'Problem Statement Faced by Customer',
            text: 'Robotic systems and co-bots work best when they are integrated onto the same network and capturing real-time data consolidated into a single platform.',
          },
          {
            icon: <HeartHandshake size={100} className="text-orange-500" />,
            title: 'Co-created Solution',
            text: 'From concept to deployment, we provide end-to-end development services, ensuring your robotics and IoT systems are tailored to your specific industry needs — whether it’s manufacturing, logistics, healthcare, agriculture, or smart cities.',
          },
          {
            icon: <HandCoins size={100} className="text-orange-500" />,
            title: 'Cost Saving',
            text: 'Lower operation costs, experience higher productivity and a fully connected ecosystem that adapts and grows with your business.',
            
          },
          {
            icon: <Workflow size={100} className="text-orange-500" />,
            title: 'Innovate. Automate. Connect.',
            text: 'Partner with us to turn your robotics and IoT vision into a reality that transforms the way you work.',
          },
        ]}
      />
      <MajorSolutionsBlock/>
    </main>
  );
}