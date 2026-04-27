/* global React */
// Shared phone chrome + small UI atoms.

const { useState, useEffect, useRef } = React;

function PhoneFrame({ children, screenStyle }) {
  return (
    <div className="phone-frame">
      <div className="phone-screen" style={screenStyle}>
        <div className="phone-status-bar">
          <span>8:47</span>
          <span className="phone-status-icons" aria-hidden="true">
            <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor"><rect x="0" y="6" width="2.5" height="4" rx="0.5"/><rect x="3.5" y="4" width="2.5" height="6" rx="0.5"/><rect x="7" y="2" width="2.5" height="8" rx="0.5"/><rect x="10.5" y="0" width="2.5" height="10" rx="0.5"/></svg>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M1 4 A8 8 0 0 1 13 4"/><path d="M3 6 A5 5 0 0 1 11 6"/><path d="M5 8 A2 2 0 0 1 9 8"/></svg>
            <svg width="22" height="10" viewBox="0 0 22 10" fill="none"><rect x="0.5" y="0.5" width="18" height="9" rx="2" stroke="currentColor" strokeWidth="1"/><rect x="2" y="2" width="15" height="6" rx="1" fill="currentColor"/><rect x="19.5" y="3.5" width="1.5" height="3" rx="0.5" fill="currentColor"/></svg>
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

// Stylized "pill bottle" visual, drawn with SVG.
function PillBottle({ label = "AMOXICILLIN", warn = false, scanning = false }) {
  const capColor = warn ? "#C93030" : "#1553B8";
  const bodyColor = "#F6F9FD";
  return (
    <svg viewBox="0 0 200 300" width="140" height="210" aria-hidden="true">
      <defs>
        <linearGradient id="bottleShade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ECF2FA" />
          <stop offset="0.5" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#DDE7F3" />
        </linearGradient>
      </defs>
      {/* cap */}
      <rect x="58" y="26" width="84" height="38" rx="6" fill={capColor} />
      <rect x="58" y="58" width="84" height="10" fill={capColor} opacity="0.75" />
      {/* neck */}
      <rect x="66" y="68" width="68" height="14" fill="#A8B5C8" />
      {/* body */}
      <rect x="46" y="82" width="108" height="190" rx="10" fill="url(#bottleShade)" stroke="#A8B5C8" strokeWidth="1.5" />
      {/* label */}
      <rect x="58" y="108" width="84" height="140" rx="4" fill="#FFFFFF" stroke="#DDE7F3" />
      <text x="100" y="132" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0A1B33" letterSpacing="0.1em">Rx</text>
      <text x="100" y="160" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0A1B33" letterSpacing="-0.02em">{label}</text>
      <line x1="66" y1="172" x2="134" y2="172" stroke="#DDE7F3" />
      <text x="100" y="192" textAnchor="middle" fontSize="10" fill="#536681">500 mg · 30 capsules</text>
      {/* braille dots on label */}
      <g fill={capColor}>
        <circle cx="70" cy="220" r="2.2" />
        <circle cx="76" cy="220" r="2.2" />
        <circle cx="70" cy="228" r="2.2" />
        <circle cx="76" cy="228" r="2.2" opacity="0.3" />
        <circle cx="70" cy="236" r="2.2" opacity="0.3" />
        <circle cx="76" cy="236" r="2.2" />
      </g>
      {/* scan overlay */}
      {scanning && (
        <g>
          <rect x="40" y="80" width="120" height="200" fill="url(#scanGrad)" opacity="0.0">
            <animate attributeName="opacity" values="0;0.22;0" dur="1.8s" repeatCount="indefinite" />
          </rect>
        </g>
      )}
    </svg>
  );
}

// Animated voice wave — bars in the blue accent.
function VoiceWave({ animating = false, bars = 24, color = "#62A5F7" }) {
  const heights = Array.from({ length: bars }, (_, i) => {
    // pseudo-random but stable shape
    const t = Math.sin(i * 1.2) * 0.5 + 0.55;
    return Math.max(0.22, t);
  });
  return (
    <div className={`voice-wave ${animating ? "active" : ""}`} aria-hidden="true">
      {heights.map((h, i) => (
        <i key={i} style={{ height: `${h * 100}%`, animationDelay: `${i * 60}ms` }} />
      ))}
    </div>
  );
}

// Simple check / warning glyphs used across the previews.
function Glyph({ name, size = 24, color = "currentColor", stroke = 2.2 }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "check":
      return (<svg {...p}><path d="M4 12 l5 5 L20 6" /></svg>);
    case "warn":
      return (<svg {...p}><path d="M12 3 L22 20 H2 Z" /><line x1="12" y1="10" x2="12" y2="14" /><circle cx="12" cy="17.5" r="0.8" fill={color} stroke="none" /></svg>);
    case "scan":
      return (<svg {...p}><path d="M4 8 V6 A1 1 0 0 1 5 5 H7" /><path d="M17 5 H19 A1 1 0 0 1 20 6 V8" /><path d="M20 16 V18 A1 1 0 0 1 19 19 H17" /><path d="M7 19 H5 A1 1 0 0 1 4 18 V16" /><line x1="4" y1="12" x2="20" y2="12" /></svg>);
    case "volume":
      return (<svg {...p}><path d="M4 10 V14 H8 L13 18 V6 L8 10 Z" /><path d="M16 9 A4 4 0 0 1 16 15" /><path d="M18 6 A7 7 0 0 1 18 18" /></svg>);
    case "shield":
      return (<svg {...p}><path d="M12 3 L20 6 V12 C20 17 16 20 12 21 C8 20 4 17 4 12 V6 Z" /><path d="M9 12 L11 14 L15 10" /></svg>);
    case "pill":
      return (<svg {...p}><rect x="3" y="9" width="18" height="8" rx="4" transform="rotate(-25 12 13)" /><line x1="9" y1="7" x2="13" y2="18" transform="rotate(-25 12 13)" /></svg>);
    default: return null;
  }
}

Object.assign(window, { PhoneFrame, PillBottle, VoiceWave, Glyph });
