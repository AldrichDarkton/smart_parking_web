import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const parkingRecords = [
  {
    licensePlate: "4C-3245",
    entry: "16/10/2026 08:15",
    exit: "16/10/2026 09:42",
    duration: "1h 27m",
    status: "EXITED",
  },
  {
    licensePlate: "5H-3532",
    entry: "16/10/2026 08:30",
    exit: null,
    duration: "1h 19m",
    status: "INSIDE",
  },
  {
    licensePlate: "2B-7814",
    entry: "16/10/2026 07:45",
    exit: "16/10/2026 10:20",
    duration: "2h 35m",
    status: "EXITED",
  },
  {
    licensePlate: "7A-1926",
    entry: "16/10/2026 09:00",
    exit: null,
    duration: "49m",
    status: "INSIDE",
  },
  {
    licensePlate: "3K-5648",
    entry: "16/10/2026 06:50",
    exit: "16/10/2026 08:10",
    duration: "1h 20m",
    status: "EXITED",
  },
  {
    licensePlate: "6M-9021",
    entry: "16/10/2026 08:05",
    exit: null,
    duration: "1h 44m",
    status: "INSIDE",
  },
  {
    licensePlate: "1D-4375",
    entry: "16/10/2026 07:20",
    exit: "16/10/2026 09:55",
    duration: "2h 35m",
    status: "EXITED",
  },
  {
    licensePlate: "8P-6153",
    entry: "16/10/2026 09:15",
    exit: null,
    duration: "34m",
    status: "INSIDE",
  },
  {
    licensePlate: "4F-8290",
    entry: "16/10/2026 06:30",
    exit: "16/10/2026 07:45",
    duration: "1h 15m",
    status: "EXITED",
  },
  {
    licensePlate: "9C-2467",
    entry: "16/10/2026 08:45",
    exit: null,
    duration: "1h 04m",
    status: "INSIDE",
  },
  {
    licensePlate: "2H-7138",
    entry: "16/10/2026 07:10",
    exit: "16/10/2026 09:40",
    duration: "2h 30m",
    status: "EXITED",
  },
  {
    licensePlate: "5B-4802",
    entry: "16/10/2026 09:25",
    exit: null,
    duration: "24m",
    status: "INSIDE",
  },
  {
    licensePlate: "7M-3519",
    entry: "16/10/2026 06:15",
    exit: "16/10/2026 08:55",
    duration: "2h 40m",
    status: "EXITED",
  },
  {
    licensePlate: "3A-6974",
    entry: "16/10/2026 08:20",
    exit: null,
    duration: "1h 29m",
    status: "INSIDE",
  },
  {
    licensePlate: "6K-1285",
    entry: "16/10/2026 07:55",
    exit: "16/10/2026 10:05",
    duration: "2h 10m",
    status: "EXITED",
  },
  {
    licensePlate: "4D-2186",
    entry: "16/10/2026 09:40",
    exit: null,
    duration: "9m",
    status: "INSIDE",
  },
  {
    licensePlate: "8H-5721",
    entry: "16/10/2026 05:50",
    exit: "16/10/2026 07:30",
    duration: "1h 40m",
    status: "EXITED",
  },
  {
    licensePlate: "1K-9043",
    entry: "16/10/2026 08:55",
    exit: null,
    duration: "54m",
    status: "INSIDE",
  },
  {
    licensePlate: "5A-6372",
    entry: "16/10/2026 07:35",
    exit: "16/10/2026 09:15",
    duration: "1h 40m",
    status: "EXITED",
  },
  {
    licensePlate: "9M-1258",
    entry: "16/10/2026 09:05",
    exit: null,
    duration: "44m",
    status: "INSIDE",
  },
  {
    licensePlate: "3C-4861",
    entry: "15/10/2026 16:20",
    exit: "15/10/2026 18:45",
    duration: "2h 25m",
    status: "EXITED",
  },
  {
    licensePlate: "7H-2904",
    entry: "15/10/2026 17:10",
    exit: "15/10/2026 19:30",
    duration: "2h 20m",
    status: "EXITED",
  },
  {
    licensePlate: "2M-8157",
    entry: "15/10/2026 14:35",
    exit: "15/10/2026 16:05",
    duration: "1h 30m",
    status: "EXITED",
  },
  {
    licensePlate: "6A-4739",
    entry: "15/10/2026 18:00",
    exit: "15/10/2026 20:15",
    duration: "2h 15m",
    status: "EXITED",
  },
  {
    licensePlate: "4K-7612",
    entry: "15/10/2026 12:45",
    exit: "15/10/2026 15:30",
    duration: "2h 45m",
    status: "EXITED",
  },
  {
    licensePlate: "8C-3945",
    entry: "15/10/2026 15:20",
    exit: "15/10/2026 17:05",
    duration: "1h 45m",
    status: "EXITED",
  },
  {
    licensePlate: "1H-6283",
    entry: "15/10/2026 19:10",
    exit: "15/10/2026 21:40",
    duration: "2h 30m",
    status: "EXITED",
  },
  {
    licensePlate: "5M-3074",
    entry: "15/10/2026 13:30",
    exit: "15/10/2026 14:55",
    duration: "1h 25m",
    status: "EXITED",
  },
  {
    licensePlate: "9A-8526",
    entry: "15/10/2026 16:45",
    exit: "15/10/2026 18:20",
    duration: "1h 35m",
    status: "EXITED",
  },
  {
    licensePlate: "3H-1947",
    entry: "15/10/2026 11:50",
    exit: "15/10/2026 14:10",
    duration: "2h 20m",
    status: "EXITED",
  },
  {
    licensePlate: "7C-5208",
    entry: "15/10/2026 08:40",
    exit: "15/10/2026 10:05",
    duration: "1h 25m",
    status: "EXITED",
  },
  {
    licensePlate: "2K-6831",
    entry: "15/10/2026 09:25",
    exit: "15/10/2026 12:00",
    duration: "2h 35m",
    status: "EXITED",
  },
  {
    licensePlate: "6H-4175",
    entry: "15/10/2026 10:15",
    exit: "15/10/2026 11:45",
    duration: "1h 30m",
    status: "EXITED",
  },
  {
    licensePlate: "4A-9362",
    entry: "15/10/2026 07:05",
    exit: "15/10/2026 09:35",
    duration: "2h 30m",
    status: "EXITED",
  },
  {
    licensePlate: "8M-2419",
    entry: "15/10/2026 12:10",
    exit: "15/10/2026 13:40",
    duration: "1h 30m",
    status: "EXITED",
  },
  {
    licensePlate: "1C-7594",
    entry: "15/10/2026 14:00",
    exit: "15/10/2026 16:25",
    duration: "2h 25m",
    status: "EXITED",
  },
  {
    licensePlate: "5K-1823",
    entry: "15/10/2026 08:10",
    exit: "15/10/2026 09:50",
    duration: "1h 40m",
    status: "EXITED",
  },
  {
    licensePlate: "9H-6347",
    entry: "15/10/2026 17:35",
    exit: "15/10/2026 20:05",
    duration: "2h 30m",
    status: "EXITED",
  },
  {
    licensePlate: "3M-5086",
    entry: "15/10/2026 10:50",
    exit: "15/10/2026 12:15",
    duration: "1h 25m",
    status: "EXITED",
  },
  {
    licensePlate: "7K-4162",
    entry: "15/10/2026 13:15",
    exit: "15/10/2026 15:50",
    duration: "2h 35m",
    status: "EXITED",
  },
  {
    licensePlate: "2A-9751",
    entry: "14/10/2026 08:30",
    exit: "14/10/2026 11:00",
    duration: "2h 30m",
    status: "EXITED",
  },
  {
    licensePlate: "6C-2847",
    entry: "14/10/2026 09:45",
    exit: "14/10/2026 11:20",
    duration: "1h 35m",
    status: "EXITED",
  },
  {
    licensePlate: "4H-6109",
    entry: "14/10/2026 07:20",
    exit: "14/10/2026 09:05",
    duration: "1h 45m",
    status: "EXITED",
  },
  {
    licensePlate: "8A-3574",
    entry: "14/10/2026 12:00",
    exit: "14/10/2026 14:30",
    duration: "2h 30m",
    status: "EXITED",
  },
  {
    licensePlate: "1M-8426",
    entry: "14/10/2026 15:40",
    exit: "14/10/2026 17:10",
    duration: "1h 30m",
    status: "EXITED",
  },
  {
    licensePlate: "5C-1938",
    entry: "14/10/2026 10:30",
    exit: "14/10/2026 12:45",
    duration: "2h 15m",
    status: "EXITED",
  },
  {
    licensePlate: "9K-7254",
    entry: "14/10/2026 16:15",
    exit: "14/10/2026 18:40",
    duration: "2h 25m",
    status: "EXITED",
  },
  {
    licensePlate: "3D-4682",
    entry: "14/10/2026 11:05",
    exit: "14/10/2026 13:00",
    duration: "1h 55m",
    status: "EXITED",
  },
  {
    licensePlate: "7B-8316",
    entry: "14/10/2026 08:55",
    exit: "14/10/2026 10:25",
    duration: "1h 30m",
    status: "EXITED",
  },
  {
    licensePlate: "2C-5479",
    entry: "14/10/2026 13:40",
    exit: "14/10/2026 16:10",
    duration: "2h 30m",
    status: "EXITED",
  },
];

