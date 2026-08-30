"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { PBT_NOISE_URI } from "@/components/ui/vintage-keyboard-assets";
import { playKeySound } from "@/components/ui/vintage-keyboard-audio";
import {
  type KeyConfig,
  type KeyTrigger,
  KEY_PAN,
  getSoundCategory,
  getKeyVariance,
  shiftLightness,
} from "@/components/ui/vintage-keyboard-data";

export {
  ROWS,
  ALL_KEYS_BY_ID,
  CODE_TO_KEY_ID,
  KEY_PAN,
  getSoundCategory,
  getActiveKeyParts,
} from "@/components/ui/vintage-keyboard-data";

const KEYCAP_BASE = "#DFD2C3";
const LEGEND_INK = "#413e38";
const LEGEND_INK_SOFT = "#726d64";

export type DeviceTier = "mobile" | "tablet" | "desktop";

const MOBILE_BREAKPOINT = "(max-width: 639px)";
const TABLET_BREAKPOINT = "(max-width: 1023px)";

function resolveTier(): DeviceTier {
  if (typeof window === "undefined") return "desktop";
  if (window.matchMedia(MOBILE_BREAKPOINT).matches) return "mobile";
  if (window.matchMedia(TABLET_BREAKPOINT).matches) return "tablet";
  return "desktop";
}

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>(resolveTier);
  useEffect(() => {
    const mobileQuery = window.matchMedia(MOBILE_BREAKPOINT);
    const tabletQuery = window.matchMedia(TABLET_BREAKPOINT);
    const update = () => setTier(resolveTier());
    update();
    mobileQuery.addEventListener("change", update);
    tabletQuery.addEventListener("change", update);
    return () => {
      mobileQuery.removeEventListener("change", update);
      tabletQuery.removeEventListener("change", update);
    };
  }, []);
  return tier;
}

const RADIUS_TIERS: Record<DeviceTier, { wall: number; top: number }> = {
  desktop: { wall: 8, top: 6.5 },
  tablet: { wall: 7, top: 5.5 },
  mobile: { wall: 5.5, top: 4 },
};

const NOISE_OPACITY_TIERS: Record<DeviceTier, { wall: number; top: number }> = {
  desktop: { wall: 0.05, top: 0.06 },
  tablet: { wall: 0.05, top: 0.06 },
  mobile: { wall: 0.045, top: 0.05 },
};

const NOISE_SIZE_TIERS: Record<DeviceTier, { wall: number; top: number }> = {
  desktop: { wall: 90, top: 40 },
  tablet: { wall: 68, top: 30 },
  mobile: { wall: 48, top: 22 },
};

interface RowSculpt {
  insetTop: number;
  insetSide: number;
  insetBottom: number;
}

const ROW_SCULPT_TIERS: Record<DeviceTier, RowSculpt[]> = {
  desktop: [
    { insetTop: 4, insetSide: 4.5, insetBottom: 11 },
    { insetTop: 4, insetSide: 4.5, insetBottom: 9.5 },
    { insetTop: 4, insetSide: 4.5, insetBottom: 8.5 },
    { insetTop: 4, insetSide: 4.5, insetBottom: 9 },
    { insetTop: 3.5, insetSide: 4, insetBottom: 7 },
  ],
  tablet: [
    { insetTop: 3.2, insetSide: 3.6, insetBottom: 8.8 },
    { insetTop: 3.2, insetSide: 3.6, insetBottom: 7.6 },
    { insetTop: 3.2, insetSide: 3.6, insetBottom: 6.8 },
    { insetTop: 3.2, insetSide: 3.6, insetBottom: 7.2 },
    { insetTop: 2.8, insetSide: 3.2, insetBottom: 5.6 },
  ],
  mobile: [
    { insetTop: 2.2, insetSide: 2.4, insetBottom: 5.8 },
    { insetTop: 2.2, insetSide: 2.4, insetBottom: 5 },
    { insetTop: 2.2, insetSide: 2.4, insetBottom: 4.4 },
    { insetTop: 2.2, insetSide: 2.4, insetBottom: 4.7 },
    { insetTop: 2, insetSide: 2.2, insetBottom: 3.6 },
  ],
};

