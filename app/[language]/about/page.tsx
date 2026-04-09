"use client"

import AboutUs from "@/app/components/AboutUs";
import AccoladesGrid from "@/app/components/Accolades";
import VisionMission from "@/app/components/VissionMission";
import { Timeline } from "@/app/components/Timeline";
import ContactCardForm from "@/app/components/ContactCardForm";

export default function About() {
  return (
    <main>
      <AboutUs />
      <VisionMission />
      <AccoladesGrid />
      <Timeline />
      <ContactCardForm />
    </main>
  );
}
