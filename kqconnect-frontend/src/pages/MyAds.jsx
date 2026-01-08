import { useEffect, useState } from "react";
import { fetchMyAds } from "../services/adsService";

export default function MyAds() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchMyAds(token).then((res) => setAds(res.data));
  }, []);

  return (
    <div className="max-w-5xl p-6 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">My Adverts</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>Title</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Created</th>
          </tr>
        </thead>

        <tbody>
          {ads.map((ad) => (
            <tr key={ad.id} className="text-center border-t">
              <td>{ad.title}</td>
              <td>₦{ad.price}</td>
              <td>
                <span className="px-3 py-1 bg-blue-100 rounded">
                  {ad.status}
                </span>
              </td>
              <td>{new Date(ad.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
