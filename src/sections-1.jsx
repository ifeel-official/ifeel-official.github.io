// sections-1.jsx — shared helpers, Nav, Hero, Problem
// Exports: Reveal, Eyebrow, BrandMark, StoreButtons, ThemeLangToggles, NavBar, HeroSection, ProblemSection

const { useState, useEffect, useRef } = React;

const APP_STORE = 'https://apps.apple.com/kr/app/id6770225626';
const PLAY_STORE = 'https://play.google.com/store/apps/details?id=kr.co.devstory.ifeel.app';

// ── reveal-on-scroll wrapper ──
function Reveal({ children, as = 'div', delay = 0, className = '', style = {}, ...rest }) {
  const ref = useRef(null);
  // Only "arm" (hide-then-animate) when the document is actually visible at mount.
  // In a hidden pane, arming is skipped so content is always shown — never stuck invisible.
  const [armed] = useState(() => typeof document !== 'undefined'
    && document.visibilityState === 'visible'
    && typeof IntersectionObserver !== 'undefined');
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!armed) return;
    const el = ref.current;
    if (!el) return;
    let done = false;
    const reveal = () => { if (!done) { done = true; setInView(true); } };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { reveal(); io.disconnect(); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    io.observe(el);
    const t = setTimeout(reveal, 1600); // safety net
    return () => { io.disconnect(); clearTimeout(t); };
  }, [armed]);
  const Tag = as;
  const cls = armed ? `reveal armed ${inView ? 'in' : ''}` : 'reveal';
  return <Tag ref={ref} className={`${cls} ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }} {...rest}>{children}</Tag>;
}

function Eyebrow({ children, style = {} }) {
  return <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700, letterSpacing: 1.6, textTransform: 'uppercase', color: 'var(--primary)', display: 'inline-block', ...style }}>{children}</span>;
}

function BrandMark({ height = 30, withWordmark = true }) {
  const { theme, lang } = useI18n();
  const R = (typeof window !== 'undefined' && window.__resources) || {};
  const src = theme === 'dark'
    ? (R.logoDark || 'assets/logo_dark_transparent.png')
    : (R.logoLight || 'assets/logo_light_transparent.png');
  const wordmark = lang === 'en' ? 'Yaksok' : '약속';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
      <img src={src} alt="" aria-hidden="true" style={{ width: height, height, display: 'block' }} />
      {withWordmark && <span style={{ fontFamily: 'var(--font-sans)', fontSize: height * 0.66, fontWeight: 800, letterSpacing: -0.6, color: 'var(--text)' }}>{wordmark}</span>}
    </span>
  );
}

// ── App store badges ──
function AppleGlyph({ s = 20 }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M17.05 12.04c-.03-2.6 2.13-3.85 2.22-3.91-1.21-1.77-3.1-2.01-3.77-2.04-1.6-.16-3.13.94-3.94.94-.81 0-2.07-.92-3.4-.9-1.75.03-3.36 1.02-4.26 2.58-1.82 3.15-.47 7.82 1.3 10.38.86 1.25 1.89 2.66 3.24 2.61 1.3-.05 1.79-.84 3.36-.84 1.57 0 2.01.84 3.39.81 1.4-.02 2.29-1.28 3.15-2.54.99-1.46 1.4-2.87 1.42-2.94-.03-.01-2.73-1.05-2.76-4.16zM14.6 4.42c.71-.86 1.19-2.06 1.06-3.25-1.02.04-2.26.68-3 1.54-.66.76-1.24 1.98-1.08 3.15 1.14.09 2.3-.58 3.02-1.44z"/></svg>
  );
}
function PlayGlyph({ s = 18 }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M3.6 2.2c-.25.26-.4.66-.4 1.18v17.24c0 .52.15.92.4 1.18l.06.06L13.4 12.07v-.14L3.66 2.14l-.06.06z" fill="#00C4FF"/>
      <path d="M16.6 15.36l-3.2-3.29v-.14l3.2-3.29.07.04 3.79 2.16c1.08.62 1.08 1.62 0 2.24l-3.79 2.16-.07.06z" fill="#FFCE00"/>
      <path d="M16.67 15.3L13.4 12 3.6 21.8c.36.38.94.42 1.6.05l11.47-6.55z" fill="#FF3D44"/>
      <path d="M16.67 8.7L5.2 2.15c-.66-.38-1.24-.33-1.6.05L13.4 12l3.27-3.3z" fill="#00ED76"/>
    </svg>
  );
}
function StoreButtons({ block = false, stack = false, placement = 'hero' }) {
  const { S } = useI18n();
  const track = (store) => {
    if (typeof window.gtag === 'function') window.gtag('event', 'store_click', { store, placement });
  };
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 11, textDecoration: 'none',
    background: 'var(--text)', color: 'var(--page-bg)', borderRadius: 14,
    padding: '12px 20px 12px 18px', minHeight: 56, boxSizing: 'border-box',
    boxShadow: 'var(--shadow-card)', transition: 'transform .15s ease, opacity .15s ease',
  };
  const sub = { fontSize: 11, fontWeight: 600, letterSpacing: 0.4, opacity: 0.78, lineHeight: 1, marginBottom: 3 };
  const main = { fontSize: 18, fontWeight: 700, letterSpacing: -0.3, lineHeight: 1, fontFamily: 'var(--font-sans)' };
  const hov = (e, v) => { e.currentTarget.style.transform = v ? 'translateY(-2px)' : 'translateY(0)'; e.currentTarget.style.opacity = v ? '0.92' : '1'; };
  return (
    <div style={{ display: 'flex', gap: 12, flexDirection: stack ? 'column' : 'row', flexWrap: 'wrap', width: block ? '100%' : 'auto' }}>
      <a href={APP_STORE} target="_blank" rel="noopener" style={{ ...base, color: 'var(--page-bg)' }} aria-label={`${S.store.apple2} — ${S.store.apple1}`} onMouseEnter={(e) => hov(e, 1)} onMouseLeave={(e) => hov(e, 0)} onClick={() => track('app_store')}>
        <span style={{ color: 'var(--page-bg)', display: 'flex' }}><AppleGlyph s={24} /></span>
        <span style={{ textAlign: 'left' }}><span style={{ ...sub, display: 'block' }}>{S.store.apple1}</span><span style={main}>{S.store.apple2}</span></span>
      </a>
      <a href={PLAY_STORE} target="_blank" rel="noopener" style={base} aria-label={`${S.store.google2} — ${S.store.google1}`} onMouseEnter={(e) => hov(e, 1)} onMouseLeave={(e) => hov(e, 0)} onClick={() => track('play_store')}>
        <PlayGlyph s={22} />
        <span style={{ textAlign: 'left' }}><span style={{ ...sub, display: 'block' }}>{S.store.google1}</span><span style={main}>{S.store.google2}</span></span>
      </a>
    </div>
  );
}

// ── Theme + language toggles ──
function ThemeLangToggles() {
  const { lang, setLang, theme, setTheme, S } = useI18n();
  const btn = {
    height: 42, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 999,
    cursor: 'pointer', color: 'var(--text)', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 14,
  };
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <button type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        aria-label={theme === 'dark' ? S.a11y.themeToLight : S.a11y.themeToDark}
        style={{ ...btn, width: 42, padding: 0 }}>
        <MIcon name={theme === 'dark' ? 'light_mode' : 'dark_mode'} size={21} color="var(--text)" />
      </button>
      <button type="button" onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
        aria-label={lang === 'ko' ? S.a11y.langToEn : S.a11y.langToKo}
        style={{ ...btn, padding: '0 14px', minWidth: 64 }}>
        <MIcon name="language" size={18} color="var(--text)" />
        <span aria-hidden="true">{lang === 'ko' ? 'EN' : 'KO'}</span>
      </button>
    </div>
  );
}

// ── Nav ──
function NavBar() {
  const { S } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  const links = [['#problem', S.nav.problem], ['#features', S.nav.features], ['#accessibility', S.nav.accessibility]];
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: scrolled ? 'var(--glass-nav)' : 'transparent',
      backdropFilter: scrolled ? 'saturate(180%) blur(16px)' : 'none', WebkitBackdropFilter: scrolled ? 'saturate(180%) blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--hairline)' : '1px solid transparent', transition: 'background .25s, border-color .25s',
    }}>
      <nav aria-label={S.a11y.langToggle === 'Language' ? 'Primary' : '주요 메뉴'} style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '14px 22px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <a href="#top" style={{ textDecoration: 'none', display: 'flex' }} aria-label="약속 Yaksok"><BrandMark height={28} /></a>
        <div className="nav-links" style={{ display: 'flex', gap: 4, marginLeft: 12 }}>
          {links.map(([href, label]) => (
            <a key={href} href={href} style={{ textDecoration: 'none', color: 'var(--sub-text)', fontWeight: 600, fontSize: 15, padding: '8px 12px', borderRadius: 9, fontFamily: 'var(--font-sans)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--sub-text)'}>{label}</a>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <ThemeLangToggles />
        <a className="nav-cta" href="#download" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none', background: 'var(--primary)', color: '#fff',
          fontWeight: 700, fontSize: 15, padding: '0 18px', height: 42, borderRadius: 999, fontFamily: 'var(--font-sans)',
        }}>
          <MIcon name="download" size={18} color="#fff" />{S.nav.download}
        </a>
      </nav>
    </header>
  );
}

// ── Hero ──
function HeroSection() {
  const { S, lang } = useI18n();
  const heroMockup = lang === 'en' ? 'assets/hero-app-mockup-en.png' : 'assets/hero-app-mockup-ko.png';
  return (
    <section id="top" aria-labelledby="hero-h" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* ambient scan-bracket motif */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(64% 48% at 74% 42%, rgba(0,102,255,0.09), transparent 62%)' }} />
      <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '40px 22px 64px', position: 'relative' }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 48, alignItems: 'center' }}>
          <div>
            <Reveal><Eyebrow>{S.hero.eyebrow}</Eyebrow></Reveal>
            <Reveal as="h1" id="hero-h" delay={60} style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(40px, 6.4vw, 68px)', fontWeight: 800, letterSpacing: -2.4, lineHeight: 1.06, color: 'var(--text)', margin: '18px 0 0' }}>
              {S.hero.headline.map((l, i) => <span key={i} style={{ display: 'block' }}>{l}</span>)}
            </Reveal>
            <Reveal as="p" delay={130} style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(17px, 1.7vw, 20px)', lineHeight: 1.58, color: 'var(--sub-text)', margin: '22px 0 0', maxWidth: 520, textWrap: 'pretty' }}>
              {S.hero.sub}
            </Reveal>
            <Reveal delay={200} style={{ marginTop: 30 }}><StoreButtons /></Reveal>
            {S.hero.trust && (
              <Reveal delay={260} style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 24 }}>
                <MIcon name="verified_user" size={18} color="var(--primary)" />
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--hint-text)', lineHeight: 1.45 }}>{S.hero.trust}</span>
              </Reveal>
            )}
          </div>
          <Reveal delay={120} style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={heroMockup} alt={S.a11y.phoneShowcase} style={{ width: '100%', maxWidth: 620, height: 'auto', filter: 'drop-shadow(0 30px 60px rgba(16,24,40,0.25))' }} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── Problem ──
function StatCard({ n, l, big }) {
  return (
    <div style={{
      background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 18,
      padding: big ? '26px 24px' : '22px 22px', boxShadow: 'var(--shadow-card)', display: 'flex', flexDirection: 'column', gap: 8, height: '100%',
    }}>
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: big ? 'clamp(34px, 4.6vw, 46px)' : 'clamp(28px, 3.6vw, 38px)', fontWeight: 800, letterSpacing: -1.4, color: 'var(--primary)', lineHeight: 1 }}>{n}</span>
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 500, color: 'var(--sub-text)', lineHeight: 1.45, textWrap: 'pretty' }}>{l}</span>
    </div>
  );
}

function ProblemSection() {
  const { S } = useI18n();
  const p = S.problem;
  return (
    <section id="problem" aria-labelledby="problem-h" style={{ background: 'var(--section-alt)', borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)' }}>
      <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '96px 22px 100px' }}>
        <Reveal><Eyebrow>{p.eyebrow}</Eyebrow></Reveal>
        <Reveal as="h2" id="problem-h" delay={60} style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(31px, 4.6vw, 50px)', fontWeight: 800, letterSpacing: -1.8, lineHeight: 1.12, color: 'var(--text)', margin: '16px 0 0', textWrap: 'balance' }}>
          {p.heading.map((l, i) => <span key={i} style={{ display: 'block', color: i === 1 ? 'var(--primary)' : 'var(--text)' }}>{l}</span>)}
        </Reveal>
        <Reveal as="p" delay={120} style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(17px, 1.7vw, 20px)', lineHeight: 1.6, color: 'var(--sub-text)', margin: '24px 0 0', maxWidth: 620, textWrap: 'pretty' }}>{p.intro}</Reveal>

        <div className="stat-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 60 }}>
          {p.stats.map((s, i) => <Reveal key={i} delay={i * 90}><StatCard n={s.n} l={s.l} big /></Reveal>)}
        </div>

        <Reveal as="p" delay={120} style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, letterSpacing: -0.9, color: 'var(--text)', margin: '56px 0 0', textWrap: 'balance' }}>{p.closing}</Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { Reveal, Eyebrow, BrandMark, StoreButtons, ThemeLangToggles, NavBar, HeroSection, ProblemSection, APP_STORE, PLAY_STORE });
