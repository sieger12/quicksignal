"use client";

import { useState } from "react";
import Hero from "./components/Hero";
import MarketOverview from "./components/MarketOverview";
import LatestBriefs from "./components/LatestBriefs";
import SectorStrip from "./components/SectorStrip";
import UpcomingEvents from "./components/UpcomingEvents";

export default function HomePage() {
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (text: string) => {
    const t = text || topic;
    if (!t.trim() || isGenerating) return;
    setIsGenerating(true);
    try {
      // TODO: wire up generate server action
      console.log("generate:", t);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col gap-16">
      <Hero
        topic={topic}
        setTopic={setTopic}
        isGenerating={isGenerating}
        onGenerate={handleGenerate}
      />
      <MarketOverview />
      <LatestBriefs />
      <SectorStrip />
      <UpcomingEvents />
    </div>
  );
}
