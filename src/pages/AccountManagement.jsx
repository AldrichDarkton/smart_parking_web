import { Pencil, Search, Trash } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import AccountForm from "../components/AccountForm";
import {
  handleDeleteAccount,
  handleGetAccounts,
} from "../services/api/parkingFormService";
import { useNotiStore } from "../store/notiStore";
import { useUserStore } from "../store/userStore";

export default function AccountManagement() {
  const [searchKey, setSearchKey] = useState("");
  const [personnelList, setPersonnelList] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedDeleteAccountId, setSelectedDeleteAccountId] = useState(null);
  const { setNoti } = useNotiStore.getState();
  const { id } = useUserStore.getState();

  const [currentPage, setCurrentPage] = useState(1);

  const formDialogRef = useRef(null);
  const deleteDialogRef = useRef(null);
  const [formKey, setFormKey] = useState(0);

  const doInitializeData = useCallback(async () => {
    const response = await handleGetAccounts();

    if (response.isSuccess) {
      setPersonnelList(response.body.staff);
    } else {
      setNoti("error", response.body.message);
      console.log(response.body.message);
    }
  }, []);

  const openRegisterForm = () => {
    setFormKey((prev) => prev + 1);
    setSelectedAccount(null);
    formDialogRef.current?.showModal();
  };

  const openEditForm = (accountData) => {
    setSelectedAccount(accountData);
    setFormKey((prev) => prev + 1);
    formDialogRef.current?.showModal();
  };

  const openDeleteConfirmation = (staffId) => {
    setSelectedDeleteAccountId(staffId);
    deleteDialogRef.current?.showModal();
  };

  const doDelete = async () => {
    const response = await handleDeleteAccount(selectedDeleteAccountId);
    console.log(response);

    if (response.isSuccess) {
      doInitializeData();
      setNoti("success", "Account deleted successfully.");
      deleteDialogRef.current?.close();
    } else {
      setNoti("error", response.body.message);
      console.log(response.body.message);
    }
  };

  const handleAccountSaveSuccess = async () => {
    formDialogRef.current?.close();

    setSearchKey("");
    setCurrentPage(1);

    await doInitializeData();
  };

  useEffect(() => {
    const initializeData = async () => {
      doInitializeData();
    };

    initializeData();
  }, [doInitializeData]);

  //--------------- Pagination & Search ---------------

  const recordsPerPage = 10;
  const normalizedSearch = searchKey.trim().toLowerCase();
  const filteredPersonnel = personnelList.filter((personnel) =>
    String(personnel.username ?? "")
      .toLowerCase()
      .includes(normalizedSearch),
  );

  const totalPages = Math.ceil(filteredPersonnel.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentRecords = filteredPersonnel.slice(
    startIndex,
    startIndex + recordsPerPage,
  );

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
                <table className="table table-fixed w-full">
                  <colgroup>
                    <col className="w-12" />
                    <col />
                    <col />
                    <col />
                  </colgroup>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Personnel</th>
                      <th>Role</th>
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
                                {person.username.charAt(0).toUpperCase()}
                              </span>
                              <span className="font-medium">
                                {person.username}
                              </span>
                            </div>
                          </td>
                          <td>
                            <span
                              className={`badge ${
                                person.role === "admin"
                                  ? "badge-primary badge-soft"
                                  : "badge-neutral badge-soft"
                              }`}
                            >
                              {person.role.toUpperCase()}
                            </span>
                          </td>
                          <td className="flex items-center w-fit justify-start gap-5">
                            {person.id == 1 || person.id == id ? (
                              <></>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  className="btn btn-soft btn-primary"
                                  onClick={() => openEditForm(person)}
                                >
                                  <Pencil
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                  <span>Edit</span>
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-soft btn-error"
                                  onClick={() =>
                                    openDeleteConfirmation(person.id)
                                  }
                                >
                                  <Trash
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                  <span>Remove</span>
                                </button>
                              </>
                            )}
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
      <dialog ref={deleteDialogRef} id="delete_model" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Confirmation!</h3>
          <p className="py-4">Are you sure you want to delete this account?</p>
          <div className="modal-action">
            <form method="dialog">
              <button onClick={() => doDelete()} className="btn btn-error me-2">
                Delete
              </button>
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
          <AccountForm
            key={formKey}
            accountData={selectedAccount}
            handleAccountSaveSuccess={handleAccountSaveSuccess}
          />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
