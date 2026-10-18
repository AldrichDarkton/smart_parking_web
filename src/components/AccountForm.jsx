import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";

export default function AccountForm({ accountId }) {
  const [username, setUsername] = useState("");
  const [temporaryPassword, setTemporaryPassword] = useState("");
  const [accessLevel, setAccessLevel] = useState("Viewer");
  const [isEdit, setIsEdit] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      username: username,
      temporary_password: temporaryPassword,
      access_level: accessLevel,
    };
    console.log(formData);
  };

  const resetData = () => {
    setUsername("");
    setTemporaryPassword("");
    setAccessLevel("Viewer");
  };

  useEffect(() => {
    const setSelectedAccount = async () => {
      if (accountId) {
        setIsEdit(true);
        // This is where I'll fetch the data
      } else {
        setIsEdit(false);
      }
    };

    setSelectedAccount();
  }, [accountId]);

  return (
    <div className="w-full sm:w-100 h-fit p-4 rounded-lg  bg-card">
      {/* Form header */}
      <div className="flex items-center justify-start gap-5">
        <div className="w-10 h-10 flex items-center justify-center bg-primary-light rounded-lg">
          <Pencil className="w-5 h-5 text-primary" aria-hidden="true" />
        </div>
        <div className="flex flex-col items-start justify-center">
          <span className="text-primary font-bold text-xl">
            {isEdit ? "Edit" : "Create"} Account
          </span>
          <span className="text-primary font-light text-xs">
            {isEdit ? "Edit" : "Set up"} credentials and access
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            value={temporaryPassword}
            onChange={(e) => setTemporaryPassword(e.target.value)}
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
            value={accessLevel}
            onChange={(e) => setAccessLevel(e.target.value)}
          >
            <option value="Viewer">Viewer</option>
            <option value="Administrator">Administrator</option>
          </select>
        </fieldset>

        <div className="h-5"></div>

        <button type="submit" className="btn btn-primary">
          {isEdit ? "Edit" : "Add"} Personnel
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
