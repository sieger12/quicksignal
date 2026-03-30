export type Brief = {
  id: string;
  topic: string;
  slug: string;
  status: "processing" | "done" | "failed";
  tone: "bullish" | "neutral" | "bearish" | null;
  category: string | null;
  summary: string | null;
  funding_rate: string | null;
  open_interest: string | null;
  exchange_flow: string | null;
  whale_activity: string | null;
  macro: string | null;
  final_take: string | null;
  created_at: string;
};

export type Sector = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  change_24h: number | null;
  ai_summary: string | null;
  updated_at: string;
};

export type MarketOverview = {
  btc_dominance: number | null;
  market_mood: "risk-on" | "risk-off" | "neutral";
  sector_rotation: string | null;
  macro_tone: string | null;
  updated_at: string;
};
