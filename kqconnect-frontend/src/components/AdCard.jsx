import { payWithCredits } from "../services/ads";

function AdCard({ ad, token }) {
  const handlePay = async () => {
    try {
      await payWithCredits(ad.id, token);
      alert("Ad paid successfully 🎉");
    } catch (err) {
      alert(err.response?.data?.error || "Payment failed");
    }
  };

  return (
    <div className="p-4 border rounded">
      <h3>{ad.title}</h3>
      <p>Price: {ad.price} credits</p>

      {!ad.is_paid && (
        <button
          onClick={handlePay}
          className="px-4 py-2 text-white bg-green-600 rounded"
        >
          Pay with Credits
        </button>
      )}
    </div>
  );
}

export default AdCard;
