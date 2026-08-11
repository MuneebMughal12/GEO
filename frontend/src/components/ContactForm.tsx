"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { company } from "@/data/company";

const subjects = [
  "Soil Testing",
  "Architectural Designing",
  "Construction",
  "Real Estate Marketing",
  "Material Supply",
  "Other",
];

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    // Placeholder interaction until enquiry delivery is connected.
    await new Promise((r) => setTimeout(r, 700));
    setBusy(false);
    setSent(true);
  }

  const field =
    "w-full rounded-sm border border-[#242424] bg-[#0f0f0f] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-[#5a5a5a] focus:border-[#d2a24c]";

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-sm border border-[#242424] bg-[#0f0f0f] p-8 text-center"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#d2a24c]">
            <span className="text-xl">✓</span>
          </div>
          <p className="mt-5 text-lg font-semibold">Thank you &mdash; message received.</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-[#8a8a8a]">
            Our team will get back to you within one working day. For anything urgent,
            WhatsApp us on {company.offices[0].phones[0]}.
          </p>
          <button
            onClick={() => setSent(false)}
            className="mt-6 text-sm text-[#d2a24c] transition-opacity hover:opacity-75"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={onSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="eyebrow">
                Your name
              </label>
              <input id="name" name="name" required className={`${field} mt-2`} placeholder="Full name" />
            </div>
            <div>
              <label htmlFor="company" className="eyebrow">
                Company
              </label>
              <input id="company" name="company" className={`${field} mt-2`} placeholder="Organisation" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className="eyebrow">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={`${field} mt-2`}
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className="eyebrow">
                Phone
              </label>
              <input id="phone" name="phone" className={`${field} mt-2`} placeholder="03xx-xxxxxxx" />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="eyebrow">
              Service required
            </label>
            <select id="subject" name="subject" className={`${field} mt-2`} defaultValue={subjects[0]}>
              {subjects.map((s) => (
                <option key={s} value={s} className="bg-[#0f0f0f]">
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="message" className="eyebrow">
              Project details
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className={`${field} mt-2 resize-none`}
              placeholder="Scope, location, timeline…"
            />
          </div>

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-[#d2a24c] px-6 py-3.5 text-sm font-medium text-[#0a0a0a] transition-opacity hover:opacity-85 disabled:opacity-50 sm:w-auto"
          >
            {busy ? "Sending…" : "Send enquiry"}
          </button>

          <p className="text-xs text-[#5a5a5a]">
            Enquiry delivery will be connected when the official email is confirmed.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
