import React from "react";
import { Newspaper, Mic, Globe } from "lucide-react";

const About = () => {
  return (
    <div className="text-gray-800 w-full  px-4 ml-55 lg:px-[330px] py-10 bg-gray-50 border-t border-gray-200">
      <section className="bg-gradient-to-r from-blue-50  md:mr-15 to-white py-16 px-6 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          About NexTimes 📰
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto">
          Bringing you the latest, most relevant headlines from around the
          world. Stay informed, stay empowered.
        </p>
      </section>
      <section className="max-w-6xl mr-15 mx-auto py-7 px-6">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <Newspaper size={32} />,
              title: "Daily Headlines",
              desc: "Top stories curated from credible sources, updated every day.",
            },
            {
              icon: <Mic size={32} />,
              title: "Text to Speech",
              desc: "Click the speaker icon to listen to the headline being read out.",
            },
            {
              icon: <Globe size={32} />,
              title: "Global Coverage",
              desc: "News from the US and around the world in one place.",
            },
          ].map(({ icon, title, desc }, i) => (
            <div
              key={i}
              className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition"
            >
              <div className="text-blue-600 mb-4 flex items-center justify-center">
                {icon}
              </div>
              <h3 className="text-xl flex items-center justify-center font-semibold mb-2">
                {title}
              </h3>
              <p className="text-gray-600 flex items-center justify-center mx-auto text-center">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-blue-50 mr-15 py-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">🔍 How It Works</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our app fetches news using the powerful <strong>NewsAPI</strong>. We
            retrieve and present the top headlines for you. Click on a card to
            read the full story, or hit the volume icon to listen. Seamless,
            fast, and user-friendly.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
