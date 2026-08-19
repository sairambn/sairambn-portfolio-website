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
  END_GRAIN_URI,
  WOOD_PORE_URI,
  WOOD_MICROSCRATCH_URI,
  WOOD_DENT_URI,
} from "@/components/ui/vintage-keyboard-assets";
import { getThockEngine, playKeySound } from "@/components/ui/vintage-keyboard-audio";
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

export const Component = () => {
  const rows = useMemo(() => ROWS, []);
  const keyTriggersRef = useRef<Record<string, { press: () => void; release: () => void }>>({});
  const tier = useDeviceTier();
  const container = CONTAINER_TIERS[tier];
  const caseTier = CASE_TIERS[tier];
  const gap = KEY_GAP_TIERS[tier];

  const registerTrigger = useCallback((id: string, trigger: { press: () => void; release: () => void }) => {
    keyTriggersRef.current[id] = trigger;
    return () => {
      if (keyTriggersRef.current[id] === trigger)
        delete keyTriggersRef.current[id];
    };
  }, []);

  const [activeKeyIds, setActiveKeyIds] = useState<string[]>([]);
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
    setActiveKeyIds((prev) =>
      prev.includes(id) ? prev.filter((k) => k !== id) : prev,
    );
  }, []);

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
      if (holdTimeoutRef.current !== null)
        window.clearTimeout(holdTimeoutRef.current);
      if (fadeTimeoutRef.current !== null)
        window.clearTimeout(fadeTimeoutRef.current);
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
      keyTriggersRef.current[id]?.release();
      deactivateKey(id);
    };

    const releaseAllHeld = () => {
      held.forEach((id) => {
        keyTriggersRef.current[id]?.release();
        deactivateKey(id);
      });
      held.clear();
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

      if (event.code === "AltLeft" || event.code === "AltRight") {
        event.preventDefault();
      }

      if (event.repeat) return;
      if (isTypingTarget(event.target)) return;

      const id = CODE_TO_KEY_ID[event.code];
      if (!id || held.has(id)) return;

      held.add(id);
      keyTriggersRef.current[id]?.press();
      activateKey(id);

      const config = ALL_KEYS_BY_ID[id];
      playKeySound(getSoundCategory(id), !!config?.muted, KEY_PAN[id] ?? 0);
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

    const handleFocus = () => releaseAllHeld();

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", releaseAllHeld);
    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", releaseAllHeld);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [activateKey, deactivateKey]);

  return (
    <div
      className="kb-viewport flex w-full items-center justify-center overflow-x-hidden bg-[#FAFAFA] py-6 md:py-10"
      style={{
        padding: container.padding,
      }}
    >
      <style>{KEY_STYLE_TAG}</style>
      <div
        className="flex flex-col items-center"
        style={{ width: "100%", maxWidth: container.maxWidth }}
      >
        <div
          className="flex items-center justify-center"
          style={{
            marginBottom: "clamp(0.65rem, 2.2vw, 1.15rem)",
            minHeight: "clamp(1.6rem, 3vw, 1.9rem)",
            fontFamily:
              '"Inter", -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          }}
        >
          <div
            style={{
              opacity: indicatorVisible ? 1 : 0,
              transition: "opacity 220ms ease-out",
            }}
          >
            {indicatorParts && indicatorParts.length > 0 ? (
              <div
                className="flex items-center justify-center"
                style={{ gap: "5px" }}
              >
                {indicatorParts.map((part, i) => (
                  <Fragment key={`${part}-${i}`}>
                    {i > 0 && (
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 500,
                          color: "#b9b9be",
                          lineHeight: 1,
                        }}
                      >
                        +
                      </span>
                    )}
                    <kbd
                      style={{
                        fontFamily: "inherit",
                        fontSize: "clamp(0.72rem, 1.3vw, 0.82rem)",
                        fontWeight: 600,
                        lineHeight: 1,
                        color: "#3f3f46",
                        background: "#ffffff",
                        border: "1px solid #e4e4e7",
                        borderRadius: "6px",
                        padding: "5px 8px",
                        boxShadow:
                          "0 1px 0 rgba(255,255,255,0.7) inset, 0 1px 2px rgba(0,0,0,0.04), 0 1px 1px rgba(0,0,0,0.03)",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {part}
                    </kbd>
                  </Fragment>
                ))}
              </div>
            ) : (
              <span
                style={{
                  fontSize: "clamp(0.8rem, 1.5vw, 0.9rem)",
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                  color: "#8a8a8e",
                }}
              >
                Press any key...
              </span>
            )}
          </div>
        </div>
        <div
          style={{
            perspective: "1800px",
            width: "100%",
          }}
        >
          <div
            className="relative w-full"
            style={{ transform: "rotateX(7deg)", transformOrigin: "50% 100%" }}
          >
            <div
              className="absolute inset-x-[16%] top-[99%] -z-10 h-1 rounded-full blur-[1.5px]"
              style={{ background: "rgba(15,10,6,0.2)" }}
            />
            <div
              className="absolute -inset-x-2 top-14 bottom-0 -z-10 rounded-[1.5rem] blur-lg"
              style={{
                background:
                  "radial-gradient(55% 70% at 50% 82%, rgba(15,10,6,0.06), transparent 72%)",
              }}
            />
            <div
              className="relative rounded-[var(--kb-case-radius)]"
              style={
                {
                  padding: caseTier.casePadding,
                  background: `
                linear-gradient(180deg, rgba(255,255,255,0.045) 0%, transparent 9%),
                repeating-linear-gradient(180deg, rgba(70,42,16,0.08) 0px, transparent 2px, transparent 6px, rgba(70,42,16,0.055) 8px, transparent 13px),
                linear-gradient(178deg, #ad7440 0%, #9d6636 26%, #895128 55%, #764a24 78%, #63391a 100%)
              `,
                  boxShadow:
                    "0 0.5px 0 rgba(255,222,185,0.18) inset, 0 -2px 4.5px rgba(35,19,6,0.32) inset, 0.4px 0.4px 0.8px rgba(255,232,200,0.14) inset, 0 3px 6px rgba(15,8,3,0.22), 0 1px 2px rgba(15,8,3,0.2)",
                  "--kb-case-radius": caseTier.caseRadius,
                  "--kb-bezel-radius": caseTier.bezelRadius,
                } as CSSProperties
              }
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-[var(--kb-case-radius)] mix-blend-multiply"
                style={{
                  backgroundImage: `url("${WOOD_TONE_URI}")`,
                  backgroundSize: "520px 520px",
                  opacity: 0.46,
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-[var(--kb-case-radius)] mix-blend-multiply"
                style={{
                  backgroundImage: `url("${WOOD_GRAIN_URI}")`,
                  backgroundSize: "460px 460px",
                  opacity: 0.5,
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-[var(--kb-case-radius)] mix-blend-multiply"
                style={{
                  backgroundImage: `url("${WOOD_GRAIN_FINE_URI}")`,
                  backgroundSize: "300px 300px",
                  backgroundPosition: "23px 11px",
                  opacity: 0.24,
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-(--kb-case-radius) mix-blend-overlay"
                style={{
                  background:
                    "repeating-linear-gradient(179deg, rgba(255,228,192,0.065) 0px, transparent 3px, transparent 17px, rgba(45,23,7,0.1) 20px, transparent 29px), repeating-linear-gradient(183deg, rgba(255,228,192,0.032) 0px, transparent 7px, transparent 41px, rgba(45,23,7,0.055) 44px, transparent 59px)",
                  opacity: 0.58,
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-(--kb-case-radius) mix-blend-multiply"
                style={{
                  backgroundImage: `url("${WOOD_PORE_URI}")`,
                  backgroundSize: "130px 130px",
                  opacity: 0.34,
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-(--kb-case-radius) mix-blend-screen"
                style={{
                  backgroundImage: `url("${WOOD_MICROSCRATCH_URI}")`,
                  backgroundSize: "620px 420px",
                  opacity: 0.5,
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-(--kb-case-radius)"
                style={{
                  backgroundImage: `url("${WOOD_DENT_URI}")`,
                  backgroundSize: "100% 100%",
                  opacity: 0.28,
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-(--kb-case-radius)"
                style={{
                  background:
                    "linear-gradient(112deg, transparent 30%, rgba(255,244,222,0.06) 44%, rgba(255,244,222,0.1) 49%, rgba(255,244,222,0.05) 54%, transparent 68%)",
                  mixBlendMode: "screen",
                }}
              />
              <div
                className="pointer-events-none absolute rounded-tl-(--kb-case-radius) mix-blend-multiply"
                style={{
                  left: 0,
                  top: 0,
                  width: "9%",
                  height: "18%",
                  backgroundImage: `url("${END_GRAIN_URI}")`,
                  backgroundSize: "80px 80px",
                  opacity: 0.56,
                  maskImage:
                    "radial-gradient(ellipse at top left, black, transparent 75%)",
                }}
              />
              <div
                className="pointer-events-none absolute rounded-br-(--kb-case-radius) mix-blend-multiply"
                style={{
                  right: 0,
                  bottom: 0,
                  width: "10%",
                  height: "20%",
                  backgroundImage: `url("${END_GRAIN_URI}")`,
                  backgroundSize: "80px 80px",
                  opacity: 0.5,
                  maskImage:
                    "radial-gradient(ellipse at bottom right, black, transparent 75%)",
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-(--kb-case-radius)"
                style={{
                  background:
                    "radial-gradient(85% 50% at 38% -8%, rgba(255,240,210,0.15), transparent 42%)",
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-(--kb-case-radius)"
                style={{
                  background:
                    "radial-gradient(70% 45% at 82% 108%, rgba(255,225,180,0.05), transparent 46%)",
                }}
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 rounded-b-[var(--kb-case-radius)]"
                style={{
                  height: "14%",
                  background:
                    "linear-gradient(180deg, transparent 0%, rgba(250,248,244,0.05) 100%)",
                  mixBlendMode: "screen",
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-[var(--kb-case-radius)]"
                style={{
                  boxShadow:
                    "inset 0 1px 0 rgba(255,246,224,0.6), inset 0 -1px 0 rgba(10,6,2,0.55), inset 1px 0 0 rgba(255,246,224,0.26), inset -1px 0 0 rgba(10,6,2,0.36)",
                }}
              />
              <div className="pointer-events-none absolute inset-[1px] rounded-[calc(var(--kb-case-radius)_-_0.06rem)] border-t border-l border-[#f6dfae]/22" />
              <div className="pointer-events-none absolute inset-[1px] rounded-[calc(var(--kb-case-radius)_-_0.06rem)] border-b border-r border-[#3f2811]/34" />
              <div
                className="relative rounded-[var(--kb-bezel-radius)]"
                style={{
                  padding: caseTier.bezelPadding,
                  background:
                    "linear-gradient(155deg, #15120e 0%, #0e0c08 50%, #0a0805 100%)",
                  boxShadow:
                    "inset 0 2.5px 6px rgba(0,0,0,0.55), inset 0 4px 8px rgba(0,0,0,0.28), inset 0 -1px 0 rgba(255,255,255,0.04), inset 0 0.5px 0 rgba(255,255,255,0.05), inset 0 0 0 1px rgba(0,0,0,0.32), 0 1px 0 rgba(255,236,204,0.1)",
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-[var(--kb-bezel-radius)]"
                  style={{
                    background:
                      "radial-gradient(140% 60% at 44% 0%, rgba(180,120,70,0.1), transparent 45%)",
                    zIndex: 0,
                  }}
                />
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
