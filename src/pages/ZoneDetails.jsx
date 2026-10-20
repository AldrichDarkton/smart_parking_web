import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Car, ImageIcon, SquareParking } from "lucide-react";
import CapacityProgressCard from "../components/CapacityProgressCard";
import { useParkingStore } from "../store/parkingStore";

// Temp data
// const zoneDataList = [
//   {
//     zoneName: "A",
//     zoneSubName: "Open-air Parking",
//     zoneMap: null,
//     zoneCapacity: 30,
//     zoneOccupied: 20,
//     parkingSlots: [
//       { slotNo: "#A01", occupied: true },
//       { slotNo: "#A02", occupied: false },
//       { slotNo: "#A03", occupied: true },
//       { slotNo: "#A04", occupied: true },
//       { slotNo: "#A05", occupied: false },
//       { slotNo: "#A06", occupied: true },
//       { slotNo: "#A07", occupied: false },
//       { slotNo: "#A08", occupied: true },
//       { slotNo: "#A09", occupied: true },
//       { slotNo: "#A10", occupied: true },
//       { slotNo: "#A11", occupied: false },
//       { slotNo: "#A12", occupied: true },
//       { slotNo: "#A13", occupied: false },
//       { slotNo: "#A14", occupied: true },
//       { slotNo: "#A15", occupied: true },
//       { slotNo: "#A16", occupied: false },
//       { slotNo: "#A17", occupied: true },
//       { slotNo: "#A18", occupied: true },
//       { slotNo: "#A19", occupied: false },
//       { slotNo: "#A20", occupied: true },
//       { slotNo: "#A21", occupied: true },
//       { slotNo: "#A22", occupied: false },
//       { slotNo: "#A23", occupied: true },
//       { slotNo: "#A24", occupied: true },
//       { slotNo: "#A25", occupied: false },
//       { slotNo: "#A26", occupied: true },
//       { slotNo: "#A27", occupied: false },
//       { slotNo: "#A28", occupied: true },
//       { slotNo: "#A29", occupied: true },
//       { slotNo: "#A30", occupied: false },
//     ],
//   },
//   {
//     zoneName: "B",
//     zoneSubName: "Basement Parking",
//     zoneMap: null,
//     zoneCapacity: 20,
//     zoneOccupied: 20,
//     parkingSlots: [
//       { slotNo: "#B01", occupied: true },
//       { slotNo: "#B02", occupied: true },
//       { slotNo: "#B03", occupied: true },
//       { slotNo: "#B04", occupied: true },
//       { slotNo: "#B05", occupied: true },
//       { slotNo: "#B06", occupied: true },
//       { slotNo: "#B07", occupied: true },
//       { slotNo: "#B08", occupied: true },
//       { slotNo: "#B09", occupied: true },
//       { slotNo: "#B10", occupied: true },
//       { slotNo: "#B11", occupied: true },
//       { slotNo: "#B12", occupied: true },
//       { slotNo: "#B13", occupied: true },
//       { slotNo: "#B14", occupied: true },
//       { slotNo: "#B15", occupied: true },
//       { slotNo: "#B16", occupied: true },
//       { slotNo: "#B17", occupied: true },
//       { slotNo: "#B18", occupied: true },
//       { slotNo: "#B19", occupied: true },
//       { slotNo: "#B20", occupied: true },
//     ],
//   },
// ];

// const zoneDataList = {
//   "Zone A": {
//     total: 3,
//     free: 2,
//     slots: {
//       A1: "occupied",
//       A2: "free",
//       A3: "free",
//       // A4: "occupied",
//       // A5: "free",
//       // A6: "free",
//       // A7: "occupied",
//       // A8: "free",
//       // A9: "free",
//       // A10: "occupied",
//       // A11: "free",
//       // A12: "free",
//       // A13: "occupied",
//       // A14: "free",
//       // A15: "free",
//       // A16: "occupied",
//       // A17: "free",
//       // A18: "free",
//     },
//   },
//   "Zone B": {
//     total: 2,
//     free: 1,
//     slots: {
//       B1: "occupied",
//       B2: "free",
//     },
//   },
// };

