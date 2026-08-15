import { useEffect, useRef, useState, type ReactNode } from "react";

export type WindowState = {
  id: string;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized?: boolean;
  maximized?: boolean;
};

type Props = {
  state: WindowState;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMax: () => void;
  onMove: (x: number, y: number) => void;
  onResize: (w: number, h: number, x?: number, y?: number) => void;
  active: boolean;
  children: ReactNode;
};

const MIN_W = 320;
const MIN_H = 200;

export function MacWindow({
  state,
  onFocus,
  onClose,
  onMinimize,
  onToggleMax,
  onMove,
  onResize,
  active,
  children,
}: Props) {
  const drag = useRef<{ dx: number; dy: number } | null>(null);
  const resize = useRef<{
    edge: string;
    startX: number;
    startY: number;
    startW: number;
    startH: number;
    startLeft: number;
    startTop: number;
  } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    function onPointerMove(e: PointerEvent) {
      if (drag.current) {
        onMove(
          Math.max(0, Math.min(window.innerWidth - 120, e.clientX - drag.current.dx)),
          Math.max(28, Math.min(window.innerHeight - 80, e.clientY - drag.current.dy)),
        );
        return;
      }
      if (!resize.current) return;
      const r = resize.current;
      const dx = e.clientX - r.startX;
      const dy = e.clientY - r.startY;
      let nextW = r.startW;
      let nextH = r.startH;
      let nextX = r.startLeft;
      let nextY = r.startTop;

      if (r.edge.includes("e")) nextW = Math.max(MIN_W, r.startW + dx);
      if (r.edge.includes("s")) nextH = Math.max(MIN_H, r.startH + dy);
      if (r.edge.includes("w")) {
        nextW = Math.max(MIN_W, r.startW - dx);
        nextX = r.startLeft + (r.startW - nextW);
      }
      if (r.edge.includes("n")) {
        nextH = Math.max(MIN_H, r.startH - dy);
        nextY = r.startTop + (r.startH - nextH);
      }

      onResize(nextW, nextH, nextX, nextY);
    }

    function onPointerUp() {
      drag.current = null;
      resize.current = null;
    }

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [onMove, onResize]);

  const maximized = state.maximized;

  function startResize(edge: string, e: React.PointerEvent) {
    e.stopPropagation();
    e.preventDefault();
    onFocus();
    resize.current = {
      edge,
      startX: e.clientX,
      startY: e.clientY,
      startW: state.w,
      startH: state.h,
      startLeft: state.x,
      startTop: state.y,
    };
  }

  return (
    <section
      onPointerDown={onFocus}
      aria-label={state.title}
      className="mac-window fixed flex flex-col overflow-hidden rounded-xl"
      style={{
        left: maximized ? 10 : state.x,
        top: maximized ? 34 : state.y,
        width: maximized ? "calc(100vw - 20px)" : state.w,
        height: maximized ? "calc(100vh - 120px)" : state.h,
        zIndex: state.z,
        opacity: state.minimized ? 0 : mounted ? 1 : 0,
        pointerEvents: state.minimized ? "none" : "auto",
        transform: state.minimized
          ? "scale(0.82) translateY(48px)"
          : mounted
            ? "scale(1)"
            : "scale(0.97)",
        transition:
          "opacity 0.28s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.32s cubic-bezier(0.2, 0.8, 0.2, 1), width 0.28s, height 0.28s, left 0.28s, top 0.28s",
        boxShadow: active ? "var(--shadow-window-active)" : "var(--shadow-window)",
      }}
    >
      <header
        onPointerDown={(e) => {
          if (maximized) return;
          const target = e.target as HTMLElement;
          if (target.closest("button")) return;
          drag.current = { dx: e.clientX - state.x, dy: e.clientY - state.y };
        }}
        onDoubleClick={onToggleMax}
        className="flex h-10 shrink-0 cursor-grab select-none items-center gap-2 border-b border-[var(--glass-border)] bg-[var(--titlebar)] px-3.5 active:cursor-grabbing"
      >
        <div className="group flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Close window"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="size-3 rounded-full bg-[#ff5f57] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.18)] transition hover:brightness-110"
          />
          <button
            type="button"
            aria-label="Minimize window"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            className="size-3 rounded-full bg-[#febc2e] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.18)] transition hover:brightness-110"
          />
          <button
            type="button"
            aria-label="Maximize window"
            onClick={(e) => {
              e.stopPropagation();
              onToggleMax();
            }}
            className="size-3 rounded-full bg-[#28c840] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.18)] transition hover:brightness-110"
          />
        </div>
        <p className="flex-1 truncate text-center text-[13px] font-medium tracking-tight text-foreground/85">
          {state.title}
        </p>
        <div className="w-12" />
      </header>

      <div className="mac-scroll min-h-0 flex-1 overflow-y-auto">{children}</div>

      {!maximized && (
        <>
          <div className="absolute inset-x-3 top-0 h-1.5 cursor-n-resize" onPointerDown={(e) => startResize("n", e)} />
          <div className="absolute inset-x-3 bottom-0 h-1.5 cursor-s-resize" onPointerDown={(e) => startResize("s", e)} />
          <div className="absolute inset-y-3 left-0 w-1.5 cursor-w-resize" onPointerDown={(e) => startResize("w", e)} />
          <div className="absolute inset-y-3 right-0 w-1.5 cursor-e-resize" onPointerDown={(e) => startResize("e", e)} />
          <div className="absolute bottom-0 right-0 size-4 cursor-se-resize" onPointerDown={(e) => startResize("se", e)} />
          <div className="absolute bottom-0 left-0 size-4 cursor-sw-resize" onPointerDown={(e) => startResize("sw", e)} />
          <div className="absolute top-0 right-0 size-4 cursor-ne-resize" onPointerDown={(e) => startResize("ne", e)} />
          <div className="absolute top-0 left-0 size-4 cursor-nw-resize" onPointerDown={(e) => startResize("nw", e)} />
        </>
      )}
    </section>
  );
}
