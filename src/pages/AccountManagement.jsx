import { Pencil, Search, Trash } from "lucide-react";
import { useEffect, useState } from "react";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
  };

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
    <div className="flex flex-col items-center justify-start gap-4 w-full">
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

      <div className="flex lg:grid gap-10 flex-col justify-start items-center lg:grid-cols-[400px_minmax(0,1fr)] w-full">
        {/* Create Account Form Card */}
        <div className="flex items-start justify-center h-full">
          <div className="w-full sm:w-100 h-fit p-4 rounded-lg border-2 border-primary bg-card shadow-md">
            {/* Form header */}
            <div className="flex items-center justify-start gap-5">
              <div className="w-10 h-10 flex items-center justify-center bg-primary-light rounded-lg">
                <Pencil className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <div className="flex flex-col items-start justify-center">
                <span className="text-primary font-bold text-xl">
                  Create Account
                </span>
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
        </div>

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
              <div className="px-5 py-2 rounded-full bg-primary-light font-bold text-primary">
                {personnelList.length} active
              </div>
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
                  {personnelList
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
                        <td>
                          <button
                            type="button"
                            className="btn btn-soft btn-error"
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
          </div>
        </div>
      </div>
    </div>
  );
}