export default function ZoneDetails() {
  const { zoneId } = useParams();
  const [zoneInfo, setZoneInfo] = useState({});
  const { zone_slots } = useParkingStore();

  useEffect(() => {
    if (!zoneId) {
      return;
    }

    const findZoneInfo = async () => {
      const zoneData = zone_slots.filter((slot) => slot.zone === zoneId)[0];

      setZoneInfo(zoneData ?? {});
    };

    findZoneInfo();
  }, [zoneId, zone_slots]);

  return (
    <div className="flex flex-col items-center justify-start gap-4 w-full">
      <div className="h-10 w-full flex flex-col justify-center items-start ">
        <span className="text-primary font-bold text-xl">{zoneInfo.zone}</span>
        {/* <span className="text-primary font-light text-xs -mt-2">
          {zoneInfo.zoneSubName}
        </span> */}
      </div>
      {/* Map & Overview */}
      <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(260px,1fr)]">
        {/* Zone Map */}
        <div className="aspect-[2/1] w-full overflow-hidden rounded-md bg-primary-light flex items-center justify-center">
          {zoneInfo.zoneMap ? (
            <img
              src={zoneInfo.zoneMap}
              alt={`Zone ${zoneId} parking map`}
              className="h-full w-full object-contain"
            />
          ) : (
            <ImageIcon
              className="h-16 w-16 text-primary sm:h-20 sm:w-20"
              aria-hidden="true"
            />
          )}
        </div>

        {/* Overview Cards */}
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1 lg:gap-4">
          <OverviewCard
            value={zoneInfo.total ?? 0}
            title="Total Slots"
            subtitle="Parking spaces"
          />

          <OverviewCard
            value={zoneInfo.free ?? 0}
            title="Available Slots"
            subtitle="Ready for parking"
            isFull={zoneInfo.free === 0}
          />

          <OverviewCard
            value={zoneInfo.occupied ?? 0}
            title="Occupied Slots"
            subtitle="Currently in use"
            isFull={zoneInfo.free === 0}
          />
        </div>
      </div>
      {/* The ummmm occpied progress bar */}
      <CapacityProgressCard
        capacity={zoneInfo.total}
        occupied={zoneInfo.occupied}
        isFull={zoneInfo.free === 0}
      />

      {/* Parking slot list part */}
      <div className="flex flex-col items-center justify-start gap-4 w-full">
        <span className="text-primary font-bold text-xl w-full">
          Parking Slots
        </span>
        <div className="grid w-full px-1  grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-3 lg:gap-4">
          {zoneInfo.slots &&
            zoneInfo.slots.map((slot) => {
              return (
                <SlotBlock
                  key={slot.name}
                  slotNo={slot.name}
                  plateNo={slot.plate}
                  occupied={slot.occupied}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
const OverviewCard = ({ value, title, subtitle, isFull = false }) => {
  return (
    <div
      className={`flex min-h-24 w-full min-w-0 items-center gap-3 rounded-md border ${isFull ? "border-warning" : "border-primary"} bg-card p-3 shadow-sm shadow-gray-400/30 sm:min-h-28 lg:min-h-0 lg:flex-1 lg:p-4 overflow-hidden`}
    >
      <span
        className={`shrink-0 text-2xl font-bold ${isFull ? "text-warning" : "text-primary"} sm:text-3xl`}
      >
        {value}
      </span>

      <div className="flex min-w-0 flex-col">
        <span
          className={`font-semibold ${isFull ? "text-warning" : "text-primary"}`}
        >
          {title}
        </span>

        <span className="text-xs font-light text-muted-foreground">
          {subtitle}
        </span>
      </div>
    </div>
  );
};

const SlotBlock = ({ slotNo, plateNo, occupied }) => {
  return (
    <div className="hover-3d w-25">
      <div
        className={`flex flex-col items-start justify-start h-18 w-25 min-w-0 rounded-md border border-primary ${occupied ? "bg-primary-light" : "bg-card"} py-1 px-3 shadow-sm shadow-gray-400/30 overflow-hidden`}
      >
        <span className="shrink-0 font-bold text-primary">{slotNo}</span>
        <div className="flex flex-col items-center justify-center w-full h-full">
          {occupied ? (
            <>
              <Car className="shrink-0 text-2xl font-bold text-primary sm:text-3xl" />
              <span className="text-xs text-base-content/60">{plateNo}</span>
            </>
          ) : (
            <SquareParking className="shrink-0 text-2xl font-bold text-primary sm:text-3xl" />
          )}
        </div>
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
