// sections-2.jsx — Features showcase, AI demo, Accessibility, CTA, Footer
// Exports: FeaturesSection, DemoSection, AccessSection, CtaSection, Footer

const { useState: useS2, useEffect: useE2, useRef: useR2 } = React;

// ── TTS voice selection ────────────────────────────────────────────────
// Browsers ship several voices per language; the default is often a low-quality
// fallback that sounds raspy/hoarse (especially en-US). We explicitly pick the
// best available natural voice so read-aloud sounds clear.
function pickVoice(voices, lang) {
  const want = lang === 'en' ? 'en' : 'ko';
  const matches = voices.filter(v => (v.lang || '').toLowerCase().startsWith(want));
  if (!matches.length) return null;
  // Higher score = better. Prefer modern "natural/neural" engines and known-good
  // named voices; demote eSpeak and other low-fidelity defaults.
  const score = (v) => {
    const n = (v.name || '').toLowerCase();
    let s = 0;
    if (/natural|neural|premium|enhanced/.test(n)) s += 60;
    if (/google/.test(n)) s += 40;
    if (/microsoft/.test(n)) s += 25;
    if (/(samantha|ava|allison|aaron|jenny|aria|nova|siri|nicky|evan|joelle)/.test(n)) s += 30; // Apple/MS quality voices
    if (/(yuna|sora|heami|injoon)/.test(n)) s += 30; // Apple/MS Korean quality voices
    if (v.localService) s += 8;
    if (/espeak|compact|pico|festival/.test(n)) s -= 50; // raspy/robotic engines
    if ((v.lang || '').toLowerCase() === (want === 'en' ? 'en-us' : 'ko-kr')) s += 6;
    return s;
  };
  return matches.slice().sort((a, b) => score(b) - score(a))[0];
}

// Voices load asynchronously; resolve once they're available.
function getVoicesAsync() {
  return new Promise((resolve) => {
    const synth = window.speechSynthesis;
    if (!synth) { resolve([]); return; }
    let v = synth.getVoices();
    if (v && v.length) { resolve(v); return; }
    let done = false;
    const finish = () => { if (done) return; done = true; resolve(synth.getVoices() || []); };
    synth.addEventListener && synth.addEventListener('voiceschanged', finish, { once: true });
    setTimeout(finish, 600); // fallback if the event never fires
  });
}

function useMedia(q) {
  const [m, setM] = useS2(() => (typeof matchMedia !== 'undefined' ? matchMedia(q).matches : true));
  useE2(() => {
    const mq = matchMedia(q);
    const fn = () => setM(mq.matches); fn();
    mq.addEventListener ? mq.addEventListener('change', fn) : mq.addListener(fn);
    return () => (mq.removeEventListener ? mq.removeEventListener('change', fn) : mq.removeListener(fn));
  }, [q]);
  return m;
}

function SectionHead({ eyebrow, heading, sub, center }) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left', maxWidth: center ? 720 : 760, margin: center ? '0 auto' : 0 }}>
      <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>
      <Reveal as="h2" delay={60} style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(30px, 4.4vw, 46px)', fontWeight: 800, letterSpacing: -1.6, lineHeight: 1.13, color: 'var(--text)', margin: '16px 0 0', textWrap: 'balance' }}>
        {heading.map((l, i) => <span key={i} style={{ display: 'block' }}>{l}</span>)}
      </Reveal>
      {sub && <Reveal as="p" delay={120} style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(17px, 1.7vw, 19px)', lineHeight: 1.6, color: 'var(--sub-text)', margin: center ? '20px auto 0' : '20px 0 0', maxWidth: 640, textWrap: 'pretty' }}>{sub}</Reveal>}
    </div>
  );
}

