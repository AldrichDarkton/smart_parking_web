import { Pencil } from "lucide-react";

export default function AccountForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
  };

  return (
    <div className="w-full sm:w-100 h-fit p-4 rounded-lg  bg-card">
      {/* Form header */}
      <div className="flex items-center justify-start gap-5">
        <div className="w-10 h-10 flex items-center justify-center bg-primary-light rounded-lg">
          <Pencil className="w-5 h-5 text-primary" aria-hidden="true" />
        </div>
        <div className="flex flex-col items-start justify-center">
          <span className="text-primary font-bold text-xl">Create Account</span>
          <span className="text-primary font-light text-xs">
            Set up credentials and access
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
          <label className="label font-bold" htmlFor="username">
            Username *
          </label>
          <input
            type="text"
            id="username"
            className="input input-primary w-full"
            placeholder="username"
            required
          />
        </fieldset>

        <fieldset className="fieldset w-full">
          <label className="label font-bold" htmlFor="temporary-password">
            Temporary Password *
          </label>
          <input
            type="password"
            id="temporary-password"
            className="input input-primary w-full"
            placeholder="Enter a secure password"
            required
          />
        </fieldset>

        <fieldset className="fieldset w-full">
          <label className="label font-bold" htmlFor="access-level">
            Access Level *
          </label>
          <select
            id="access-level"
            className="select select-primary w-full"
            defaultValue="Viewer"
          >
            <option value="Viewer">Viewer</option>
            <option value="Administrator">Administrator</option>
          </select>
        </fieldset>

        <div className="h-5"></div>

        <button type="submit" className="btn btn-primary">
          Add Personnel
        </button>
      </form>
    </div>
  );
}
