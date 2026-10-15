import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

export default function ZoneBlock({
  zoneName,
  zoneSubName,
  zoneCapacity,
  zoneOccupied,
}) {
  const [isAvailable, setIsAvailable] = useState(true);

  const occupiedPercent = ((zoneOccupied / zoneCapacity) * 100).toFixed(0);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/zone/${zoneName}`);
  };

  useEffect(() => {
    const checkAvailability = async () => {
      if (zoneOccupied === zoneCapacity) {
        setIsAvailable(false);
      }
    };

    checkAvailability();
  }, [zoneOccupied, zoneCapacity]);

  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.01,
        boxShadow: "0 8px 5px rgba(0, 0, 0, 0.12)",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className={`flex items-center justify-start relative bg-card w-[98%] ${
        isAvailable ? "border-primary" : "border-warning"
      } border-2 rounded-lg shadow-lg cursor-pointer overflow-hidden`}
      onClick={() => handleNavigate()}
    >
      <div
        className={`${isAvailable ? "bg-primary" : "bg-warning"}  flex-col relative items-center justify-center w-35 h-35 inset-shadow-sm inset-shadow-gray-900/80 sm:flex hidden`}
      >
        <span className="text-card text-xl text-center  font-light text-wrap">
          ZONE
        </span>
        <span className="text-card text-4xl text-center  font-bold text-wrap">
          {zoneName}
        </span>
        <div className="w-2 bg-card h-full absolute right-0 rounded-tl-lg rounded-bl-lg shadow-lg"></div>
      </div>
      <div className="flex relative w-full h-35  flex-col justify-center items-start pe-2 ps-2 sm:ps-0">
        <span
          className={`text-xl font-bold ${isAvailable ? "text-primary" : "text-warning"}`}
        >
          Zone {zoneName}
        </span>
        <span className="-mt-2">{zoneSubName}</span>
        <span className="-mt-2">
          Sports:{" "}
          <span
            className={`${isAvailable ? "text-primary" : "text-warning"} font-bold`}
          >
            {zoneCapacity}
          </span>
        </span>
        <progress
          className={`progress ${isAvailable ? "progress-primary" : "progress-warning"} w-full`}
          value={zoneOccupied}
          max={zoneCapacity}
        ></progress>
        <div className="flex items-center justify-between w-full">
          <span className={`${isAvailable ? "text-primary" : "text-warning"} `}>
            {occupiedPercent}% Occupied
          </span>
          <span
            className={`${isAvailable ? "text-primary" : "text-warning"} flex items-center gap-1`}
          >
            <span className="font-semibold">
              {zoneOccupied} / {zoneCapacity}
            </span>
            occupied
          </span>
        </div>
        <div
          className={`absolute right-0 top-0 ${isAvailable ? "bg-primary" : "bg-warning"} text-card w-30 h-10  items-center justify-center rounded-bl-lg inset-shadow-sm inset-shadow-gray-900/50 sm:flex hidden`}
        >
          {isAvailable ? "AVAILABLE" : "UNAVAILABLE"}
        </div>
      </div>
    </motion.div>
  );
}
