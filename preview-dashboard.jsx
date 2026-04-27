/* global React, PhoneFrame, Glyph */
// Interactive Preview 3 — Dashboard with High-Contrast / Detailed mode toggle.

const { useState: useState3 } = React;

function DashboardPreview() {
  const [mode, setMode] = useState3("contrast"); // contrast | detail

  return (
    <div className="dash-preview">
      <PhoneFrame screenStyle={mode === "contrast" ? { background: "#000" } : undefined}>
        {mode === "contrast" ? <ContrastView /> : <DetailView />}
      </PhoneFrame>

      <div className="dash-toggle" role="tablist">
        <button
          role="tab"
          aria-selected={mode === "contrast"}
          className={`dash-toggle-btn ${mode === "contrast" ? "active" : ""}`}
          onClick={() => setMode("contrast")}
        >
          시각장애인 · 고대비
        </button>
        <button
          role="tab"
          aria-selected={mode === "detail"}
          className={`dash-toggle-btn ${mode === "detail" ? "active" : ""}`}
          onClick={() => setMode("detail")}
        >
          보호자 · 상세 데이터
        </button>
      </div>

      <style>{`
        .dash-preview {
          display: flex; flex-direction: column; align-items: center;
          position: relative;
        }
        .dash-toggle {
          position: absolute;
          bottom: -56px;
          left: 50%;
          transform: translateX(-50%);
          display: inline-flex; gap: 4px;
          background: var(--white);
          border: 1px solid var(--hairline);
          border-radius: 999px;
          padding: 4px;
          z-index: 2;
          box-shadow: 0 4px 16px rgba(10,27,51,0.08);
        }
        .dash-toggle-btn {
          border: none; background: transparent;
          padding: 10px 18px; border-radius: 999px;
          font-size: 13px; font-weight: 600; color: var(--ink-500);
          cursor: pointer; font-family: var(--font-sans);
          transition: all 220ms var(--ease-out);
          white-space: nowrap;
        }
        .dash-toggle-btn.active { background: var(--ink-900); color: var(--paper-50); }

        /* ===== High contrast view (black bg, blue+white) ===== */
        .hc-view {
          color: #FFFFFF;
          padding: 16px 24px 24px;
          flex: 1;
          display: flex; flex-direction: column;
          gap: 16px;
        }
        .hc-greet {
          font-size: 13px; letter-spacing: 0.14em; text-transform: uppercase;
          color: #62A5F7; font-weight: 700;
        }
        .hc-name {
          font-size: 32px; font-weight: 700; letter-spacing: -0.025em;
          color: #FFFFFF; line-height: 1.1; margin-top: 4px;
        }
        .hc-card {
          background: #FFFFFF; color: #0A1B33;
          border-radius: 24px; padding: 24px 22px;
          margin-top: 4px;
        }
        .hc-card .hc-eyebrow {
          font-size: 13px; letter-spacing: 0.14em; text-transform: uppercase;
          color: #1553B8; font-weight: 700;
        }
        .hc-card .hc-time {
          font-size: 64px; font-weight: 700; letter-spacing: -0.03em;
          line-height: 1; margin: 12px 0 8px;
          color: #0A1B33;
        }
        .hc-card .hc-time .ampm { font-size: 22px; color: #536681; margin-left: 6px; font-weight: 500; }
        .hc-card .hc-drug { font-size: 18px; font-weight: 700; color: #0A1B33; }
        .hc-card .hc-sub { font-size: 15px; color: #1F3555; margin-top: 4px; }
        .hc-listen {
          margin-top: 16px;
          width: 100%;
          background: #1E6BD6; color: #FFFFFF;
          border: none; border-radius: 999px;
          padding: 14px 18px; font-size: 16px; font-weight: 700;
          font-family: var(--font-sans);
          display: inline-flex; align-items: center; gap: 10px; justify-content: center;
          cursor: pointer;
        }
        .hc-mini {
          padding: 16px 0;
          border-top: 1px solid rgba(255,255,255,0.12);
          display: flex; justify-content: space-between; align-items: center;
        }
        .hc-mini .lbl {
          font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(255,255,255,0.55); font-weight: 700;
        }
        .hc-mini .val {
          font-size: 22px; font-weight: 700; color: #FFFFFF;
          letter-spacing: -0.02em;
        }
        .hc-mini .val em { color: #62A5F7; font-style: normal; }

        /* ===== Detailed data view (caregiver) ===== */
        .dt-view {
          padding: 8px 20px 20px;
          flex: 1;
          display: flex; flex-direction: column;
          overflow-y: auto;
        }
        .dt-head {
          display: flex; justify-content: space-between; align-items: center;
          padding: 8px 0 16px;
        }
        .dt-head .name { font-size: 15px; font-weight: 700; color: var(--ink-900); }
        .dt-head .role { font-size: 11px; color: var(--ink-500); letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; }
        .dt-head .live {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11px; color: var(--ok-600); font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
        }
        .dt-head .live::before {
          content: ""; width: 8px; height: 8px; border-radius: 50%;
          background: var(--ok-600);
          animation: pulse 1.4s infinite;
        }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

        .dt-stats {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 8px; margin-bottom: 12px;
        }
        .dt-stat {
          background: var(--white);
          border: 1px solid var(--hairline);
          border-radius: 12px;
          padding: 12px 14px;
        }
        .dt-stat .lbl {
          font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--ink-500); font-weight: 700;
        }
        .dt-stat .val {
          font-size: 22px; font-weight: 700; color: var(--ink-900);
          letter-spacing: -0.02em; margin-top: 4px; line-height: 1;
        }
        .dt-stat .val .unit { font-size: 13px; color: var(--ink-500); margin-left: 2px; font-weight: 500; }
        .dt-stat .delta {
          font-size: 10px; color: var(--ok-600); font-weight: 700; margin-top: 4px;
        }

        .dt-chart {
          background: var(--white); border: 1px solid var(--hairline);
          border-radius: 12px; padding: 14px; margin-bottom: 12px;
        }
        .dt-chart .lbl {
          font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--ink-500); font-weight: 700; margin-bottom: 8px;
        }
        .dt-bars { display: flex; gap: 4px; align-items: flex-end; height: 60px; }
        .dt-bars i {
          flex: 1; background: var(--blue-200); border-radius: 2px;
          position: relative;
        }
        .dt-bars i.full { background: var(--blue-600); }
        .dt-bars i.miss { background: var(--danger-600); opacity: 0.6; }
        .dt-days {
          display: flex; gap: 4px; margin-top: 6px;
        }
        .dt-days span {
          flex: 1; text-align: center;
          font-size: 9px; color: var(--ink-500); font-weight: 600;
        }

        .dt-log {
          background: var(--white); border: 1px solid var(--hairline);
          border-radius: 12px; padding: 12px 14px;
        }
        .dt-log .lbl {
          font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--ink-500); font-weight: 700; margin-bottom: 8px;
        }
        .dt-log-row {
          display: grid; grid-template-columns: 50px 8px 1fr auto;
          gap: 8px; align-items: center;
          padding: 8px 0; border-top: 1px solid var(--hairline);
          font-size: 12px;
        }
        .dt-log-row:first-of-type { border-top: none; }
        .dt-log-row .t { color: var(--ink-500); font-weight: 700; font-size: 11px; }
        .dt-log-row .d { width: 8px; height: 8px; border-radius: 50%; background: var(--ok-600); }
        .dt-log-row.miss .d { background: var(--danger-600); }
        .dt-log-row .n { color: var(--ink-900); font-weight: 600; }
        .dt-log-row .s {
          font-size: 10px; padding: 2px 8px; border-radius: 999px;
          background: #DCEAFD; color: var(--ok-600);
          font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;
        }
        .dt-log-row.miss .s { background: #FCE7E7; color: var(--danger-600); }
      `}</style>
    </div>
  );
}

