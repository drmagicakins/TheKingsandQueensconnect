import { useEffect, useState } from "react";
import axios from "axios";

export default function TrendingTags({ onSelect }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios.get("/api/discussions/tags/trending/")
      .then(res => setTags(res.data));
  }, []);

  return (
    <div className="mb-6">
      <h3 className="mb-2 font-semibold">Trending Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <button
            key={tag.id}
            onClick={() => onSelect(tag.slug)}
            className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200"
          >
            #{tag.name}
          </button>
        ))}
      </div>
    </div>
  );
}
