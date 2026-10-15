import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Car, ImageIcon, SquareParking } from "lucide-react";
import CapacityProgressCard from "../components/CapacityProgressCard";

// Temp data
const zoneDataList = [
  {
    zoneName: "A",
    zoneSubName: "Open-air Parking",
    zoneMap: null,
    zoneCapacity: 30,
    zoneOccupied: 20,
    parkingSlots: [
      { slotNo: "#A01", occupied: true },
      { slotNo: "#A02", occupied: false },
      { slotNo: "#A03", occupied: true },
      { slotNo: "#A04", occupied: true },
      { slotNo: "#A05", occupied: false },
      { slotNo: "#A06", occupied: true },
      { slotNo: "#A07", occupied: false },
      { slotNo: "#A08", occupied: true },
      { slotNo: "#A09", occupied: true },
      { slotNo: "#A10", occupied: true },
      { slotNo: "#A11", occupied: false },
      { slotNo: "#A12", occupied: true },
      { slotNo: "#A13", occupied: false },
      { slotNo: "#A14", occupied: true },
      { slotNo: "#A15", occupied: true },
      { slotNo: "#A16", occupied: false },
      { slotNo: "#A17", occupied: true },
      { slotNo: "#A18", occupied: true },
      { slotNo: "#A19", occupied: false },
      { slotNo: "#A20", occupied: true },
      { slotNo: "#A21", occupied: true },
      { slotNo: "#A22", occupied: false },
      { slotNo: "#A23", occupied: true },
      { slotNo: "#A24", occupied: true },
      { slotNo: "#A25", occupied: false },
      { slotNo: "#A26", occupied: true },
      { slotNo: "#A27", occupied: false },
      { slotNo: "#A28", occupied: true },
      { slotNo: "#A29", occupied: true },
      { slotNo: "#A30", occupied: false },
    ],
  },
  {
    zoneName: "B",
    zoneSubName: "Basement Parking",
    zoneMap: null,
    zoneCapacity: 20,
    zoneOccupied: 20,
    parkingSlots: [
      { slotNo: "#B01", occupied: true },
      { slotNo: "#B02", occupied: true },
      { slotNo: "#B03", occupied: true },
      { slotNo: "#B04", occupied: true },
      { slotNo: "#B05", occupied: true },
      { slotNo: "#B06", occupied: true },
      { slotNo: "#B07", occupied: true },
      { slotNo: "#B08", occupied: true },
      { slotNo: "#B09", occupied: true },
      { slotNo: "#B10", occupied: true },
      { slotNo: "#B11", occupied: true },
      { slotNo: "#B12", occupied: true },
      { slotNo: "#B13", occupied: true },
      { slotNo: "#B14", occupied: true },
      { slotNo: "#B15", occupied: true },
      { slotNo: "#B16", occupied: true },
      { slotNo: "#B17", occupied: true },
      { slotNo: "#B18", occupied: true },
      { slotNo: "#B19", occupied: true },
      { slotNo: "#B20", occupied: true },
    ],
  },
];

export default function ZoneDetails() {
  const { zoneId } = useParams();
  const [zoneInfo, setZoneInfo] = useState({});

  useEffect(() => {
    if (!zoneId) {
      return;
    }

    const findZoneInfo = async () => {
      const zoneData = zoneDataList.find((zone) => zone.zoneName === zoneId);

      setZoneInfo(zoneData ?? {});
    };

    findZoneInfo();
  }, [zoneId]);

  return (
    <div className="flex flex-col items-center justify-start gap-4 w-full">
      <div className="h-10 w-full flex flex-col justify-center items-start ">
        <span className="text-primary font-bold text-xl">
          Zone {zoneInfo.zoneName}
        </span>
        <span className="text-primary font-light text-xs -mt-2">
          {zoneInfo.zoneSubName}
        </span>
      </div>
      {/* Map & Overview */}
      <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(260px,1fr)]">
        {/* Zone Map */}
        <div className="aspect-[2/1] w-full overflow-hidden rounded-md bg-primary-light flex items-center justify-center">
          {zoneInfo.zoneMap ? (
            <img
              src={zoneInfo.zoneMap}
              alt={`Zone ${zoneInfo.zoneName} parking map`}
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
            value={zoneInfo.zoneCapacity ?? 0}
            title="Total Slots"
            subtitle="Parking spaces"
          />

          <OverviewCard
            value={(zoneInfo.zoneCapacity ?? 0) - (zoneInfo.zoneOccupied ?? 0)}
            title="Available Slots"
            subtitle="Ready for parking"
            isFull={zoneInfo.zoneOccupied === zoneInfo.zoneCapacity}
          />

          <OverviewCard
            value={zoneInfo.zoneOccupied ?? 0}
            title="Occupied Slots"
            subtitle="Currently in use"
            isFull={zoneInfo.zoneOccupied === zoneInfo.zoneCapacity}
          />
        </div>
      </div>
      {/* The ummmm occpied progress bar */}
      <CapacityProgressCard
        capacity={zoneInfo.zoneCapacity}
        occupied={zoneInfo.zoneOccupied}
        isFull={zoneInfo.zoneOccupied === zoneInfo.zoneCapacity}
      />

      {/* Parking slot list part */}
      <div className="flex flex-col items-center justify-start gap-4 w-full">
        <span className="text-primary font-bold text-xl w-full">
          Parking Slots
        </span>
        <div className="grid w-full  grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-3 lg:gap-4">
          {zoneInfo &&
            zoneInfo.parkingSlots?.map((slot, index) => (
              <SlotBlock
                key={index}
                slotNo={slot.slotNo}
                occupied={slot.occupied}
              />
            ))}
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

const SlotBlock = ({ slotNo, occupied }) => {
  return (
    <div className="hover-3d">
      <div
        className={`flex flex-col items-start justify-start h-16 w-full min-w-0 rounded-md border border-primary ${occupied ? "bg-primary-light" : "bg-card"} py-1 px-3 shadow-sm shadow-gray-400/30 overflow-hidden`}
      >
        <span className="shrink-0 font-bold text-primary">{slotNo}</span>
        <div className="flex items-center justify-center w-full h-full">
          {occupied ? (
            <Car className="shrink-0 text-2xl font-bold text-primary sm:text-3xl" />
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
