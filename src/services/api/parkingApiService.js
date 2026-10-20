import api from "./axios";

// POST / login
export const login = (username, password) =>
  api.post("/login", {
    username,
    password,
  });

// POST / logout
export const logout = () => api.post("/logout");

// GET / vehicles
export const getVehicles = () => api.get("/settings/vehicles");

// GET / vehicle register
export const registerVehicle = (vehicleData) =>
  api.post("/settings/vehicles/add", vehicleData);

// GET / vehicle delete
export const deleteVehicle = (vehicleId) =>
  api.delete(`/settings/vehicles/delete/${vehicleId}`);

// GET / staff
export const getAccounts = () => api.get("/settings/staff");

// GET / staff register
export const registerAccount = (accountData) =>
  api.post("/settings/staff/add", accountData);

// GET / staff delete
export const deleteAccount = (accountId) =>
  api.delete(`/settings/staff/delete/${accountId}`);

// GET /slots/live
export const getLiveSlots = (config = {}) => api.get("/slots/live", config);

// GET /find_car?plate=...
export const findCar = (plateNumber) =>
  api.get("/find_car", {
    params: {
      plate: plateNumber,
    },
  });

// GET /status
export const getParkingStatus = async () => {
  const response = await api.get("/status");
  return response.data;
};

// POST /entry
export const vehicleEntry = async (plateNumber) => {
  const response = await api.post("/entry", {
    plate_number: plateNumber,
  });
  return response.data;
};

// POST /exit
export const vehicleExit = async (plateNumber) => {
  const response = await api.post("/exit", {
    plate_number: plateNumber,
  });
  return response.data;
};

// POST /slots/update
export const updateSlotStatus = async (slotData) => {
  const response = await api.post("/slots/update", slotData);
  return response.data;
};

// POST /snapshot
export const uploadSnapshot = async ({ plateNumber, slotId, imageB64 }) => {
  const response = await api.post("/snapshot", {
    plate_number: plateNumber,
    slot_id: slotId,
    image_b64: imageB64,
  });

  return response.data;
};
