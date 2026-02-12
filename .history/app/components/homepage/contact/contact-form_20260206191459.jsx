"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ loading: false, success: null, message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, message: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({ loading: false, success: true, message: "✅ Message sent successfully!" });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      setStatus({ loading: false, success: false, message: "❌ Failed to send message. Please try again." });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-900 via-slate-900 to-black p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-lg text-white"
      >
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Let’s Connect
        </h2>
        <p className="text-center text-gray-300 mb-8 text-sm">
          I usually respond within a few hours — drop your thoughts below 👇
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="p-4 rounded-xl bg-white/5 border border-white/20 placeholder-gray-400 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 outline-none"
            required
          />

          <motion.input
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="p-4 rounded-xl bg-white/5 border border-white/20 placeholder-gray-400 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 outline-none"
            required
          />

          <motion.textarea
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className="p-4 rounded-xl bg-white/5 border border-white/20 placeholder-gray-400 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 outline-none resize-none"
            required
          />

          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.03 }}
            type="submit"
            disabled={status.loading}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all
              ${status.loading
                ? "bg-cyan-800 cursor-wait"
                : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500"} shadow-lg`}
          >
            {status.loading ? "Sending..." : <>Send Message <Send size={18} /></>}
          </motion.button>
        </form>

        {status.message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-5 text-center font-medium ${
              status.success ? "text-green-400" : "text-red-400"
            }`}
          >
            {status.message}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
