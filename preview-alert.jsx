/* global React, PhoneFrame, Glyph */
// Interactive Preview 2 — Daily medication schedule (alert modal removed).

function AlertPreview() {
  return (
    <PhoneFrame>
      <div className="alert-app">
        <div className="alert-home">
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
        </div>
      </div>

      <style>{`
        .alert-app {
          position: relative; flex: 1; display: flex; flex-direction: column;
          overflow: hidden;
        }
        .alert-home { padding: 4px 24px 20px; flex: 1; display: flex; flex-direction: column; }
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
          padding: 14px 14px 14px 8px;
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
      `}</style>
    </PhoneFrame>
  );
}

Object.assign(window, { AlertPreview });