const LEGEND_SHARED = {
  shiftTopOffset: "13%",
  shiftLeftOffset: "18%",
  primaryBottomOffset: "14.5%",
  primaryLeftOffset: "0.85em",
  opticalCenterShift: "1.4%",
  shiftOpacity: 0.66,
  primaryOpacity: 0.96,
} as const;

const LEGEND_FONT_TIERS: Record<
  DeviceTier,
  { shift: string; normal: string; small: string }
> = {
  desktop: {
    shift: "clamp(0.46rem, 0.74vw, 0.58rem)",
    normal: "clamp(0.74rem, 1.38vw, 0.95rem)",
    small: "clamp(0.56rem, 1.02vw, 0.7rem)",
  },
  tablet: {
    shift: "clamp(0.48rem, 1.12vw, 0.58rem)",
    normal: "clamp(0.7rem, 2.05vw, 0.86rem)",
    small: "clamp(0.55rem, 1.58vw, 0.68rem)",
  },
  mobile: {
    shift: "clamp(0.43rem, 2.05vw, 0.51rem)",
    normal: "clamp(0.62rem, 3.65vw, 0.78rem)",
    small: "clamp(0.51rem, 2.85vw, 0.63rem)",
  },
};

const CONTACT_SHADOW_TIERS: Record<DeviceTier, string> = {
  desktop:
    "0 0.5px 0.5px rgba(12,8,4,0.14), 0 2px 3px rgba(12,8,4,0.1), 0 5px 9px rgba(12,8,4,0.07), 0 10px 16px rgba(12,8,4,0.045)",
  tablet:
    "0 0.4px 0.4px rgba(12,8,4,0.14), 0 1.5px 2.2px rgba(12,8,4,0.1), 0 3.5px 6px rgba(12,8,4,0.07), 0 6.5px 10px rgba(12,8,4,0.04)",
  mobile:
    "0 0.3px 0.3px rgba(12,8,4,0.13), 0 1px 1.6px rgba(12,8,4,0.1), 0 2.2px 4px rgba(12,8,4,0.06)",
};

const KEY_HEIGHT_TIERS: Record<DeviceTier, string> = {
  desktop: "clamp(2.15rem, min(4.15vw, 7.5vh), 2.95rem)",
  tablet: "clamp(1.95rem, min(5.4vw, 7vh), 2.6rem)",
  mobile: "clamp(1.75rem, min(8vw, 6vh), 2.2rem)",
};

export const KEY_GAP_TIERS: Record<DeviceTier, string> = {
  desktop: "3px",
  tablet: "2.5px",
  mobile: "2px",
};

export const CONTAINER_TIERS: Record<
  DeviceTier,
  { padding: string; maxWidth: string }
> = {
  desktop: { padding: "clamp(1.5rem, 6.25vw, 2.5rem)", maxWidth: "48rem" },
  tablet: { padding: "clamp(1.1rem, 3.6vw, 1.75rem)", maxWidth: "38rem" },
  mobile: { padding: "clamp(0.6rem, 3vw, 0.9rem)", maxWidth: "26rem" },
};

export const CASE_TIERS: Record<
  DeviceTier,
  {
    caseRadius: string;
    bezelRadius: string;
    casePadding: string;
    bezelPadding: string;
  }
> = {
  desktop: {
    caseRadius: "0.32rem",
    bezelRadius: "0.24rem",
    casePadding: "1.15% 1.3%",
    bezelPadding: "0.28%",
  },
  tablet: {
    caseRadius: "0.3rem",
    bezelRadius: "0.22rem",
    casePadding: "1.3% 1.5%",
    bezelPadding: "0.32%",
  },
  mobile: {
    caseRadius: "0.26rem",
    bezelRadius: "0.2rem",
    casePadding: "1.6% 1.9%",
    bezelPadding: "0.4%",
  },
};

const MOBILE_LABEL_OVERRIDES: Record<string, string> = {
  backspace: "⌫",
  caps: "Caps",
};

const HOME_ROW_IDS = new Set(["f", "j"]);

