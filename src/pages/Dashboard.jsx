import DashboardTemplate from "../components/DashboardTemplate";

export default function Dashboard() {
  return (
    <DashboardTemplate>
      <div className="flex flex-col items-center justify-start gap-2 w-full">
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
          <NumberCard
            number={50}
            title="Total Spots"
            subtitle="parking space"
          />
          <NumberCard
            number={39}
            title="Available"
            subtitle="available parking spaces"
          />
          <NumberCard
            number={11}
            title="Occupied"
            subtitle="unavailable parking spaces"
          />
        </div>
        {/* The overall capacity section */}
      </div>
    </DashboardTemplate>
  );
}

function NumberCard({ number, title, subtitle }) {
  return (
    <div className="bg-background rounded-md shadow-sm shadow-gray-400/50 min-w-40 max-w-60 w-full h-full p-2 border-2 border-primary  flex flex-col justify-center items-start">
      <span className="text-3xl font-bold text-primary">{number}</span>
      <span className="-mt-[3px] font-semibold text-primary">{title}</span>
      <span className="text-xs -mt-[5px] font-light">{subtitle}</span>
    </div>
  );
}
