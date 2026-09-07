"use client";

import { useState } from "react";
import { SITE } from "@/config/site";
import { BTN_DARK } from "@/components/ui";

const FIELD =
  "rounded-img border border-ink bg-canvas px-4 py-3 text-copy font-normal text-ink transition-[background-color,color,border-color,transform] duration-[140ms] ease-[ease] placeholder:text-body-mid focus:outline-2 focus:outline-offset-2 focus:outline-primary";

/**
 * Message form. There is no backend, so submitting composes an email in the
 * visitor's own mail client rather than silently dropping the message.
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Website message from ${name || "a reader"}`;
    const body = `${message}\n\n— ${name}${email ? ` (${email})` : ""}`;
    window.location.href = `mailto:${SITE.contactEmail}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form
      onSubmit={send}
      className="flex flex-col gap-4 rounded-ui bg-canvas-soft p-6 transition-transform duration-[140ms] ease-[ease] hover:-translate-y-0.5"
    >
      <span className="text-cardlg font-semibold">Send a message</span>

      <label className="flex flex-col gap-2 text-nav font-semibold">
        Your name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="First name"
          className={FIELD}
        />
      </label>

      <label className="flex flex-col gap-2 text-nav font-semibold">
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className={FIELD}
        />
      </label>

      <label className="flex flex-col gap-2 text-nav font-semibold">
        Message
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What's on your mind?"
          className={`${FIELD} resize-y`}
        />
      </label>

      <button type="submit" className={`${BTN_DARK} cursor-pointer`}>
        Send message
      </button>

      <span className="text-caption text-body-mid">
        Opens in your email app — no data is stored on this site.
      </span>
    </form>
  );
}
