'use client';

import React from 'react';
import DocKITAFeatures from "./DocKitaFeatures";

export default function SolutionsSection() {
  return (
    <section className="relative bg-gradient-to-b from-slate-50/80 via-white to-white overflow-hidden">
      {/* Subtle dot-grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.28]"
        style={{
          backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
      {/* Warm glow top-right */}
      <div className="absolute -top-32 right-0 w-[520px] h-[520px] rounded-full bg-orange-100/40 blur-[100px] pointer-events-none" />
      <DocKITAFeatures />
    </section>
  );
}