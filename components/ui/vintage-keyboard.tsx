"use client";

import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { CSSProperties } from "react";
import {
  WOOD_GRAIN_URI,
  WOOD_GRAIN_FINE_URI,
  WOOD_TONE_URI,
} from "@/components/ui/vintage-keyboard-assets";
import { getThockEngine, playKeySound } from "@/components/ui/vintage-keyboard-audio";
import {
  KEY_TO_CHAR,
} from "@/components/ui/vintage-keyboard-data";
import {
  Key,
  ROWS,
  ALL_KEYS_BY_ID,
  CODE_TO_KEY_ID,
  KEY_PAN,
  getSoundCategory,
  getActiveKeyParts,
  useDeviceTier,
  CONTAINER_TIERS,
  CASE_TIERS,
  KEY_GAP_TIERS,
  KEY_STYLE_TAG,
} from "@/components/ui/vintage-keyboard-key";

const MODIFIER_FAMILIES: Array<{ modifier: string; ids: string[] }> = [
  { modifier: "Alt", ids: ["lalt", "ralt"] },
  { modifier: "Control", ids: ["lctrl"] },
  { modifier: "Shift", ids: ["lshift", "rshift"] },
  { modifier: "Meta", ids: ["lwin", "rwin"] },
];

const MAX_TYPED = 72;

