// kit.jsx — Yaksok primitives, phone frame, and app-screen previews (theme-aware, bilingual)
// Exports to window: MIcon, Wave, ScanCorners, FabCircle, SegPill, PhoneFrame,
//   HeroAppScreen, ScannerScreen, OcrScreen, DrugAiScreen, AccessScreen, scrColors, SCR

// screen-local color tokens (mirror the Yaksok semantic tokens, light/dark)
function scrColors(dark) {
  return dark
    ? { surface: '#1A1A1A', text: '#F8FAFC', sub: '#AAAAAA', hint: '#888888', primary: '#0066FF',
        divider: 'rgba(248,250,252,0.10)', glassFill: 'rgba(44,44,48,0.94)', glassBorder: 'rgba(255,255,255,0.14)', glassShadow: '0 6px 20px rgba(0,0,0,0.5)' }
    : { surface: '#F8FAFC', text: '#1A1A1A', sub: '#333333', hint: '#888888', primary: '#0066FF',
        divider: 'rgba(26,26,26,0.08)', glassFill: 'rgba(255,255,255,0.98)', glassBorder: 'rgba(0,0,0,0.04)', glassShadow: '0 6px 20px rgba(0,0,0,0.15)' };
}
const CAMERA = 'rgba(0,0,0,0.85)';

// bilingual labels used only inside the app-screen previews
const SCR = {
  ko: {
    intro: '약속.', tagline: '보이지 않아도\n의약품 식별 어렵지 않아요.', yaksok: 'YAKSOK', next: '다음',
    point: '바코드를 비춰주세요', tapHint: '화면을 탭하면 스캔을 시작해요', identified: '의약품 식별됨',
    drugName: '타이레놀정500mg', cat: '해열 · 진통 · 소염제', maker: '한국존슨앤드존슨 · 정제',
    ocrReading: '읽어드리고 있어요', ocrSub: '1일 3회 · 식후 30분',
    modeRaw: '원문', modeEasy: 'AI', aiLabel: '쉬운 설명',
    aiBody: '이 약은 아프거나 열이 날 때 먹는 약이에요. 한 번에 한 알, 하루 세 번까지 드실 수 있어요.',
    voiceover: '타이레놀정500mg, 제목', voTag: 'VoiceOver',
  },
  en: {
    intro: 'Yaksok.', tagline: 'Identifying medicine\nis easy, even unseen.', yaksok: 'YAKSOK', next: 'Next',
    point: 'Point at the barcode', tapHint: 'Tap the screen to start scanning', identified: 'IDENTIFIED',
    drugName: 'Tylenol 500mg', cat: 'Fever · pain · anti-inflammatory', maker: 'Janssen Korea · Tablet',
    ocrReading: 'Reading aloud', ocrSub: '3× a day · 30 min after meals',
    modeRaw: 'Official', modeEasy: 'AI', aiLabel: 'In simple words',
    aiBody: 'This is medicine for when you hurt or have a fever. Take one tablet at a time, up to three times a day.',
    voiceover: 'Tylenol 500mg, heading', voTag: 'VoiceOver',
  },
};
function useScr() { const { lang } = useI18n(); return SCR[lang] || SCR.ko; }

// Material Symbols Rounded glyph
function MIcon({ name, size = 24, color = 'currentColor', fill = 0, weight = 400, style = {} }) {
  return (
    <span className="msr" aria-hidden="true" style={{
      fontSize: size, color, fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' 0, 'opsz' ${size}`, ...style,
    }}>{name}</span>
  );
}

// Equalizer "now reading" wave (fixed CSS rhythm — used for compact inline cues)
function Wave({ active = true, size = 28, color = '#fff' }) {
  const bars = [0.45, 0.82, 0.6, 1, 0.5];
  return (
    <div aria-hidden="true" style={{ display: 'flex', gap: size * 0.12, alignItems: 'center', height: size }}>
      {bars.map((h, i) => (
        <div key={i} style={{
          width: Math.max(3, size * 0.11), borderRadius: 99, background: color,
          height: active ? '100%' : `${h * 64}%`,
          animation: active ? `ykwave .9s ease-in-out ${i * 0.12}s infinite alternate` : 'none',
          transformOrigin: 'center',
        }} />
      ))}
    </div>
  );
}

