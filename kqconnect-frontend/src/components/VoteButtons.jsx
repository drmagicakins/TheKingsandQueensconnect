import axios from "axios";
import { useState } from "react";

export default function VoteButtons({ type, id, initialScore }) {
  const [score, setScore] = useState(initialScore);
  const token = localStorage.getItem("access");

  const vote = async (value) => {
    if (!token) {
      alert("Login required to vote");
      return;
    }

    const res = await axios.post(
      `/api/discussions/${type}/${id}/vote/`,
      { value },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setScore(res.data.score);
  };

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => vote(1)}>⬆</button>
      <span className="font-semibold">{score}</span>
      <button onClick={() => vote(-1)}>⬇</button>
    </div>
  );
}
