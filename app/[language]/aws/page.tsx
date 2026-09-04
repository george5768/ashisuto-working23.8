'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import {
  Cloud,
  ShieldCheck,
  Gauge,
  Wallet,
  BrainCircuit,
  Sparkles,
  Workflow,
  ArrowRight,
  CheckCircle2,
  Globe2,
} from 'lucide-react';
import CustomButton from '@/components/ui/custom-button';
import { Routes } from '@/app/enum/global';
import { useLanguageContext } from '@/app/context/LanguageContext';
import { SageMakerIcon, RDSIcon, CloudTrailIcon, S3Icon, Ec2Icon, CognitoIcon, BedRockIcon, KMSIcon, CloudFrontIcon } from './aws-service-icons';

type ServiceIcon = React.ComponentType<{ size?: number; className?: string }>;

const easeStandard: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeStandard } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ── Hero stats panel ─────────────────────────────────────────────────
const HERO_STATS = [
  { icon: Globe2, value: '34+', label: 'Global regions & availability zones' },
  { icon: ShieldCheck, value: '100%', label: 'Enterprise-grade encryption by default' },
  { icon: Gauge, value: 'Elastic', label: 'Auto-scaling infrastructure on demand' },
  { icon: BrainCircuit, value: '200+', label: 'AI & cloud services ready to deploy' },
];

// ── Data ───────────────────────────────────────────────────────────
const WHY_AWS = [
  {
    icon: Globe2,
    title: 'Global Infrastructure',
    description:
      '34+ regions and 100+ availability zones worldwide, delivering low-latency performance to users wherever they are located.',
    featured: true,
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise-Grade Security',
    description:
      'Bank-level encryption and identity management protect every layer of your data and applications.',
  },
  {
    icon: Gauge,
    title: 'Elastic Scalability',
    description:
      'Automatically scale from a single department to an entire enterprise workload without re-architecting your system.',
  },
  {
    icon: Wallet,
    title: 'Cost Efficiency',
    description:
      'Pay-as-you-go pricing removes upfront infrastructure costs, so you only pay for the compute and storage you actually use.',
  },
  {
    icon: BrainCircuit,
    title: 'AI & Machine Learning Ready',
    description:
      'Native access to SageMaker and Bedrock brings production-grade AI prediction and automation directly into your workflows.',
  },
  {
    icon: Sparkles,
    title: 'Continuous Innovation',
    description:
      'Backed by 200+ evolving cloud services, ensuring our AI solutions keep improving without disrupting your daily operations.',
  },
];

const SERVICE_INTEGRATIONS = [
  {
    icon: BrainCircuit,
    title: 'AI Data Prediction & Optimization',
    route: Routes.AI_PREDICTION_OPTIMIZATION,
    mappings: [
      { icon: SageMakerIcon, solidIcon: true, service: 'Amazon SageMaker', capability: 'Predictive Model Training', description: 'Trains and serves the machine learning models behind our no-code data prediction and optimization engine.' },
      { icon: RDSIcon, solidIcon: true, service: 'Amazon RDS / Aurora', capability: 'Structured Data Warehousing', description: 'Reliable, queryable storage for the datasets that feed every forecast and optimization run.' },
      { icon: CloudTrailIcon, solidIcon: true, service: 'Amazon CloudTrail', capability: 'Full Data Traceability', description: 'Every prediction and data touchpoint is logged and auditable for compliance and quality control.' },
    ],
  },
  {
    icon: Workflow,
    title: 'AI Workflow Management System',
    route: Routes.DOC_KITA,
    mappings: [
      { icon: S3Icon, solidIcon: true, service: 'Amazon S3', capability: 'Secure Document Storage', description: 'Every scanned form, signature, and record is stored redundantly across multiple facilities. Nothing is ever lost.' },
      { icon: Ec2Icon, solidIcon: true, service: 'AWS Lambda & EC2', capability: 'Scalable Workflow Engine', description: 'Powers process automation so workflows keep running smoothly whether you have 10 or 10,000 users.' },
      { icon: CognitoIcon, solidIcon: true, service: 'Amazon Cognito', capability: 'Role-Based Access Control', description: 'Fine-grained authentication ensures every signatory and approver only sees what they are authorized to access.' },
    ],
  },
  {
    icon: Sparkles,
    title: 'AI Application Customization',
    route: Routes.AI_APPLICATION_CUSTOMIZE,
    mappings: [
      { icon: BedRockIcon, solidIcon: true, service: 'Amazon Bedrock', capability: 'Custom AI Agents & Chatbots', description: 'Builds tailored generative AI logic and chat experiences around your specific business processes.' },
      { icon: KMSIcon, solidIcon: true, service: 'AWS KMS', capability: 'End-to-End Encryption', description: 'Data is encrypted at rest and in transit, protecting every customized application and its data.' },
      { icon: CloudFrontIcon, solidIcon: true, service: 'Amazon CloudFront', capability: 'Fast Global App Delivery', description: 'A global content delivery network keeps custom applications responsive for teams everywhere.' },
    ],
  },
];

