import SolutionPage from '../components/SolutionPage';
import { CircleAlert, FastForward, GlobeLock, ShieldCheck } from 'lucide-react';

export default function CyberSecurity() {
  return (
    <main>
      <SolutionPage
        title="Cyber Security – Secure Port Access"
        subtitle="Astonishing Convenience. Unmatched Security."
        description="Step into the future of remote connectivity with our proprietary Secure Port Access technology — delivering the perfect combination of impenetrable security and effortless convenience. Once you experience it, you’ll never want to connect any other way."
        imageUrl="/images/software-development.png"
        features={[
          {
            icon: <CircleAlert size={100} className="text-red-600" />,
            title: 'Problem Statement Faced by Customer',
            text: 'Traditional remote access requires opening ports on the target server — a direct invitation for cyberattacks. Every open port increases your exposure, making your systems visible and vulnerable to malicious actors.',
          },
          {
            icon: <GlobeLock size={100} className="text-orange-500" />,
            title: 'Secure Port Access',
            text: 'Our advanced Secure Port Access solution eliminates this risk entirely. By enabling remote connections without opening any ports, your infrastructure remains invisible to potential attackers — securing your systems by design.',
            list: [
              'Uncompromising Security - No open ports, no exposure. Our technology ensures remote access without public port disclosure, removing one of the most exploited vulnerabilities in cybersecurity.',
              'Exceptional Convenience - No global IP address required. Centrally manage multiple remote destinations with ease. Whether it’s one site or an entire network, setup is simple, streamlined, and fast.',
            ],
          },
          {
            icon: <FastForward size={100} className="text-orange-500" />,
            title: 'Key Benefits Include',
            text: '',
            list: [
              'Zero exposed ports = zero attack surface',
              'Centralized management of multiple remote endpoints',
              'No dependency on global IP addresses',
              'Simple, fast setup for immediate productivity',
            ],
          },
          {
            icon: <ShieldCheck size={100} className="text-orange-500" />,
            title: 'Secure. Simple. Smart.',
            text: 'Our Secure Port Access solution isn’t just secure — it’s secure by design. Experience worry-free remote access without compromising on speed, convenience, or control.',
            
          },
        ]}
      />
    </main>
  );
}