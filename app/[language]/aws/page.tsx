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
  Database,
  Lock,
  Workflow,
  ScanEye,
  KeyRound,
  ClipboardList,
  ArrowRight,
  CheckCircle2,
  Globe2,
} from 'lucide-react';
import CustomButton from '@/components/ui/custom-button';
import { Routes } from '@/app/enum/global';
import { useLanguageContext } from '@/app/context/LanguageContext';

const easeStandard: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeStandard } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

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
      { icon: BrainCircuit, service: 'Amazon SageMaker', capability: 'Predictive Model Training', description: 'Trains and serves the machine learning models behind our no-code data prediction and optimization engine.' },
      { icon: Database, service: 'Amazon RDS / Aurora', capability: 'Structured Data Warehousing', description: 'Reliable, queryable storage for the datasets that feed every forecast and optimization run.' },
      { icon: ScanEye, service: 'Amazon CloudTrail', capability: 'Full Data Traceability', description: 'Every prediction and data touchpoint is logged and auditable for compliance and quality control.' },
    ],
  },
  {
    icon: Workflow,
    title: 'AI Workflow Management System',
    route: Routes.DOC_KITA,
    mappings: [
      { icon: Database, service: 'Amazon S3', capability: 'Secure Document Storage', description: 'Every scanned form, signature, and record is stored redundantly across multiple facilities. Nothing is ever lost.' },
      { icon: Workflow, service: 'AWS Lambda & EC2', capability: 'Scalable Workflow Engine', description: 'Powers process automation so workflows keep running smoothly whether you have 10 or 10,000 users.' },
      { icon: KeyRound, service: 'Amazon Cognito', capability: 'Role-Based Access Control', description: 'Fine-grained authentication ensures every signatory and approver only sees what they are authorized to access.' },
    ],
  },
  {
    icon: Sparkles,
    title: 'AI Application Customization',
    route: Routes.AI_APPLICATION_CUSTOMIZE,
    mappings: [
      { icon: Cloud, service: 'Amazon Bedrock', capability: 'Custom AI Agents & Chatbots', description: 'Builds tailored generative AI logic and chat experiences around your specific business processes.' },
      { icon: Lock, service: 'AWS KMS', capability: 'End-to-End Encryption', description: 'Data is encrypted at rest and in transit, protecting every customized application and its data.' },
      { icon: ClipboardList, service: 'Amazon CloudFront', capability: 'Fast Global App Delivery', description: 'A global content delivery network keeps custom applications responsive for teams everywhere.' },
    ],
  },
];

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
  service,
  capability,
  description,
}: {
  icon: typeof Cloud;
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
        <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-sm">
          <Icon size={20} className="text-white" />
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
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-bold leading-tight">
              Why <span className="text-primary">AWS?</span>
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
            <div className="relative rounded-[2.5rem] p-[1.5px] bg-gradient-to-br from-orange-400 via-amber-400 to-orange-600 shadow-2xl">
              <div className="relative rounded-[2.4rem] bg-gradient-to-br from-orange-500 via-[#FF6600] to-amber-400 p-10 flex flex-col items-center gap-6 overflow-hidden">
                <div className="w-52 h-28 rounded-3xl bg-white flex items-center justify-center p-4 shadow-2xl">
                  <a
                    href="https://aws.amazon.com/what-is-cloud-computing"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Learn about AWS Cloud Computing"
                  >
                    <Image
                      src="https://d0.awsstatic.com/logos/powered-by-aws.png"
                      alt="Powered by AWS Cloud Computing"
                      width="180"
                      height="54"
                      className="h-auto w-[180px] object-contain"
                      priority
                    />
                  </a>
                </div>
                <p className="text-white text-center text-sm font-medium max-w-xs">
                  Powering our AI solutions with secure, scalable, AI-ready cloud infrastructure.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Why AWS grid ───────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-20 py-24">
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
      <section className="px-4 sm:px-6 lg:px-20 py-8 pb-24 bg-muted">
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

      {/* ── Trust / compliance strip ───────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-20 py-20">
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
      <section className="px-4 sm:px-6 lg:px-20 pb-24">
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
