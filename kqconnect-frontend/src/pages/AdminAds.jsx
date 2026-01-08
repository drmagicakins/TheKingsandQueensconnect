import { useEffect, useState } from "react";

export default function AdminAds() {
  const [ads, setAds] = useState([]);
  const token = localStorage.getItem("access");

  useEffect(() => {
    fetch("http://localhost:8000/api/ads/admin/pending/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setAds(data));
  }, [token]);

  const approveAd = (id) => {
    fetch(`http://localhost:8000/api/ads/admin/approve/${id}/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      setAds(ads.filter((ad) => ad.id !== id));
    });
  };

  const rejectAd = (id) => {
    const reason = prompt("Why is this ad rejected?");
    if (!reason) return;

    fetch(`http://localhost:8000/api/ads/admin/reject/${id}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ reason }),
    }).then(() => {
      setAds(ads.filter((ad) => ad.id !== id));
    });
  };

  return (
    <div>
      <h2>Pending Ads</h2>

      {ads.map((ad) => (
        <div
          key={ad.id}
          style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}
        >
          <h4>{ad.title}</h4>
          <p>User: {ad.user}</p>
          <p>₦{ad.price}</p>

          <button onClick={() => approveAd(ad.id)}>Approve</button>
          <button onClick={() => rejectAd(ad.id)} style={{ marginLeft: 10 }}>
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}