// Random oscillating wave — mirrors the app's AnimWave: bar heights re-randomize
// on a ~111ms beat and ease between values, so it sways organically while speaking.
function AnimWave({ size = 40, color = '#0066FF', bars = 5 }) {
  const rand = () => 0.28 + Math.random() * 0.72;
  const [hs, setHs] = React.useState(() => Array.from({ length: bars }, rand));
  React.useEffect(() => {
    let id = setInterval(() => setHs(Array.from({ length: bars }, rand)), 111);
    return () => clearInterval(id);
  }, [bars]);
  return (
    <div aria-hidden="true" style={{ display: 'flex', gap: size * 0.12, alignItems: 'center', height: size }}>
      {hs.map((h, i) => (
        <div key={i} style={{
          width: Math.max(3, size * 0.12), borderRadius: 99, background: color,
          height: `${Math.round(h * 100)}%`, transition: 'height .14s cubic-bezier(.45,0,.55,1)',
        }} />
      ))}
    </div>
  );
}

// Camera focus brackets
function ScanCorners({ size = 196, color = '#F8FAFC' }) {
  const Corner = ({ pos, h, v }) => (
    <div style={{ position: 'absolute', width: 22, height: 22, ...pos }}>
      <div style={{ position: 'absolute', background: color, borderRadius: 1, width: 22, height: 3, ...(h === 'top' ? { top: 0 } : { bottom: 0 }) }} />
      <div style={{ position: 'absolute', background: color, borderRadius: 1, width: 3, height: 22, ...(v === 'left' ? { left: 0 } : { right: 0 }) }} />
    </div>
  );
  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <Corner pos={{ top: 0, left: 0 }} h="top" v="left" />
      <Corner pos={{ top: 0, right: 0 }} h="top" v="right" />
      <Corner pos={{ bottom: 0, left: 0 }} h="bottom" v="left" />
      <Corner pos={{ bottom: 0, right: 0 }} h="bottom" v="right" />
    </div>
  );
}

// Frosted circular control
function FabCircle({ active, dark, diameter = 52, children }) {
  const c = scrColors(dark);
  return (
    <div style={{
      width: diameter, height: diameter, borderRadius: 999, flex: `0 0 ${diameter}px`,
      background: active ? c.primary : c.glassFill, border: `1px solid ${active ? 'transparent' : c.glassBorder}`,
      boxShadow: c.glassShadow, display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>{children}</div>
  );
}

// segmented control with sliding pill (static visual + optional onChange)
function SegPill({ labels, index, onChange, dark, height = 46, fs = 14 }) {
  const c = scrColors(dark);
  return (
    <div role={onChange ? 'tablist' : undefined} style={{
      display: 'inline-flex', padding: 4, borderRadius: 999, position: 'relative',
      background: c.glassFill, border: `1px solid ${c.glassBorder}`, boxShadow: c.glassShadow, height, boxSizing: 'border-box',
    }}>
      <div aria-hidden="true" style={{
        position: 'absolute', top: 4, bottom: 4, left: 4, width: `calc((100% - 8px) / ${labels.length})`,
        transform: `translateX(${index * 100}%)`, background: c.text, borderRadius: 46,
        transition: 'transform .222s cubic-bezier(.76,0,.24,1)',
      }} />
      {labels.map((l, i) => {
        const inner = (
          <span style={{ position: 'relative', zIndex: 1, fontFamily: 'var(--font-sans)', fontSize: fs,
            fontWeight: i === index ? 700 : 600, color: i === index ? c.surface : c.text, padding: '0 16px', whiteSpace: 'nowrap' }}>{l}</span>
        );
        return onChange ? (
          <button key={l} role="tab" aria-selected={i === index} onClick={() => onChange(i)}
            style={{ border: 0, background: 'transparent', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>{inner}</button>
        ) : <div key={l} style={{ display: 'flex', alignItems: 'center' }}>{inner}</div>;
      })}
    </div>
  );
}

// Dots
function Dots({ n, active, dark }) {
  const c = scrColors(dark);
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} style={{ width: i === active ? 18 : 6, height: 6, borderRadius: 99, background: i === active ? c.text : c.divider }} />
      ))}
    </div>
  );
}

