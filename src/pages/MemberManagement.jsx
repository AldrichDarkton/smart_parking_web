import { Pencil, Search, Trash } from "lucide-react";
import { useEffect, useState } from "react";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
  };

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
    <div className="flex flex-col items-center justify-start gap-4 w-full">
      <div className="h-10 w-full flex justify-start items-center text-primary font-bold text-xl">
        Member Vehicles
      </div>
      <div className="flex flex-col items-start justify-center w-full">
        <h1 className="text-xl font-bold">VIP & Member Vehicles</h1>
        <p className="text-md">Register vehicles with ongoing parking access</p>
      </div>
      <div className="flex lg:grid gap-10 flex-col justify-start items-center lg:grid-cols-[400px_minmax(0,1fr)] w-full ">
        {/* Form card*/}
        <div className="flex items-start justify-center h-full">
          <div className="w-full sm:w-100 h-fit p-4 rounded-lg border-2 border-primary bg-card shadow-md">
            {/* Form header */}
            <div className="flex items-center justify-start gap-5">
              <div className="w-10 h-10 flex items-center justify-center bg-primary-light rounded-lg">
                <Pencil className="w-5 h-5 text-primary" aria-hidden="true" />
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
        </div>
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
              <div className="px-5 py-2 rounded-full bg-primary-light font-bold text-primary">
                {vehicleList.length} active
              </div>
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
                  {vehicleList.map((vehicle, index) => (
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
                      <td>
                        <button className="btn btn-soft btn-error">
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