// const INDUSTRY_FOCUS = [
//   {
//     icon: Factory,
//     industry: 'Manufacturing & Industrial Operations',
//     focus: 'Production forecasting, quality visibility, approval workflows, and shop-floor digitization.',
//   },
//   {
//     icon: Landmark,
//     industry: 'Finance & Regulated Teams',
//     focus: 'Secure document handling, audit trails, controlled access, and AI-assisted operational reporting.',
//   },
// ];

// const CUSTOMER_USE_CASES = [
//   {
//     solution: 'AI Data Prediction & Optimization',
//     route: Routes.AI_PREDICTION_OPTIMIZATION,
//     scenarios: [
//       {
//         problem: 'Production planners were relying on manual spreadsheets for demand and material planning.',
//         action: 'We connected historical operational data to AWS-backed prediction models and dashboard views.',
//         outcome: 'Teams gained earlier risk visibility and faster planning cycles before production deadlines.',
//       },
//       {
//         problem: 'Management needed a clearer view of cost, inventory, and capacity trade-offs.',
//         action: 'We modelled optimization scenarios using secure cloud data storage and repeatable ML workflows.',
//         outcome: 'Decision makers could compare options consistently instead of rebuilding analysis each month.',
//       },
//     ],
//   },
//   {
//     solution: 'AI Workflow Management System',
//     route: Routes.DOC_KITA,
//     scenarios: [
//       {
//         problem: 'Paper forms and approval chains slowed down daily operations across departments.',
//         action: 'We digitized document intake, storage, approvals, and role-based access on AWS services.',
//         outcome: 'Records became searchable, traceable, and easier to audit from request to completion.',
//       },
//       {
//         problem: 'Teams needed stronger control over who could review, sign, and approve sensitive documents.',
//         action: 'We configured secure authentication and permission flows around each approval role.',
//         outcome: 'Approvers only accessed the records they were authorized to handle.',
//       },
//     ],
//   },
//   {
//     solution: 'AI Application Customization',
//     route: Routes.AI_APPLICATION_CUSTOMIZE,
//     scenarios: [
//       {
//         problem: 'Customers wanted AI assistants that understood their real process, not a generic chatbot.',
//         action: 'We designed Bedrock-powered agents around internal documents, FAQs, and operating rules.',
//         outcome: 'Users received faster answers while teams reduced repetitive support and admin tasks.',
//       },
//       {
//         problem: 'Existing systems needed AI features without replacing the full application stack.',
//         action: 'We added secure, modular AI services through AWS-hosted APIs and application components.',
//         outcome: 'Businesses could launch targeted AI features while preserving their current workflows.',
//       },
//     ],
//   },
// ];

const AWS_SUBSCRIPTION_SERVICES = [
  {
    icon: '/images/kiroicon.svg',
    title: 'AWS Kiro',
    description:
      'For teams adopting Kiro, we help configure access, onboard developers, and shape practical AI-assisted development workflows around your existing delivery process.',
    points: ['Subscription and workspace setup', 'Developer onboarding and workflow guidance', 'Use-case mapping for internal engineering teams'],
  },
  {
    icon: '/images/quick-logo.png',
    title: 'Amazon Quick',
    description:
      'For organizations that want subscription-based analytics, we help set up Quick dashboards, users, datasets, and reporting flows so business teams can move from raw data to useful insight.',
    points: ['Quick subscription guidance', 'Dashboard and dataset setup', 'Operational reporting for management teams'],
  },
];

// const CUSTOMER_REFERENCES = [
//   {
//     label: 'Manufacturing Client',
//     quote:
//       'Ashisuto helped us move from manual planning to clearer digital visibility across operational data and approvals.',
//   },
//   {
//     label: 'Regulated Operations Team',
//     quote:
//       'The AWS-backed workflow gives our users controlled access, traceability, and a simpler approval experience.',
//   },
//   {
//     label: 'AI Application Customer',
//     quote:
//       'We needed a practical AI feature around our own process. Ashisuto helped us deploy it without disrupting current systems.',
//   },
// ];

