/* global React, ReactDOM, AIScanPreview, AlertPreview, DashboardPreview, PhoneFrame, Glyph */

const { useState, useEffect } = React;

// ---------- Hero illustration: phone with "next dose" centerpiece ----------
function HeroVisual() {
  return (
    <div className="hero-stage">
      <div className="hero-orbit"></div>
      <div className="hero-orbit hero-orbit-2"></div>
      <PhoneFrame>
        <div className="hv-app">
          <div className="hv-head">
            <div>
              <div className="hv-eyebrow">좋은 아침이에요</div>
              <div className="hv-name">서연 님</div>
            </div>
            <div className="hv-avatar">서</div>
          </div>
          <div className="hv-card">
            <div className="hv-eb">다음 복용 · 13분 후</div>
            <div className="hv-time">9:00<span className="ampm">AM</span></div>
            <div className="hv-drug">아목시실린 500 mg</div>
            <div className="hv-sub">캡슐 한 알, 물과 함께</div>
            <div className="hv-wave" aria-hidden="true">
              {Array.from({length:18}).map((_,i)=>(
                <i key={i} style={{height:`${30 + Math.abs(Math.sin(i*0.9))*70}%`, animationDelay:`${i*60}ms`}} />
              ))}
            </div>
          </div>
          <div className="hv-list">
            <div className="hv-item done"><span className="t">7:00</span><span className="d"></span><span className="n">메트포르민</span><span className="s">완료</span></div>
            <div className="hv-item now"><span className="t">9:00</span><span className="d"></span><span className="n">아목시실린</span><span className="s">곧</span></div>
            <div className="hv-item"><span className="t">13:00</span><span className="d"></span><span className="n">리시노프릴</span></div>
          </div>
        </div>
      </PhoneFrame>

      {/* floating callouts */}
      <div className="hv-callout hv-c1">
        <div className="hv-c-dot" />
        <div>
          <div className="hv-c-lbl">AI 식별</div>
          <div className="hv-c-val">2만 종+</div>
        </div>
      </div>
      <div className="hv-callout hv-c2">
        <Glyph name="shield" size={20} color="#0F8A5F" />
        <div>
          <div className="hv-c-lbl">오복용 차단</div>
          <div className="hv-c-val" style={{color:"var(--ok-600)"}}>실시간</div>
        </div>
      </div>

      <style>{`
        .hero-stage {
          position: relative; width: 100%; height: 100%;
          display: grid; place-items: center;
        }
        .hero-orbit {
          position: absolute; width: 520px; height: 520px;
          border: 1px dashed var(--ink-300);
          border-radius: 50%;
          opacity: 0.5;
        }
        .hero-orbit-2 {
          width: 680px; height: 680px;
          border-color: var(--blue-200);
          opacity: 0.7;
        }
        .hv-app { display: flex; flex-direction: column; flex: 1; padding: 4px 0 0; }
        .hv-head {
          display: flex; justify-content: space-between; align-items: center;
          padding: 8px 24px 16px;
        }
        .hv-eyebrow { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-500); font-weight: 700; }
        .hv-name { font-size: 22px; font-weight: 700; color: var(--ink-900); letter-spacing: -0.02em; margin-top: 4px; }
        .hv-avatar { width: 40px; height: 40px; border-radius: 50%; background: var(--blue-100); color: var(--blue-700); display: grid; place-items: center; font-weight: 700; }
        .hv-card {
          margin: 0 20px;
          background: var(--ink-900);
          color: var(--paper-50);
          border-radius: 24px;
          padding: 22px;
        }
        .hv-eb { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--blue-400); font-weight: 700; }
        .hv-time { font-size: 56px; line-height: 1; font-weight: 700; letter-spacing: -0.03em; margin: 10px 0 8px; }
        .hv-time .ampm { font-size: 20px; color: var(--ink-300); margin-left: 4px; font-weight: 500; }
        .hv-drug { font-size: 16px; font-weight: 700; }
        .hv-sub { font-size: 13px; color: var(--paper-200); margin-top: 4px; }
        .hv-wave { display: flex; gap: 3px; align-items: flex-end; height: 24px; margin-top: 14px; }
        .hv-wave i {
          flex: 1; background: var(--blue-400); border-radius: 2px;
          animation: hvBounce 1.4s ease-in-out infinite;
          transform-origin: center;
        }
        @keyframes hvBounce {
          0%,100% { transform: scaleY(0.5); opacity: 0.5; }
          50% { transform: scaleY(1); opacity: 0.95; }
        }
        .hv-list { padding: 18px 24px 16px; display: flex; flex-direction: column; gap: 8px; }
        .hv-item {
          display: grid; grid-template-columns: 44px 10px 1fr auto;
          gap: 10px; align-items: center;
          padding: 10px 14px;
          background: var(--white);
          border: 1px solid var(--hairline);
          border-radius: 12px;
          font-size: 13px;
        }
        .hv-item .t { font-weight: 700; color: var(--ink-900); font-size: 13px; }
        .hv-item .d { width: 8px; height: 8px; border-radius: 50%; background: var(--ink-300); }
        .hv-item.done { opacity: 0.55; }
        .hv-item.done .d { background: var(--ok-600); }
        .hv-item.done .n { text-decoration: line-through; }
        .hv-item.now .d { background: var(--blue-600); box-shadow: 0 0 0 4px var(--blue-100); }
        .hv-item .n { color: var(--ink-900); font-weight: 600; }
        .hv-item .s {
          font-size: 10px; padding: 2px 8px; border-radius: 999px;
          background: var(--paper-100); color: var(--ink-500);
          font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;
        }
        .hv-item.now .s { background: var(--blue-600); color: var(--white); }

        .hv-callout {
          position: absolute;
          background: var(--white);
          border: 1px solid var(--hairline);
          border-radius: 14px;
          padding: 12px 16px;
          box-shadow: var(--shadow-md);
          display: flex; align-items: center; gap: 12px;
          animation: floaty 5s ease-in-out infinite;
        }
        .hv-c1 { top: 14%; left: -6%; }
        .hv-c2 { bottom: 16%; right: -2%; animation-delay: -2.5s; }
        .hv-c-dot {
          width: 28px; height: 28px; border-radius: 50%;
          background: linear-gradient(135deg, var(--blue-500), var(--blue-700));
          position: relative;
        }
        .hv-c-dot::after {
          content: ""; position: absolute; inset: 8px;
          background: var(--white); border-radius: 50%;
        }
        .hv-c-lbl { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-500); font-weight: 700; }
        .hv-c-val { font-size: 16px; font-weight: 700; color: var(--ink-900); letter-spacing: -0.02em; }

        @keyframes floaty {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @media (max-width: 720px) {
          .hv-c1 { left: 0; top: 8%; }
          .hv-c2 { right: 0; bottom: 12%; }
          .hero-orbit { width: 380px; height: 380px; }
          .hero-orbit-2 { width: 480px; height: 480px; }
        }
      `}</style>
    </div>
  );
}

