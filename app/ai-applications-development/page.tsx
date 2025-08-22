import SolutionPage from '../components/SolutionPage';
import { CircleAlert, Scaling, Route, Bot } from 'lucide-react';

export default function AiAgentDevelopment() {
  return (
    <main>
      <SolutionPage
        title="Ai Applications Development"
        subtitle="Turn Your Vision into an Intelligent Reality"
        description="We design and build custom AI agents that work seamlessly within your business ecosystem — from answering customer inquiries to streamlining operations, generating content, and making intelligent decisions in real time."
        imageUrl="/images/ai-agent.png"
        features={[
          {
            icon: <CircleAlert size={100} className="text-red-600" />,
            title: 'Problem Statement Faced by Customer',
            text: 'Achieving an efficient operation is difficult when current systems are not designed to cater to a diversified economy of businesses.',
          },
          {
            icon: <Scaling size={100} className="text-orange-500" />,
            title: 'Automate. Personalize. Scale.',
            text: 'Benefit you will gain from our AI Agent Development Services :',
            list: [
              'Automate Complex Tasks – Free your team from repetitive processes and let AI handle them with precision',
              'Boost Productivity & Reduce Costs – Work smarter with an always-on digital assistant that never sleeps',
              'Deliver Personalized Experiences – Engage customers with tailored responses across chat, email, and social media',
              'Integrate Seamlessly – Connect AI agents to your CRM, ERP, social media, and workflow systems',
              'Gain Actionable Insights – Leverage AI’s predictive analytics to make data-driven decisions faster',
              'Scale Without Limits – Expand capabilities instantly without hiring additional manpower',
            ],
          },
          {
            icon: <Route size={100} className="text-orange-500" />,
            title: 'From Concept to Deployment',
            text: 'Whether you need a customer service chatbot, human resource services, a property listing assistant, an insurance advisor, or a multi-platform social media responder and other, we create AI agents designed to match your unique needs and industry standards.',
            
          },
          {
            icon: <Bot size={100} className="text-orange-500" />,
            title: 'The Future Works for You.',
            text: 'Let our AI agents handle the work so your people can focus on innovation and growth.',
          },
        ]}
      />
    </main>
  );
}