"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaCode, FaLightbulb, FaBookOpen } from "react-icons/fa";

export default function AboutSection() {
  const highlights = [
    {
      icon: <FaCode />,
      title: "Tech Explorer",
      color: "violet",
    },
    {
      icon: <FaLightbulb />,
      title: "Innovator",
      color: "indigo",
    },
    {
      icon: <FaBookOpen />,
      title: "Learner",
      color: "violet",
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] py-24 text-white overflow-hidden">
      {/* --- Background Glow Effects --- */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-violet-700/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-16">
        {/* --- Left Side Text --- */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            👋 I’m{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Hariharan R
            </span>
          </h1>

          <h2 className="text-lg text-violet-300 font-medium mb-4">
            Engineering Student • Future Tech Explorer
          </h2>

          <p className="text-gray-300 leading-relaxed mb-6">
            I’m passionate about bridging the gap between{" "}
            <b>science and technology</b>. Currently diving deep into{" "}
            <span className="text-violet-400 font-semibold">
              Organoid Intelligence
            </span>
            , while preparing for the{" "}
            <b>TNPSC Group Exams</b>. On the creative front, I enjoy crafting{" "}
            <span className="text-indigo-400 font-semibold">
              digital art
            </span>{" "}
            and exploring{" "}
            <span className="text-indigo-400 font-semibold">
              innovative systems
            </span>
            .
          </p>

          <p className="text-gray-400 mb-6">
            I stand by traditional values of hard work, discipline, and
            craftsmanship — yet my mindset stays future-focused. My mission:
            build tech that feels human, intelligent, and timeless.
          </p>

          <div className="mt-8">
            <p className="text-violet-400 font-bold text-xl">– Hariharan R</p>
            <p className="text-gray-400 text-sm">
              Engineering Student & Futurist
            </p>
          </div>
        </motion.div>

        {/* --- Right Side Image & Highlights --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative flex flex-col items-center"
        >
          {/* Profile Image */}
          <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden shadow-[0_0_60px_-15px_rgba(139,92,246,0.6)] border-4 border-violet-500">
            <Image
              src="/image/profile.jpg"
              alt="Hariharan R"
              fill
              className="object-cover rounded-full"
              priority
            />
          </div>

          {/* Highlight Cards */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center justify-center gap-2 bg-[#1f2937] rounded-xl p-4 shadow-md border border-violet-600/30"
              >
                <div
                  className={`text-${item.color}-400 text-2xl flex items-center justify-center`}
                >
                  {item.icon}
                </div>
                <h3 className="font-semibold text-sm">{item.title}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