// ── Phone frame (scales a 322×692 logical device to width `w`) ──
function PhoneFrame({ w = 300, screenDark = false, label, children, glow = false }) {
  const DW = 322, DH = 692, INSET = 11;
  const scale = w / DW;
  const sb = screenDark ? '#fff' : '#15151a';
  return (
    <div role="img" aria-label={label} style={{ width: w, height: DH * scale, position: 'relative', flexShrink: 0 }}>
      {glow && <div aria-hidden="true" style={{ position: 'absolute', inset: '-12% -8%', background: 'radial-gradient(60% 50% at 50% 40%, rgba(0,102,255,0.18), transparent 70%)', filter: 'blur(8px)', zIndex: 0 }} />}
      <div style={{ position: 'absolute', top: 0, left: 0, width: DW, height: DH, transform: `scale(${scale})`, transformOrigin: 'top left', zIndex: 1 }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: 54, background: 'var(--bezel)', boxShadow: 'var(--shadow-phone)' }} />
        <div style={{ position: 'absolute', inset: INSET, borderRadius: 44, overflow: 'hidden', background: screenDark ? '#1A1A1A' : '#F8FAFC' }}>
          {/* status bar */}
          <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 26px 0', zIndex: 20 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: sb, fontFamily: 'var(--font-sans)' }}>9:41</span>
            <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
              <svg width="17" height="11" viewBox="0 0 17 11"><rect x="0" y="7" width="2.6" height="4" rx="0.6" fill={sb}/><rect x="3.8" y="4.6" width="2.6" height="6.4" rx="0.6" fill={sb}/><rect x="7.6" y="2.3" width="2.6" height="8.7" rx="0.6" fill={sb}/><rect x="11.4" y="0" width="2.6" height="11" rx="0.6" fill={sb}/></svg>
              <svg width="22" height="11" viewBox="0 0 24 12"><rect x="0.5" y="0.5" width="20" height="11" rx="3" stroke={sb} strokeOpacity="0.4" fill="none"/><rect x="2" y="2" width="16" height="8" rx="1.6" fill={sb}/><rect x="21.5" y="3.6" width="1.8" height="4.8" rx="0.9" fill={sb} fillOpacity="0.5"/></svg>
            </span>
          </div>
          <div style={{ position: 'absolute', inset: 0 }}>{children}</div>
          <div aria-hidden="true" style={{ position: 'absolute', top: 9, left: '50%', transform: 'translateX(-50%)', width: 92, height: 26, borderRadius: 16, background: '#000', zIndex: 30 }} />
          <div aria-hidden="true" style={{ position: 'absolute', bottom: 7, left: '50%', transform: 'translateX(-50%)', width: 104, height: 4, borderRadius: 99, background: screenDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.26)', zIndex: 30 }} />
        </div>
      </div>
    </div>
  );
}

// ───────────── App-screen previews (logical 300-wide) ─────────────

