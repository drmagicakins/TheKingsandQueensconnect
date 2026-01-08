import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import TrendingTags from "../components/TrendingTags";
import PublicQuestions from "../components/PublicQuestions";
import CTA from "../components/CTA";

export default function Landing() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchQuestions = (params = "") => {
    setLoading(true);
    axios
      .get(`/api/discussions/questions/search/${params}`)
      .then((res) => setQuestions(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold text-red-600">Landing Page Loaded</h1>
      {/*<Navbar />*/}
      {/*<Hero />*/}

      <main className="max-w-6xl px-4 py-10 mx-auto">
        {/* Search */}
        <div className="mb-6">
          <SearchBar onSearch={(q) => fetchQuestions(`?q=${q}`)} />
        </div>

        {/* Content layout */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* LEFT: Tags */}
          <aside className="md:col-span-1">
            {/*<TrendingTags onSelect={(slug) => fetchQuestions(`?tag=${slug}`)} />*/}
          </aside>

          {/* RIGHT: Questions */}
          <section className="md:col-span-3">
            {loading ? (
              <p className="text-gray-500">Loading questions…</p>
            ) : (
              <PublicQuestions questions={questions} />
            )}
          </section>
        </div>
      </main>

      {/*<CTA />*/}
    </>
  );
}