// ── Reusable card ─────────────────────────────────────────────────
function ReasonCard({
  icon: Icon,
  title,
  description,
  featured,
}: {
  icon: typeof Cloud;
  title: string;
  description: string;
  featured?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      className={`group relative flex flex-col p-8 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 ${
        featured
          ? 'bg-gradient-to-br from-orange-500 via-orange-400 to-amber-500 ring-1 ring-orange-300/60 hover:shadow-orange-300/50'
          : 'bg-gradient-to-br from-amber-50 to-orange-50 border border-orange-100 hover:shadow-orange-100/70 hover:border-orange-200'
      }`}
    >
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${
          featured ? 'bg-white/20' : 'bg-white shadow-sm'
        }`}
      >
        <Icon size={28} className={featured ? 'text-white' : 'text-orange-500'} />
      </div>
      <h3 className={`text-lg font-bold mb-2 ${featured ? 'text-white' : 'text-foreground'}`}>{title}</h3>
      <p className={`text-sm leading-relaxed ${featured ? 'text-white/90' : 'text-muted-foreground'}`}>
        {description}
      </p>
    </motion.div>
  );
}

function MappingCard({
  icon: Icon,
  solidIcon,
  service,
  capability,
  description,
}: {
  icon: ServiceIcon;
  solidIcon?: boolean;
  service: string;
  capability: string;
  description: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      className="flex flex-col gap-4 p-6 rounded-2xl bg-white border border-orange-100 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all duration-300"
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center shadow-sm ${
            solidIcon ? 'overflow-hidden' : 'bg-gradient-to-br from-orange-500 to-amber-500'
          }`}
        >
          {solidIcon ? <Icon size={44} /> : <Icon size={20} className="text-white" />}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">{service}</p>
          <p className="text-sm font-bold text-foreground">{capability}</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}

// function UseCaseCard({
//   problem,
//   action,
//   outcome,
// }: {
//   problem: string;
//   action: string;
//   outcome: string;
// }) {
//   return (
//     <motion.div
//       variants={fadeUp}
//       className="rounded-2xl bg-white border border-orange-100 p-5 shadow-sm h-full"
//     >
//       <div className="space-y-4 text-sm leading-relaxed">
//         <p><span className="font-bold text-foreground">Problem:</span> <span className="text-muted-foreground">{problem}</span></p>
//         <p><span className="font-bold text-foreground">What we did:</span> <span className="text-muted-foreground">{action}</span></p>
//         <p><span className="font-bold text-foreground">Outcome:</span> <span className="text-muted-foreground">{outcome}</span></p>
//       </div>
//     </motion.div>
//   );
// }

