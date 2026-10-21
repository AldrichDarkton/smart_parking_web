import { useEffect, useState } from "react";
import { handleGetHistory } from "../services/api/parkingFormService";

export default function LogView() {
  // const [searchKey, setSearchKey] = useState("");
  const [logList, setLogList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [pagination, setPagination] = useState({
    current_page: 1,
    has_next: false,
    has_prev: false,
    next_page: null,
    per_page: 20,
    prev_page: null,
    total_items: 0,
    total_pages: 0,
  });

  const recordsPerPage = pagination.per_page;
  const startIndex = (currentPage - 1) * recordsPerPage;

  useEffect(() => {
    const getlognel = async () => {
      const response = await handleGetHistory();

      if (response.isSuccess) {
        const logData = response.body;

        setLogList(logData.history ?? []);
        setPagination(logData.pagination);
        setCurrentPage(logData.pagination.current_page);
      } else {
        console.log(response.body.message);
      }
    };

    getlognel();
  }, []);

  // useEffect(() => {
  //   // If input is cleared, reset states immediately and exit
  //   if (!searchKey.trim()) {
  //     return;
  //   }

  //   const handler = setTimeout(async () => {
  //     try {
  //       // This is where I'll call the search method
  //     } catch (error) {
  //       console.error("Search failed:", error);
  //     }
  //   }, 600);

  //   return () => clearTimeout(handler);
  // }, [searchKey]);

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
          {/* <label className="input input-primary w-full shadow-md">
            <Search className="w-5 h-5 text-primary" aria-hidden="true" />
            <input
              type="search"
              required
              placeholder="Enter Plate Number..."
              onChange={(e) => setSearchKey(e.target.value)}
              value={searchKey}
            />
          </label> */}

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
                  {logList.map((log, index) => (
                    <tr
                      key={log.id}
                      className="hover:bg-primary-light/20 cursor-pointer"
                    >
                      <th>{startIndex + index + 1}</th>

                      <td>{log.plate}</td>
                      <td>{log.entry}</td>
                      <td>{log.exit || "--"}</td>
                      <td>{log.duration}</td>

                      <td>
                        <div
                          className={`badge ${
                            log.status?.toLowerCase() === "inside"
                              ? "badge-primary"
                              : "badge-outline badge-primary"
                          }`}
                        >
                          {log.status}
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
                Showing {pagination.total_items === 0 ? 0 : startIndex + 1}–
                {startIndex + logList.length} of {pagination.total_items}{" "}
                records
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
                  { length: pagination.total_pages },
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
                  disabled={
                    currentPage === pagination.total_pages ||
                    pagination.total_pages === 0
                  }
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.min(pagination.total_pages, page + 1),
                    )
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
