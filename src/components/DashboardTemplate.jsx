import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { getUserInfo } from "../services/helperServices";
import SideBar from "./Sidebar";
import { handleMonitorParking } from "../services/api/parkingFormService";
import { useParkingStore } from "../store/parkingStore";

export default function DashboardTemplate() {
  const [isOpen, setIsOpen] = useState(false);
  const [hideMainOnOpen, setHideMainOnOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleCheckUser = () => {
      try {
        getUserInfo();
      } catch (error) {
        console.error("User check failed:", error);
        navigate("/login", { replace: true });
      }
    };

    const handleResize = () => {
      setIsOpen(window.innerWidth > 768);
      setHideMainOnOpen(window.innerWidth < 768);
    };

    handleResize();
    handleCheckUser();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [navigate]);

  useEffect(() => {
    let stopped = false;
    let timerId;
    let controller;

    const poll = async () => {
      controller = new AbortController();

      try {
        const result = await handleMonitorParking({
          signal: controller.signal,
        });

        if (stopped) return;

        if (!result.isSuccess) {
          console.error("Failed to retrieve parking data:", result.body);
          return;
        }

        const data = result.body;

        useParkingStore
          .getState()
          .setState(
            data.active_logs ?? [],
            data.last_updated ?? 0,
            data.free ?? 0,
            data.occupied ?? 0,
            data.total ?? 0,
            data.zones ?? {},
          );
      } catch (error) {
        if (!stopped && error?.code !== "ERR_CANCELED") {
          console.error("Error polling parking data:", error);
        }
      } finally {
        if (!stopped) {
          timerId = window.setTimeout(poll, 2000);
        }
      }
    };

    poll();

    return () => {
      stopped = true;
      window.clearTimeout(timerId);
      controller?.abort();
    };
  }, []);

  return (
    <div className="flex w-screen h-screen">
      <div className="w-auto h-screen">
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div
        className={`w-full h-screen overflow-x-clip overflow-y-auto bg-background pe-10 relative`}
      >
        {isOpen && hideMainOnOpen ? <></> : <Outlet />}
        <div className="h-10"></div>
      </div>
    </div>
  );
}
