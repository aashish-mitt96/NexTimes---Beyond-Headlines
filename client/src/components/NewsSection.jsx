import React, { useState, useEffect } from "react";
import axios from "axios";
import { Volume2 } from "lucide-react";

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/news", {
          params: { categories: selectedCategory, page },
        });

        const newArticles = response.data.data;
        if (newArticles.length === 0) {
          setHasMore(false);
        }

        setNews((prevNews) =>
          page === 1 ? newArticles : [...prevNews, ...newArticles]
        );
      } catch (error) {
        console.error("Error fetching news:", error);
      }

      setLoading(false);
    };

    fetchNews();
  }, [selectedCategory, page]);

  const readTitleAloud = (title) => {
    const utterance = new SpeechSynthesisUtterance(title);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const renderCard = (article, large = false) => (
    <div
      className={`bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition p-4 flex flex-col ${
        large ? "" : "h-full"
      }`}
    >
      <div className="flex justify-between items-start gap-3 mb-2">
        <h2
          className={`font-semibold text-gray-800 ${
            large ? "text-2xl line-clamp-3" : "text-lg line-clamp-2"
          }`}
        >
          {article.title}
        </h2>
        <button
          onClick={() => readTitleAloud(article.title)}
          className="text-blue-500 hover:text-blue-700"
        >
          <Volume2 size={20} />
        </button>
      </div>
      <div className="relative w-full max-h-64 overflow-hidden rounded-lg mb-3 border border-gray-100">
        <img
          src={article.image}
          alt={article.title}
          className="w-full object-cover"
        />
      </div>
      <p className="text-gray-600 text-sm line-clamp-3 mb-2">
        {article.description}
      </p>
      {article.source?.name && (
        <p className="text-xs text-gray-400 mb-1">
          Source: {article.source.name}
        </p>
      )}
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto text-blue-600 hover:underline text-sm font-medium"
      >
        ➤ Read More
      </a>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="w-[350px] hidden lg:block">
        <div className="fixed left-30 w-[350px] h-screen overflow-y-auto border-r border-gray-200 bg-white p-6 space-y-6">
          <div className="border border-gray-200 p-5 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              🔥 Trending Now
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                "AI",
                "Elections",
                "Bitcoin",
                "Climate",
                "Olympics",
                "SpaceX",
              ].map((word, i) => (
                <span
                  key={i}
                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-100 transition cursor-pointer"
                >
                  #{word}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 p-5 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              💬 Quote of the Day
            </h2>
            <blockquote className="italic text-gray-700 border-l-4 border-blue-500 pl-4">
              "Journalism is what we need to make democracy work."
              <span className="block text-sm text-gray-500 mt-2 text-right">
                - Walter Cronkite
              </span>
            </blockquote>
          </div>
          <div className="border border-gray-200 p-5 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              🧠 Did You Know?
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              The first ever online newspaper was published in 1993 by the{" "}
              <i>San Jose Mercury News</i>. The digital age of journalism had
              begun!
            </p>
          </div>
        </div>
      </div>
      <main className="flex-1 px-4 sm:px-6 ml-20 lg:px-14 lg:ml-[110px] mr-0 lg:mr-28 py-6 max-w-[1280px] mx-auto space-y-6">
        <h1 className="text-3xl font-extrabold text-gray-900 border-b pb-3">
          📰 Latest News - {selectedCategory.toUpperCase()}
        </h1>

        {loading && page === 1 ? (
          <p className="text-gray-700 text-lg">Loading...</p>
        ) : news.length === 0 ? (
          <p className="text-gray-500">No articles found.</p>
        ) : (
          <>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-2/3 flex flex-col gap-6">
                {news[0] && news[0].image && renderCard(news[0], true)}
                {news[1] && news[1].image && renderCard(news[1])}
              </div>
              <div className="w-full lg:w-1/3 flex flex-col gap-6">
                {news[2] && news[2].image && renderCard(news[2])}
                {news[3] && news[3].image && renderCard(news[3])}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {news
                .slice(4)
                .map(
                  (article, index) =>
                    article.image && (
                      <div key={index}>{renderCard(article)}</div>
                    )
                )}
            </div>
            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={loading}
                  className={`relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white transition-all duration-300
        ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl"
        }
      `}
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Loading...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M4 12h16m-7-7l7 7-7 7" />
                      </svg>
                      Load More News
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default NewsSection;