export const KEY_STYLE_TAG = `
.kb-key {
  --tilt: 0deg;
  will-change: transform;
  contain: layout style paint;
  backface-visibility: hidden;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;
  transform: translateY(0) scale(1) rotate(var(--tilt));
  transition: transform 220ms cubic-bezier(0.22, 1.4, 0.36, 1);
}
.kb-key[data-pressed="true"] {
  transform: translateY(5px) scale(0.97) rotate(calc(var(--tilt) * 0.25));
  transition: transform 12ms linear;
}
.kb-viewport {
  min-height: 0;
}
`;

const MIN_VISIBLE_PRESS_MS = 48;

function usePressState(): [boolean, () => void, () => void] {
  const [pressed, setPressed] = useState(false);
  const pressedAtRef = useRef(0);
  const releaseTimeoutRef = useRef<number | null>(null);

  const clearPendingRelease = useCallback(() => {
    if (releaseTimeoutRef.current !== null) {
      window.clearTimeout(releaseTimeoutRef.current);
      releaseTimeoutRef.current = null;
    }
  }, []);

  const press = useCallback(() => {
    clearPendingRelease();
    pressedAtRef.current = performance.now();
    setPressed(true);
  }, [clearPendingRelease]);

  const release = useCallback(() => {
    const elapsed = performance.now() - pressedAtRef.current;
    const remaining = MIN_VISIBLE_PRESS_MS - elapsed;
    if (remaining > 0) {
      clearPendingRelease();
      releaseTimeoutRef.current = window.setTimeout(() => {
        releaseTimeoutRef.current = null;
        setPressed(false);
      }, remaining);
    } else {
      setPressed(false);
    }
  }, [clearPendingRelease]);

  useEffect(() => clearPendingRelease, [clearPendingRelease]);

  return [pressed, press, release];
}

