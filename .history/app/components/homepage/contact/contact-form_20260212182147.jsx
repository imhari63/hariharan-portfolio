"use client";
import { useState } from "react";

// Replace with your Formspree endpoint
const FORMSPREE_ENDPOINT = "https://formspree.io/f/meorlyrd";

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Client-side validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("All fields are required.");
      return;
    }
    if (!validateEmail(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSending(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("✅ Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setError(data.errors?.[0]?.message || "❌ Failed to send message. Please try again.");
      }
    } catch (err) {
      setError("❌ Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-900 via-slate-900 to-black p-6">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-lg text-white">
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Let’s Connect
        </h2>
        <p className="text-center text-gray-300 mb-8 text-sm">
          I usually respond within a few hours — drop your thoughts below 👇
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="p-4 rounded-xl bg-white/5 border border-white/20 placeholder-gray-400 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 outline-none"
            required
            disabled={sending}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="p-4 rounded-xl bg-white/5 border border-white/20 placeholder-gray-400 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 outline-none"
            required
            disabled={sending}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            className="p-4 rounded-xl bg-white/5 border border-white/20 placeholder-gray-400 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 outline-none resize-none"
            required
            disabled={sending}
          />
          <button
            type="submit"
            disabled={sending}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all shadow-lg ${sending ? "bg-cyan-800 cursor-wait" : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500"}`}
          >
            {sending ? "Sending..." : "Send Message"}
          </button>
        </form>
        {error && <p className="mt-5 text-center font-medium text-red-400">{error}</p>}
        {success && <p className="mt-5 text-center font-medium text-green-400">{success}</p>}
      </div>
    </div>
  );
}