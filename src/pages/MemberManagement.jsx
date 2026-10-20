import { Pencil, Search, Trash } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import MemberForm from "../components/MemberForm";
import {
  handleDeleteVehicle,
  handleGetRegisteredVehicles,
} from "../services/api/parkingFormService";

export default function MemberManagement() {
  const [searchKey, setSearchKey] = useState("");
  const [vehicleList, setVehicleList] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedDeleteMemberId, setSelectedDeleteMemberId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const formDialogRef = useRef(null);
  const deleteDialogRef = useRef(null);
  const [formKey, setFormKey] = useState(0);

  const openRegisterForm = () => {
    setFormKey((prev) => prev + 1);
    setSelectedMember(null);
    formDialogRef.current?.showModal();
  };

  const openEditForm = (memberId) => {
    setSelectedMember(memberId);
    setFormKey((prev) => prev + 1);
    formDialogRef.current?.showModal();
  };

  const openDeleteConfirmation = (memberId) => {
    setSelectedDeleteMemberId(memberId);
    deleteDialogRef.current?.showModal();
  };

  const doDelete = async () => {
    const response = await handleDeleteVehicle(selectedDeleteMemberId);
    console.log(response);

    if (response.isSuccess) {
      doInitializeData();
      deleteDialogRef.current?.close();
    } else {
      console.log(response.body.message);
    }
  };

  const doInitializeData = useCallback(async () => {
    const response = await handleGetRegisteredVehicles();

    if (response.isSuccess) {
      setVehicleList(response.body.vehicles);
    } else {
      console.log(response.body.message);
    }
  }, []);

  const handleMemberSaveSuccess = async () => {
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
  const filteredVehicles = vehicleList.filter((vehicle) =>
    String(vehicle.plate_number ?? vehicle.licensePlate ?? "")
      .toLowerCase()
      .includes(normalizedSearch),
  );

  const totalPages = Math.ceil(filteredVehicles.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentRecords = filteredVehicles.slice(
    startIndex,
    startIndex + recordsPerPage,
  );

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
                  onClick={() => openRegisterForm()}
                >
                  Register
                </button>
              </div>
              <div className="overflow-x-auto max-h-80 rounded-box border border-base-content/5 bg-background">
                <table className="table table-fixed w-full">
                  <colgroup>
                    <col className="w-12" />
                    <col />
                    <col />
                    <col />
                    <col />
                  </colgroup>
                  <thead>
                    <tr>
                      <th></th>
                      <th>License Plate</th>
                      <th>Owner</th>
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
                            {vehicle.plate_number}
                          </span>
                        </th>
                        <td>{vehicle.owner_name ?? "Visitor"}</td>
                        <td>{vehicle.notes}</td>
                        <td className="flex items-center w-fit justify-start gap-5">
                          <button
                            type="button"
                            className="btn btn-soft btn-primary"
                            onClick={() => openEditForm(vehicle.licensePlate)}
                          >
                            <Pencil className="w-5 h-5" aria-hidden="true" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            className="btn btn-soft btn-error"
                            onClick={() => openDeleteConfirmation(vehicle.id)}
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

      <dialog ref={deleteDialogRef} id="delete_model" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Confirmation!</h3>
          <p className="py-4">Are you sure you want to delete this member?</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-error" onClick={() => doDelete()}>
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
          <MemberForm
            handleMemberSaveSuccess={handleMemberSaveSuccess}
            key={formKey}
            memberId={selectedMember}
          />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
