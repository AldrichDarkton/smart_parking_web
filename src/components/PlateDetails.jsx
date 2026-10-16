import {
  CalendarDays,
  CarFront,
  Clock,
  Image as ImageIcon,
  MapPin,
  UserRound,
} from "lucide-react";
import { motion } from "framer-motion";

export default function PlateDetails() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col gap-5 w-full"
    >
      {/* Vehicle image */}
      <div className="relative w-full h-44 rounded-xl overflow-hidden bg-primary-light/40 group">
        {/* <img
          src=""
          alt="Registered vehicle"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        /> */}
        <ImageIcon className="w-20 h-20 object-center mx-auto my-auto text-primary" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <span className="absolute top-3 right-3 badge badge-success gap-1 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          Currently Parked
        </span>

        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="text-white/75 text-xs font-medium tracking-widest">
              LICENSE PLATE
            </p>
            <h2 className="text-white text-3xl font-extrabold tracking-wider">
              P1-4923
            </h2>
          </div>

          <CarFront className="w-9 h-9 text-white/80 shrink-0" />
        </div>
      </div>

      {/* Parking information */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          <h3 className="font-bold text-base-content">Parking Information</h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
            <p className="text-xs text-base-content/60 mb-1">PARKING ZONE</p>
            <p className="font-bold text-primary">Zone A</p>
          </div>

          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
            <p className="text-xs text-base-content/60 mb-1">PARKING SLOT</p>
            <p className="font-bold text-primary">A03</p>
          </div>
        </div>
      </div>

      {/* Owner information */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <UserRound className="w-4 h-4 text-primary" />
          <h3 className="font-bold text-base-content">Owner Information</h3>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-base-300 p-3">
          <div className="flex items-center justify-center w-11 h-11 rounded-full bg-primary/10 text-primary shrink-0">
            <UserRound className="w-5 h-5" />
          </div>

          <div className="flex flex-col min-w-0">
            <span className="font-semibold truncate">Jack Grim</span>
            <span className="text-xs text-base-content/60">
              Registered vehicle owner
            </span>
          </div>
        </div>
      </div>

      {/* Additional details */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-start gap-2">
          <Clock className="w-4 h-4 mt-0.5 text-primary shrink-0" />
          <div>
            <p className="text-xs text-base-content/60">Entry Time</p>
            <p className="text-sm font-semibold">09:30 AM</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <CalendarDays className="w-4 h-4 mt-0.5 text-primary shrink-0" />
          <div>
            <p className="text-xs text-base-content/60">Entry Date</p>
            <p className="text-sm font-semibold">16/10/2026</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