export const Key = memo(function Key({
  config,
  rowIndex,
  tier,
  registerTrigger,
  onActivate,
  onDeactivate,
  onType,
}: {
  config: KeyConfig;
  rowIndex: number;
  tier: DeviceTier;
  registerTrigger: (id: string, trigger: KeyTrigger) => () => void;
  onActivate: (id: string) => void;
  onDeactivate: (id: string) => void;
  onType?: (id: string) => void;
}) {
  const {
    id,
    label,
    shiftLabel,
    width = 1,
    align = "center",
    small,
    muted,
  } = config;
  const [pointerPressed, pressPointer, releasePointer] = usePressState();
  const [physicallyPressed, pressPhysical, releasePhysical] = usePressState();
  const sculptRows = ROW_SCULPT_TIERS[tier];
  const sculpt = sculptRows[rowIndex] ?? sculptRows[1];
  const radius = RADIUS_TIERS[tier];
  const noiseOpacity = NOISE_OPACITY_TIERS[tier];
  const noiseSize = NOISE_SIZE_TIERS[tier];
  const legendFont = LEGEND_FONT_TIERS[tier];
  const contactShadow = CONTACT_SHADOW_TIERS[tier];
  const keyHeight = KEY_HEIGHT_TIERS[tier];
  const displayLabel =
    tier === "mobile" ? (MOBILE_LABEL_OVERRIDES[id] ?? label) : label;
  const pressed = pointerPressed || physicallyPressed;
  const variance = useMemo(() => getKeyVariance(id, small), [id, small]);
  const primaryAlign: "left" | "center" = align;
  const showHomeBump = HOME_ROW_IDS.has(id);

  useEffect(() => {
    return registerTrigger(id, {
      press: pressPhysical,
      release: releasePhysical,
    });
  }, [id, registerTrigger, pressPhysical, releasePhysical]);

  const layers = useMemo(() => {
    const insetTRBL = `${sculpt.insetTop}px ${sculpt.insetSide}px ${sculpt.insetBottom}px ${sculpt.insetSide}px`;
    return {
      insetTRBL,
      wallGradient: `linear-gradient(180deg, ${shiftLightness(
        "#f0e4d1",
        variance.lightnessShift,
      )} 0%, ${shiftLightness(
        "#e0cead",
        variance.lightnessShift,
      )} 18%, ${shiftLightness("#c8b394", variance.lightnessShift)} 46%, ${shiftLightness(
        "#a68e70",
        variance.lightnessShift * 0.7,
      )} 78%, ${shiftLightness("#8c7458", variance.lightnessShift * 0.5)} 100%)`,
      wallFilter: `hue-rotate(${variance.hueShift}deg)`,
      wallNoisePosition: `${variance.specularShiftX}px ${variance.specularShiftY}px`,
      wallShadow: `inset 0 1px 0 rgba(255,255,255,0.4), inset 0.6px 0.4px 0 rgba(255,255,255,0.14), inset 0 -1.5px 2px rgba(15,9,4,0.16), inset 0 0 0 0.5px rgba(15,9,4,0.06)`,
      topGradient: `radial-gradient(115% 125% at ${23 + variance.specularShiftX * 0.4}% 9%, rgba(255,255,255,${
        0.4 - variance.wearAmount * 0.06
      }), rgba(255,255,255,0) 44%), radial-gradient(150% 120% at 50% 118%, rgba(15,9,4,${
        0.07 + variance.wearAmount * 0.02
      }), transparent 60%), ${shiftLightness(KEYCAP_BASE, variance.lightnessShift * 0.6)}`,
      topFilter: `hue-rotate(${variance.hueShift * 0.4}deg)`,
      topNoisePosition: `${variance.specularShiftY}px ${variance.specularShiftX}px`,
      topShadow: `inset 0 0 0 0.75px rgba(96,70,42,0.28), inset 0 0.6px 0 rgba(255,250,238,0.4), inset 0 -0.8px 1.2px rgba(15,9,4,0.04)`,
      topShadowPressed: `inset 0 0 0 0.75px rgba(96,70,42,0.34), inset 0 0.5px 0 rgba(255,250,238,0.22), inset 0 1px 2px rgba(15,10,5,0.1)`,
      rimOpacityUp: 0.55 * variance.rimBias,
      rimOpacityDown: 0.22 * variance.rimBias,
    };
  }, [sculpt, variance]);

  const handlePress = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);
      pressPointer();
      onActivate(id);
      playKeySound(getSoundCategory(id), !!muted, KEY_PAN[id] ?? 0);
      onType?.(id);
    },
    [id, muted, pressPointer, onActivate, onType],
  );

  const handleRelease = useCallback(() => {
    releasePointer();
    onDeactivate(id);
  }, [releasePointer, onDeactivate, id]);

  return (
    <button
      type="button"
      aria-label={label || "Space"}
      data-pressed={pressed}
      onPointerDown={handlePress}
      onPointerUp={handleRelease}
      onPointerCancel={handleRelease}
      onPointerLeave={handleRelease}
      style={
        {
          flexGrow: width,
          flexBasis: 0,
          minWidth: 0,
          height: keyHeight,
          "--tilt": `${variance.microTilt}deg`,
        } as CSSProperties
      }
      className="kb-key relative select-none outline-none"
    >
      <span
        className="pointer-events-none absolute"
        style={{
          inset: 0,
          borderRadius: radius.wall,
          boxShadow: pressed
            ? "0 0.5px 1px rgba(15,9,4,0.2), 0 2px 4px rgba(15,9,4,0.12)"
            : contactShadow,
          transition: "box-shadow 120ms ease-out",
          zIndex: 0,
        }}
      />
      <span
        className="absolute inset-0"
        style={{
          borderRadius: radius.wall,
          background: layers.wallGradient,
          filter: layers.wallFilter,
          boxShadow: layers.wallShadow,
          zIndex: 1,
        }}
      />
      <span
        className="pointer-events-none absolute inset-0 mix-blend-overlay"
        style={{
          borderRadius: radius.wall,
          backgroundImage: `url("${PBT_NOISE_URI}")`,
          backgroundSize: `${noiseSize.wall}px ${noiseSize.wall}px`,
          backgroundPosition: layers.wallNoisePosition,
          opacity: noiseOpacity.wall,
          zIndex: 1,
        }}
      />
      <span
        className="absolute"
        style={{
          borderRadius: radius.top,
          inset: layers.insetTRBL,
          background: layers.topGradient,
          filter: layers.topFilter,
          boxShadow: pressed ? layers.topShadowPressed : layers.topShadow,
          transition: "box-shadow 120ms ease-out, background 120ms ease-out",
          zIndex: 3,
        }}
      />
      <span
        className="pointer-events-none absolute mix-blend-overlay"
        style={{
          borderRadius: radius.top,
          inset: layers.insetTRBL,
          backgroundImage: `url("${PBT_NOISE_URI}")`,
          backgroundSize: `${noiseSize.top}px ${noiseSize.top}px`,
          backgroundPosition: layers.topNoisePosition,
          opacity: noiseOpacity.top,
          zIndex: 3,
        }}
      />
      <span
        className="pointer-events-none absolute"
        style={{
          borderRadius: radius.top,
          inset: layers.insetTRBL,
          background:
            "radial-gradient(55% 50% at 26% 18%, rgba(255,252,244,0.28), transparent 70%)",
          opacity: pressed ? 0.4 : 1,
          transition: "opacity 120ms ease-out",
          zIndex: 4,
        }}
      />
      <span
        className="pointer-events-none absolute"
        style={{
          borderRadius: radius.top,
          inset: layers.insetTRBL,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.24) 0%, transparent 14%), linear-gradient(100deg, rgba(255,255,255,0.09) 0%, transparent 9%)",
          opacity: pressed ? layers.rimOpacityDown : layers.rimOpacityUp,
          transition: "opacity 120ms ease-out",
          zIndex: 4,
        }}
      />
      {showHomeBump && (
        <span
          className="pointer-events-none absolute"
          aria-hidden
          style={{
            left: "50%",
            bottom: `calc(${sculpt.insetBottom}px + 28%)`,
            transform: "translateX(-50%)",
            width: tier === "mobile" ? 8 : 10,
            height: tier === "mobile" ? 2.5 : 3,
            borderRadius: 2,
            background: "rgba(65, 62, 56, 0.35)",
            boxShadow: "0 0.5px 0 rgba(255,255,255,0.2)",
            zIndex: 5,
          }}
        />
      )}
      <span
        className="pointer-events-none absolute inset-0"
        style={{ zIndex: 6 }}
      >
        {shiftLabel && (
          <span
            className="absolute font-medium leading-none"
            style={{
              top: `calc(${sculpt.insetTop}px + ${LEGEND_SHARED.shiftTopOffset})`,
              left: LEGEND_SHARED.shiftLeftOffset,
              fontSize: legendFont.shift,
              color: LEGEND_INK_SOFT,
              opacity: LEGEND_SHARED.shiftOpacity,
              letterSpacing: "0.01em",
              textShadow:
                "0 0.4px 0 rgba(255,255,255,0.32), 0 0 0.3px rgba(35,28,18,0.3)",
            }}
          >
            {shiftLabel}
          </span>
        )}
        {label && (
          <span
            className={`absolute leading-none ${
              small ? "font-semibold" : "font-bold"
            } ${primaryAlign === "left" ? "text-left" : "text-center"}`}
            style={{
              bottom: `calc(${sculpt.insetBottom}px + ${LEGEND_SHARED.primaryBottomOffset})`,
              left:
                primaryAlign === "left"
                  ? LEGEND_SHARED.primaryLeftOffset
                  : shiftLabel
                    ? `calc(50% - ${LEGEND_SHARED.opticalCenterShift})`
                    : "50%",
              transform:
                primaryAlign === "left" ? undefined : "translateX(-50%)",
              fontSize: small ? legendFont.small : legendFont.normal,
              color: LEGEND_INK,
              opacity: LEGEND_SHARED.primaryOpacity,
              letterSpacing: small ? "0.015em" : "-0.01em",
              textShadow:
                "0 0.4px 0 rgba(255,255,255,0.28), 0 0 0.35px rgba(30,24,16,0.35)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "clip",
              maxWidth: "100%",
            }}
          >
            {displayLabel}
          </span>
        )}
      </span>
    </button>
  );
});
