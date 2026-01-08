import axios from "axios";

const API = "http://127.0.0.1:8000/api/ads/";

export const createAd = (data, token) =>
  axios.post(`${API}create/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const uploadPaymentProof = (adId, file, token) => {
  const formData = new FormData();
  formData.append("payment_proof", file);

  return axios.post(`${API}${adId}/upload-proof/`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const fetchMyAds = (token) =>
  axios.get(`${API}my-ads/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
// export const fetchApprovedAds = () => axios.get(`${API}live/`);

export const payWithCredits = (adId, token) =>
  axios.post(
    `${API}pay-with-credits/${adId}/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