export default function AwsPage() {
  const { getCurrentLang } = useLanguageContext();

  return (
    <main className="bg-background text-foreground overflow-hidden">
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative px-4 sm:px-6 lg:px-20 pt-16 pb-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-orange-100/60 blur-[130px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full bg-amber-50/60 blur-[130px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-6">
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-bold leading-tight flex items-center gap-3 flex-wrap"
            >
              Why{' '}
              <a
                href="https://aws.amazon.com/what-is-cloud-computing"
                target="_blank"
                rel="noreferrer"
                aria-label="Learn about AWS Cloud Computing"
                className="inline-flex items-center"
              >
                <Image
                  src="/images/aws-new.png"
                  alt="AWS"
                  width="180"
                  height="54"
                  className="h-[0.85em] w-auto object-contain align-middle"
                  priority
                />
              </a>
              ?
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg text-muted-foreground font-medium">
              The cloud foundation behind our AI solutions&apos; reliability, security, and performance.
            </motion.p>

            <motion.p variants={fadeUp} className="text-base text-muted-foreground max-w-xl">
              As an Amazon Web Services partner, Ashisuto builds and runs our AI Data Prediction &amp;
              Optimization, AI Workflow Management, and AI Application Customization solutions on the
              world&apos;s most trusted cloud platform, giving every customer enterprise-grade
              reliability, security, and AI capability without the enterprise-grade complexity.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 pt-2">
              <CustomButton href={`/${getCurrentLang().toLowerCase()}${Routes.CONTACT}`}>
                Talk To Us <ArrowRight size={18} />
              </CustomButton>
              <CustomButton
                href={`/${getCurrentLang().toLowerCase()}${Routes.AI_PREDICTION_OPTIMIZATION}`}
                className="bg-none bg-transparent border border-orange-300 text-orange-600 hover:bg-orange-50 shadow-none"
              >
                Explore Our Solutions
              </CustomButton>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: easeStandard }}
            className="relative"
          >
            <div className="rounded-3xl bg-white/80 backdrop-blur border border-orange-100 shadow-xl p-8 space-y-7">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">Amazon Web Services Partner</p>
                <ShieldCheck size={22} className="text-orange-500 shrink-0" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                {HERO_STATS.map((stat) => (
                  <motion.div key={stat.label} whileHover={{ y: -4 }} className="flex flex-col gap-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-sm">
                      <stat.icon size={18} className="text-white" />
                    </div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground leading-snug">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              <div className="pt-2 border-t border-orange-100 flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">Powered by AWS Cloud Computing</span>
                <ArrowRight size={16} className="text-orange-500" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Industry focus ─────────────────────────────────────── */}
      {/* <section className="px-4 sm:px-6 lg:px-20 py-20 bg-muted">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger}
          className="max-w-7xl mx-auto"
        >
          <motion.div variants={fadeUp} className="max-w-3xl mb-10 space-y-4">
            <p className="text-orange-500 font-bold uppercase tracking-[0.2em] text-sm">Industry Focus</p>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Starting where AWS-backed AI creates the clearest operational value
            </h2>
            <p className="text-muted-foreground">
              Our strongest wedge is practical AI for manufacturing, industrial operations, and regulated teams where security, traceability, and measurable process improvement matter most. From there, the same AWS foundation can support healthcare, public sector, and broader enterprise use cases.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INDUSTRY_FOCUS.map((item) => (
              <motion.div
                key={item.industry}
                variants={fadeUp}
                className="rounded-2xl bg-white border border-orange-100 p-6 shadow-sm flex gap-4"
              >
                <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                  <item.icon size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{item.industry}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.focus}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section> */}

      {/* ── Why AWS grid ───────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-20 py-24 bg-gradient-to-b from-white via-orange-50/40 to-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="max-w-7xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <p className="text-orange-500 font-bold uppercase tracking-[0.2em] text-sm">Why AWS</p>
            <h2 className="text-3xl sm:text-4xl font-bold">
              A cloud partner built for <span className="text-primary">enterprise trust</span>
            </h2>
            <p className="text-muted-foreground">
              AWS gives us the flexibility to focus on solving your business problems instead of managing
              servers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_AWS.map((reason) => (
              <ReasonCard key={reason.title} {...reason} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── AWS -> Services mapping ────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-20 py-8 pb-24 bg-gradient-to-tr from-muted via-white to-muted">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="max-w-7xl mx-auto pt-16"
        >
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <p className="text-orange-500 font-bold uppercase tracking-[0.2em] text-sm">Under The Hood</p>
            <h2 className="text-3xl sm:text-4xl font-bold">
              How AWS powers <span className="text-primary">our AI solutions</span>
            </h2>
            <p className="text-muted-foreground">
              Each of our solutions is backed by purpose-built AWS services. What you get is a
              platform that is fast, secure, and ready to scale with your business.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {SERVICE_INTEGRATIONS.map((group) => (
              <div key={group.title} className="flex flex-col gap-4">
                <Link
                  href={`/${getCurrentLang().toLowerCase()}${group.route}`}
                  className="flex items-center gap-3 px-1 group/link"
                >
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-sm">
                    <group.icon size={18} className="text-white" />
                  </div>
                  <h3 className="text-base font-bold text-foreground group-hover/link:text-orange-500 transition-colors">
                    {group.title}
                  </h3>
                </Link>
                {group.mappings.map((item) => (
                  <MappingCard key={item.service} {...item} />
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Customer use cases ────────────────────────────────── */}
      {/* <section className="px-4 sm:px-6 lg:px-20 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="max-w-7xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <p className="text-orange-500 font-bold uppercase tracking-[0.2em] text-sm">Customer Use Cases</p>
            <h2 className="text-3xl sm:text-4xl font-bold">
              From business problem to AWS-powered outcome
            </h2>
            <p className="text-muted-foreground">
              These scenarios show how Ashisuto applies AWS services to practical customer needs across prediction, workflow, and custom AI applications.
            </p>
          </motion.div>

          <div className="space-y-10">
            {CUSTOMER_USE_CASES.map((group) => (
              <motion.div key={group.solution} variants={fadeUp} className="space-y-5">
                <Link
                  href={`/${getCurrentLang().toLowerCase()}${group.route}`}
                  className="inline-flex items-center gap-3 group/link"
                >
                  <h3 className="text-xl font-bold group-hover/link:text-orange-500 transition-colors">
                    {group.solution}
                  </h3>
                  <ArrowRight size={18} className="text-orange-500" />
                </Link>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {group.scenarios.map((scenario) => (
                    <UseCaseCard key={scenario.problem} {...scenario} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section> */}

      {/* ── AWS subscription services ─────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-20 py-24 bg-gradient-to-bl from-amber-50 via-orange-50/40 to-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="max-w-7xl mx-auto"
        >
          <motion.div variants={fadeUp} className="max-w-3xl mb-12 space-y-4">
            <p className="text-orange-500 font-bold uppercase tracking-[0.2em] text-sm">AWS Subscriptions</p>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Support for teams subscribing to AWS Kiro and Quick
            </h2>
            <p className="text-muted-foreground">
              Beyond our core AI solutions, Ashisuto helps customers adopt selected AWS subscription services with setup, onboarding, and practical implementation support.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {AWS_SUBSCRIPTION_SERVICES.map((service) => (
              <motion.div
                key={service.title}
                variants={fadeUp}
                className="rounded-2xl bg-white border border-orange-100 p-7 shadow-sm flex flex-col gap-5"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 shrink-0 rounded-2xl bg-white border border-orange-100 p-2 shadow-sm flex items-center justify-center">
                    <Image
                      src={service.icon}
                      alt={`${service.title} logo`}
                      width={64}
                      height={64}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                <ul className="space-y-3">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 size={17} className="text-orange-500 shrink-0 mt-0.5" />
                      {point}
                    </li>
                  ))}
                </ul>
                <CustomButton href={`/${getCurrentLang().toLowerCase()}${Routes.CONTACT}`} className="w-fit mt-auto">
                  Ask About This Service <ArrowRight size={18} />
                </CustomButton>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Customer references ───────────────────────────────── */}
      {/* <section className="px-4 sm:px-6 lg:px-20 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="max-w-7xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <p className="text-orange-500 font-bold uppercase tracking-[0.2em] text-sm">Customer References</p>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Credibility without exposing sensitive customer names
            </h2>
            <p className="text-muted-foreground">
              Where named logos are not available for public use, we present anonymized customer references by industry and business need.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CUSTOMER_REFERENCES.map((reference) => (
              <motion.div
                key={reference.label}
                variants={fadeUp}
                className="rounded-2xl bg-white border border-orange-100 p-6 shadow-sm flex flex-col gap-5"
              >
                <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center">
                  <Quote size={20} className="text-orange-500" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">&ldquo;{reference.quote}&rdquo;</p>
                <p className="text-sm font-bold text-foreground mt-auto">{reference.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section> */}

      {/* ── Trust / compliance strip ───────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-20 py-20 bg-gradient-to-t from-orange-50/50 via-white to-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={fadeUp} className="flex justify-center">
            <Image
              src="/images/awscert1.png"
              alt="AWS Partner Certification"
              width={380}
              height={380}
              className="object-contain drop-shadow-xl"
            />
          </motion.div>
          <motion.div variants={fadeUp} className="space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold">An AWS Partner you can trust</h2>
            <p className="text-muted-foreground">
              Ashisuto is a recognized Amazon Web Services Partner, demonstrating our commitment to
              delivering reliable, secure, and scalable cloud solutions on AWS infrastructure.
            </p>
            <ul className="space-y-3">
              {[
                'AWS technical expertise across our engineering team',
                'Architected in line with the AWS Well-Architected Framework',
                'Data handling practices aligned with PDPA requirements',
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 size={18} className="text-orange-500 shrink-0 mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </section>

      {/* ── CTA banner ─────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-20 pb-24 bg-gradient-to-b from-white to-orange-50/30">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: easeStandard }}
          className="max-w-6xl mx-auto rounded-3xl bg-gradient-to-br from-orange-500 via-[#FF6600] to-amber-400 shadow-2xl px-8 py-14 text-center space-y-6"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Ready to run your business on AWS-powered AI solutions?
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto">
            Let&apos;s discuss how a secure, scalable AWS foundation can accelerate your digital
            transformation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <CustomButton
              href={`/${getCurrentLang().toLowerCase()}${Routes.CONTACT}`}
              className="bg-white bg-none text-orange-600 hover:bg-orange-50 shadow-lg"
            >
              Book A Consultation <ArrowRight size={18} />
            </CustomButton>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
