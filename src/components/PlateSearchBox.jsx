import { LocateIcon, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import PlateDetails from "./PlateDetails";
import { handleFindCar } from "../services/api/parkingFormService";

export default function PlateSearchBox() {
  const [searchKey, setSearchKey] = useState("");
  const [result, setResult] = useState(null);
  const [validationMsg, setValidationMsg] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Reset immediately when the input is cleared
    const trimmedKey = searchKey.trim();

    if (!trimmedKey) {
      setIsSearching(false);
      setValidationMsg(null);
      setResult(null);
      return;
    }

    setIsSearching(true);

    const handler = setTimeout(async () => {
      try {
        if (trimmedKey.length !== 7) {
          setResult(null);
          setValidationMsg("Invalid plate number");
          return;
        }

        setValidationMsg(null);

        const response = await handleFindCar(trimmedKey);

        if (response.isSuccess) {
          setResult(response.body);
        } else {
          setResult(null);
          setValidationMsg("Not found");
        }
      } catch (error) {
        console.error("Search failed:", error);
        setResult(null);
        setValidationMsg("Search failed. Please try again.");
      } finally {
        setIsSearching(false);
      }
    }, 600);

    return () => clearTimeout(handler);
  }, [searchKey]);

  return (
    <>
      <div className="flex flex-col items-center gap-1 justify-start">
        <label className="input input-primary">
          <Search className="w-5 h-5 text-primary" aria-hidden="true" />
          <input
            type="text"
            className="grow"
            placeholder="Search plate number..."
            onChange={(e) => setSearchKey(e.target.value)}
            value={searchKey}
          />
        </label>
        <AnimatePresence>
          {searchKey && (
            <motion.label
              key="search-result"
              className="input input-primary relative"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {!isSearching ? (
                <LocateIcon className="w-5 h-5 text-primary" />
              ) : (
                <span className="loading loading-spinner bg-primary loading-sm" />
              )}
              {isSearching ? (
                <span className="loading loading-dots loading-xs text-primary"></span>
              ) : (
                <span>
                  {validationMsg && !result
                    ? validationMsg
                    : result?.length == 7
                      ? result.location
                      : "Finding Spot"}{" "}
                </span>
              )}

              {!isSearching && result && (
                <span
                  className="btn btn-link btn-primary absolute right-0 top-[50%] translate-y-[-50%]"
                  onClick={() =>
                    document.getElementById("details_module").showModal()
                  }
                >
                  Details
                </span>
              )}
            </motion.label>
          )}
        </AnimatePresence>
      </div>
      <dialog id="details_module" className="modal">
        <div className="modal-box w-9/12 max-w-3xl">
          <PlateDetails plateNumber={result?.plate} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
