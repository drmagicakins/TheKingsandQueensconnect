import AdCard from "../components/AdCard";
import { useEffect, useState } from "react";
import AdsList from "./AdsList";


export default function AdsList({ ads = [], authToken }) {
  if (!ads.length) {
    return <p className="text-gray-500">No ads available</p>;
  }

  return (
    <div className="space-y-4">
      {ads.map((ad) => (
        <AdCard key={ad.id} ad={ad} token={authToken} />
      ))}
    </div>
  );
}

export default function AdsPage() {
  const token = localStorage.getItem("access");
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/ads/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setAds(data));
  }, [token]);

  return <AdsList ads={ads} authToken={token} />;
}
