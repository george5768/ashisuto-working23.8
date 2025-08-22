'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const businessProblems = [
  {
    question: 'Problems persist after ERP implementation',
    answer:
      'The usage of standard ERP systems do not resolve original problems that exist on the shop-floor because the majority of ERP systems are not designed to be used as shop-floor solutions. Thus, problems on the shop-floor remain unattended by standard ERP systems.',
  },
  {
    question: 'Manual process workflows',
    answer:
      'Workflows dependent on Microsoft 365 especially Excel or hardcopy mediums causes poor and tedious record retentions and retrievals. Workflow is disrupted without the approval of superiors in real-time. Combined with the inability to easily determine the real-time status of active and pending tasks.',
  },
  {
    question: 'New system adoption',
    answer:
      'The introduction of a new digitalized workflow creates downtime as it requires employees to become familiarized with the new digitalized process workflow.  Additionally, they are prone to a period of high semantic or human errors due to unfamiliarity with the new system resulting in disruptions and delays during implementation.',
  },
  {
    question: 'Data scattered in multiple places',
    answer:
      'Retrieval of past records can be especially tedious without a standardized medium and storage location which consolidates data across physical and digital storage spaces.  This prevents disorganized and time consuming data retrieval processes which can delay data analysis leading to a loss of important insights and revenue.',
  },
  {
    question: 'Multiple tools used for data recording',
    answer:
      'Using MS Word, MS Excel, PDF, hardcopy forms for data recording concurrently and storing them in different locations results in difficulty with data retention, retrieval and analysis.',
  },
  {
    question: 'Expensive custom process workflows',
    answer:
      'Customizing existing ERP systems to meet the your unique process workflow can become costly.  Process workflows such as the Continuous Improvement or Kaizen activities often incur custom charges by ERP vendors.',
  },
];

const whyDocKita = [
  {
    question: 'A flexible solution to resolve your pain points',
    answer:
      'Highly customizable features adapt to resolve customer specific needs and unique pain points.',
  },
  {
    question: 'Fully digitized process and signature workflow',
    answer:
      'Fully eliminate Microsoft 365 especially Excel or hardcopy from the entire workflow and built according to customer requirements with multi-level signature approval features ensuring smooth and transparent process flows.',
      },
  {
    question: 'Zero end-user adoption time',
    answer:
      'Retain original form templates as the User Interface (data entry page) to shorten end user adoption time to the new digitized system.  Drastically reducing familiarization and minimizing the need for additional training.',
  },
  {
    question: 'Data visualization and traceability',
    answer:
      'Retain original form templates as the User Interface (data entry page) to shorten end user adoption time to the new digitized system.  Drastically reducing familiarization and minimizing the need for additional training.',
  },
  
  {
    question: 'Data & Communication',
    answer:
      'Functions as a single platform that can be integrated to handle the entire system. Thus, work efficiency can be significantly improved.',
  },
  {
    question: 'A cost effective custom solution',
    answer:
      'Cost effectiveness achieved by retaining original form templates as the User Interface (data entry page).  Quickly deployed, without the need for programming knowledge.  The system allows easy updates to support Continuous Improvement and Kanban Processes.',
  },
];

export default function FaqSection() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/faq.jpg')" }} // Replace with your background image
    >
      {/* White overlay */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />

      {/* FAQ Content */}
      <div className="relative z-10 max-w-7xl mx-auto py-24 px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Business Problems */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center md:text-left">
              Common Problem Statements
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {businessProblems.map((item, idx) => (
                <AccordionItem key={idx} value={`bp-${idx}`}>
                  <AccordionTrigger className="text-lg font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Why docKITA */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center md:text-left text-primary">
              How DocKITA® Helps
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {whyDocKita.map((item, idx) => (
                <AccordionItem key={idx} value={`why-${idx}`}>
                  <AccordionTrigger className="text-lg font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}