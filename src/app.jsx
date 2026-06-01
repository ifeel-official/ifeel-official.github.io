// app.jsx — root: theme + language state, system defaults, persistence, render
const { useState: useAppState, useEffect: useAppEffect } = React;

function getInitialTheme() {
  try { const s = localStorage.getItem('yk-theme'); if (s === 'light' || s === 'dark') return s; } catch (e) {}
  return (typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
}
function getInitialLang() {
  try { const s = localStorage.getItem('yk-lang'); if (s === 'ko' || s === 'en') return s; } catch (e) {}
  const n = (navigator.language || 'ko').toLowerCase();
  return n.startsWith('ko') ? 'ko' : 'en';
}

function App() {
  const [theme, setTheme] = useAppState(getInitialTheme);
  const [lang, setLang] = useAppState(getInitialLang);

  useAppEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('yk-theme', theme); } catch (e) {}
    const m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute('content', theme === 'dark' ? '#131316' : '#F8FAFC');
  }, [theme]);

  useAppEffect(() => {
    const S = STRINGS[lang];
    document.documentElement.setAttribute('lang', S.htmlLang);
    try { localStorage.setItem('yk-lang', lang); } catch (e) {}
    document.title = S.metaTitle;
    const md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', lang === 'ko'
      ? '약속(Yaksok)은 스마트폰 카메라로 의약품을 식별하고, 복약 정보를 누구나 이해할 수 있는 쉬운 말로 읽어드리는 배리어프리 복약 가이드 앱입니다.'
      : 'Yaksok identifies your medicine with your phone camera and reads the dosage and warnings aloud in plain language — a barrier-free medication guide for everyone.');
  }, [lang]);

  const S = STRINGS[lang];
  const ctx = { lang, setLang, theme, setTheme, S };

  return (
    <LangCtx.Provider value={ctx}>
      <a href="#main" className="skip-link">{S.a11y.skip}</a>
      <NavBar />
      <main id="main">
        <HeroSection />
        <ProblemSection />
        <FeaturesSection />
        <AccessSection />
        <CtaSection />
      </main>
      <Footer />
    </LangCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
