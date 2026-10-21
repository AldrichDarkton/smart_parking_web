import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import {
  handleEditAccount,
  handleRegisterAccount,
} from "../services/api/parkingFormService";
import { useNotiStore } from "../store/notiStore";
import { useUserStore } from "../store/userStore";

export default function AccountForm({ accountData, handleAccountSaveSuccess }) {
  const [username, setUsername] = useState("");
  const [temporaryPassword, setTemporaryPassword] = useState("");
  const [accessLevel, setAccessLevel] = useState("operator");
  const [isEdit, setIsEdit] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const { setNoti } = useNotiStore.getState();
  const { id } = useUserStore.getState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response;

    if (isEdit) {
      const formatUpdateData = {
        username: username,
        role: accessLevel,
      };

      if (temporaryPassword) {
        formatUpdateData.password = temporaryPassword;
      }

      response = await handleEditAccount(selectedAccount.id, formatUpdateData);
    } else {
      response = await handleRegisterAccount({
        username: username,
        password: temporaryPassword,
        role: accessLevel,
      });
    }

    if (response.isSuccess) {
      setNoti(
        "success",
        `Account ${isEdit ? "edited" : "registered"} successfully.`,
      );
      if (id == selectedAccount?.id) {
        handleAccountSaveSuccess({ updatedName: username });
      } else {
        handleAccountSaveSuccess();
      }
    } else {
      setNoti("error", response.body.message);
      console.log(response.body.message);
    }
  };

  const resetData = () => {
    setUsername(isEdit ? selectedAccount.username : "");
    setTemporaryPassword("");
    setAccessLevel(isEdit ? selectedAccount.role : "operator");
  };

  useEffect(() => {
    const initializeData = async () => {
      if (accountData) {
        setIsEdit(true);
        setSelectedAccount(accountData);

        setUsername(accountData.username ?? "");
        setTemporaryPassword("");
        setAccessLevel(accountData.role ?? "operator");
      } else {
        setIsEdit(false);
        setSelectedAccount(null);

        setUsername("");
        setTemporaryPassword("");
        setAccessLevel("operator");
      }
    };

    initializeData();
  }, [accountData]);

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

        {!isEdit && (
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
        )}

        {id != accountData?.id && isEdit && (
          <fieldset className="fieldset w-full">
            <label className="label font-bold" htmlFor="access-level">
              Role *
            </label>
            <select
              id="access-level"
              className="select select-primary w-full"
              defaultValue="Viewer"
              value={accessLevel}
              onChange={(e) => setAccessLevel(e.target.value)}
            >
              <option value="operator">Operator (Read-Only Access)</option>
              <option value="admin">Admin (Full Access)</option>
            </select>
          </fieldset>
        )}

        {isEdit && (
          <>
            <hr class="border-t border-gray-300 my-4" />

            <fieldset className="fieldset w-full">
              <label className="label font-bold" htmlFor="temporary-password">
                {id != accountData?.id ? "Reset" : "Change"} Password
              </label>
              <input
                type="password"
                id="temporary-password"
                className="input input-primary w-full"
                placeholder="Enter a new password"
                value={temporaryPassword}
                onChange={(e) => setTemporaryPassword(e.target.value)}
              />
            </fieldset>
          </>
        )}

        <div className="h-5"></div>

        <button type="submit" className="btn btn-primary">
          {isEdit ? "Edit" : "Add"} Personnel
        </button>
        <button
          type="button"
          onClick={() => resetData()}
          className="btn btn-accent mt-3"
        >
          {isEdit ? "Undo" : "Clear"}
        </button>
      </form>
    </div>
  );
}
