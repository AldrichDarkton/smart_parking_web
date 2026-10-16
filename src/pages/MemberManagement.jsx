import { Pencil, Search, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import MemberForm from "../components/MemberForm";

const vehicles = [
  {
    licensePlate: "4C-3245",
    owner: "Aung Kyaw",
    registeredDate: "12/01/2026",
    note: "Monthly parking",
  },
  {
    licensePlate: "5H-3532",
    owner: "Thiri Win",
    registeredDate: "25/02/2026",
  },
  {
    licensePlate: "2B-7814",
    owner: "Min Thu",
    registeredDate: "08/03/2026",
    note: "VIP member",
  },
  {
    licensePlate: "7A-1926",
    owner: "Su Mon",
    registeredDate: "14/03/2026",
  },
  {
    licensePlate: "3K-5648",
    owner: "Kyaw Zin",
    registeredDate: "21/03/2026",
    note: "Reserved slot",
  },
  {
    licensePlate: "6M-9021",
    owner: "Hnin Ei",
    registeredDate: "02/04/2026",
  },
  {
    licensePlate: "1D-4375",
    owner: "Zaw Lin",
    registeredDate: "10/04/2026",
    note: "Staff vehicle",
  },
  {
    licensePlate: "8P-6153",
    owner: "May Thu",
    registeredDate: "18/04/2026",
  },
  {
    licensePlate: "4F-8290",
    owner: "Aye Chan",
    registeredDate: "29/04/2026",
    note: "Electric vehicle",
  },
  {
    licensePlate: "9C-2467",
    owner: "Sai Htet",
    registeredDate: "05/05/2026",
  },
  {
    licensePlate: "2H-7138",
    owner: "Nandar Oo",
    registeredDate: "12/05/2026",
    note: "Temporary access",
  },
  {
    licensePlate: "5B-4802",
    owner: "Ko Ko",
    registeredDate: "24/05/2026",
  },
  {
    licensePlate: "7M-3519",
    owner: "Ei Phyu",
    registeredDate: "03/06/2026",
    note: "Frequent visitor",
  },
  {
    licensePlate: "3A-6974",
    owner: "Thant Zin",
    registeredDate: "15/06/2026",
  },
  {
    licensePlate: "6K-1285",
    owner: "Yamin Hla",
    registeredDate: "28/06/2026",
    note: "Management staff",
  },
];

export default function MemberManagement() {
  const [searchKey, setSearchKey] = useState("");
  const [vehicleList, setVehicleList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;
  const totalPages = Math.ceil(vehicleList.length / recordsPerPage);

  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentRecords = vehicleList.slice(
    startIndex,
    startIndex + recordsPerPage,
  );

  useEffect(() => {
    const getVehicles = async () => {
      setVehicleList(vehicles);
    };

    getVehicles();
  }, []);

  useEffect(() => {
    // If input is cleared, reset states immediately and exit
    if (!searchKey.trim()) {
      return;
    }

    const handler = setTimeout(async () => {
      try {
        // This is where i'll call the search method
      } catch (error) {
        console.error("Search failed:", error);
      }
    }, 600);

    return () => clearTimeout(handler);
  }, [searchKey]);

  return (
    <>
      <div className="flex flex-col items-center justify-start gap-4 w-full">
        <div className="h-10 w-full flex justify-start items-center text-primary font-bold text-xl">
          Member Vehicles
        </div>
        <div className="flex flex-col items-start justify-center w-full">
          <h1 className="text-xl font-bold">VIP & Member Vehicles</h1>
          <p className="text-md">
            Register vehicles with ongoing parking access
          </p>
        </div>
        <div className="flex px-1 gap-10 flex-col justify-start items-center w-full ">
          {/* Table sec */}
          <div className="flex flex-col w-full justify-start items-center h-full gap-5">
            {/* Search box */}
            <label className="input input-primary w-full shadow-md">
              <Search className="w-5 h-5 text-primary" aria-hidden="true" />
              <input
                type="search"
                required
                placeholder="Enter License Plate..."
                onChange={(e) => setSearchKey(e.target.value)}
                value={searchKey}
              />
            </label>
            {/* The actual table */}
            <div className="flex flex-col border-2 w-full bg-card border-primary overflow-hidden h-fit rounded-lg shadow-md">
              <div className="flex items-center w-full justify-between px-3 py-4 bg-card border-b-2 border-primary">
                <div className="flex flex-col items-start justify-start gap-1">
                  <span className="text-primary font-bold text-xl">
                    Registered Vehicles
                  </span>
                  <span className=" font-light text-xs">
                    Active VIP & Member Parking Permits
                  </span>
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    document.getElementById("form-module").showModal()
                  }
                >
                  Register
                </button>
              </div>
              <div className="overflow-x-auto max-h-80 rounded-box border border-base-content/5 bg-background">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>License Plate</th>
                      <th>Owner</th>
                      <th>Registered Date</th>
                      <th>Note</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRecords.map((vehicle, index) => (
                      <tr
                        key={index}
                        className="hover:bg-primary-light/20 cursor-pointer"
                      >
                        <th>{index + 1}</th>
                        <th>
                          <span className="badge badge-primary badge-soft">
                            {vehicle.licensePlate}
                          </span>
                        </th>
                        <td>{vehicle.owner}</td>
                        <td>{vehicle.registeredDate}</td>
                        <td>{vehicle.note}</td>
                        <td className="flex items-center w-fit justify-start gap-5">
                          <button
                            type="button"
                            className="btn btn-soft btn-primary"
                            onClick={() =>
                              document.getElementById("form-module").showModal()
                            }
                          >
                            <Pencil className="w-5 h-5" aria-hidden="true" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            className="btn btn-soft btn-error"
                            onClick={() =>
                              document
                                .getElementById("delete_model")
                                .showModal()
                            }
                          >
                            <Trash className="w-5 h-5" aria-hidden="true" />
                            <span>Remove</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-primary/20 px-4 py-3">
                {/* Record count */}
                <span className="text-sm text-base-content/70">
                  Showing {vehicleList.length === 0 ? 0 : startIndex + 1}–
                  {Math.min(startIndex + recordsPerPage, vehicleList.length)} of{" "}
                  {vehicleList.length} records
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

      <dialog id="delete_model" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Confirmation!</h3>
          <p className="py-4">Are you sure you want to delete this member?</p>
          <div className="modal-action">
            <span className="btn btn-error">Delete</span>

            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <dialog id="form-module" className=" modal ">
        <div className="modal-box w-fit">
          <MemberForm />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
