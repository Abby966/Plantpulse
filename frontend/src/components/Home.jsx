import React, { useState } from "react";

const translations = {
  en: {
    welcome: "Welcome to PlantPulse",
    description: "Empowering farmers with smart plant disease detection",
    tagline: "Protect your crops. Secure your future.",
  },
  am: {
    welcome: "እንኳን ደህና መጡ ወደ ፕላንትፑልስ",
    description: "የተሟላ የተንክል በሽታ መለየት መተግበሪያ",
    tagline: "የእርሻዎን እንክብካቤ ያስተካክሉ። የእርስዎን ወደፊት ያስደሰቱ።",
  },
  or: {
    welcome: "Baga nagaan dhuftan PlantPulse",
    description: "Meeshaa ogeessa beela biqiltuu",
    tagline: "Qoricha biqiltuu kee eeguuf. Fuulduratti milkaa’i.",
  },
  ti: {
    welcome: "እንቋዕ ብደሓን መፅእካን ናብ PlantPulse",
    description: "ናይ ኣብ ሓሳብ ምምልከት መተግበሪ",
    tagline: "ናይ ተንክልካ ሓርነት ኣስተዳደር። ሓደ ሕድሪ ምጽንብል።",
  },
};

const Home = () => {
  const [lang, setLang] = useState("en");
  const t = translations[lang];

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      {/* Language selector at top right */}
      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        <select
          onChange={(e) => setLang(e.target.value)}
          value={lang}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            fontSize: "1rem",
            border: "none",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            cursor: "pointer",
          }}
        >
          <option value="en">English</option>
          <option value="am">Amharic</option>
          <option value="or">Oromifa</option>
          <option value="ti">Tigrigna</option>
        </select>
      </div>

      {/* Hero section */}
      <div
        className="hero-section"
        style={{
          backgroundImage: `url("/ethiopian_farmer.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.55)",
            zIndex: 1,
          }}
        />

        {/* Hero text */}
        <div
          style={{
            zIndex: 2,
            padding: "2rem",
            maxWidth: "800px",
          }}
        >
          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: "700",
              marginBottom: "1rem",
              textShadow: "2px 2px 6px rgba(0,0,0,0.9)",
            }}
          >
            {t.welcome}
          </h1>
          <p
            style={{
              fontSize: "1.5rem",
              marginBottom: "1.5rem",
              textShadow: "1px 1px 5px rgba(0,0,0,0.85)",
            }}
          >
            {t.description}
          </p>
          <p
            style={{
              fontSize: "1.25rem",
              fontStyle: "italic",
              color: "#e0e0e0",
              textShadow: "1px 1px 4px rgba(0,0,0,0.7)",
            }}
          >
            {t.tagline}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
