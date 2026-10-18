import { Pencil, Search, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AccountForm from "../components/AccountForm";

const personnel = [
  {
    username: "Jack Grim",
    accessLevel: "Administrator",
    addedDate: "03/10/2026",
  },
  {
    username: "Clark Kent",
    accessLevel: "Viewer",
    addedDate: "03/10/2026",
  },
  {
    username: "Operator 1",
    accessLevel: "Viewer",
    addedDate: "03/10/2026",
  },
  {
    username: "Bruce Wayne",
    accessLevel: "Administrator",
    addedDate: "04/10/2026",
  },
  {
    username: "Diana Prince",
    accessLevel: "Viewer",
    addedDate: "04/10/2026",
  },
  {
    username: "Operator 2",
    accessLevel: "Viewer",
    addedDate: "05/10/2026",
  },
  {
    username: "Barry Allen",
    accessLevel: "Viewer",
    addedDate: "05/10/2026",
  },
  {
    username: "Arthur Curry",
    accessLevel: "Viewer",
    addedDate: "06/10/2026",
  },
  {
    username: "Victor Stone",
    accessLevel: "Administrator",
    addedDate: "07/10/2026",
  },
  {
    username: "Operator 3",
    accessLevel: "Viewer",
    addedDate: "08/10/2026",
  },
  {
    username: "Selina Kyle",
    accessLevel: "Viewer",
    addedDate: "09/10/2026",
  },
  {
    username: "Oliver Queen",
    accessLevel: "Administrator",
    addedDate: "10/10/2026",
  },
  {
    username: "Operator 4",
    accessLevel: "Viewer",
    addedDate: "11/10/2026",
  },
];

export default function AccountManagement() {
  const [searchKey, setSearchKey] = useState("");
  const [personnelList, setPersonnelList] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const formDialogRef = useRef(null);
  const [formKey, setFormKey] = useState(0);

  const openRegisterForm = () => {
    setFormKey((prev) => prev + 1);
    setSelectedAccount(null);
    formDialogRef.current?.showModal();
  };

  const openEditForm = (accountId) => {
    setSelectedAccount(accountId);
    setFormKey((prev) => prev + 1);
    formDialogRef.current?.showModal();
  };

  const recordsPerPage = 10;
  const totalPages = Math.ceil(personnelList.length / recordsPerPage);

  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentRecords = personnelList.slice(
    startIndex,
    startIndex + recordsPerPage,
  );

  useEffect(() => {
    const getPersonnel = async () => {
      setPersonnelList(personnel);
    };

    getPersonnel();
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
    <>
      <div className="flex px-1 flex-col items-center justify-start gap-4 w-full">
        {/* Page header title */}
        <div className="h-10 w-full flex justify-start items-center text-primary font-bold text-xl">
          Account Administration
        </div>

        {/* Page description */}
        <div className="flex flex-col items-start justify-center w-full">
          <h1 className="text-xl font-bold">Account Management</h1>
          <p className="text-md">
            Create account for parking personnel and monitor active personnel
          </p>
        </div>

        <div className="flex gap-10 flex-col justify-start items-center  w-full">
          {/* Active Personnel Section */}
          <div className="flex flex-col w-full justify-start items-center h-full gap-5">
            {/* Search box */}
            <label className="input input-primary w-full shadow-md">
              <Search className="w-5 h-5 text-primary" aria-hidden="true" />
              <input
                type="search"
                required
                placeholder="Enter Personnel Name..."
                onChange={(e) => setSearchKey(e.target.value)}
                value={searchKey}
              />
            </label>

            {/* Personnel table container */}
            <div className="flex flex-col border-2 w-full bg-card border-primary overflow-hidden h-fit rounded-lg shadow-md">
              {/* Table Header Section */}
              <div className="flex items-center w-full justify-between px-3 py-4 bg-card border-b-2 border-primary">
                <div className="flex flex-col items-start justify-start gap-1">
                  <span className="text-primary font-bold text-xl">
                    Active Personnel
                  </span>
                  <span className="font-light text-xs">
                    Accounts with current system access
                  </span>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => openRegisterForm()}
                >
                  Register
                </button>
              </div>

              {/* Table content */}
              <div className="overflow-x-auto max-h-80 rounded-box border border-base-content/5 bg-background">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Personnel</th>
                      <th>Access Level</th>
                      <th>Added Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRecords
                      .filter((person) =>
                        person.username
                          .toLowerCase()
                          .includes(searchKey.toLowerCase()),
                      )
                      .map((person, index) => (
                        <tr
                          key={index}
                          className="hover:bg-primary-light/20 cursor-pointer"
                        >
                          <th>{index + 1}</th>
                          <td>
                            <div className="flex items-center gap-3">
                              <span className="w-7 h-7 rounded-md bg-primary-light text-primary flex items-center justify-center font-bold text-xs">
                                {person.username.charAt(0)}
                              </span>
                              <span className="font-medium">
                                {person.username}
                              </span>
                            </div>
                          </td>
                          <td>
                            <span
                              className={`badge ${
                                person.accessLevel === "Administrator"
                                  ? "badge-primary badge-soft"
                                  : "badge-neutral badge-soft"
                              }`}
                            >
                              {person.accessLevel}
                            </span>
                          </td>
                          <td>{person.addedDate}</td>
                          <td className="flex items-center w-fit justify-start gap-5">
                            <button
                              type="button"
                              className="btn btn-soft btn-primary"
                              onClick={() => openEditForm(person.username)}
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
                  Showing {personnelList.length === 0 ? 0 : startIndex + 1}–
                  {Math.min(startIndex + recordsPerPage, personnelList.length)}{" "}
                  of {personnelList.length} records
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
          <p className="py-4">Are you sure you want to delete this account?</p>
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

      <dialog ref={formDialogRef} id="form-module" className=" modal ">
        <div className="modal-box w-fit">
          <AccountForm key={formKey} accountId={selectedAccount} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
