import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { MapPin, ParkingSquare, ArrowUpRight } from "lucide-react";

export default function ZoneBlock({
  zoneName,
  zoneSubName,
  zoneCapacity,
  zoneOccupied,
}) {
  const navigate = useNavigate();

  const isAvailable = zoneOccupied < zoneCapacity;
  const freeSpots = Math.max(0, zoneCapacity - zoneOccupied);
  const occupiedPercent =
    zoneCapacity > 0
      ? Math.min(100, Math.round((zoneOccupied / zoneCapacity) * 100))
      : 0;

  const statusColor = isAvailable ? "text-primary" : "text-warning";

  const statusBg = isAvailable ? "bg-primary" : "bg-warning";

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      onClick={() => navigate(`/zone/${zoneName}`)}
      className={`relative flex flex-col w-full min-w-0 overflow-hidden
        rounded-xl border-2 bg-card shadow-md cursor-pointer
        transition-shadow hover:shadow-xl
        ${isAvailable ? "border-primary/40" : "border-warning/50"}`}
    >
      {/* Colored header */}
      <div
        className={`${statusBg} relative flex flex-col items-center justify-center
          min-h-36 px-4 py-5 text-card`}
      >
        <span className="text-xs font-semibold tracking-[0.2em] opacity-80">
          PARKING ZONE
        </span>

        <span className="text-6xl font-extrabold leading-tight">
          {zoneName}
        </span>

        <span className="mt-2 flex items-center gap-1.5 text-xs font-medium opacity-90">
          <MapPin className="w-3.5 h-3.5" />
          {zoneSubName}
        </span>

        {/* Decorative circle */}
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full border-8 border-white/10" />
        <div className="absolute -bottom-10 -left-6 h-20 w-20 rounded-full border-8 border-white/10" />
      </div>

      {/* Status badge */}
      <div className="flex justify-center -mt-3 relative z-10">
        <span
          className={`badge badge-lg border-2 border-card font-bold shadow-sm
            ${isAvailable ? "bg-primary text-card" : "bg-warning text-card"}`}
        >
          {isAvailable ? "AVAILABLE" : "FULL"}
        </span>
      </div>

      {/* Zone details */}
      <div className="flex flex-col gap-4 p-4 pt-3">
        {/* Capacity */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary w-9 h-9 shrink-0">
              <ParkingSquare className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-base-content/60">Total Capacity</p>
              <p className="font-bold text-base-content">
                {zoneCapacity} spots
              </p>
            </div>
          </div>
        </div>

        {/* Occupancy summary */}
        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="text-xs text-base-content/60">Occupied</p>
            <p className={`text-2xl font-extrabold ${statusColor}`}>
              {zoneOccupied}
              <span className="text-sm font-medium text-base-content/50">
                {" "}
                / {zoneCapacity}
              </span>
            </p>
          </div>

          <span className={`text-lg font-bold ${statusColor}`}>
            {occupiedPercent}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="flex flex-col gap-2">
          <progress
            className={`progress w-full ${
              isAvailable ? "progress-primary" : "progress-warning"
            }`}
            value={occupiedPercent}
            max={100}
          />

          <div className="flex justify-between text-xs text-base-content/60">
            <span>Free spaces</span>
            <span className={`font-bold ${statusColor}`}>{freeSpots}</span>
          </div>
        </div>

        {/* View details */}
        <div className="flex items-center justify-between border-t border-base-300 pt-3">
          <span className="text-sm font-semibold text-base-content/70">
            View zone details
          </span>
          <ArrowUpRight className="w-4 h-4 text-primary" />
        </div>
      </div>
    </motion.div>
  );
}
