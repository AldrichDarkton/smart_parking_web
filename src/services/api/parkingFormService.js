import axios from "axios";
import {
  deleteAccount,
  deleteVehicle,
  editAccount,
  editVehicle,
  findCar,
  forceExit,
  getAccounts,
  getLiveSlots,
  getLogHistory,
  getVehicles,
  login,
  logout,
  registerAccount,
  registerVehicle,
} from "./parkingApiService";
import {
  formatResponsePackage,
  getErrorMessage,
  removeUserInfo,
  storeUserInfo,
} from "../helperServices";

export const handleLogin = async (username, password) => {
  try {
    const res = await login(username, password);

    storeUserInfo(res.data.user);

    return formatResponsePackage({ response: res });
  } catch (err) {
    const { message, errors } = getErrorMessage(err);

    if (axios.isAxiosError(err)) {
      console.error("Login API error:", {
        status: err.response?.status,
        data: err.response?.data,
      });
    } else {
      console.error("Unexpected login error:", err);
    }

    return formatResponsePackage({
      isSuccess: false,
      response: { message, errors },
    });

    // Let the React component know that login failed.
    // throw new Error(message);
  }
};

export const handleLogout = async () => {
  try {
    const res = await logout();
    removeUserInfo();
    return formatResponsePackage({ response: res.data });
  } catch (err) {
    const { message, errors } = getErrorMessage(err);

    if (axios.isAxiosError(err)) {
      console.error("Logout API error:", {
        status: err.response?.status,
        data: err.response?.data,
      });
    } else {
      console.error("Unexpected logout error:", err);
    }

    return formatResponsePackage({
      isSuccess: false,
      response: { message, errors },
    });
  }
};

export const handleMonitorParking = async ({ signal } = {}) => {
  try {
    // IMPORTANT: await the API request
    const res = await getLiveSlots({ signal });

    return formatResponsePackage({
      response: res.data,
    });
  } catch (err) {
    const { message, errors } = getErrorMessage(err);

    if (axios.isAxiosError(err)) {
      console.error("Monitor Parking API error:", {
        status: err.response?.status,
        data: err.response?.data,
      });
    } else {
      console.error("Unexpected monitor parking error:", err);
    }

    return formatResponsePackage({
      isSuccess: false,
      response: { message, errors },
    });
  }
};

export const handleGetRegisteredVehicles = async () => {
  try {
    const res = await getVehicles();
    return formatResponsePackage({ response: res.data });
  } catch (err) {
    const { message, errors } = getErrorMessage(err);

    if (axios.isAxiosError(err)) {
      console.error("Logout API error:", {
        status: err.response?.status,
        data: err.response?.data,
      });
    } else {
      console.error("Unexpected logout error:", err);
    }

    return formatResponsePackage({
      isSuccess: false,
      response: { message, errors },
    });
  }
};

export const handleRegisterVehicle = async ({
  plate_number,
  owner_name,
  notes,
}) => {
  try {
    const formData = {
      plate_number,
      owner_name,
      notes,
    };

    const res = await registerVehicle(formData);
    return formatResponsePackage({ response: res.data });
  } catch (err) {
    const { message, errors } = getErrorMessage(err);

    if (axios.isAxiosError(err)) {
      console.error("Logout API error:", {
        status: err.response?.status,
        data: err.response?.data,
      });
    } else {
      console.error("Unexpected logout error:", err);
    }

    return formatResponsePackage({
      isSuccess: false,
      response: { message, errors },
    });
  }
};

export const handleEditVehicles = async (vehicleId, vehicleData) => {
  try {
    const res = await editVehicle(vehicleId, vehicleData);
    return formatResponsePackage({ response: res.data });
  } catch (err) {
    const { message, errors } = getErrorMessage(err);

    if (axios.isAxiosError(err)) {
      console.error("Logout API error:", {
        status: err.response?.status,
        data: err.response?.data,
      });
    } else {
      console.error("Unexpected logout error:", err);
    }

    return formatResponsePackage({
      isSuccess: false,
      response: { message, errors },
    });
  }
};

