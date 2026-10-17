import api from "./axios";

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

// GET /slots/live
export const getLiveSlots = async () => {
  const response = await api.get("/slots/live");
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

// GET /find_car?plate=...
export const findCar = async (plateNumber) => {
  const response = await api.get("/find_car", {
    params: {
      plate: plateNumber,
    },
  });

  return response.data;
};
