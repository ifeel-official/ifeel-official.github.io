// kit.jsx — Yaksok primitives, phone frame, and app-screen previews (theme-aware, bilingual)
// Exports to window: MIcon, Wave, ScanCorners, FabCircle, SegPill, PhoneFrame,
//   ScannerScreen, OcrScreen, ExpiryScreen, DrugAiScreen, AccessScreen, scrColors, SCR

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
    identified: '의약품 식별됨',
    drugName: '타이레놀정500mg', cat: '해열 · 진통 · 소염제', maker: '한국존슨앤드존슨 · 정제',
    modeRaw: '원문', modeEasy: 'AI', aiLabel: '쉬운 설명',
    aiBody: '이 약은 아프거나 열이 날 때 먹는 약이에요. 한 번에 한 알, 하루 세 번까지 드실 수 있어요.',
    voiceover: '타이레놀정500mg, 제목', voTag: 'VoiceOver',
    expiryLabel: '사용기한 식별됨', expiryDate: '2027년 3월 15일까지',
    sceneLabel: '사진 읽기', sceneTitle: '사진을 촬영해 주세요.',
    ocrLine1: '카페 테이블 위에 따뜻한 아메리카노 한 잔과', ocrLine2: '딸기가 올려진 생크림 케이크가 놓여 있습니다.', ocrLine3: '오른쪽에 포크가 하나 있어요.',
  },
  en: {
    identified: 'IDENTIFIED',
    drugName: 'Tylenol 500mg', cat: 'Fever · pain · anti-inflammatory', maker: 'Janssen Korea · Tablet',
    modeRaw: 'Official', modeEasy: 'AI', aiLabel: 'In simple words',
    aiBody: 'This is medicine for when you hurt or have a fever. Take one tablet at a time, up to three times a day.',
    voiceover: 'Tylenol 500mg, heading', voTag: 'VoiceOver',
    expiryLabel: 'EXPIRY IDENTIFIED', expiryDate: 'Until Mar 15, 2027',
    sceneLabel: 'READ A PHOTO', sceneTitle: 'Take a photo to get started.',
    ocrLine1: 'A warm cup of americano and a', ocrLine2: 'strawberry shortcake sit on the café table.', ocrLine3: 'There’s a fork on the right.',
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
// `full` stretches to equal-width segments filling the container, mirroring
// the app's GlassSegmentedControl(equalWidthSegments: true) scan-mode bar.
function SegPill({ labels, index, onChange, dark, height = 46, fs = 14, full = false, bg, border, shadow, indicatorColor, selectedColor }) {
  const c = scrColors(dark);
  return (
    <div role={onChange ? 'tablist' : undefined} style={{
      display: full ? 'flex' : 'inline-flex', width: full ? '100%' : undefined, padding: 4, borderRadius: 999, position: 'relative',
      background: bg || c.glassFill, border: `1px solid ${border || c.glassBorder}`, boxShadow: shadow !== undefined ? shadow : c.glassShadow, height, boxSizing: 'border-box',
    }}>
      <div aria-hidden="true" style={{
        position: 'absolute', top: 4, bottom: 4, left: 4, width: `calc((100% - 8px) / ${labels.length})`,
        transform: `translateX(${index * 100}%)`, background: indicatorColor || c.text, borderRadius: 46,
        transition: 'transform .222s cubic-bezier(.76,0,.24,1)',
      }} />
      {labels.map((l, i) => {
        const inner = (
          <span style={{ position: 'relative', zIndex: 1, fontFamily: 'var(--font-sans)', fontSize: fs,
            fontWeight: i === index ? 700 : 600, color: i === index ? (selectedColor || c.surface) : c.text, padding: full ? '0 4px' : '0 16px',
            whiteSpace: 'nowrap', overflow: full ? 'hidden' : 'visible', textOverflow: full ? 'ellipsis' : 'clip' }}>{l}</span>
        );
        const wrapStyle = full
          ? { display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, minWidth: 0 }
          : { display: 'flex', alignItems: 'center' };
        return onChange ? (
          <button key={l} role="tab" aria-selected={i === index} onClick={() => onChange(i)}
            style={{ border: 0, background: 'transparent', cursor: 'pointer', padding: 0, ...wrapStyle }}>{inner}</button>
        ) : <div key={l} style={wrapStyle}>{inner}</div>;
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

// Full-width scan-mode bar pinned to the camera view's bottom edge — mirrors
// the app's ScanModeSwitcher (GlassSegmentedControl, equalWidthSegments,
// opaque dark bar) that switches between 의약품 식별 / 사용기한 확인 / 사진 읽기.
function ScanModeBar({ modes, modeIndex, onModeChange }) {
  if (!modes) return null;
  return (
    <div style={{ position: 'absolute', left: 16, right: 16, bottom: 30 }}>
      <SegPill labels={modes} index={modeIndex} onChange={onModeChange} dark full height={44} fs={12.5}
        bg={CAMERA} border="rgba(255,255,255,0.06)" indicatorColor="#0066FF" selectedColor="#fff" />
    </div>
  );
}

// Faithful camera scanner — barcode focused, package identified.
function ScannerScreen({ modes, modeIndex = 0, onModeChange }) {
  const s = useScr();
  return (
    <div style={{ height: '100%', position: 'relative', background: 'radial-gradient(120% 80% at 50% 34%, #4a4a4a 0%, #2b2b2b 55%, #161616 100%)', overflow: 'hidden' }}>
      {/* simulated package — centered inside the focus frame */}
      <div style={{ position: 'absolute', top: 56, left: 0, right: 0, bottom: 196, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: 182, height: 120, transform: 'rotate(-5deg)', borderRadius: 10, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.10)', boxShadow: '0 18px 40px rgba(0,0,0,0.4)', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', bottom: 12, left: 14, right: 14, height: 15, background: 'repeating-linear-gradient(90deg,rgba(255,255,255,0.55) 0 2px,transparent 2px 4px)' }} />
        </div>
      </div>
      {/* focus brackets */}
      <div style={{ position: 'absolute', top: 56, left: 0, right: 0, bottom: 196, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ScanCorners size={204} />
      </div>
      {/* result banner */}
      <div style={{ position: 'absolute', left: 16, right: 16, bottom: 88 }}>
        <div style={{ background: CAMERA, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.6, color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-sans)' }}>{s.identified}</span>
            <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.44, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: 'var(--font-sans)' }}>{s.drugName}</span>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: 999, flex: '0 0 44px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0066FF' }}>
            <MIcon name="arrow_forward" size={24} color="#fff" />
          </div>
        </div>
      </div>
      <ScanModeBar modes={modes} modeIndex={modeIndex} onModeChange={onModeChange} />
    </div>
  );
}

// "사진 읽기" — AI describes the scene in a photo (not a document read-out).
// Mirrors the app's in-camera OCR result: a dark panel replaces the focus
// frame, streaming the description with the read-aloud sentence highlighted,
// a close button top-right and a voice badge bottom-right
// (scanner_ready_view.dart's _OcrDebugOverlay), plus the same result banner
// shell used by the other modes just above the scan-mode bar.
function OcrScreen({ modes, modeIndex = 2, onModeChange }) {
  const s = useScr();
  return (
    <div style={{ height: '100%', position: 'relative', background: 'radial-gradient(120% 80% at 50% 34%, #4a4a4a 0%, #2b2b2b 55%, #161616 100%)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 56, left: 0, right: 0, bottom: 196, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: 260, height: 240, borderRadius: 22, background: 'rgba(26,26,26,0.7)', padding: '26px 22px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 600, lineHeight: 1.5, color: 'rgba(255,255,255,0.55)' }}>{s.ocrLine1}</span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 700, lineHeight: 1.5, color: '#FFD700' }}>{s.ocrLine2}</span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 600, lineHeight: 1.5, color: 'rgba(255,255,255,0.55)' }}>{s.ocrLine3}</span>
          </div>
          {/* close */}
          <div style={{ position: 'absolute', top: -10, right: -10, width: 28, height: 28, borderRadius: 999, background: 'rgba(26,26,26,0.94)', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 4px 12px rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MIcon name="close" size={15} color="#fff" />
          </div>
          {/* voice badge — replays the reading */}
          <div style={{ position: 'absolute', bottom: -12, right: -12, width: 36, height: 36, borderRadius: 999, background: '#0066FF', border: '1px solid rgba(255,255,255,0.4)', boxShadow: '0 4px 12px rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimWave size={15} color="#fff" />
          </div>
        </div>
      </div>
      {/* result banner — same shell as the other modes */}
      <div style={{ position: 'absolute', left: 16, right: 16, bottom: 88 }}>
        <div style={{ background: CAMERA, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.6, color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-sans)' }}>{s.sceneLabel}</span>
            <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.2, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: 'var(--font-sans)' }}>{s.sceneTitle}</span>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: 999, flex: '0 0 44px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0066FF' }}>
            <MIcon name="photo_camera" size={22} color="#fff" />
          </div>
        </div>
      </div>
      <ScanModeBar modes={modes} modeIndex={modeIndex} onModeChange={onModeChange} />
    </div>
  );
}

// "사용기한 확인" — narrow focus frame around the printed expiry line; the
// result banner surfaces the recognized date with a validity check instead
// of a drug name.
function ExpiryScreen({ modes, modeIndex = 1, onModeChange }) {
  const s = useScr();
  return (
    <div style={{ height: '100%', position: 'relative', background: 'radial-gradient(120% 80% at 50% 34%, #4a4a4a 0%, #2b2b2b 55%, #161616 100%)', overflow: 'hidden' }}>
      {/* simulated package edge with the printed expiry line */}
      <div style={{ position: 'absolute', top: 56, left: 0, right: 0, bottom: 196, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: 214, height: 74, transform: 'rotate(-3deg)', borderRadius: 8, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.10)', boxShadow: '0 18px 40px rgba(0,0,0,0.4)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 700, letterSpacing: 1.4, color: 'rgba(255,255,255,0.85)' }}>EXP 2027.03.15</span>
        </div>
      </div>
      {/* focus brackets — same size as the identify/OCR focus frame */}
      <div style={{ position: 'absolute', top: 56, left: 0, right: 0, bottom: 196, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ScanCorners size={204} />
      </div>
      {/* result banner — same shell as the identify/OCR banners: label + recognized date, no valid/expired badge (the app only speaks that via TTS) */}
      <div style={{ position: 'absolute', left: 16, right: 16, bottom: 88 }}>
        <div style={{ background: CAMERA, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.6, color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-sans)' }}>{s.expiryLabel}</span>
            <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.2, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: 'var(--font-sans)' }}>{s.expiryDate}</span>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: 999, flex: '0 0 44px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0066FF' }}>
            <MIcon name="photo_camera" size={22} color="#fff" />
          </div>
        </div>
      </div>
      <ScanModeBar modes={modes} modeIndex={modeIndex} onModeChange={onModeChange} />
    </div>
  );
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
  ScannerScreen, OcrScreen, ExpiryScreen, DrugAiScreen, AccessScreen, CAMERA,
});