export const handleDeleteVehicle = async (vehicleId) => {
  try {
    const res = await deleteVehicle(vehicleId);
    return formatResponsePackage({ response: res.data });
  } catch (err) {
    const { message, errors } = getErrorMessage(err);

    if (axios.isAxiosError(err)) {
      console.error("Logout API error:", {
        status: err.response?.status,
        data: err.response?.data,
      });
    } else {
      console.error("Unexpected logout error:", err);
    }

    return formatResponsePackage({
      isSuccess: false,
      response: { message, errors },
    });
  }
};

export const handleGetAccounts = async () => {
  try {
    const res = await getAccounts();
    return formatResponsePackage({ response: res.data });
  } catch (err) {
    const { message, errors } = getErrorMessage(err);

    if (axios.isAxiosError(err)) {
      console.error("Logout API error:", {
        status: err.response?.status,
        data: err.response?.data,
      });
    } else {
      console.error("Unexpected logout error:", err);
    }

    return formatResponsePackage({
      isSuccess: false,
      response: { message, errors },
    });
  }
};

export const handleRegisterAccount = async ({ username, password, role }) => {
  try {
    const formData = {
      username,
      password,
      role,
    };

    const res = await registerAccount(formData);
    return formatResponsePackage({ response: res.data });
  } catch (err) {
    const { message, errors } = getErrorMessage(err);

    if (axios.isAxiosError(err)) {
      console.error("Logout API error:", {
        status: err.response?.status,
        data: err.response?.data,
      });
    } else {
      console.error("Unexpected logout error:", err);
    }

    return formatResponsePackage({
      isSuccess: false,
      response: { message, errors },
    });
  }
};

export const handleEditAccount = async (accountId, accountData) => {
  try {
    const res = await editAccount(accountId, accountData);
    return formatResponsePackage({ response: res.data });
  } catch (err) {
    const { message, errors } = getErrorMessage(err);

    if (axios.isAxiosError(err)) {
      console.error("Logout API error:", {
        status: err.response?.status,
        data: err.response?.data,
      });
    } else {
      console.error("Unexpected logout error:", err);
    }

    return formatResponsePackage({
      isSuccess: false,
      response: { message, errors },
    });
  }
};

export const handleDeleteAccount = async (accountId) => {
  try {
    const res = await deleteAccount(accountId);
    return formatResponsePackage({ response: res.data });
  } catch (err) {
    const { message, errors } = getErrorMessage(err);

    if (axios.isAxiosError(err)) {
      console.error("Logout API error:", {
        status: err.response?.status,
        data: err.response?.data,
      });
    } else {
      console.error("Unexpected logout error:", err);
    }

    return formatResponsePackage({
      isSuccess: false,
      response: { message, errors },
    });
  }
};

export const handleFindCar = async (plateNumber, { setIsLoading } = {}) => {
  try {
    setIsLoading?.(true);
    const res = await findCar(plateNumber);
    return formatResponsePackage({ response: res.data });
  } catch (err) {
    const { message, errors } = getErrorMessage(err);

    if (axios.isAxiosError(err)) {
      console.error("Logout API error:", {
        status: err.response?.status,
        data: err.response?.data,
      });
    } else {
      console.error("Unexpected logout error:", err);
    }

    return formatResponsePackage({
      isSuccess: false,
      response: { message, errors },
    });
  } finally {
    setIsLoading?.(false);
  }
};

export const handleGetHistory = async () => {
  try {
    const res = await getLogHistory();
    return formatResponsePackage({ response: res.data });
  } catch (err) {
    const { message, errors } = getErrorMessage(err);

    if (axios.isAxiosError(err)) {
      console.error("Logout API error:", {
        status: err.response?.status,
        data: err.response?.data,
      });
    } else {
      console.error("Unexpected logout error:", err);
    }

    return formatResponsePackage({
      isSuccess: false,
      response: { message, errors },
    });
  }
};

export const handleForceExit = async (logId) => {
  try {
    const res = await forceExit(logId);
    return formatResponsePackage({ response: res.data });
  } catch (err) {
    const { message, errors } = getErrorMessage(err);

    if (axios.isAxiosError(err)) {
      console.error("Force exit API error:", {
        status: err.response?.status,
        data: err.response?.data,
      });
    } else {
      console.error("Unexpected force exit error:", err);
    }

    return formatResponsePackage({
      isSuccess: false,
      response: { message, errors },
    });
  }
};
