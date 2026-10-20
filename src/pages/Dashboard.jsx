import ActiveEntryMonitorList from "../components/ActiveEntryMonitorList";
import CapacityProgressCard from "../components/CapacityProgressCard";
import ZoneBlock from "../components/ZoneBlock";
import { useParkingStore } from "../store/parkingStore";

// const liveData = {
//   total: 5,
//   free: 2,
//   occupied: 3,
//   zones: {
//     "Zone A": {
//       total: 3,
//       free: 2,
//       slots: {
//         A1: "occupied",
//         A2: "free",
//         A3: "free",
//       },
//     },
//     "Zone B": {
//       total: 2,
//       free: 1,
//       slots: {
//         B1: "occupied",
//         B2: "free",
//       },
//     },
//   },
// };

export default function Dashboard() {
  const { total, free, occupied, zone_list, zone_slots } = useParkingStore();

  return (
    <div className="flex flex-col items-center justify-start gap-4 w-full">
      <div className="h-10 w-full flex justify-start items-center text-primary font-bold text-xl">
        Overview
      </div>
      {/* The number card display part */}
      <div className="grid grid-rows-2 grid-cols-2 grid-flow-row w-full gap-1 column-gap-1 md:flex md:justify-between md:flex-wrap md:items-center">
        <NumberCard
          number={!zone_list ? 0 : zone_list.length}
          title="Total Zones"
          subtitle="across all levles"
        />
        <NumberCard
          number={!total ? 0 : total}
          title="Total Slots"
          subtitle="parking space"
        />
        <NumberCard
          number={!free ? 0 : free}
          title="Available"
          subtitle="available parking spaces"
        />
        <NumberCard
          number={!occupied ? 0 : occupied}
          title="Occupied"
          subtitle="unavailable parking spaces"
        />
      </div>
      {/* The overall capacity section */}
      <CapacityProgressCard capacity={total} occupied={occupied} />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 w-full ">
        {/* The zone block list */}
        <div className="flex flex-col items-center gap-4 justify-start w-full  h-fit">
          <span className="text-primary font-bold text-xl w-full">
            Parking Zones
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2  gap-5 w-full px-1">
            {zone_list.length == 0 ? (
              <div
                className={`w-full min-w-0 flex items-center text-gray-600
                     justify-center font-bold text-xl rounded-xl skeleton h-70`}
              >
                Detecting Zones...
              </div>
            ) : (
              zone_slots.map((zone, index) => {
                const occupiedSlots = zone.slots.filter(
                  (slot) => slot.occupied,
                );
                return (
                  <ZoneBlock
                    key={index}
                    zoneName={zone.zone}
                    zoneCapacity={zone.slots.length}
                    zoneOccupied={occupiedSlots.length}
                  />
                );
              })
            )}
            {/* Skeleton loader */}
          </div>
        </div>
        {/* Live Parking List */}
        <div className="flex flex-col items-center gap-4 justify-start w-full  h-fit">
          <span className="text-primary font-bold text-xl w-full">
            Live Activity
          </span>
          <ActiveEntryMonitorList />
        </div>
      </div>
    </div>
  );
}

function NumberCard({ number, title, subtitle }) {
  return (
    <div className="bg-card rounded-md shadow-sm shadow-gray-400/50 min-w-40 max-w-60 w-full h-full p-2 border-2 border-primary  flex flex-col justify-center items-start">
      <span className="text-3xl font-bold text-primary">{number}</span>
      <span className="-mt-[3px] font-semibold text-primary">{title}</span>
      <span className="text-xs -mt-[5px] font-light">{subtitle}</span>
    </div>
  );
}
