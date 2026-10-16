import ActiveEntryMonitorList from "../components/ActiveEntryMonitorList";
import CapacityProgressCard from "../components/CapacityProgressCard";
import ZoneBlock from "../components/ZoneBlock";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-start gap-4 w-full">
      <div className="h-10 w-full flex justify-start items-center text-primary font-bold text-xl">
        Overview
      </div>
      {/* The number card display part */}
      <div className="grid grid-rows-2 grid-cols-2 grid-flow-row w-full gap-1 column-gap-1 md:flex md:justify-between md:flex-wrap md:items-center">
        <NumberCard
          number={2}
          title="Total Zones"
          subtitle="across all levles"
        />
        <NumberCard number={50} title="Total Slots" subtitle="parking space" />
        <NumberCard
          number={10}
          title="Available"
          subtitle="available parking spaces"
        />
        <NumberCard
          number={40}
          title="Occupied"
          subtitle="unavailable parking spaces"
        />
      </div>
      {/* The overall capacity section */}
      <CapacityProgressCard capacity={50} occupied={40} />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 w-full ">
        {/* The zone block list */}
        <div className="flex flex-col items-center gap-4 justify-start w-full  h-fit">
          <span className="text-primary font-bold text-xl w-full">
            Parking Zones
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2  gap-5 w-full px-1">
            <ZoneBlock
              zoneName={"A"}
              zoneSubName="Open-air Parking"
              zoneCapacity={30}
              zoneOccupied={20}
            />

            <ZoneBlock
              zoneName={"B"}
              zoneSubName="Basement Parking"
              zoneCapacity={20}
              zoneOccupied={20}
            />
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
