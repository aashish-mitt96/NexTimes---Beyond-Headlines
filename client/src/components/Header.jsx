import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import Marquee from "react-fast-marquee";
import logo from "../assets/logo.png";
import axios from "axios";

const Header = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [headlines, setHeadlines] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = dateTime.getHours();
  const isDayTime = hours >= 6 && hours < 18;

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await axios.get("https://nex-times-beyond-headlines.vercel.app/api/news", {
          params: { categories: "general" },
        });

        const fetchedHeadlines = response.data.data
          .filter((article) => article.title)
          .slice(0, 10)
          .map((article) => article.title);

        setHeadlines(fetchedHeadlines);
      } catch (error) {
        console.error("Error fetching headlines:", error);
      }
    };

    fetchHeadlines();
  }, []);

  const scrollToAbout = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    window.scrollTo({
      top: scrollHeight * 0.6,
      behavior: "smooth",
    });
  };

  const scrollToContact = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full">
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div className="bg-black px-6 lg:px-28 text-white text-sm py-2 flex justify-between items-center h-[50px]">
          <div className="flex flex-wrap items-center gap-4">
            <span>New Delhi, India</span>
            <span className="flex items-center gap-2">
              {isDayTime ? (
                <FaSun className="text-yellow-300" />
              ) : (
                <FaMoon className="text-blue-300" />
              )}
              {dateTime.toLocaleDateString()} | {dateTime.toLocaleTimeString()}
            </span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-yellow-400 transition ml-4"
            >
              Home
            </button>
            <button
              onClick={scrollToAbout}
              className="hover:text-yellow-400 transition ml-4"
            >
              About
            </button>
            <button
              onClick={scrollToContact}
              className="hover:text-yellow-400 transition ml-4"
            >
              Contact
            </button>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 text-lg"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 text-xl"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 text-xl"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
        <div className="px-6 lg:px-28 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-1 bg-white">
          <div className="flex items-center gap-4">
            <img src={logo} alt="NexTimes Logo" className="h-26 w-26" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-[#DAA520] to-[#baa425] bg-clip-text text-transparent">
              NexTimes
            </h1>
          </div>
          <div className="w-full md:w-[70%] ml-auto">
            <div className="flex items-center gap-6">
              <div className="flex items-center justify-center">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-900 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <span className="ml-2 text-sm text-red-600 font-semibold">
                  LIVE
                </span>
              </div>
              <div className="w-full md:w-[900px]">
                <Marquee gradient={false} speed={60} pauseOnHover={true}>
                  {headlines.length > 0 ? (
                    headlines.map((title, index) => (
                      <span
                        key={index}
                        className="mx-4 font-medium text-gray-800"
                      >
                        📰 {title} |
                      </span>
                    ))
                  ) : (
                    <span>Loading latest headlines...</span>
                  )}
                </Marquee>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:block w-full px-6 lg:px-28 ml-50 -mt-6 pb-2">
          <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-700 justify-center">
            <a href="/" className="hover:text-blue-600 transition">
              Home
            </a>
            <a href="/world" className="hover:text-blue-600 transition">
              World
            </a>
            <a href="/business" className="hover:text-blue-600 transition">
              Business
            </a>
            <a href="/sports" className="hover:text-blue-600 transition">
              Sports
            </a>
            <a href="/technology" className="hover:text-blue-600 transition">
              Technology
            </a>
            <a href="/entertainment" className="hover:text-blue-600 transition">
              Entertainment
            </a>
            <a href="/health" className="hover:text-blue-600 transition">
              Health
            </a>
            <a href="/science" className="hover:text-blue-600 transition">
              Science
            </a>
          </div>
        </div>
      </div>
      <div className="h-[210px]" />
    </div>
  );
};

export default Header;