// ── Features: scroll-driven phone showcase ──
function featureScreens(theme, modes, onModeChange) {
  const td = theme === 'dark';
  return [
    { dark: true, label: '의약품 식별 화면', el: <ScannerScreen modes={modes} modeIndex={0} onModeChange={onModeChange} /> },
    { dark: true, label: '사용기한 확인 화면', el: <ExpiryScreen modes={modes} modeIndex={1} onModeChange={onModeChange} /> },
    { dark: true, label: '사진 읽기 화면', el: <OcrScreen modes={modes} modeIndex={2} onModeChange={onModeChange} /> },
    { dark: td, label: 'AI 쉬운 설명 화면', el: <DrugDemoScreen dark={td} /> },
  ];
}

// (feature blocks are now rendered inline in FeaturesSection with scroll-synced active state)

// Self-contained drug-detail demo screen used as feature 03's device.
// Two modes — AI plain-language (default) and the official text — with REAL
// text-to-speech read-aloud (Web Speech API), mirroring the app's TTS flow.
const DEMO_KEYS = ['AI 쉬운 설명', '원문'];

function DrugDemoScreen({ dark }) {
  const { S, lang } = useI18n();
  const d = S.demo;
  const [mode, setMode] = useS2(0);
  const [reading, setReading] = useS2(-1);
  const sections = d.sections[DEMO_KEYS[mode]];
  const fallback = useR2(null);

  const stop = () => {
    try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) {}
    if (fallback.current) { clearInterval(fallback.current); fallback.current = null; }
    setReading(-1);
  };
  useE2(() => () => stop(), []);
  useE2(() => { stop(); }, [mode]);

  const onRead = () => {
    if (reading >= 0) { stop(); return; }
    setReading(0);
    const synth = window.speechSynthesis;
    if (synth && typeof SpeechSynthesisUtterance !== 'undefined') {
      synth.cancel();
      getVoicesAsync().then((voices) => {
        const voice = pickVoice(voices, lang);
        sections.forEach((s, i) => {
          const u = new SpeechSynthesisUtterance(`${s.label}. ${s.body}`);
          u.lang = lang === 'en' ? 'en-US' : 'ko-KR';
          if (voice) u.voice = voice;
          u.rate = 1.0; u.pitch = 1; u.volume = 1;
          u.onstart = () => setReading(i);
          u.onend = () => { if (i === sections.length - 1) setReading(-1); };
          synth.speak(u);
        });
      });
    } else {
      // no speech engine — advance the highlight on a timer so the cue still reads
      let n = 0;
      fallback.current = setInterval(() => {
        n += 1;
        if (n >= sections.length) { clearInterval(fallback.current); fallback.current = null; setReading(-1); }
        else setReading(n);
      }, 1900);
    }
  };
  return <InteractiveDrugScreen dark={dark} mode={mode} setMode={setMode} reading={reading} onRead={onRead} />;
}

