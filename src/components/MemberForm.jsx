import { CarFront } from "lucide-react";

export default function MemberForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
  };

  return (
    <div className="w-full sm:w-100 h-fit p-4 rounded-lg bg-card ">
      {/* Form header */}
      <div className="flex items-center justify-start gap-5">
        <div className="w-10 h-10 flex items-center justify-center bg-primary-light rounded-lg">
          <CarFront className="w-5 h-5 text-primary" aria-hidden="true" />
        </div>
        <div className="flex flex-col items-start justify-center">
          <span className="text-primary font-bold text-xl">
            Vehicle Registration
          </span>
          <span className="text-primary font-light text-xs">
            Add a new VIP or Member vehicle
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
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Note (Optional)</legend>
          <textarea
            className="textarea h-24 w-full textarea-primary"
            placeholder="..."
          ></textarea>
        </fieldset>
        <div className="h-5"></div>
        <button type="submit" className="btn btn-primary">
          Register Vehicles
        </button>
      </form>
    </div>
  );
}
