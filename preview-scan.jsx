/* global React, PhoneFrame, PillBottle, VoiceWave, Glyph */
// Interactive Preview 1 — AI Scanning Simulation
// Hover or click the pill bottle to trigger a scan line + voice output.

const { useState: useState1, useEffect: useEffect1, useRef: useRef1 } = React;

function AIScanPreview() {
  const [state, setState] = useState1("idle"); // idle | scanning | result
  const timerRef = useRef1(null);

  const runScan = () => {
    if (state !== "idle") return;
    setState("scanning");
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setState("result"), 1800);
  };

  const reset = () => {
    setState("idle");
    clearTimeout(timerRef.current);
  };

  useEffect1(() => () => clearTimeout(timerRef.current), []);

  return (
    <PhoneFrame>
      <div className="scan-app">
        <div className="scan-header">
          <div>
            <div className="scan-eyebrow">스캔 모드</div>
            <div className="scan-title">약병을 카메라에 비추세요</div>
          </div>
          <button className="scan-reset" onClick={reset} aria-label="다시 스캔">
            <Glyph name="scan" size={18} color="#536681" />
          </button>
        </div>

        <div
          className={`scan-stage state-${state}`}
          onMouseEnter={runScan}
          onClick={runScan}
          role="button"
          aria-label="약병을 스캔하려면 탭하세요"
        >
          {/* Viewfinder corners */}
          <svg className="viewfinder" viewBox="0 0 280 320" aria-hidden="true">
            <path d="M16 54 V20 H50" />
            <path d="M230 20 H264 V54" />
            <path d="M264 266 V300 H230" />
            <path d="M50 300 H16 V266" />
          </svg>

          <div className="bottle-wrap">
            <PillBottle label="AMOXICILLIN" scanning={state === "scanning"} />
          </div>

          {/* Scanning line */}
          {state === "scanning" && <div className="scan-line" />}

          {/* Idle hint */}
          {state === "idle" && (
            <div className="scan-hint">
              <Glyph name="scan" size={18} color="#1553B8" />
              <span>탭하여 스캔</span>
            </div>
          )}

          {/* Scanning status */}
          {state === "scanning" && (
            <div className="scan-status">
              <span className="pulse-dot" />
              AI 식별 중…
            </div>
          )}
        </div>

        {/* Result panel */}
        <div className={`scan-result ${state === "result" ? "show" : ""}`} aria-live="polite">
          {state === "result" ? (
            <>
              <div className="scan-result-top">
                <div>
                  <div className="scan-result-eyebrow">
                    <Glyph name="check" size={14} color="#0F8A5F" />
                    식별 완료 · 신뢰도 99.2%
                  </div>
                  <div className="scan-result-drug">아목시실린 <span className="mg">500 mg</span></div>
                </div>
                <button className="speaker-btn" aria-label="음성으로 듣기">
                  <Glyph name="volume" size={20} color="#FFFFFF" />
                </button>
              </div>
              <VoiceWave animating={true} bars={28} />
              <div className="scan-speech">
                "아목시실린 500 밀리그램. 하루 세 번, 식후 복용. 주의사항 — 페니실린 알레르기가 있는 경우 복용 금지."
              </div>
              <div className="scan-tags">
                <span className="scan-tag">항생제</span>
                <span className="scan-tag">식후</span>
                <span className="scan-tag warn">알레르기 주의</span>
              </div>
            </>
          ) : (
            <div className="scan-placeholder">식별 결과가 여기에 나타납니다</div>
          )}
        </div>
      </div>

      <style>{`
        .scan-app {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 0 0 16px;
        }
        .scan-header {
          padding: 8px 24px 16px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }
        .scan-eyebrow {
          font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--blue-700); font-weight: 700;
        }
        .scan-title {
          font-size: 20px; font-weight: 700; color: var(--ink-900);
          letter-spacing: -0.02em; margin-top: 4px;
        }
        .scan-reset {
          width: 40px; height: 40px; border-radius: 50%;
          border: 1px solid var(--hairline); background: var(--white);
          display: grid; place-items: center; cursor: pointer;
        }
        .scan-stage {
          margin: 0 20px;
          background: #0A1B33;
          border-radius: 24px;
          aspect-ratio: 0.9;
          position: relative;
          display: grid;
          place-items: center;
          cursor: pointer;
          overflow: hidden;
        }
        .scan-stage.state-idle:hover .bottle-wrap { transform: scale(1.03); }
        .bottle-wrap {
          transition: transform 280ms var(--ease-out);
          filter: drop-shadow(0 10px 24px rgba(0,0,0,0.4));
        }
        .viewfinder {
          position: absolute; inset: 16px;
          width: calc(100% - 32px); height: calc(100% - 32px);
          stroke: var(--blue-400); stroke-width: 2.5;
          fill: none; stroke-linecap: round;
          opacity: 0.8;
        }
        .scan-hint {
          position: absolute; bottom: 20px;
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--white);
          color: var(--blue-700);
          padding: 8px 14px; border-radius: 999px;
          font-size: 13px; font-weight: 600;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
        }
        .scan-status {
          position: absolute; top: 20px; left: 50%;
          transform: translateX(-50%);
          background: rgba(10,27,51,0.8);
          backdrop-filter: blur(8px);
          color: var(--paper-50);
          padding: 8px 14px;
          border-radius: 999px;
          font-size: 13px; font-weight: 600;
          display: inline-flex; align-items: center; gap: 8px;
          border: 1px solid var(--blue-500);
        }
        .pulse-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--blue-400);
          animation: pulse 1s infinite;
        }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }

        .scan-line {
          position: absolute;
          left: 8%; right: 8%;
          height: 3px;
          background: linear-gradient(90deg, transparent, var(--blue-400), transparent);
          box-shadow: 0 0 20px var(--blue-500), 0 0 40px var(--blue-500);
          animation: scanSweep 1.8s var(--ease-in-out);
          top: 20%;
        }
        @keyframes scanSweep {
          0% { top: 12%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 82%; opacity: 0; }
        }

        .scan-result {
          margin: 16px 20px 0;
          background: var(--white);
          border: 1px solid var(--hairline);
          border-radius: 20px;
          padding: 18px 20px;
          min-height: 140px;
          opacity: 0.6;
          transition: opacity 300ms, border-color 300ms;
        }
        .scan-result.show {
          opacity: 1;
          border-color: var(--blue-200);
          box-shadow: 0 8px 20px rgba(30,107,214,0.1);
        }
        .scan-placeholder {
          font-size: 14px; color: var(--ink-500); text-align: center;
          padding: 40px 0;
        }
        .scan-result-top {
          display: flex; justify-content: space-between; align-items: flex-start;
          margin-bottom: 14px;
        }
        .scan-result-eyebrow {
          font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
          color: var(--ok-600); display: flex; align-items: center; gap: 6px;
          text-transform: uppercase;
        }
        .scan-result-drug {
          font-size: 22px; font-weight: 700; letter-spacing: -0.02em;
          color: var(--ink-900); margin-top: 6px;
        }
        .scan-result-drug .mg { color: var(--ink-500); font-size: 15px; font-weight: 500; }
        .speaker-btn {
          width: 40px; height: 40px; border-radius: 50%;
          background: var(--blue-600); border: none;
          display: grid; place-items: center; cursor: pointer;
          box-shadow: 0 2px 0 var(--blue-700);
        }
        .voice-wave {
          display: flex; gap: 2.5px; align-items: center;
          height: 26px; margin: 4px 0 12px;
        }
        .voice-wave i {
          flex: 1; background: var(--blue-400); border-radius: 2px;
          opacity: 0.4; transition: opacity 200ms;
        }
        .voice-wave.active i {
          opacity: 0.9;
          animation: waveBounce 1.2s ease-in-out infinite;
          transform-origin: center;
        }
        @keyframes waveBounce {
          0%, 100% { transform: scaleY(0.6); }
          50% { transform: scaleY(1); }
        }
        .scan-speech {
          font-size: 13px; line-height: 1.55; color: var(--ink-700);
          padding: 10px 12px; background: var(--paper-50);
          border-radius: 10px; margin-bottom: 12px;
        }
        .scan-tags { display: flex; gap: 6px; flex-wrap: wrap; }
        .scan-tag {
          font-size: 11px; padding: 4px 10px; border-radius: 999px;
          background: var(--paper-100); color: var(--ink-700); font-weight: 600;
        }
        .scan-tag.warn { background: #FCE7E7; color: var(--danger-600); }
      `}</style>
    </PhoneFrame>
  );
}

Object.assign(window, { AIScanPreview });