function RagCard({ S }) {
  const f = S.features;
  return (
    <Reveal style={{ marginTop: 8 }}>
      <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--card-bg)', border: '1px solid var(--primary)', borderRadius: 22, padding: 'clamp(24px, 4vw, 38px)', boxShadow: 'var(--shadow-card)' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(60% 120% at 100% 0%, rgba(0,102,255,0.12), transparent 60%)' }} />
        <div style={{ position: 'relative', display: 'flex', gap: 22, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 8px 24px rgba(0,102,255,0.3)' }}>
            <MIcon name="medication" size={30} color="#fff" />
          </div>
          <div style={{ flex: 1, minWidth: 260 }}>
            <span style={{ display: 'inline-block', fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--primary)', background: 'rgba(0,102,255,0.10)', padding: '5px 11px', borderRadius: 999 }}>{f.soonTag}</span>
            <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(20px, 2.4vw, 26px)', fontWeight: 800, letterSpacing: -0.6, color: 'var(--text)', margin: '14px 0 0', textWrap: 'balance' }}>{f.soonTitle}</h3>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 17, lineHeight: 1.6, color: 'var(--sub-text)', margin: '12px 0 0', maxWidth: 720, textWrap: 'pretty' }}>{f.soonBody}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 16 }}>
              <MIcon name="schedule" size={17} color="var(--hint-text)" />
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, color: 'var(--hint-text)' }}>{f.soonNote}</span>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function FeaturesSection() {
  const { S, theme } = useI18n();
  const wide = useMedia('(min-width: 920px)');
  const [active, setActive] = useS2(0);
  const items = S.features.items;
  const blockRefs = useR2([]);

  useE2(() => {
    if (!wide) return;
    const onScroll = () => {
      const mid = window.innerHeight / 2;
      let best = 0, bestDist = Infinity;
      blockRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const c = r.top + r.height / 2;
        const dist = Math.abs(c - mid);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      setActive(best);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [wide, items.length]);

  const jumpTo = (i) => {
    setActive(i);
    const el = blockRefs.current[i];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  const screens = featureScreens(theme, S.features.modes, jumpTo);

  return (
    <section id="features" aria-labelledby="feat-h" style={{ position: 'relative' }}>
      <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '92px 22px 40px' }}>
        <div id="feat-h"><SectionHead eyebrow={S.features.eyebrow} heading={S.features.heading} sub={S.features.sub} /></div>
      </div>

      {wide ? (
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 22px 96px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 56, alignItems: 'start' }}>
          <div>
            {items.map((it, i) => {
              const on = active === i;
              return (
                <div key={i} ref={(el) => { blockRefs.current[i] = el; }}
                  style={{ minHeight: '78vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <span aria-hidden="true" style={{ width: 34, height: 3, borderRadius: 2, background: on ? 'var(--primary)' : 'var(--hairline)', transition: 'background .4s' }} />
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700, letterSpacing: 1.6, color: on ? 'var(--primary)' : 'var(--hint-text)', transition: 'color .4s' }}>{it.tag}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(24px, 3vw, 33px)', fontWeight: 800, letterSpacing: -1, lineHeight: 1.18, color: 'var(--text)', margin: '16px 0 0', textWrap: 'balance', opacity: on ? 1 : 0.42, transition: 'opacity .4s' }}>{it.title}</h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(16px, 1.6vw, 18px)', lineHeight: 1.6, color: 'var(--sub-text)', margin: '14px 0 0', maxWidth: 460, textWrap: 'pretty', opacity: on ? 1 : 0.42, transition: 'opacity .4s' }}>{it.body}</p>
                </div>
              );
            })}
          </div>
          <div style={{ position: 'sticky', top: 'calc(50vh - 322px)', height: 645, alignSelf: 'start' }}>
            <div style={{ position: 'relative', width: 300, height: 645, margin: '0 auto' }}>
              {screens.map((s, i) => (
                <div key={i} aria-hidden={active !== i} style={{ position: 'absolute', inset: 0, opacity: active === i ? 1 : 0, transform: active === i ? 'scale(1)' : 'scale(0.97)', transition: 'opacity .45s ease, transform .45s ease', pointerEvents: active === i ? 'auto' : 'none' }}>
                  <PhoneFrame w={300} screenDark={s.dark} glow={active === i} label={`${S.a11y.phoneShowcase} — ${s.label}`}>{s.el}</PhoneFrame>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: 540, margin: '0 auto', padding: '0 22px 96px', display: 'flex', flexDirection: 'column', gap: 64 }}>
          <Reveal style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={(typeof window !== 'undefined' && window.__resources && window.__resources.appIcon) || 'assets/app-icon.png'} alt="" aria-hidden="true" style={{ width: 76, height: 76, borderRadius: 18, boxShadow: '0 8px 24px rgba(0,0,0,0.10)' }} />
          </Reveal>
          {items.map((it, i) => (
            <Reveal key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26 }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700, letterSpacing: 1.6, color: 'var(--primary)' }}>{it.tag}</span>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(22px, 6vw, 28px)', fontWeight: 800, letterSpacing: -0.8, lineHeight: 1.2, color: 'var(--text)', margin: '10px 0 0', textWrap: 'balance' }}>{it.title}</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 17, lineHeight: 1.6, color: 'var(--sub-text)', margin: '12px auto 0', maxWidth: 420, textWrap: 'pretty' }}>{it.body}</p>
              </div>
              <PhoneFrame w={256} screenDark={screens[i].dark} label={`${S.a11y.phoneShowcase} — ${screens[i].label}`}>{screens[i].el}</PhoneFrame>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}

// ── AI demo: interactive drug screen ──
function InteractiveDrugScreen({ dark, mode, setMode, reading, onRead }) {
  const { S } = useI18n();
  const d = S.demo;
  const c = scrColors(dark);
  const sections = d.sections[DEMO_KEYS[mode]];
  return (
    <div style={{ height: '100%', background: c.surface, position: 'relative', paddingTop: 50, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '0 22px', overflow: 'hidden', flex: 1, WebkitMaskImage: 'linear-gradient(to bottom, #000 72%, transparent 94%)', maskImage: 'linear-gradient(to bottom, #000 72%, transparent 94%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6, marginLeft: -6 }}>
          <MIcon name="chevron_left" size={30} color={c.text} />
        </div>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 700, letterSpacing: 1, color: c.hint }}>{d.drug.cat}</span>
        <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 26, fontWeight: 800, letterSpacing: -0.9, color: c.text, margin: '5px 0 2px', lineHeight: 1.15 }}>{d.drug.name}</h3>
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {sections.map((s, n) => {
            const act = reading === n;
            return (
              <div key={DEMO_KEYS[mode] + n}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}>
                  <span style={{ width: 4, height: 18, borderRadius: 2, background: c.primary }} />
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 700, letterSpacing: -0.3, color: act ? c.primary : c.text }}>{s.label}</span>
                </div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 600, lineHeight: 1.5, letterSpacing: -0.1, color: act ? c.primary : c.text, margin: 0, transition: 'color .2s' }}>{s.body}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ position: 'relative', padding: '10px 18px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <SegPill labels={['AI', d.modes[0]]} index={mode} onChange={(i) => setMode(i)} dark={dark} height={44} fs={14} />
        <div style={{ flex: 1 }} />
        <button type="button" onClick={onRead} aria-pressed={reading >= 0} aria-label={reading >= 0 ? d.stop : d.read}
          style={{ width: 50, height: 50, borderRadius: 999, border: `1px solid ${reading >= 0 ? 'transparent' : c.glassBorder}`, background: reading >= 0 ? c.primary : c.glassFill, boxShadow: c.glassShadow, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {reading >= 0 ? <AnimWave size={22} color="#fff" /> : <MIcon name="graphic_eq" size={24} color={c.text} />}
        </button>
      </div>
    </div>
  );
}

function DemoSection() {
  const { S, theme } = useI18n();
  const d = S.demo;
  const [mode, setMode] = useS2(2);
  const [reading, setReading] = useS2(-1);
  const timer = useR2(null);
  const keys = ['원문', 'e약은요', 'AI 쉬운 설명'];
  const count = d.sections[keys[mode]].length;
  useE2(() => () => clearInterval(timer.current), []);
  useE2(() => { clearInterval(timer.current); setReading(-1); }, [mode]);
  const onRead = () => {
    if (reading >= 0) { clearInterval(timer.current); setReading(-1); return; }
    let n = 0; setReading(0);
    timer.current = setInterval(() => {
      n += 1;
      if (n >= count) { clearInterval(timer.current); setReading(-1); }
      else setReading(n);
    }, 1700);
  };
  return (
    <section id="demo" aria-labelledby="demo-h" style={{ background: 'var(--section-alt)', borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)' }}>
      <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '92px 22px 96px' }}>
        <div className="demo-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 56, alignItems: 'center' }}>
          <div>
            <div id="demo-h"><SectionHead eyebrow={d.eyebrow} heading={d.heading} sub={d.sub} /></div>
            <Reveal delay={160} style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 26, color: 'var(--hint-text)' }}>
              <MIcon name="touch_app" size={20} color="var(--primary)" />
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600 }}>{d.modeHint} · {d.read}</span>
            </Reveal>
          </div>
          <Reveal delay={120} style={{ display: 'flex', justifyContent: 'center' }}>
            <PhoneFrame w={326} screenDark={theme === 'dark'} glow label={`${S.a11y.phoneShowcase} — ${d.eyebrow}`}>
              <InteractiveDrugScreen dark={theme === 'dark'} mode={mode} setMode={setMode} reading={reading} onRead={onRead} />
            </PhoneFrame>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── Accessibility ──
