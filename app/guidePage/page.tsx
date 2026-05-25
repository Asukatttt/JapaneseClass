"use client";

import { useEffect, useState } from "react";

interface Tour {
  id: string;
  title: string;
  duration?: string;
  price?: number;
  description?: string;
  departure?: string;
  image?: string;
}

const defaultImages = [
  "/images/491243_m.jpg",
  "/images/30817709_m.jpg",
  "/images/34107071_m.jpg",
  "/images/shibamata.jpg",
];

export default function JapanTour() {
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    async function loadTours() {
      try {
        const res = await fetch("/api/reserve");
        const data = await res.json();
        setTours(data);
      } catch (err) {
        console.error(err);
      }
    }
    loadTours();
  }, []);

  const formatTour = (u?: Tour) => {
    if (!u) return "";
    const m = u.duration ? String(u.duration).match(/(\d+)\s*/i) : null;
    const sd = m ? `${m[1]}h` : "";
    return u.price ? `JPY ¥${Number(u.price).toLocaleString("ja-JP")}${sd ? ` (${sd})` : ""}` : "";
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1rem", fontFamily: "system-ui, -apple-system, Roboto, 'Helvetica Neue', Arial" }}>

      {/* HERO */}
      <div style={{ position: "relative", borderRadius: 8, overflow: "hidden" }}>
        <img src="/images/491243_m.jpg" alt="Japan" style={{ width: "100%", display: "block" }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "white",
            padding: "1.25rem",
            background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 100%)",
          }}
        >
          <h1 style={{ margin: "0 0 0.25rem 0", fontWeight: 800, fontSize: "clamp(1.6rem, 6vw, 3rem)", textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}>
            Welcome to Japan
          </h1>
          <p style={{ margin: 0, fontSize: "clamp(1rem, 3.5vw, 1.25rem)", textShadow: "0 1px 6px rgba(0,0,0,0.45)" }}>
            Tours for Foreign Visitors
          </p>
        </div>
      </div>

      {/* INTRO */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "2.5rem 0 0 0", textAlign: "center" }}>
        <h2 style={{ margin: 0, fontSize: "clamp(1.05rem, 2.6vw, 1.5rem)", fontWeight: 700 }}>
          Choose one of our curated tours
        </h2>
        <p style={{ margin: "0.5rem 0 0 0", fontSize: "clamp(0.95rem, 2.2vw, 1.1rem)",fontWeight: 700  }}>
          To make a reservation, please click the email button below.
        </p>
      </section>

      {/* PRICES SUMMARY removed — using card-internal combined price element only */}

      {/* TOUR CARDS */}
      <div
        id="tours"
        style={{
          display: "grid",
          // auto-fit will create as many columns as will fit, each at least 240px wide.
          // On wide screens this becomes 4 columns; on smaller screens it will wrap responsively.
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 24,
          marginTop: "1rem",
          alignItems: "start",
        }}
      >
        {tours.map((t, idx) => {
          const imgSrc = t.image || defaultImages[idx % defaultImages.length];
          // produce a short duration like "4h" from strings like "4 hours" or "7 hours"
          const durMatch = t.duration ? String(t.duration).match(/(\d+)\s*/i) : null;
          const shortDur = durMatch ? `${durMatch[1]}h` : "";
          const priceText = t.price
            ? `JPY ¥${Number(t.price).toLocaleString("ja-JP")}${shortDur ? ` (${shortDur})` : ""}`
            : "";

          return (
            <article
              key={t.id}
              style={{
                  // let the grid cell control the width; use 100% so cards fill their column
                  width: "100%",
                  borderRadius: 12,
                  overflow: "hidden",
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.06)",
                  boxShadow: "0 6px 20px rgba(13,34,56,0.06)",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 240ms cubic-bezier(.2,.9,.2,1), box-shadow 240ms cubic-bezier(.2,.9,.2,1)",
                }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-8px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 14px 40px rgba(13,34,56,0.12)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(13,34,56,0.06)";
              }}
            >
              {/* Image */}
              <div style={{ position: "relative", overflow: "hidden", height: 220 }}>
                <img
                  src={imgSrc}
                  alt={t.title || "Tour image"}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* Body */}
              <div style={{ gap: 16, padding: 20, flexWrap: "nowrap", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 6px 0", lineHeight: 1.2 }}>
                    {t.title || "Untitled tour"}
                  </h3>
                  <div style={{ color: "#6b7280", fontSize: "0.9rem", marginBottom: 8 }}>{t.departure || ""}</div>
                  <p style={{ color: "#374151", margin: "8px 0 0 0" }}>{t.description || ""}</p>

                  {/* Email button */}
                  <div style={{ marginTop: 12, textAlign: "center" }}>
                    <a
                      href={`mailto:hiyorijapaneseclass@gmail.com?subject=${encodeURIComponent("Japan tour: " + (t.title || "Reservation"))}`}
                      style={{
                        background: "#10A37F",
                        padding: "10px 22px",
                        color: "white",
                        borderRadius: 8,
                        display: "inline-block",
                        textDecoration: "none",
                        fontWeight: 600,
                      }}
                    >
                      Send reservation email
                    </a>
                  </div>
                </div>

                {/* Price: always centered; show the two-line combined block (first two tours) for every card when available */}
                <div style={{ marginTop: 12, width: "100%", flexShrink: 0, display: "flex", justifyContent: "center" }}>
                  {tours && tours.length >= 2 ? (
                    <div style={{ display: "inline-block", background: "transparent", padding: "12px 20px", borderRadius: 10, boxShadow: "none", fontWeight: 800, color: "#1D3658", fontSize: "1.1rem", letterSpacing: 0.4, minWidth: 300, maxWidth: "100%", boxSizing: "border-box", textAlign: "center" }}>
                      <div style={{ display: "block", textAlign: "center" }}>{formatTour(tours[0])}</div>
                      <div style={{ display: "block", marginTop: 6, textAlign: "center" }}>{formatTour(tours[1])}</div>
                    </div>
                  ) : (
                    <div style={{ display: "inline-block", background: "transparent", padding: "12px 20px", borderRadius: 10, boxShadow: "none", fontWeight: 800, color: "#1D3658", fontSize: "1.1rem", letterSpacing: 0.4, minWidth: 300, maxWidth: "100%", boxSizing: "border-box", textAlign: "center" }}>
                      <div style={{ display: "block", textAlign: "center" }}>{priceText}</div>
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Coming soon list (inserted above contact box) */}
      <div style={{ maxWidth: 600, margin: "2rem auto", padding: 24, background: "#fffef6", borderRadius: 12, textAlign: "left", boxShadow: "0 6px 18px rgba(8,8,9,0.04)", display: "flex", flexDirection: "column", gap: 12 }}>
        <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 800, color: "#1D3658", textAlign: "center" }}>Coming soon!</h3>
        <p style={{ margin: "0 0 6px 0", textAlign: "center", color: "#1D3658" }}>New experiences we'll add soon!</p>
        <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "#374151", lineHeight: 1.6 }}>
          <li>・Baseball match experience</li>
          <li>・Japanese sports experience</li>
          <li>・Soba making experience</li>
          <li>・Temple meditation ZEN experience</li>
          <li>・Japanese art experience</li>
        </ul>
      </div>

      {/* CONTACT BOX */}
      <div
        style={{
          maxWidth: 600,
          margin: "2rem auto",
          padding: 24,
          background: "#F9D1A9",
          borderRadius: 12,
          textAlign: "center",
          boxShadow: "0 8px 28px rgba(8,8,9,0.06)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          transition: "transform 0.2s ease, box-shadow 0.2s ease",  // ← 追加
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 40px rgba(8,8,9,0.12)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 28px rgba(8,8,9,0.06)";
        }}
      >
        <p style={{ color: "#b91c1c", fontSize: "1.05rem", margin: 0, lineHeight: 1.35 }}>
          If you'd like to discuss schedule or plans, please send an email.
        </p>
        <a
          href="mailto:hiyorijapaneseclass@gmail.com?subject=Japan%20tour:%20Travel%20Plan%20Consultation"
          style={{
            display: "inline-block",
            background: "#1D3658",
            color: "#F2FAEF",
            padding: "12px 24px",
            borderRadius: 10,
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          hiyorijapaneseclass@gmail.com
        </a>
      </div>
    </div>
  );
}