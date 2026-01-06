// src/pages/Home.jsx
import OnlineBadge from "../components/OnlineBadge";
import SmartMarquee from "../components/SmartMarquee";
import BirthdaySpotlight from "../community/BirthdaySpotlight";
import AdList from "../ads/AdList";

export default function Home({ marqueeItems }) {
  return (
    <div className="space-y-6">
      <SmartMarquee items={marqueeItems} />

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          The Kings & Queens Connect
        </h1>
        <OnlineBadge />
      </div>

      <BirthdaySpotlight />
      <AdList />
    </div>
  );
}