function HeroAppScreen({ dark }) {
  const c = scrColors(dark); const s = useScr();
  return (
    <div style={{ height: '100%', background: c.surface, display: 'flex', flexDirection: 'column', paddingTop: 44 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '12px 22px 0' }}>
        <span style={{ fontSize: 30, fontWeight: 700, color: c.text, lineHeight: 1, fontFamily: 'var(--font-sans)' }}>*</span>
      </div>
      <div style={{ flex: 1, padding: '0 22px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'auto', paddingTop: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.4, color: c.text, fontFamily: 'var(--font-sans)' }}>{s.yaksok}</span>
        </div>
        <div style={{ fontSize: 50, fontWeight: 800, color: c.text, letterSpacing: -2, lineHeight: 1.05, fontFamily: 'var(--font-sans)' }}>{s.intro}</div>
        <div style={{ fontSize: 20, fontWeight: 600, color: c.sub, lineHeight: 1.4, marginTop: 14, whiteSpace: 'pre-line', fontFamily: 'var(--font-sans)' }}>{s.tagline}</div>
      </div>
      {/* bottom-bar space preserved (controls removed per request) */}
      <div aria-hidden="true" style={{ height: 68 }} />
    </div>
  );
}

// Faithful camera scanner. `reading` shows the OCR/TTS read-aloud state
// (blue voice button + "읽어드리고 있어요" banner); otherwise the identified state.
function ScannerScreen({ reading = false }) {
  const s = useScr();
  return (
    <div style={{ height: '100%', position: 'relative', background: 'radial-gradient(120% 80% at 50% 34%, #4a4a4a 0%, #2b2b2b 55%, #161616 100%)', overflow: 'hidden' }}>
      {/* simulated package — centered inside the focus frame; barcode for identify, printed text for OCR */}
      <div style={{ position: 'absolute', top: 56, left: 0, right: 0, bottom: 196, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: 182, height: 120, transform: 'rotate(-5deg)', borderRadius: 10, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.10)', boxShadow: '0 18px 40px rgba(0,0,0,0.4)', overflow: 'hidden' }}>
        {reading ? (
          <div style={{ position: 'absolute', inset: 0, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ width: '74%', height: 11, borderRadius: 3, background: 'rgba(255,255,255,0.82)' }} />
            <div style={{ width: '46%', height: 7, borderRadius: 3, background: 'rgba(255,255,255,0.5)' }} />
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ width: '92%', height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.34)' }} />
              <div style={{ width: '84%', height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.34)' }} />
              <div style={{ width: '60%', height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.34)' }} />
            </div>
          </div>
        ) : (
          <div style={{ position: 'absolute', bottom: 12, left: 14, right: 14, height: 15, background: 'repeating-linear-gradient(90deg,rgba(255,255,255,0.55) 0 2px,transparent 2px 4px)' }} />
        )}
        </div>
      </div>
      {/* focus brackets */}
      <div style={{ position: 'absolute', top: 56, left: 0, right: 0, bottom: 196, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ScanCorners size={204} />
      </div>
      {/* result banner */}
      <div style={{ position: 'absolute', left: 16, right: 16, bottom: 148 }}>
        <div style={{ background: CAMERA, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.6, color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-sans)' }}>{reading ? s.ocrReading : s.identified}</span>
            <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.44, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: 'var(--font-sans)' }}>{s.drugName}</span>
          </div>
          {!reading && (
            <div style={{ width: 44, height: 44, borderRadius: 999, flex: '0 0 44px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0066FF' }}>
              <MIcon name="arrow_forward" size={24} color="#fff" />
            </div>
          )}
        </div>
      </div>
      {/* big voice / OCR button — dark glass; bars turn primary while reading */}
      <div style={{ position: 'absolute', bottom: 44, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 84, height: 84, borderRadius: 999, background: CAMERA, border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {reading ? <AnimWave size={38} color="#0066FF" /> : <MIcon name="graphic_eq" size={38} color="#fff" />}
        </div>
      </div>
    </div>
  );
}

// OCR · TTS = the camera read-aloud state of the scanner
function OcrScreen() {
  return <ScannerScreen reading />;
}

function DrugAiScreen({ dark }) {
  const c = scrColors(dark); const s = useScr();
  return (
    <div style={{ height: '100%', background: c.surface, position: 'relative', paddingTop: 50 }}>
      <div style={{ padding: '0 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <MIcon name="chevron_left" size={30} color={c.text} />
        </div>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: c.hint, fontFamily: 'var(--font-sans)' }}>{s.cat}</span>
        <h2 style={{ fontSize: 27, fontWeight: 800, letterSpacing: -0.9, color: c.text, margin: '5px 0 2px', lineHeight: 1.15, fontFamily: 'var(--font-sans)' }}>{s.drugName}</h2>
        <span style={{ fontSize: 14, color: c.sub, fontFamily: 'var(--font-sans)' }}>{s.maker}</span>
        {/* highlighted AI section (reading) */}
        <div style={{ marginTop: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ width: 4, height: 19, borderRadius: 2, background: c.primary }} />
            <span style={{ fontSize: 21, fontWeight: 700, letterSpacing: -0.4, color: c.primary, fontFamily: 'var(--font-sans)' }}>{s.aiLabel}</span>
            <Wave active size={18} color={c.primary} />
          </div>
          <p style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.5, letterSpacing: -0.2, color: c.primary, margin: 0, fontFamily: 'var(--font-sans)' }}>{s.aiBody}</p>
        </div>
      </div>
      {/* scrim */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 130, background: `linear-gradient(to top, ${c.surface} 30%, transparent)` }} />
      {/* floating controls */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 26, padding: '0 22px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <FabCircle dark={dark} active><Wave active size={24} color="#fff" /></FabCircle>
        <div style={{ flex: 1 }} />
        <SegPill labels={[s.modeRaw, s.modeEasy]} index={1} dark={dark} height={44} fs={14} />
      </div>
    </div>
  );
}

function AccessScreen({ dark }) {
  const c = scrColors(dark); const s = useScr();
  return (
    <div style={{ height: '100%', background: c.surface, position: 'relative', paddingTop: 56 }}>
      <div style={{ padding: '0 22px' }}>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: c.hint, fontFamily: 'var(--font-sans)' }}>{s.cat}</span>
        {/* element under VoiceOver focus */}
        <div style={{ position: 'relative', marginTop: 6, padding: '8px 10px', margin: '6px -10px 0', borderRadius: 10, outline: '3px solid #0066FF', outlineOffset: 2 }}>
          <h2 style={{ fontSize: 27, fontWeight: 800, letterSpacing: -0.9, color: c.text, margin: 0, lineHeight: 1.15, fontFamily: 'var(--font-sans)' }}>{s.drugName}</h2>
        </div>
        <div style={{ marginTop: 26, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {[0, 1].map(i => (
            <div key={i}>
              <div style={{ width: 4, height: 16, borderRadius: 2, background: c.text, marginBottom: 8, opacity: 0.25 }} />
              <div style={{ height: 9, width: '88%', borderRadius: 99, background: c.divider, marginBottom: 7 }} />
              <div style={{ height: 9, width: '64%', borderRadius: 99, background: c.divider }} />
            </div>
          ))}
        </div>
      </div>
      {/* VoiceOver caption bubble */}
      <div style={{ position: 'absolute', left: 14, right: 14, bottom: 34 }}>
        <div style={{ background: '#000', borderRadius: 16, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.4)' }}>
          <div style={{ width: 34, height: 34, borderRadius: 999, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <MIcon name="campaign" size={20} color="#fff" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.4, color: '#0066FF', fontFamily: 'var(--font-sans)' }}>{s.voTag}</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#fff', fontFamily: 'var(--font-sans)' }}>{s.voiceover}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  MIcon, Wave, AnimWave, ScanCorners, FabCircle, SegPill, Dots, PhoneFrame, scrColors, SCR, useScr,
  HeroAppScreen, ScannerScreen, OcrScreen, DrugAiScreen, AccessScreen, CAMERA,
});