function AccessSection() {
  const { S } = useI18n();
  const a = S.access;
  return (
    <section id="accessibility" aria-labelledby="acc-h" style={{ position: 'relative' }}>
      <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '92px 22px 96px' }}>
        <div id="acc-h"><SectionHead eyebrow={a.eyebrow} heading={a.heading} sub={a.intro} /></div>
        <div className="acc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 44 }}>
          {a.items.map((it, i) => (
            <Reveal key={i} delay={(i % 3) * 70} style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 18, padding: '26px 24px', boxShadow: 'var(--shadow-card)' }}>
              <div style={{ width: 48, height: 48, borderRadius: 13, background: 'rgba(0,102,255,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MIcon name={it.icon} size={26} color="var(--primary)" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 19, fontWeight: 700, letterSpacing: -0.3, color: 'var(--text)', margin: '18px 0 0' }}>{it.title}</h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15.5, lineHeight: 1.55, color: 'var(--sub-text)', margin: '8px 0 0', textWrap: 'pretty' }}>{it.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Download CTA ──
function CtaSection() {
  const { S, theme } = useI18n();
  return (
    <section id="download" aria-labelledby="cta-h" style={{ background: 'var(--section-alt)', borderTop: '1px solid var(--hairline)' }}>
      <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '96px 22px 104px', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(50% 70% at 50% 0%, rgba(0,102,255,0.12), transparent 60%)', pointerEvents: 'none' }} />
        <Reveal style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <img src={(typeof window !== 'undefined' && window.__resources && window.__resources.appIcon) || 'assets/app-icon.png'} alt="" aria-hidden="true" style={{ width: 78, height: 78, borderRadius: 18, boxShadow: 'var(--shadow-card)' }} />
          <h2 id="cta-h" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(30px, 5vw, 50px)', fontWeight: 800, letterSpacing: -1.8, lineHeight: 1.1, color: 'var(--text)', margin: '26px 0 0', textWrap: 'balance' }}>
            {S.cta.heading.map((l, i) => <span key={i} style={{ display: 'block' }}>{l}</span>)}
          </h2>
          <div style={{ marginTop: 30 }}><StoreButtons placement="download_cta" /></div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Footer ──
function Footer() {
  const { S } = useI18n();
  const f = S.footer;
  const links = [['#problem', S.nav.problem], ['#features', S.nav.features], ['#accessibility', S.nav.accessibility], ['#download', S.nav.download]];
  return (
    <footer style={{ background: 'var(--page-bg)', borderTop: '1px solid var(--hairline)' }}>
      <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '64px 22px 48px' }}>
        <div className="foot-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 40 }}>
          <div>
            <BrandMark height={32} />
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, lineHeight: 1.6, color: 'var(--sub-text)', margin: '18px 0 0', maxWidth: 420, textWrap: 'pretty' }}>{f.tagline}</p>
            <div style={{ marginTop: 22 }}>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--hint-text)' }}>{f.contactLabel}</div>
              <a href={`mailto:${f.contact}`} style={{ fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 600, color: 'var(--primary)', textDecoration: 'none' }}>{f.contact}</a>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--hint-text)' }}>{f.navLabel}</div>
            <nav aria-label={f.navLabel} style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
              {links.map(([href, label]) => (
                <a key={href} href={href} style={{ fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 600, color: 'var(--sub-text)', textDecoration: 'none' }}>{label}</a>
              ))}
            </nav>
          </div>
        </div>

        <div style={{ marginTop: 40, paddingTop: 28, borderTop: '1px solid var(--hairline)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--hint-text)' }}>{f.copyright}</span>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 700, letterSpacing: 1.4, color: 'var(--hint-text)' }}>YAKSOK · iFeel</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { FeaturesSection, DemoSection, AccessSection, CtaSection, Footer, useMedia, SectionHead });