export const Component = () => {
  const rows = useMemo(() => ROWS, []);
  const keyTriggersRef = useRef<Record<string, { press: () => void; release: () => void }>>({});
  const tier = useDeviceTier();
  const container = CONTAINER_TIERS[tier];
  const caseTier = CASE_TIERS[tier];
  const gap = KEY_GAP_TIERS[tier];
  const shiftHeldRef = useRef(false);

  const registerTrigger = useCallback((id: string, trigger: { press: () => void; release: () => void }) => {
    keyTriggersRef.current[id] = trigger;
    return () => {
      if (keyTriggersRef.current[id] === trigger) delete keyTriggersRef.current[id];
    };
  }, []);

  const [activeKeyIds, setActiveKeyIds] = useState<string[]>([]);
  const [typedLine, setTypedLine] = useState("");
  const [indicatorParts, setIndicatorParts] = useState<string[] | null>(null);
  const [indicatorVisible, setIndicatorVisible] = useState(true);
  const indicatorPartsRef = useRef<string[] | null>(null);
  const holdTimeoutRef = useRef<number | null>(null);
  const fadeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    indicatorPartsRef.current = indicatorParts;
  }, [indicatorParts]);

  const activateKey = useCallback((id: string) => {
    setActiveKeyIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const deactivateKey = useCallback((id: string) => {
    setActiveKeyIds((prev) => (prev.includes(id) ? prev.filter((k) => k !== id) : prev));
  }, []);

  const applyType = useCallback((id: string) => {
    if (id === "backspace") {
      setTypedLine((t) => t.slice(0, -1));
      return;
    }
    if (id === "enter") {
      setTypedLine((t) => (t + " ").slice(-MAX_TYPED));
      return;
    }
    const base = KEY_TO_CHAR[id];
    if (!base) return;
    const shift =
      shiftHeldRef.current ||
      activeKeyIds.includes("lshift") ||
      activeKeyIds.includes("rshift");
    let ch = base;
    if (shift) {
      if (base.length === 1 && /[a-z]/.test(base)) {
        ch = base.toUpperCase();
      } else {
        const config = ALL_KEYS_BY_ID[id];
        if (config?.shiftLabel) ch = config.shiftLabel;
      }
    }
    setTypedLine((t) => (t + ch).slice(-MAX_TYPED));
  }, [activeKeyIds]);

  useEffect(() => {
    if (holdTimeoutRef.current !== null) {
      window.clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
    if (fadeTimeoutRef.current !== null) {
      window.clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = null;
    }
    if (activeKeyIds.length > 0) {
      setIndicatorParts(getActiveKeyParts(activeKeyIds));
      setIndicatorVisible(true);
      return;
    }
    if (indicatorPartsRef.current !== null) {
      holdTimeoutRef.current = window.setTimeout(() => {
        setIndicatorVisible(false);
        fadeTimeoutRef.current = window.setTimeout(() => {
          setIndicatorParts(null);
          setIndicatorVisible(true);
        }, 220);
      }, 550);
    }
  }, [activeKeyIds]);

  useEffect(() => {
    return () => {
      if (holdTimeoutRef.current !== null) window.clearTimeout(holdTimeoutRef.current);
      if (fadeTimeoutRef.current !== null) window.clearTimeout(fadeTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    void getThockEngine();
  }, []);

  useEffect(() => {
    const held = new Set<string>();
    const isTypingTarget = (target: EventTarget | null) => {
      const el = target as HTMLElement | null;
      if (!el) return false;
      const tag = el.tagName?.toLowerCase();
      return tag === "input" || tag === "textarea" || el.isContentEditable;
    };
    const releaseKey = (id: string) => {
      if (!held.has(id)) return;
      held.delete(id);
      if (id === "lshift" || id === "rshift") {
        shiftHeldRef.current = held.has("lshift") || held.has("rshift");
      }
      keyTriggersRef.current[id]?.release();
      deactivateKey(id);
    };
    const releaseAllHeld = () => {
      held.forEach((id) => {
        keyTriggersRef.current[id]?.release();
        deactivateKey(id);
      });
      held.clear();
      shiftHeldRef.current = false;
    };
    const reconcileModifiers = (event: KeyboardEvent) => {
      if (typeof event.getModifierState !== "function") return;
      for (const { modifier, ids } of MODIFIER_FAMILIES) {
        if (!event.getModifierState(modifier)) {
          for (const id of ids) releaseKey(id);
        }
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      reconcileModifiers(event);
      if (event.code === "AltLeft" || event.code === "AltRight") event.preventDefault();
      if (event.repeat) return;
      if (isTypingTarget(event.target)) return;
      const id = CODE_TO_KEY_ID[event.code];
      if (!id || held.has(id)) return;
      held.add(id);
      if (id === "lshift" || id === "rshift") shiftHeldRef.current = true;
      keyTriggersRef.current[id]?.press();
      activateKey(id);
      const config = ALL_KEYS_BY_ID[id];
      playKeySound(getSoundCategory(id), !!config?.muted, KEY_PAN[id] ?? 0);
      if (event.key === "Backspace") {
        setTypedLine((t) => t.slice(0, -1));
      } else if (event.key === "Enter") {
        setTypedLine((t) => (t + " ").slice(-MAX_TYPED));
      } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
        setTypedLine((t) => (t + event.key).slice(-MAX_TYPED));
      }
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      reconcileModifiers(event);
      const id = CODE_TO_KEY_ID[event.code];
      if (!id) return;
      releaseKey(id);
    };
    const handleVisibilityChange = () => {
      if (document.hidden) releaseAllHeld();
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", releaseAllHeld);
    window.addEventListener("focus", releaseAllHeld);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", releaseAllHeld);
      window.removeEventListener("focus", releaseAllHeld);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [activateKey, deactivateKey]);

  return (
    <div
      className="kb-viewport flex w-full items-center justify-center overflow-x-hidden bg-[#0a0a0a] py-10 md:py-16"
      style={{ padding: container.padding }}
    >
      <style>{KEY_STYLE_TAG}</style>
      <style>{"@keyframes kb-cursor { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }"}</style>
      <div className="flex flex-col items-center" style={{ width: "100%", maxWidth: container.maxWidth }}>
        <div
          className="flex w-full flex-col items-center justify-center"
          style={{
            marginBottom: "clamp(1rem, 2.6vw, 1.5rem)",
            minHeight: "clamp(3.4rem, 6.2vw, 4.2rem)",
            fontFamily: 'var(--font-mono), "IBM Plex Mono", ui-monospace, monospace',
            gap: "0.7rem",
          }}
        >
          <div className="w-full max-w-xl px-4 text-center" style={{ minHeight: "1.6rem" }}>
            {typedLine ? (
              <p
                style={{
                  fontFamily: 'var(--font-display), "Bricolage Grotesque", system-ui, sans-serif',
                  fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  color: "#f7f6f3",
                  lineHeight: 1.35,
                  wordBreak: "break-word",
                }}
              >
                {typedLine}
                <span
                  style={{
                    display: "inline-block",
                    width: "0.45em",
                    height: "1.05em",
                    marginLeft: "2px",
                    verticalAlign: "-0.1em",
                    background: "#c4a574",
                    animation: "kb-cursor 1s steps(1) infinite",
                  }}
                />
              </p>
            ) : (
              <span
                style={{
                  fontSize: "clamp(0.72rem, 1.4vw, 0.8rem)",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(196, 165, 116, 0.55)",
                }}
              >
                Click keys or type
              </span>
            )}
          </div>
          <div
            style={{
              opacity: indicatorVisible && indicatorParts && indicatorParts.length > 0 ? 1 : 0,
              transition: "opacity 220ms ease-out",
              minHeight: "1.5rem",
            }}
          >
            {indicatorParts && indicatorParts.length > 0 ? (
              <div className="flex items-center justify-center" style={{ gap: "5px" }}>
                {indicatorParts.map((part, i) => (
                  <Fragment key={`${part}-${i}`}>
                    {i > 0 && (
                      <span style={{ fontSize: "0.72rem", fontWeight: 500, color: "rgba(196, 165, 116, 0.55)", lineHeight: 1 }}>
                        +
                      </span>
                    )}
                    <kbd
                      style={{
                        fontFamily: "inherit",
                        fontSize: "clamp(0.72rem, 1.3vw, 0.82rem)",
                        fontWeight: 600,
                        lineHeight: 1,
                        color: "#f7f6f3",
                        background: "rgba(196, 165, 116, 0.12)",
                        border: "1px solid rgba(196, 165, 116, 0.35)",
                        borderRadius: "6px",
                        padding: "5px 8px",
                        boxShadow: "0 1px 0 rgba(255,255,255,0.06) inset, 0 1px 2px rgba(0,0,0,0.35)",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {part}
                    </kbd>
                  </Fragment>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <div style={{ perspective: "2000px", width: "100%" }}>
          <div className="relative w-full" style={{ transform: "rotateX(8deg)", transformOrigin: "50% 100%" }}>
            <div
              className="pointer-events-none absolute -inset-x-8 -bottom-6 h-16 blur-2xl"
              style={{
                background: "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(0,0,0,0.55), transparent 70%)",
              }}
              aria-hidden
            />
            <div
              className="relative rounded-[var(--kb-case-radius)]"
              style={
                {
                  padding: caseTier.casePadding,
                  background: `linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 10%), linear-gradient(178deg, #b57a42 0%, #9d6636 28%, #895128 55%, #764a24 78%, #5c3618 100%)`,
                  boxShadow:
                    "0 0.5px 0 rgba(255,222,185,0.2) inset, 0 -2px 5px rgba(35,19,6,0.35) inset, 0 4px 10px rgba(15,8,3,0.28), 0 12px 28px rgba(0,0,0,0.35)",
                  "--kb-case-radius": caseTier.caseRadius,
                  "--kb-bezel-radius": caseTier.bezelRadius,
                } as CSSProperties
              }
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-[var(--kb-case-radius)] mix-blend-multiply"
                style={{ backgroundImage: `url("${WOOD_TONE_URI}")`, backgroundSize: "520px 520px", opacity: 0.48 }}
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-[var(--kb-case-radius)] mix-blend-multiply"
                style={{ backgroundImage: `url("${WOOD_GRAIN_URI}")`, backgroundSize: "460px 460px", opacity: 0.52 }}
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-[var(--kb-case-radius)] mix-blend-multiply"
                style={{
                  backgroundImage: `url("${WOOD_GRAIN_FINE_URI}")`,
                  backgroundSize: "300px 300px",
                  backgroundPosition: "23px 11px",
                  opacity: 0.26,
                }}
              />
              <div
                className="relative rounded-[var(--kb-bezel-radius)]"
                style={{
                  padding: caseTier.bezelPadding,
                  background: "linear-gradient(155deg, #16130f 0%, #0f0c09 50%, #0a0805 100%)",
                  boxShadow:
                    "inset 0 2.5px 6px rgba(0,0,0,0.58), inset 0 4px 10px rgba(0,0,0,0.3), 0 1px 0 rgba(255,236,204,0.12)",
                }}
              >
                <div className="relative z-10 flex flex-col" style={{ gap }}>
                  {rows.map((row, i) => (
                    <div key={i} className="flex" style={{ gap }}>
                      {row.map((key) => (
                        <Key
                          key={key.id}
                          config={key}
                          rowIndex={i}
                          tier={tier}
                          registerTrigger={registerTrigger}
                          onActivate={activateKey}
                          onDeactivate={deactivateKey}
                          onType={applyType}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