export default function LogView() {
  const [searchKey, setSearchKey] = useState("");
  const [logList, setLogList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;
  const totalPages = Math.ceil(logList.length / recordsPerPage);

  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentRecords = logList.slice(startIndex, startIndex + recordsPerPage);

  useEffect(() => {
    const getlognel = async () => {
      setLogList(parkingRecords);
    };

    getlognel();
  }, []);

  useEffect(() => {
    // If input is cleared, reset states immediately and exit
    if (!searchKey.trim()) {
      return;
    }

    const handler = setTimeout(async () => {
      try {
        // This is where I'll call the search method
      } catch (error) {
        console.error("Search failed:", error);
      }
    }, 600);

    return () => clearTimeout(handler);
  }, [searchKey]);

  return (
    <div className="flex flex-col items-center justify-start gap-4 w-full">
      {/* Page header title */}
      <div className="h-10 w-full flex justify-start items-center text-primary font-bold text-xl">
        Parking Logs
      </div>

      {/* Page description */}
      <div className="flex flex-col items-start justify-center w-full">
        <h1 className="text-xl font-bold">Log View</h1>
        <p className="text-md">
          View parking activity, track vehicle entry and exit times, and monitor
          parking history
        </p>
      </div>

      <div className="flex gap-10 flex-col justify-start items-center  w-full px-1">
        {/* Active lognel Section */}
        <div className="flex flex-col w-full justify-start items-center h-full gap-5">
          {/* Search box */}
          <label className="input input-primary w-full shadow-md">
            <Search className="w-5 h-5 text-primary" aria-hidden="true" />
            <input
              type="search"
              required
              placeholder="Enter Plate Number..."
              onChange={(e) => setSearchKey(e.target.value)}
              value={searchKey}
            />
          </label>

          {/* lognel table container */}
          <div className="flex flex-col border-2 w-full bg-card border-primary overflow-hidden h-fit rounded-lg shadow-md">
            {/* Table Header Section */}
            <div className="flex items-center w-full justify-between px-3 py-4 bg-card border-b-2 border-primary">
              <div className="flex flex-col items-start justify-start gap-1">
                <span className="text-primary font-bold text-xl">
                  Recent Carpark History
                </span>
                <span className="font-light text-xs">
                  Car parking entry history from the latest to the oldest
                </span>
              </div>
            </div>

            {/* Table content */}
            <div className="overflow-x-auto max-h-80 rounded-box border border-base-content/5 bg-background">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>License Plate</th>
                    <th>Entry</th>
                    <th>Exit</th>
                    <th>Duration</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.map((log, index) => (
                    <tr
                      key={index}
                      className="hover:bg-primary-light/20 cursor-pointer"
                    >
                      <th>{index + 1}</th>
                      <td>
                        <div className="flex items-center gap-3">
                          {log.licensePlate}
                        </div>
                      </td>
                      <td>{log.entry}</td>
                      <td>{log.exit || "--"}</td>
                      <td>{log.duration}</td>
                      <td>
                        <div>
                          <div
                            className={`badge ${log.status == "INSIDE" ? "badge-primary" : "badge-outline badge-primary"}`}
                          >
                            {log.status}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-primary/20 px-4 py-3">
              {/* Record count */}
              <span className="text-sm text-base-content/70">
                Showing {logList.length === 0 ? 0 : startIndex + 1}–
                {Math.min(startIndex + recordsPerPage, logList.length)} of{" "}
                {logList.length} records
              </span>

              {/* Page buttons */}
              <div className="join">
                <button
                  className="join-item btn btn-sm"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  aria-label="Previous page"
                >
                  «
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    key={page}
                    className={`join-item btn btn-sm ${
                      currentPage === page ? "btn-primary" : ""
                    }`}
                    aria-current={currentPage === page ? "page" : undefined}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  className="join-item btn btn-sm"
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                  aria-label="Next page"
                >
                  »
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
