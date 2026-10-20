import { create } from "zustand";
import { extractZones, extractzoneSlots } from "../services/helperServices";

export const useParkingStore = create((set) => ({
  active_logs: [],
  last_updated: 0,
  free: 0,
  occupied: 0,
  total: 0,
  zones: {},
  zone_list: [],
  zone_slots: [],

  setState: (active_logs, last_updated, free, occupied, total, zones) => {
    set({
      active_logs,
      last_updated,
      free,
      occupied,
      total,
      zones,
      zone_list: extractZones(zones),
      zone_slots: extractzoneSlots(zones),
    });
  },
}));
