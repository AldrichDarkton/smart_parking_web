import { useEffect, useState } from "react";
import SideBar from "./sidebar";
import { Outlet } from "react-router";

export default function DashboardTemplate() {
  const [isOpen, setIsOpen] = useState(false);
  const [hideMainOnOpen, setHideMainOnOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > 768);
      setHideMainOnOpen(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
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
