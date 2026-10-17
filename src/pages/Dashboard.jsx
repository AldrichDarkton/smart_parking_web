import { useEffect, useState } from "react";
import ActiveEntryMonitorList from "../components/ActiveEntryMonitorList";
import CapacityProgressCard from "../components/CapacityProgressCard";
import ZoneBlock from "../components/ZoneBlock";

const liveData = {
  total: 5,
  free: 2,
  occupied: 3,
  zones: {
    "Zone A": {
      total: 3,
      free: 2,
      slots: {
        A1: "occupied",
        A2: "free",
        A3: "free",
      },
    },
    "Zone B": {
      total: 2,
      free: 1,
      slots: {
        B1: "occupied",
        B2: "free",
      },
    },
  },
};

export default function Dashboard() {
  const [overviewData, setOverviewData] = useState({
    total: 0,
    free: 0,
    occupied: 0,
    zones: {},
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      try {
        setOverviewData(liveData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start gap-4 w-full">
      <div className="h-10 w-full flex justify-start items-center text-primary font-bold text-xl">
        Overview
      </div>
      {/* The number card display part */}
      <div className="grid grid-rows-2 grid-cols-2 grid-flow-row w-full gap-1 column-gap-1 md:flex md:justify-between md:flex-wrap md:items-center">
        <NumberCard
          number={
            isLoading && !overviewData?.zones
              ? 0
              : Object.keys(overviewData?.zones).length
          }
          title="Total Zones"
          subtitle="across all levles"
        />
        <NumberCard
          number={isLoading && !overviewData?.total ? 0 : overviewData.total}
          title="Total Slots"
          subtitle="parking space"
        />
        <NumberCard
          number={isLoading && !overviewData?.free ? 0 : overviewData.free}
          title="Available"
          subtitle="available parking spaces"
        />
        <NumberCard
          number={
            isLoading && !overviewData?.free
              ? 0
              : overviewData.total - overviewData.free
          }
          title="Occupied"
          subtitle="unavailable parking spaces"
        />
      </div>
      {/* The overall capacity section */}
      <CapacityProgressCard
        capacity={overviewData.total}
        occupied={overviewData.total - overviewData.free}
      />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 w-full ">
        {/* The zone block list */}
        <div className="flex flex-col items-center gap-4 justify-start w-full  h-fit">
          <span className="text-primary font-bold text-xl w-full">
            Parking Zones
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2  gap-5 w-full px-1">
            {isLoading ? (
              <div className={`w-full min-w-0 rounded-xl skeleton h-100`}></div>
            ) : (
              Object.keys(overviewData.zones).map((key) => {
                const zone = overviewData.zones[key];
                return (
                  <ZoneBlock
                    key={key}
                    zoneName={key}
                    zoneSubName="Open-air Parking"
                    zoneCapacity={zone.total}
                    zoneOccupied={zone.free}
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
