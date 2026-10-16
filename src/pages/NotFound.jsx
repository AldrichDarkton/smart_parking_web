import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CarFront,
  CircleParking,
  Compass,
  House,
  MapPin,
  SearchX,
} from "lucide-react";
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 py-12">
      {/* Background decorations */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative flex w-full max-w-2xl flex-col items-center text-center"
      >
        {/* Parking icon illustration */}
        <motion.div
          initial={{ scale: 0.7, rotate: -8 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: 0.15,
            type: "spring",
            stiffness: 180,
            damping: 12,
          }}
          className="relative mb-7 flex h-36 w-36 items-center justify-center rounded-[2rem] border border-primary/20 bg-card shadow-xl"
        >
          <div className="absolute inset-3 rounded-3xl bg-primary/5" />

          <CircleParking
            className="absolute h-24 w-24 text-primary/20"
            strokeWidth={1}
          />

          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-content shadow-lg"
          >
            <CarFront className="h-9 w-9" strokeWidth={1.7} />
          </motion.div>

          <div className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-warning text-warning-content shadow-md">
            <SearchX className="h-5 w-5" />
          </div>
        </motion.div>

        {/* Error code */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="relative"
        >
          <h1 className="select-none text-[clamp(6rem,20vw,11rem)] font-black leading-none tracking-tighter text-primary/10">
            404
          </h1>

          <p className="absolute inset-0 flex items-center justify-center text-5xl font-extrabold tracking-tight text-primary sm:text-6xl">
            Oops!
          </p>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-2 max-w-md"
        >
          <h2 className="text-2xl font-bold text-base-content sm:text-3xl">
            Looks like you've taken a wrong turn.
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-base-content/60 sm:text-base">
            We couldn't find the page you're looking for. It may have moved,
            been removed, or the address might be incorrect.
          </p>
        </motion.div>

        {/* Route-style decoration */}
        <div className="my-7 flex w-full max-w-xs items-center gap-3">
          <div className="h-px flex-1 border-t-2 border-dashed border-primary/20" />
          <div className="flex items-center gap-2 rounded-full border border-primary/15 bg-card px-3 py-2 text-xs font-medium text-primary">
            <MapPin className="h-3.5 w-3.5" />
            Page not found
          </div>
          <div className="h-px flex-1 border-t-2 border-dashed border-primary/20" />
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row"
        >
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-outline btn-primary gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn btn-primary gap-2 shadow-md"
          >
            <House className="h-4 w-4" />
            Back to Dashboard
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>

        {/* Footer */}
        <div className="mt-12 flex items-center gap-2 text-xs text-base-content/40">
          <Compass className="h-4 w-4" />
          <span>Smart Car Park · Navigation Error</span>
        </div>
      </motion.div>
    </main>
  );
}
