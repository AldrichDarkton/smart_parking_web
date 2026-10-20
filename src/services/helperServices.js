import { useUserStore } from "../store/userStore";

export const getErrorMessage = (error) => {
  const data = error?.response?.data;

  let message = "Something went wrong";
  const errors = [];

  if (typeof data === "string") {
    message = data;
  } else if (data && typeof data === "object") {
    if (typeof data.error === "string") {
      message = data.error;
    } else if (typeof data.message === "string") {
      message = data.message;
    } else if (Array.isArray(data.errors)) {
      errors.push(
        ...data.errors
          .map((item) => (typeof item === "string" ? item : item.message))
          .filter(Boolean),
      );

      message = errors[0] || message;
    }
  } else if (error?.message) {
    message = error.message;
  }

  return { message, errors };
};

export const formatResponsePackage = ({ isSuccess = true, response }) => {
  return {
    isSuccess,
    body: response,
  };
};

export const storeUserInfo = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUserInfo = () => {
  try {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      throw new Error("User information not found.");
    }

    const user = JSON.parse(storedUser);

    if (!user?.id || !user?.username || !user?.role) {
      throw new Error("Invalid user information.");
    }

    useUserStore.getState().setUser(user.id, user.username, user.role);

    return user;
  } catch (error) {
    console.error("Failed to retrieve user information:", error);
    throw error;
  }
};

export const removeUserInfo = () => {
  localStorage.removeItem("user");
};

export const extractZones = (zones) => {
  const zoneList = Object.keys(zones);
  return zoneList;
};

export const extractzoneSlots = (zones) => {
  return Object.entries(zones).map(([zoneName, zoneData]) => ({
    zone: zoneName,
    free: zoneData.free,
    occupied: zoneData.occupied,
    total: zoneData.total,
    slots: Object.entries(zoneData.slots).map(([slotName, slotData]) => ({
      name: slotName,
      plate: slotData.plate,
      occupied: slotData.status === "occupied",
    })),
  }));
};

export const plateExists = (zones, plateNumber) => {
  return zones.some((zone) =>
    zone.slots.some((slot) => slot.plate == plateNumber),
  );
};

export function extractLocation(location) {
  if (location === undefined || location === null) return null;

  const match = location.match(/^(.+?)\s*\((.+?)\)$/);

  if (!match) return null;

  return {
    slotName: match[1].trim(),
    zoneName: match[2].trim(),
  };
}

export function extractDateTime(dateTimeString) {
  if (dateTimeString === undefined || dateTimeString === null) return null;

  const match = dateTimeString.match(
    /^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})\s+([AP]M)$/i,
  );

  if (!match) return null;

  const [, year, month, day, hours, minutes, meridiem] = match;

  // Convert to 24-hour time
  let hour = Number(hours);

  if (meridiem.toUpperCase() === "PM" && hour !== 12) {
    hour += 12;
  } else if (meridiem.toUpperCase() === "AM" && hour === 12) {
    hour = 0;
  }

  const targetDate = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    hour,
    Number(minutes),
  );

  const now = new Date();
  const diffMs = Math.abs(now - targetDate);

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const remainingHours = Math.floor(
    (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const remainingMinutes = Math.floor(
    (diffMs % (1000 * 60 * 60)) / (1000 * 60),
  );

  return {
    date: `${day}/${month}/${year}`,
    time: `${hours}:${minutes} ${meridiem.toUpperCase()}`,
    duration: {
      days,
      hours: remainingHours,
      minutes: remainingMinutes,
    },
    durationText: `${days}d ${remainingHours}h ${remainingMinutes}m`,
  };
}