// ---------- Showcase tab switcher ----------
function Showcase() {
  const [tab, setTab] = useState("scan");

  const tabs = [
    { id: "scan", num: "01", label: "AI 스캐닝" },
    { id: "alert", num: "02", label: "실시간 경고" },
    { id: "dash", num: "03", label: "대시보드 전환" },
  ];

  const copy = {
    scan: {
      h: "약병에 손을 대면, 이름을 들려드립니다.",
      p: "카메라가 약병을 인식하면 AI가 2만 종 이상의 의약품 데이터베이스에서 0.8초 안에 식별합니다. 약 이름, 용량, 복약법, 주의사항이 음성과 함께 화면에 출력됩니다.",
      i: [
        { k: "탭", t: "약병 위에 마우스를 올리거나 탭하면 스캔이 시작됩니다." },
        { k: "0.8s", t: "AI 모델이 형태·텍스트·바코드를 동시에 분석합니다." },
        { k: "🔊", t: "스피커 버튼을 누르면 모든 정보를 음성으로 다시 들을 수 있습니다." },
      ],
    },
    alert: {
      h: "한 번의 실수도 용납하지 않는, 즉각적 경고.",
      p: "복약 내역과 처방전을 실시간으로 대조해 중복·과다·금기 복용을 감지합니다. 화면이 흔들리는 시각적 피드백, 강한 햅틱 진동, 그리고 음성 경고가 동시에 작동합니다.",
      i: [
        { k: "트리거", t: "‘중복 복용 시뮬레이션’ 버튼으로 경고 인터랙션을 확인할 수 있습니다." },
        { k: "촉각", t: "퍼져나가는 링이 스마트폰의 진동 패턴을 시각화합니다." },
        { k: "확인", t: "경고는 두 번 탭으로만 해제됩니다 — 의도된 마찰입니다." },
      ],
    },
    dash: {
      h: "두 사람을 위한, 하나의 진실.",
      p: "동일한 데이터가 사용자에겐 ‘들리는 큰 글씨’로, 보호자와 의료진에겐 ‘읽히는 그래프’로 보여집니다. 토글 한 번이면 모드를 전환할 수 있고, 데이터는 실시간으로 동기화됩니다.",
      i: [
        { k: "토글", t: "상단 버튼으로 두 모드를 즉시 전환할 수 있습니다." },
        { k: "고대비", t: "본문 18px 최소, AAA 명도 대비, 단일 액센트 컬러." },
        { k: "보호자", t: "복약 준수율, 차단된 오복용, 실시간 로그까지 한눈에." },
      ],
    },
  }[tab];

  const Active = { scan: AIScanPreview, alert: AlertPreview, dash: DashboardPreview }[tab];

  return (
    <>
      <div className="showcase-tabs" role="tablist">
        {tabs.map(t => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            className={`showcase-tab ${tab === t.id ? "active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            <span className="tnum">{t.num}</span>
            {t.label}
          </button>
        ))}
      </div>

      <div className="showcase-stage">
        <div className="showcase-copy">
          <h3>{copy.h}</h3>
          <p>{copy.p}</p>
          <div className="showcase-instructions">
            {copy.i.map((it,i) => (
              <div className="instr" key={i}>
                <span className="k">{it.k}</span>
                <span className="t">{it.t}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="showcase-preview">
          <Active />
        </div>
      </div>
    </>
  );
}

// ---------- Mount ----------
function App() {
  // Reveal — fall back to immediate show; IntersectionObserver can be unreliable in some iframe hosts.
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    // Show everything in viewport on mount; observe the rest.
    const showImmediate = (el) => requestAnimationFrame(() => el.classList.add("in"));
    let io;
    try {
      io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.05 });
    } catch (_) { io = null; }

    els.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        showImmediate(el);
      } else if (io) {
        io.observe(el);
      } else {
        showImmediate(el);
      }
    });

    // Safety net: anything still hidden after 1.2s, force show.
    const fallback = setTimeout(() => {
      document.querySelectorAll(".reveal:not(.in)").forEach(el => el.classList.add("in"));
    }, 1200);

    return () => { if (io) io.disconnect(); clearTimeout(fallback); };
  }, []);

  return null;
}

// Mount each interactive island into its own root.
const heroMount = document.getElementById("hero-visual-root");
if (heroMount) ReactDOM.createRoot(heroMount).render(<HeroVisual />);

const showcaseMount = document.getElementById("showcase-root");
if (showcaseMount) ReactDOM.createRoot(showcaseMount).render(<Showcase />);

const featureScanMount = document.getElementById("feature-scan-root");
if (featureScanMount) ReactDOM.createRoot(featureScanMount).render(<FeatureScanCard />);

const featureAlertMount = document.getElementById("feature-alert-root");
if (featureAlertMount) ReactDOM.createRoot(featureAlertMount).render(<FeatureAlertCard />);

const featureSyncMount = document.getElementById("feature-sync-root");
if (featureSyncMount) ReactDOM.createRoot(featureSyncMount).render(<FeatureSyncCard />);

ReactDOM.createRoot(document.getElementById("app-root")).render(<App />);

// ---------- Small feature visuals ----------
function FeatureScanCard() {
  return (
    <div className="fv fv-scan">
      <div className="fv-grid" />
      <div className="fv-pill">
        <svg viewBox="0 0 200 80" width="180" height="72">
          <defs>
            <linearGradient id="pgrad" x1="0" x2="1">
              <stop offset="0.5" stopColor="#1E6BD6" />
              <stop offset="0.5" stopColor="#FFFFFF" />
            </linearGradient>
          </defs>
          <rect x="10" y="20" width="180" height="40" rx="20" fill="url(#pgrad)" stroke="#0A1B33" strokeWidth="2" />
          <line x1="100" y1="20" x2="100" y2="60" stroke="#0A1B33" strokeWidth="2" />
        </svg>
      </div>
      <div className="fv-scanline" />
      <div className="fv-tag">
        <Glyph name="check" size={14} color="#0F8A5F" stroke={3} />
        <span>아목시실린 500 mg · 99.2%</span>
      </div>
      <style>{`
        .fv { position: absolute; inset: 0; display: grid; place-items: center; overflow: hidden; }
        .fv-scan { background: linear-gradient(160deg, #ECF2FA, #FFFFFF); }
        .fv-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(var(--paper-200) 1px, transparent 1px),
            linear-gradient(90deg, var(--paper-200) 1px, transparent 1px);
          background-size: 24px 24px;
          opacity: 0.5;
          mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
        }
        .fv-pill { transform: rotate(-8deg); filter: drop-shadow(0 12px 24px rgba(10,27,51,0.15)); }
        .fv-scanline {
          position: absolute; left: 8%; right: 8%; height: 3px;
          background: linear-gradient(90deg, transparent, #2F86F2, transparent);
          box-shadow: 0 0 16px #2F86F2;
          animation: fvSweep 2.4s ease-in-out infinite;
        }
        @keyframes fvSweep {
          0%,100% { top: 22%; opacity: 0; }
          20% { opacity: 1; }
          50% { top: 78%; opacity: 1; }
          80% { opacity: 0; }
        }
        .fv-tag {
          position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%);
          background: var(--white); border: 1px solid var(--hairline);
          border-radius: 999px; padding: 8px 14px;
          font-size: 13px; font-weight: 700; color: var(--ink-900);
          display: inline-flex; align-items: center; gap: 8px;
          box-shadow: var(--shadow-sm);
        }
      `}</style>
    </div>
  );
}

function FeatureAlertCard() {
  return (
    <div className="fv fv-alert">
      <div className="fv-rings"><i/><i/><i/></div>
      <div className="fv-icon">
        <Glyph name="warn" size={42} color="#FFFFFF" stroke={2.6} />
      </div>
      <div className="fv-msg">
        <div className="fv-msg-eb">중복 복용 감지</div>
        <div className="fv-msg-t">아목시실린 · 1시간 내 재복용</div>
      </div>
      <style>{`
        .fv-alert { background: linear-gradient(160deg, #FFF1F1, #FFFFFF); }
        .fv-rings { position: absolute; inset: 0; display: grid; place-items: center; }
        .fv-rings i {
          position: absolute; border: 2px solid var(--danger-600); border-radius: 50%;
          opacity: 0;
          animation: fvRing 2s ease-out infinite;
        }
        .fv-rings i:nth-child(1) { width: 120px; height: 120px; }
        .fv-rings i:nth-child(2) { width: 200px; height: 200px; animation-delay: 0.5s; }
        .fv-rings i:nth-child(3) { width: 280px; height: 280px; animation-delay: 1s; }
        @keyframes fvRing {
          0% { opacity: 0.7; transform: scale(0.6); }
          100% { opacity: 0; transform: scale(1.2); }
        }
        .fv-icon {
          position: relative; width: 88px; height: 88px; border-radius: 50%;
          background: var(--danger-600);
          display: grid; place-items: center;
          box-shadow: 0 12px 32px rgba(201,48,48,0.4);
        }
        .fv-msg {
          position: absolute; bottom: 22px;
          background: var(--white); border-radius: 14px;
          padding: 10px 16px; box-shadow: var(--shadow-md);
          border-left: 4px solid var(--danger-600);
        }
        .fv-msg-eb { font-size: 10px; font-weight: 700; color: var(--danger-600); letter-spacing: 0.12em; text-transform: uppercase; }
        .fv-msg-t { font-size: 13px; font-weight: 700; color: var(--ink-900); margin-top: 2px; }
      `}</style>
    </div>
  );
}

function FeatureSyncCard() {
  return (
    <div className="fv fv-sync">
      <div className="fv-node n-user">
        <div className="fv-node-lbl">사용자</div>
      </div>
      <div className="fv-node n-care">
        <div className="fv-node-lbl">보호자</div>
      </div>
      <div className="fv-node n-clinic">
        <div className="fv-node-lbl">의료기관</div>
      </div>
      <svg className="fv-lines" viewBox="0 0 400 300" aria-hidden="true">
        <path d="M200 150 L80 60" />
        <path d="M200 150 L320 60" />
        <path d="M200 150 L200 250" />
      </svg>
      <div className="fv-center">
        <div className="fv-c-pulse"></div>
        <div className="fv-c-inner">iFeel</div>
      </div>
      <style>{`
        .fv-sync { background: linear-gradient(160deg, #EEF5FE, #FFFFFF); }
        .fv-lines {
          position: absolute; inset: 0; width: 100%; height: 100%;
          stroke: #62A5F7; stroke-width: 1.5; stroke-dasharray: 4 4;
          fill: none;
          animation: fvDash 4s linear infinite;
        }
        @keyframes fvDash { to { stroke-dashoffset: -32; } }
        .fv-node {
          position: absolute; display: flex; flex-direction: column; align-items: center; gap: 6px;
        }
        .fv-node.n-user { top: 8%; left: 10%; }
        .fv-node.n-care { top: 8%; right: 10%; }
        .fv-node.n-clinic { bottom: 8%; left: 50%; transform: translateX(-50%); }
        .fv-avatar {
          width: 44px; height: 44px; border-radius: 50%;
          background: var(--blue-100); color: var(--blue-700);
          display: grid; place-items: center; font-weight: 700;
          box-shadow: var(--shadow-sm);
        }
        .fv-node-lbl { font-size: 16px; font-weight: 700; color: var(--ink-900); letter-spacing: -0.01em; }
        .fv-center {
          position: relative;
          width: 88px; height: 88px;
          display: grid; place-items: center;
        }
        .fv-c-pulse {
          position: absolute; inset: 0;
          background: var(--blue-600); border-radius: 50%;
          box-shadow: 0 12px 32px rgba(30,107,214,0.35);
        }
        .fv-c-pulse::before,
        .fv-c-pulse::after {
          content: ""; position: absolute; inset: 0;
          border: 2px solid var(--blue-500); border-radius: 50%;
          animation: fvCenterRing 2.4s ease-out infinite;
        }
        .fv-c-pulse::after { animation-delay: 1.2s; }
        @keyframes fvCenterRing {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        .fv-c-inner {
          position: relative; color: var(--white); font-weight: 700;
          font-size: 16px; letter-spacing: -0.02em;
        }
      `}</style>
    </div>
  );
}

Object.assign(window, { HeroVisual, Showcase, App, FeatureScanCard, FeatureAlertCard, FeatureSyncCard });
