/* global React, PhoneFrame, Glyph */
// Interactive Preview 2 — Real-time Overdose Alert
// Simulates detecting a duplicate dose, with haptic visualization.

const { useState: useState2, useEffect: useEffect2, useRef: useRef2 } = React;

function AlertPreview() {
  const [state, setState] = useState2("idle"); // idle | alert | resolved
  const timerRef = useRef2(null);

  const trigger = () => {
    clearTimeout(timerRef.current);
    setState("alert");
  };
  const dismiss = () => {
    clearTimeout(timerRef.current);
    setState("resolved");
    timerRef.current = setTimeout(() => setState("idle"), 1800);
  };

  useEffect2(() => () => clearTimeout(timerRef.current), []);

  return (
    <PhoneFrame>
      <div className="alert-app">
        {/* Base home layer */}
        <div className={`alert-home ${state === "alert" ? "blurred" : ""}`}>
          <div className="alert-home-head">
            <div>
              <div className="alert-eyebrow">오늘 · 수요일</div>
              <div className="alert-h1">복약 일정</div>
            </div>
            <div className="alert-avatar">서</div>
          </div>

          <div className="dose-item">
            <div className="dose-time">7:00</div>
            <div className="dose-bar ok"></div>
            <div className="dose-body">
              <div className="dose-drug">메트포르민 500 mg</div>
              <div className="dose-sub">복용 완료 · 오전 7:58</div>
            </div>
            <Glyph name="check" size={22} color="#0F8A5F" stroke={2.8} />
          </div>
          <div className="dose-item active">
            <div className="dose-time">9:00</div>
            <div className="dose-bar now"></div>
            <div className="dose-body">
              <div className="dose-drug">아목시실린 500 mg</div>
              <div className="dose-sub">복용 완료 · 오전 9:02</div>
            </div>
            <Glyph name="check" size={22} color="#0F8A5F" stroke={2.8} />
          </div>
          <div className="dose-item">
            <div className="dose-time">13:00</div>
            <div className="dose-bar"></div>
            <div className="dose-body">
              <div className="dose-drug">리시노프릴 10 mg</div>
              <div className="dose-sub">예정</div>
            </div>
          </div>

          <button className="trigger-btn" onClick={trigger}>
            <Glyph name="warn" size={16} color="#FFFFFF" />
            중복 복용 시뮬레이션
          </button>
        </div>

        {/* Alert modal */}
        {state === "alert" && (
          <div className="alert-overlay" role="alertdialog" aria-live="assertive">
            <div className="haptic-ring r1" />
            <div className="haptic-ring r2" />
            <div className="haptic-ring r3" />

            <div className="alert-modal">
              <div className="alert-icon">
                <Glyph name="warn" size={36} color="#FFFFFF" stroke={2.6} />
              </div>
              <div className="alert-shake-label">경고 · 진동</div>
              <h3 className="alert-title">중복 복용 감지</h3>
              <p className="alert-body">
                <strong>아목시실린 500 mg</strong>은(는) 1시간 전에 이미 복용하셨습니다.
                지금 복용하시면 과다 복용 위험이 있습니다.
              </p>

              <div className="alert-detail">
                <div className="alert-detail-row">
                  <span className="k">마지막 복용</span>
                  <span className="v">오전 9:02</span>
                </div>
                <div className="alert-detail-row">
                  <span className="k">다음 허용 시간</span>
                  <span className="v">오후 1:00</span>
                </div>
              </div>

              <div className="alert-actions">
                <button className="alert-btn primary" onClick={dismiss}>
                  두 번 탭하여 해제
                </button>
                <button className="alert-btn ghost" onClick={dismiss}>
                  보호자에게 알림
                </button>
              </div>
            </div>
          </div>
        )}

        {state === "resolved" && (
          <div className="alert-toast">
            <Glyph name="check" size={18} color="#FFFFFF" stroke={2.8} />
            보호자에게 알림을 보냈습니다
          </div>
        )}
      </div>

      <style>{`
        .alert-app {
          position: relative; flex: 1; display: flex; flex-direction: column;
          overflow: hidden;
        }
        .alert-home { padding: 4px 24px 20px; transition: filter 280ms; flex: 1; display: flex; flex-direction: column; }
        .alert-home.blurred { filter: blur(4px) saturate(80%); }
        .alert-home-head {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 24px; padding-top: 8px;
        }
        .alert-eyebrow {
          font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--ink-500); font-weight: 700;
        }
        .alert-h1 {
          font-size: 26px; font-weight: 700; color: var(--ink-900);
          letter-spacing: -0.02em; margin-top: 4px;
        }
        .alert-avatar {
          width: 44px; height: 44px; border-radius: 50%;
          background: var(--blue-100); color: var(--blue-700);
          display: grid; place-items: center; font-weight: 700;
        }
        .dose-item {
          display: grid; grid-template-columns: 42px 4px 1fr auto;
          gap: 12px; align-items: center;
          padding: 14px 14px 14px 4px;
          background: var(--white); border-radius: 14px;
          border: 1px solid var(--hairline);
          margin-bottom: 10px;
        }
        .dose-item.active {
          border-color: var(--blue-200);
          background: var(--blue-50);
        }
        .dose-time { font-size: 14px; font-weight: 700; color: var(--ink-900); letter-spacing: -0.01em; }
        .dose-bar { width: 4px; height: 32px; border-radius: 2px; background: var(--ink-300); }
        .dose-bar.ok { background: var(--ok-600); }
        .dose-bar.now { background: var(--blue-600); }
        .dose-drug { font-size: 14px; font-weight: 700; color: var(--ink-900); letter-spacing: -0.01em; }
        .dose-sub { font-size: 12px; color: var(--ink-500); margin-top: 2px; }

        .trigger-btn {
          margin-top: auto;
          background: var(--danger-600); color: var(--white);
          border: none; border-radius: 999px;
          padding: 14px 18px; font-size: 14px; font-weight: 600;
          font-family: var(--font-sans);
          display: inline-flex; align-items: center; gap: 8px; justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(201,48,48,0.3);
        }

        .alert-overlay {
          position: absolute; inset: 0;
          background: rgba(10,27,51,0.55);
          backdrop-filter: blur(2px);
          display: grid; place-items: center;
          animation: shakeFrame 0.14s linear 0s 8;
        }
        @keyframes shakeFrame {
          0%,100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }

        .haptic-ring {
          position: absolute; top: 50%; left: 50%;
          border: 2px solid var(--danger-600);
          border-radius: 50%;
          animation: hapticPulse 1.6s var(--ease-out) infinite;
          pointer-events: none;
        }
        .haptic-ring.r1 { width: 200px; height: 200px; margin: -100px 0 0 -100px; animation-delay: 0s; }
        .haptic-ring.r2 { width: 280px; height: 280px; margin: -140px 0 0 -140px; animation-delay: 0.4s; }
        .haptic-ring.r3 { width: 360px; height: 360px; margin: -180px 0 0 -180px; animation-delay: 0.8s; }
        @keyframes hapticPulse {
          0% { opacity: 0.8; transform: scale(0.8); }
          100% { opacity: 0; transform: scale(1.3); }
        }

        .alert-modal {
          position: relative;
          width: 84%;
          background: var(--white);
          border-radius: 24px;
          padding: 24px 22px 22px;
          border-top: 6px solid var(--danger-600);
          box-shadow: 0 20px 48px rgba(10,27,51,0.3);
          z-index: 2;
        }
        .alert-icon {
          width: 56px; height: 56px; border-radius: 50%;
          background: var(--danger-600);
          display: grid; place-items: center;
          margin-bottom: 16px;
          animation: iconShake 0.35s ease-in-out infinite;
        }
        @keyframes iconShake {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-8deg); }
          75% { transform: rotate(8deg); }
        }
        .alert-shake-label {
          font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--danger-600); font-weight: 700; margin-bottom: 6px;
        }
        .alert-title {
          font-size: 24px; font-weight: 700; color: var(--ink-900);
          letter-spacing: -0.02em; margin: 0 0 10px 0;
        }
        .alert-body {
          font-size: 14px; line-height: 1.55; color: var(--ink-700);
          margin: 0 0 16px 0;
        }
        .alert-body strong { color: var(--ink-900); }
        .alert-detail {
          background: var(--paper-50);
          border-radius: 12px;
          padding: 12px 14px;
          margin-bottom: 16px;
        }
        .alert-detail-row {
          display: flex; justify-content: space-between;
          font-size: 13px; padding: 4px 0;
        }
        .alert-detail-row .k { color: var(--ink-500); }
        .alert-detail-row .v { color: var(--ink-900); font-weight: 700; }
        .alert-actions { display: flex; flex-direction: column; gap: 8px; }
        .alert-btn {
          min-height: 48px; padding: 0 18px; border-radius: 999px;
          font-size: 14px; font-weight: 600; font-family: var(--font-sans);
          cursor: pointer; border: 2px solid transparent;
        }
        .alert-btn.primary { background: var(--ink-900); color: var(--white); }
        .alert-btn.ghost { background: transparent; color: var(--ink-700); border-color: var(--ink-300); }

        .alert-toast {
          position: absolute; bottom: 24px; left: 50%;
          transform: translateX(-50%);
          background: var(--ok-600); color: var(--white);
          padding: 10px 18px; border-radius: 999px;
          font-size: 13px; font-weight: 600;
          display: inline-flex; align-items: center; gap: 8px;
          box-shadow: 0 8px 20px rgba(15,138,95,0.3);
          animation: toastIn 240ms var(--ease-out);
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(-50%) translateY(8px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </PhoneFrame>
  );
}

Object.assign(window, { AlertPreview });
