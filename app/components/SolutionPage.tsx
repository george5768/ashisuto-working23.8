'use client';

import Image from 'next/image';
import { ReactNode } from 'react';

interface Feature {
  icon: ReactNode;
  title: string;
  text: ReactNode;
  list?: string[];
}

interface SolutionPageProps {
  title: string;
  subtitle?: string;
  description: string;
  features: Feature[];
  imageUrl: string;
}

export default function SolutionPage({
  title,
  subtitle,
  description,
  features,
  imageUrl,
}: SolutionPageProps) {
  return (
    <section className="min-h-screen bg-background py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <div className="space-y-10">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">{title}</h1>
            {subtitle && <p className="text-muted-foreground text-lg">{subtitle}</p>}
            <p className="text-muted-foreground text-lg">{description}</p>
          </div>

          <div className="space-y-8">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-[50px] h-[50px] flex items-center justify-center">
                  {feature.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                  <div className="text-muted-foreground">{feature.text}</div>
                  {feature.list && (
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      {feature.list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="flex justify-center">
          <Image
            src={imageUrl}
            alt={`${title} illustration`}
            width={500}
            height={500}
            className="rounded-xl shadow-xl object-contain"
            loading='eager'
          />
        </div>
      </div>
    </section>
  );
}