function ContrastView() {
  return (
    <div className="hc-view">
      <div>
        <div className="hc-greet">현재 시각 8:47</div>
        <div className="hc-name">서연 님</div>
      </div>
      <div className="hc-card">
        <div className="hc-eyebrow">다음 복용 · 13분 후</div>
        <div className="hc-time">9:00<span className="ampm">AM</span></div>
        <div className="hc-drug">아목시실린 500 mg</div>
        <div className="hc-sub">캡슐 한 알, 물과 함께</div>
        <button className="hc-listen">
          <Glyph name="volume" size={20} color="#FFFFFF" stroke={2.6} />
          복용법 듣기
        </button>
      </div>
      <div className="hc-mini">
        <div>
          <div className="lbl">오늘</div>
          <div className="val"><em>1</em>/7 복용</div>
        </div>
        <div>
          <div className="lbl">이번 주</div>
          <div className="val">98<em>%</em></div>
        </div>
      </div>
    </div>
  );
}

function DetailView() {
  return (
    <div className="dt-view">
      <div className="dt-head">
        <div>
          <div className="role">보호자 모드</div>
          <div className="name">어머니 · 김서연</div>
        </div>
        <div className="live">실시간</div>
      </div>

      <div className="dt-stats">
        <div className="dt-stat">
          <div className="lbl">복약 준수율</div>
          <div className="val">98<span className="unit">%</span></div>
          <div className="delta">▲ 4% 지난주 대비</div>
        </div>
        <div className="dt-stat">
          <div className="lbl">방지된 오복용</div>
          <div className="val">12<span className="unit">건</span></div>
          <div className="delta" style={{color:"var(--blue-700)"}}>이번 달</div>
        </div>
      </div>

      <div className="dt-chart">
        <div className="lbl">최근 7일 복약</div>
        <div className="dt-bars">
          <i className="full" style={{height:"100%"}}></i>
          <i className="full" style={{height:"100%"}}></i>
          <i className="full" style={{height:"86%"}}></i>
          <i className="full" style={{height:"100%"}}></i>
          <i className="miss" style={{height:"60%"}}></i>
          <i className="full" style={{height:"100%"}}></i>
          <i style={{height:"40%"}}></i>
        </div>
        <div className="dt-days">
          <span>목</span><span>금</span><span>토</span><span>일</span><span>월</span><span>화</span><span>수</span>
        </div>
      </div>

      <div className="dt-log">
        <div className="lbl">오늘 복약 로그</div>
        <div className="dt-log-row">
          <span className="t">07:58</span>
          <span className="d"></span>
          <span className="n">메트포르민 500mg</span>
          <span className="s">정시</span>
        </div>
        <div className="dt-log-row">
          <span className="t">09:02</span>
          <span className="d"></span>
          <span className="n">아목시실린 500mg</span>
          <span className="s">정시</span>
        </div>
        <div className="dt-log-row miss">
          <span className="t">10:15</span>
          <span className="d"></span>
          <span className="n">아목시실린 (중복)</span>
          <span className="s">차단</span>
        </div>
        <div className="dt-log-row">
          <span className="t">13:00</span>
          <span className="d" style={{background:"var(--ink-300)"}}></span>
          <span className="n">리시노프릴 10mg</span>
          <span className="s" style={{background:"var(--paper-100)",color:"var(--ink-500)"}}>예정</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DashboardPreview });
