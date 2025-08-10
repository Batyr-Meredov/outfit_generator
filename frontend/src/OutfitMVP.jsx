import React, { useMemo, useState } from "react";

const API =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) ||
  "http://localhost:8000";

export default function OutfitMVP() {
  const [file, setFile] = useState(null);
  const [style, setStyle] = useState("streetwear");
  const [prompt, setPrompt] = useState("portrait photo, streetwear outfit");
  const [denoise, setDenoise] = useState(0.45);
  const [seed, setSeed] = useState("");
  const [resultUrl, setResultUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const preview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  async function onSubmit(e) {
    e.preventDefault();
    setError(null); setResultUrl(null);
    if (!file) return setError("Bitte ein Bild hochladen.");
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      fd.append("style", style);
      fd.append("prompt", prompt);
      fd.append("denoise", String(denoise));
      if (seed.trim()) fd.append("seed", seed.trim());
      const r = await fetch(`${API}/generate`, { method: "POST", body: fd });
      const data = await r.json();
      const url = data.url || data.image || null;
      if (!r.ok || !url) throw new Error("Backend noch nicht bereit.");
      setResultUrl(url);
    } catch (err) { setError(err.message || String(err)); } finally { setLoading(false); }
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Outfit Generator – MVP</h1>

        {/* 2 gleich breite Spalten */}
        <form onSubmit={onSubmit} style={styles.formGrid}>
          {/* Linke Spalte: Prompt + Controls */}
          {/* Linke Spalte */}
<div style={styles.leftCol}>
  {/* 1) Upload zuerst */}
  <label style={styles.field}>
    <div style={styles.label}>Bild hochladen</div>
    <input
      type="file"
      accept="image/*"
      onChange={(e) => setFile(e.target.files?.[0] ?? null)}
    />
  </label>

  {/* 2) Stil */}
  <label style={styles.field}>
    <div style={styles.label}>Stil</div>
    <select
      value={style}
      onChange={(e) => setStyle(e.target.value)}
      style={styles.select}
    >
      <option value="streetwear">Casual Streetwear</option>
      <option value="cyberpunk">Cyberpunk</option>
    </select>
  </label>

  {/* 3) Prompt (jetzt nach Upload) */}
  <label style={styles.field}>
    <div style={styles.label}>Prompt</div>
    <textarea
      rows={6}
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      style={styles.textarea}
    />
  </label>

  {/* 4) Advanced */}
  <div style={styles.row2}>
    <label style={styles.field}>
      <div style={styles.label}>Denoise</div>
      <input
        type="number"
        min={0}
        max={1}
        step={0.05}
        value={denoise}
        onChange={(e) => setDenoise(parseFloat(e.target.value))}
        style={styles.input}
      />
    </label>
    <label style={styles.field}>
      <div style={styles.label}>Seed (optional)</div>
      <input
        value={seed}
        onChange={(e) => setSeed(e.target.value)}
        placeholder="z. B. 123456"
        style={styles.input}
      />
    </label>
  </div>

  <button type="submit" disabled={loading} style={styles.button}>
    {loading ? "Generiere…" : "Outfit generieren"}
  </button>

  {error && <div style={styles.error}>{error}</div>}
</div>

          {/* Rechte Spalte: zwei Previews NEBENEINANDER */}
          <div style={styles.rightCol}>
            <div>
              <div style={styles.subLabel}>Vorschau Upload</div>
              <div style={styles.previewBoxDashed}>
                {preview ? (
                  <img src={preview} alt="Upload" style={styles.img} />
                ) : (
                  <span style={styles.placeholder}>Noch kein Bild</span>
                )}
              </div>
            </div>

            <div>
              <div style={styles.subLabel}>Ergebnis</div>
              <div style={styles.previewBoxSolid}>
                {resultUrl ? (
                  <img src={resultUrl} alt="Ergebnis" style={styles.img} />
                ) : (
                  <span style={styles.placeholder}>Noch kein Ergebnis</span>
                )}
              </div>
            </div>
          </div>
        </form>

        <div style={styles.footer}>API: <code>{API}/generate</code></div>
      </div>
    </div>
  );
}

/* Styles */
const styles = {
  page: { minHeight: "100vh", background: "#f8fafc", color: "#0f172a" },
  container: { maxWidth: 1200, margin: "0 auto", padding: 16 },
  title: { fontSize: 22, fontWeight: 700, marginBottom: 12 },

  // zwei gleich breite Spalten => Prompt ist „halb so breit“
  formGrid: { display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr", alignItems: "start", columnGap: 32,},

  leftCol: { display: "grid", gap: 12 },
  rightCol: {
    display: "grid",
    gap: 12,
    gridTemplateColumns: "1fr 1fr", // zwei Kacheln nebeneinander
    alignItems: "start",
  },

  field: { display: "block" },
  label: { fontSize: 13, marginBottom: 6, color: "#334155" },
  subLabel: { fontSize: 12, marginBottom: 6, color: "#475569" },

  textarea: {
    width: "100%",
    minHeight: 160,
    padding: "8px 10px",
    border: "1px solid #cbd5e1",
    borderRadius: 10,
    resize: "vertical",
    background: "#fff",
    fontSize: 14,
  },
  select: {
    width: "100%",
    padding: "8px 10px",
    border: "1px solid #cbd5e1",
    borderRadius: 10,
    background: "#fff",
    fontSize: 14,
  },
  input: {
    width: "100%",
    padding: "8px 10px",
    border: "1px solid #cbd5e1",
    borderRadius: 10,
    background: "#fff",
    fontSize: 14,
  },
  row2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },

  button: {
    padding: "10px 14px",
    background: "#111827",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },

  previewBoxDashed: {
    aspectRatio: "1 / 1",
    border: "2px dashed #cbd5e1",
    borderRadius: 12,
    background: "#fff",
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
  },
  previewBoxSolid: {
    aspectRatio: "1 / 1",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    background: "#fff",
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
  },
  img: { width: "100%", height: "100%", objectFit: "contain" },
  placeholder: { fontSize: 12, color: "#94a3b8" },

  footer: { marginTop: 12, fontSize: 12, color: "#64748b" },
};
