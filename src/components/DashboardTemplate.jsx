import SideBar from "./sidebar";

export default function DashboardTemplate({ children }) {
  return (
    <div className="flex w-screen h-screen">
      <div className="w-auto h-screen">
        <SideBar />
      </div>
      <div className="w-full h-screen overflow-x-clip overflow-y-auto bg-background pe-10 ">
        {children}
      </div>
    </div>
  );
}
