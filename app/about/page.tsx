"use client"

import AboutUs from "../components/AboutUs";
import AccoladesGrid from "../components/Accolades";
import VisionMission from "../components/VissionMission";
import { Timeline } from "../components/Timeline";
import ContactCardForm from "../components/ContactCardForm";



export default function About () {
  return (
    <main>
      <AboutUs/>
      <VisionMission/>
      <AccoladesGrid/>
      <Timeline/>
      <ContactCardForm/>
    </main>
  );
}