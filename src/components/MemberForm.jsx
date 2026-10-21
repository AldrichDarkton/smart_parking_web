import { CarFront } from "lucide-react";
import { useEffect, useState } from "react";
import {
  handleEditVehicles,
  handleRegisterVehicle,
} from "../services/api/parkingFormService";
import { useNotiStore } from "../store/notiStore";

export default function MemberForm({ memberData, handleMemberSaveSuccess }) {
  const [plateNumber, setPlateNumber] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [note, setNote] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const { setNoti } = useNotiStore.getState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response;

    if (isEdit) {
      const formatUpdateData = {
        plate_number: plateNumber,
        owner_name: ownerName,
        notes: note,
      };

      response = await handleEditVehicles(selectedMember.id, formatUpdateData);
    } else {
      response = await handleRegisterVehicle({
        plate_number: plateNumber,
        owner_name: ownerName,
        notes: note,
      });
    }

    if (response.isSuccess) {
      setNoti(
        "success",
        `Member ${isEdit ? "edited" : "registered"} successfully.`,
      );
      handleMemberSaveSuccess();
    } else {
      setNoti("error", response.body.message);
      console.log(response.body.message);
    }
  };

  const resetData = () => {
    setPlateNumber(isEdit ? selectedMember.plate_number : "");
    setOwnerName(isEdit ? selectedMember.owner_name : "");
    setNote(isEdit ? selectedMember.notes : "");
  };

  useEffect(() => {
    const retrieveMember = async () => {
      if (memberData) {
        setIsEdit(true);
        setSelectedMember(memberData);

        setPlateNumber(memberData.plate_number ?? "");
        setOwnerName(memberData.owner_name ?? "");
        setNote(memberData.notes ?? "");
      } else {
        setIsEdit(false);
        setSelectedMember(null);

        setPlateNumber("");
        setOwnerName("");
        setNote("");
      }
    };

    retrieveMember();
  }, [memberData]);

  return (
    <div className="w-full sm:w-100 h-fit p-4 rounded-lg bg-card ">
      {/* Form header */}
      <div className="flex items-center justify-start gap-5">
        <div className="w-10 h-10 flex items-center justify-center bg-primary-light rounded-lg">
          <CarFront className="w-5 h-5 text-primary" aria-hidden="true" />
        </div>
        <div className="flex flex-col items-start justify-center">
          <span className="text-primary font-bold text-xl">
            Vehicle {isEdit ? "Edit" : "Registration"}
          </span>
          <span className="text-primary font-light text-xs">
            {isEdit ? "Edit" : "Add a new "} VIP or Member vehicle
          </span>
        </div>
      </div>
      {/* The actual form */}
      <form
        action="POST"
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col w-full h-full py-3"
      >
        <fieldset className="fieldset w-full">
          <label className="label font-bold" htmlFor="name">
            License Plate *
          </label>
          <input
            type="text"
            id="license-plate"
            className="input input-primary w-full"
            placeholder="XX - XXXX"
            required
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
            onFocus={(e) => e.target.select()}
          />
        </fieldset>
        <fieldset className="fieldset w-full">
          <label className="label font-bold" htmlFor="name">
            Owner Name *
          </label>
          <input
            type="text"
            id="owner-name"
            className="input input-primary w-full"
            placeholder="Full Name"
            required
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            onFocus={(e) => e.target.select()}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Note (Optional)</legend>
          <textarea
            className="textarea h-24 w-full textarea-primary"
            placeholder="..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onFocus={(e) => e.target.select()}
          ></textarea>
        </fieldset>
        <div className="h-5"></div>
        <button type="submit" className="btn btn-primary">
          {isEdit ? "Edit" : "Register"} Vehicles
        </button>
        <button
          type="button"
          onClick={() => resetData()}
          className="btn btn-accent mt-3"
        >
          Clear
        </button>
      </form>
    </div>
  );
}
