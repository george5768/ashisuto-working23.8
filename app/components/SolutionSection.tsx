'use client';

import React from 'react';
import DocKITAFeatures from "./DocKitaFeatures";

export default function SolutionsSection() {
  return (
    <section className="bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <DocKITAFeatures />
      </div>
    </section>
  );
}