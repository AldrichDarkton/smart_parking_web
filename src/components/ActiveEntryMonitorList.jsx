import { motion, AnimatePresence } from "framer-motion";
import { CarFront, Clock3, ParkingCircle, Radio } from "lucide-react";
import { useParkingStore } from "../store/parkingStore";
import { plateExists } from "../services/helperServices";
import { handleForceExit } from "../services/api/parkingFormService";
import { useNotiStore } from "../store/notiStore";

export default function ActiveEntryMonitorList() {
  const { active_logs } = useParkingStore();

  return (
    <div className="flex flex-col w-full overflow-hidden rounded-xl border-2 border-primary/30 bg-card shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-primary/20 p-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="min-w-0">
            <p className="font-semibold text-base-content">
              Currently active in the parking zone
            </p>
          </div>
        </div>

        <span className="badge badge-primary badge-soft gap-1.5 shrink-0">
          <Radio className="h-3 w-3" />
          {active_logs.length} Active
        </span>
      </div>

      {/* Vehicle list */}
      <ul className="list-none p-0 m-0 divide-y divide-base-300/70 min-h-47 ">
        <AnimatePresence mode="popLayout">
          {active_logs.length > 0 ? (
            active_logs.map((log, index) => (
              <ActiveEntryListItem key={index} log={log} />
            ))
          ) : (
            <motion.li
              key="empty"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center gap-2 px-4 py-10 text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-base-200 text-base-content/50">
                <ParkingCircle className="h-7 w-7" />
              </div>

              <p className="font-semibold text-base-content">
                No active vehicles
              </p>

              <p className="max-w-xs text-sm text-base-content/60">
                There are currently no vehicles being monitored in this parking
                zone.
              </p>
            </motion.li>
          )}
        </AnimatePresence>
      </ul>

      {/* Footer */}
      {active_logs.length > 0 && (
        <div className="border-t border-primary/20 bg-base-200/40 px-4 py-2.5">
          <p className="text-xs text-base-content/60">
            Showing {active_logs.length} active{" "}
            {active_logs.length === 1 ? "vehicle" : "vehicles"}
          </p>
        </div>
      )}
    </div>
  );
}

function ActiveEntryListItem({ log }) {
  const { zone_slots } = useParkingStore();
  const { setNoti } = useNotiStore.getState();

  const statusStyles = {
    ROAMING: "badge-warning badge-soft",
    PARKED: "badge-primary badge-soft",
    EXITED: "badge-ghost",
  };

  const status = plateExists(zone_slots, log.plate_number)
    ? "PARKED"
    : "ROAMING";

  const statusClass = statusStyles[status] ?? "badge-outline";

  const doForceExit = async () => {
    const response = await handleForceExit(log.id);

    if (response.isSuccess) {
      console.log(response.body);
      setNoti("success", `Vehicle ${response.body.plate} exited successfully.`);
    } else {
      setNoti("error", response.body.message);
      console.log(response.body.message);
    }
  };
  return (
    <>
      <motion.li
        layout
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 8 }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-primary/5"
      >
        {/* Vehicle icon */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <CarFront className="h-5 w-5" />
        </div>

        {/* Plate and entry time */}
        <div className="flex flex-1 flex-col gap-1 min-w-0">
          <span className="font-bold text-sm text-base-content">
            {log.plate_number}
          </span>

          <span className="flex items-center gap-1.5 text-xs text-base-content/60">
            <Clock3 className="h-3.5 w-3.5 shrink-0" />
            {log.entry_time}
          </span>

          <span className="text-xs text-base-content/60">
            Duration: {log.duration || "--"}
          </span>
        </div>

        {/* Status */}
        <span
          className={`badge ${statusClass} text-[10px] sm:text-xs shrink-0`}
        >
          {status}
        </span>
        {status === "ROAMING" && (
          <span
            className={`btn btn-error btn-ghost btn-sm shrink-0`}
            onClick={() =>
              document.getElementById("force_exit_modal").showModal()
            }
          >
            Force Exit
          </span>
        )}
      </motion.li>

      <dialog id="force_exit_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Force Exit Confirmation!</h3>
          <p className="py-4">
            Are you sure you want {log.plate_number} to force exit?
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn btn-error me-2"
                onClick={() => doForceExit()}
              >
                Force Exit
              </button>

              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
