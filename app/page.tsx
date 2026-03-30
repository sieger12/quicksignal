"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Hero from "./components/Hero";
import MarketOverview from "./components/MarketOverview";
import LatestBriefs from "./components/LatestBriefs";
import SectorStrip from "./components/SectorStrip";
import UpcomingEvents from "./components/UpcomingEvents";
import { generateBrief } from "./actions/generate";

const LOADING_STEPS = [
  "Scanning funding rates...",
  "Analyzing whale flows...",
  "Reading on-chain data...",
  "Processing macro signals...",
  "Writing your brief...",
];

export default function HomePage() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isGenerating) {
      setLoadingStep(0);
      intervalRef.current = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % LOADING_STEPS.length);
      }, 1600);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isGenerating]);

  const handleGenerate = async (text: string) => {
    const t = (text || topic).trim();
    if (!t || isGenerating) return;
    setIsGenerating(true);
    try {
      const { slug } = await generateBrief(t);
      router.push(`/research/${slug}`);
    } catch (err: any) {
      alert(err?.message || "Failed to generate brief.");
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
        loadingStep={LOADING_STEPS[loadingStep]}
        onGenerate={handleGenerate}
      />
      <MarketOverview />
      <LatestBriefs />
      <SectorStrip />
      <UpcomingEvents />
    </div>
  );
}
