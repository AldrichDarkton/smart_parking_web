import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, CircleAlert, Info, X } from "lucide-react";
import { useNotiStore } from "../store/notiStore";

const TOAST_DURATION = 4000;

const toastConfig = {
  success: {
    title: "Success",
    icon: CheckCircle2,
    iconClass: "text-success",
    iconBg: "bg-success/10",
    progress: "bg-success",
  },
  error: {
    title: "Error",
    icon: CircleAlert,
    iconClass: "text-error",
    iconBg: "bg-error/10",
    progress: "bg-error",
  },
  warning: {
    title: "Warning",
    icon: CircleAlert,
    iconClass: "text-warning",
    iconBg: "bg-warning/10",
    progress: "bg-warning",
  },
  info: {
    title: "Information",
    icon: Info,
    iconClass: "text-info",
    iconBg: "bg-info/10",
    progress: "bg-info",
  },
};

export default function Toast() {
  const [isVisible, setIsVisible] = useState(false);

  const notiType = useNotiStore((state) => state.notiType);
  const notiMessage = useNotiStore((state) => state.notiMessage);
  const notiId = useNotiStore((state) => state.notiId);
  const setNotiNull = useNotiStore((state) => state.setNotiNull);

  const normalizedType = String(notiType || "").toLowerCase();

  // Support common alternative names.
  const type =
    normalizedType === "danger" || normalizedType === "failed"
      ? "error"
      : normalizedType;

  const config = toastConfig[type] || toastConfig.info;
  const Icon = config.icon;

  useEffect(() => {
    if (!notiType || !notiMessage) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);

    const timer = window.setTimeout(() => {
      setIsVisible(false);
      setNotiNull();
    }, TOAST_DURATION);

    return () => window.clearTimeout(timer);
  }, [notiId, notiType, notiMessage, setNotiNull]);

  const handleDismiss = () => {
    setIsVisible(false);
    setNotiNull();
  };

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[9999] w-[calc(100vw-2rem)] max-w-sm sm:right-6 sm:top-6">
      <AnimatePresence>
        {isVisible && notiType && notiMessage && (
          <motion.div
            key={notiId}
            role={type === "error" ? "alert" : "status"}
            aria-live={type === "error" ? "assertive" : "polite"}
            initial={{
              opacity: 0,
              x: 24,
              y: -8,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              x: 24,
              y: -8,
              scale: 0.98,
            }}
            transition={{
              duration: 0.22,
              ease: "easeOut",
            }}
            className="alert relative flex w-full items-start gap-3 overflow-hidden rounded-2xl border border-base-300 bg-base-100 px-4 py-4 pb-5 text-base-content shadow-xl pointer-events-auto"
          >
            {/* Notification icon */}
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.iconBg}`}
            >
              <Icon size={22} className={config.iconClass} />
            </div>

            {/* Notification content */}
            <div className="min-w-0 flex-1 pt-0.5">
              <p className="text-sm font-semibold">{config.title}</p>

              <p className="mt-1 break-words text-sm leading-relaxed text-base-content/75">
                {notiMessage}
              </p>
            </div>

            {/* Dismiss button */}
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss notification"
              className="btn btn-ghost btn-sm btn-square -mr-2 -mt-1 shrink-0 text-base-content/60 hover:text-base-content"
            >
              <X size={17} />
            </button>

            {/* Countdown progress bar */}
            <div className="absolute bottom-0 left-0 h-1 w-full bg-base-300/50">
              <motion.div
                className={`h-full ${config.progress}`}
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{
                  duration: TOAST_DURATION / 1000,
                  ease: "linear",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
