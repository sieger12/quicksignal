export const dynamic = "force-dynamic";

import HomeClient from "./components/HomeClient";
import MarketOverview from "./components/MarketOverview";
import LatestBriefs from "./components/LatestBriefs";
import SectorStrip from "./components/SectorStrip";
import UpcomingEvents from "./components/UpcomingEvents";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col gap-16">
      <HomeClient />
      <MarketOverview />
      <LatestBriefs />
      <SectorStrip />
      <UpcomingEvents />
    </div>
  );
}
