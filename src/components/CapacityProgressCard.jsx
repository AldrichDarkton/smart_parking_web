export default function CapacityProgressCard({
  capacity,
  occupied,
  isFull = false,
}) {
  const freeSpace = (((capacity - occupied) / capacity) * 100).toFixed(0);
  return (
    <div
      className={`flex flex-col items-center justify-center overflow-hidden w-full gap-2 py-3 px-2 bg-white rounded-md border-2 ${isFull ? "border-warning" : "border-primary"} shadow-md`}
    >
      <div className="flex w-full justify-between items-end">
        <span
          className={`${isFull ? "text-warning" : "text-primary"} font-semibold text-xl`}
        >
          Overall Capacity
        </span>
        <span
          className={`${isFull ? "text-warning" : "text-primary"} font-semibold text-sm`}
        >
          {freeSpace}% free
        </span>
      </div>
      <progress
        className={`progress ${isFull ? "progress-warning" : "progress-primary"} w-full`}
        value={occupied}
        max={capacity}
      ></progress>
      <div className="flex flex-row w-full justify-end items-start">
        <span
          className={`${isFull ? "text-warning" : "text-primary"} font-semibold text-sm `}
        >
          {occupied} out of {capacity} spots occupied
        </span>
      </div>
    </div>
  );
}
