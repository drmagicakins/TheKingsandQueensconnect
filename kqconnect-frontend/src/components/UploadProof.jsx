import { uploadPaymentProof } from "../services/adsService";

export default function UploadProof({ adId }) {
  const handleUpload = async (e) => {
    const token = localStorage.getItem("token");
    await uploadPaymentProof(adId, e.target.files[0], token);
    alert("Proof uploaded. Await admin approval.");
  };

  return <input type="file" onChange={handleUpload} />;
}
