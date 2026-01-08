import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={submit} className="flex gap-2 mb-6">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search questions..."
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
      />
      <button className="px-4 py-2 text-white bg-blue-600 rounded">
        Search
      </button>
    </form>
  );
}
