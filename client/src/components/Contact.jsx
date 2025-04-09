import React from "react";

const Contact = () => {
  return (
    <>
      <div className="text-gray-800 w-full px-4 ml-55 lg:px-[330px] py-10 bg-gray-50 border-t border-gray-200">
        <section className="bg-gradient-to-r mr-15 from-blue-50 to-white py-16 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              📩 Get in Touch
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed max-w-2xl mx-auto">
              We'd love to hear your feedback, ideas, or any bug reports. Drop us a message and help us improve NexTimes.
            </p>
            <a
              href="mailto:your@email.com"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Contact Us
            </a>
          </div>
        </section>
      </div>
      <footer className=" text-center w-full ml-55 lg:px-[330px] py-7 text-gray-500 text-sm bg-gray-50">
        © {new Date().getFullYear()} NexTimes — Built with ❤️ for curious minds.
      </footer>
    </>
  );
};

export default Contact;
