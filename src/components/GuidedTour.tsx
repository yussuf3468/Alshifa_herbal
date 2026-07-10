import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { X } from "lucide-react";

export interface TourStep {
  /** `data-tour` value of the element to spotlight. Omit for a centered card. */
  target?: string;
  title: string;
  body: string;
  /** Switch the app to this admin tab before showing the step. */
  tab?: string;
}

interface GuidedTourProps {
  steps: TourStep[];
  open: boolean;
  onClose: () => void;
  onNavigateTab?: (tab: string) => void;
}

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

/** First on-screen element matching the data-tour selector (desktop wins). */
function findVisible(selector?: string): HTMLElement | null {
  if (!selector) return null;
  const els = Array.from(
    document.querySelectorAll<HTMLElement>(`[data-tour="${selector}"]`),
  );
  return (
    els.find((el) => el.offsetParent !== null && el.getClientRects().length) ||
    null
  );
}

export default function GuidedTour({
  steps,
  open,
  onClose,
  onNavigateTab,
}: GuidedTourProps) {
  const [index, setIndex] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const step = steps[index];
  const isLast = index === steps.length - 1;

  const finish = useCallback(() => {
    setIndex(0);
    onClose();
  }, [onClose]);

  // Restart from the top each time the tour opens.
  useEffect(() => {
    if (open) setIndex(0);
  }, [open]);

  // Switch to the step's tab (if any), then locate its target element.
  useEffect(() => {
    if (!open || !step) return;
    if (step.tab) onNavigateTab?.(step.tab);

    const measure = () => {
      const el = findVisible(step.target);
      if (el) {
        el.scrollIntoView({ block: "nearest", behavior: "smooth" });
        const r = el.getBoundingClientRect();
        setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
      } else {
        setRect(null);
      }
    };

    // Give a freshly-switched tab a moment to render before measuring.
    const t = setTimeout(measure, step.tab ? 180 : 0);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [open, index, step, onNavigateTab]);

  // Place the tooltip near the target (prefer right, then below, then above).
  useLayoutEffect(() => {
    if (!open) return;
    if (!rect) {
      setPos(null);
      return;
    }
    const tip = tooltipRef.current;
    const tw = tip?.offsetWidth ?? 340;
    const th = tip?.offsetHeight ?? 210;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const gap = 14;

    let top: number;
    let left: number;
    if (vw - (rect.left + rect.width) > tw + gap) {
      left = rect.left + rect.width + gap;
      top = rect.top;
    } else if (vh - (rect.top + rect.height) > th + gap) {
      top = rect.top + rect.height + gap;
      left = rect.left;
    } else if (rect.top > th + gap) {
      top = rect.top - th - gap;
      left = rect.left;
    } else {
      left = rect.left + rect.width + gap;
      top = rect.top;
    }
    top = Math.min(Math.max(8, top), vh - th - 8);
    left = Math.min(Math.max(8, left), vw - tw - 8);
    setPos({ top, left });
  }, [rect, index, open]);

  // Keyboard: Esc to close, arrows to move.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
      else if (e.key === "ArrowRight")
        setIndex((i) => Math.min(steps.length - 1, i + 1));
      else if (e.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, finish, steps.length]);

  if (!open || !step) return null;

  const centered = !rect;
  const pad = 6;

  return (
    <div className="fixed inset-0 z-[9998]" role="dialog" aria-modal="true">
      {/* Dimmer: box-shadow spotlight around the target, or a flat dim. */}
      {rect ? (
        <div
          className="pointer-events-none absolute rounded-xl transition-all duration-300"
          style={{
            top: rect.top - pad,
            left: rect.left - pad,
            width: rect.width + pad * 2,
            height: rect.height + pad * 2,
            boxShadow: "0 0 0 9999px rgba(2,6,23,0.72)",
            outline: "2px solid rgb(16 185 129)",
            outlineOffset: 2,
          }}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: "rgba(2,6,23,0.72)" }}
        />
      )}

      {/* Tooltip / card */}
      <div
        ref={tooltipRef}
        onClick={(e) => e.stopPropagation()}
        className="absolute w-[min(340px,calc(100vw-24px))] rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl p-5"
        style={
          centered
            ? { top: "50%", left: "50%", transform: "translate(-50%,-50%)" }
            : pos
              ? { top: pos.top, left: pos.left }
              : { top: 16, left: 16, visibility: "hidden" }
        }
      >
        <button
          onClick={finish}
          aria-label="Close tour"
          className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
          Step {index + 1} of {steps.length}
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white pr-6">
          {step.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {step.body}
        </p>

        <div className="mt-4 flex items-center gap-1.5">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === index
                  ? "w-5 bg-emerald-500"
                  : "w-1.5 bg-slate-300 dark:bg-slate-600"
              }`}
            />
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
          <button
            onClick={finish}
            className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            Skip
          </button>
          <div className="flex items-center gap-2">
            {index > 0 && (
              <button
                onClick={() => setIndex((i) => i - 1)}
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                Back
              </button>
            )}
            <button
              onClick={() =>
                isLast ? finish() : setIndex((i) => i + 1)
              }
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-sm"
            >
              {isLast ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
