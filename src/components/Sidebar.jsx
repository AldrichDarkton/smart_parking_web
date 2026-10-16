import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo_square.png";
import PlateSearchBox from "./PlateSearchBox";
import {
  BoxSelectIcon,
  CarFront,
  Grid2X2,
  LogOut,
  Logs,
  User,
  UserCog2,
} from "lucide-react";

// const sidebarVariants = {
//   open: { transform: "translateX(0%)" },
//   closed: { transform: "translateX(-100%)" },
// };

const sidebarVariants = {
  open: {
    width: 250,
    minWidth: 250,
    padding: 2.5,
    opacity: 1,
    x: 0,
  },
  closed: {
    width: 0,
    minWidth: 0,
    padding: 0,
    opacity: 0,
    x: 0,
  },
};

const menuItemVariants = {
  rest: { x: 0, scale: 1 },
  hover: { x: 8, scale: 1.03 },
};

const iconLineVariants = {
  openTop: { rotate: 0, y: 0 },
  closedTop: { rotate: 45, y: 6 },
  openMiddle: { opacity: 1, scaleX: 1 },
  closedMiddle: { opacity: 0, scaleX: 0 },
  openBottom: { rotate: 0, y: 0 },
  closedBottom: { rotate: -45, y: -6 },
};

export default function SideBar({ isOpen, setIsOpen }) {
  const menuItems = [
    { to: "/dashboard", Icon: Grid2X2, label: "Overview" },
    { to: "/log_view", Icon: Logs, label: "Parking Log" },
    { to: "/member_vehicles", Icon: CarFront, label: "Member Vehicles" },
    { to: "/account_management", Icon: UserCog2, label: "Account Management" },
  ];

  const zoneList = [
    {
      to: "/zone/A",
      Icon: BoxSelectIcon,
      label: "Zone A",
      subTitle: "Open-air parking",
    },
    {
      to: "/zone/B",
      Icon: BoxSelectIcon,
      label: "Zone B",
      subTitle: "Basement parking",
    },
  ];

  return (
    <div className="flex flex-row-reverse bg-background justify-start items-start h-screen overflow-hidden w-fit">
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        aria-expanded={isOpen}
        className="flex h-10 w-10  overflow-clip cursor-pointer items-center justify-center bg-transparent py-1"
      >
        <span className="flex h-12 w-12 flex-col items-center justify-center rounded-full  border-current">
          <motion.span
            variants={iconLineVariants}
            animate={!isOpen ? "openTop" : "closedTop"}
            transition={{ duration: 0.25 }}
            className="my-[2px] block h-[2px] w-[50%] rounded-sm bg-current"
          />
          <motion.span
            variants={iconLineVariants}
            animate={!isOpen ? "openMiddle" : "closedMiddle"}
            transition={{ duration: 0.2 }}
            className="my-[2px] block h-[2px] w-[50%] rounded-sm bg-current"
          />
          <motion.span
            variants={iconLineVariants}
            animate={!isOpen ? "openBottom" : "closedBottom"}
            transition={{ duration: 0.25 }}
            className="my-[2px] block h-[2px] w-[50%] rounded-sm bg-current"
          />
        </span>
      </button>
      <motion.aside
        layout
        variants={sidebarVariants}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="z-40 flex text-nowrap h-screen shadow-lg shrink-0 flex-col justify-between bg-card text-black overflow-x-hidden overflow-y-auto"
      >
        <div>
          {/* Banner section */}
          <div className="flex items-center justify-start p-2 w-full gap-1 border-b-2 border-primary">
            <img src={logo} alt="logo" width="45" />
            <div className="flex flex-col items-start justify-center h-full w-fit">
              <span className="text-lg font-bold">
                <span className="text-primary">SMART</span> CAR PARK
              </span>
              <span className="text-xs -mt-[3px] text-primary font-light">
                Smart Sensing for Seamless Parking
              </span>
            </div>
          </div>
          {/* Overview section */}
          <motion.div
            layout
            className="flex items-center justify-around px-2 py-3 w-full gap-1 border-b-2 border-primary"
          >
            <div className="bg-background rounded-md inset-shadow-sm inset-shadow-gray-400/50 w-25 h-15 p-2 flex flex-col justify-center items-start">
              <span className="text-lg font-bold text-primary">50</span>
              <span className="-mt-[3px]">TOTAL</span>
            </div>
            <div className="bg-background rounded-md inset-shadow-sm inset-shadow-gray-400/50 w-25 h-15 p-2 flex flex-col justify-center items-start">
              <span className="text-lg font-bold text-primary">39</span>
              <span className="-mt-[3px]">AVAILABLE</span>
            </div>
          </motion.div>
          {/* Search section */}
          <motion.div
            layout
            className="flex items-center justify-around py-3 w-full h-fit gap-1 border-b-2 border-primary"
          >
            <PlateSearchBox />
          </motion.div>

          {/* Navigation links */}
          <motion.nav
            layout
            className="flex flex-1 flex-col gap-1 py-3 px-2 border-b-2 border-primary"
            aria-label="Sidebar navigation"
          >
            <span className="text-primary font-semibold">Pages</span>
            {menuItems.map((item, index) => (
              <SidebarLink
                key={item.to ?? `${item.label}-${index}`}
                to={item.to}
                Icon={item.Icon}
                label={item.label}
                isOpen={isOpen}
              />
            ))}
          </motion.nav>
          {/* Zone links */}

          <motion.nav
            layout
            className="flex flex-1 flex-col gap-1 py-3 px-2 "
            aria-label="Sidebar navigation"
          >
            <span className="text-primary font-semibold">Zones</span>
            {zoneList.map((item, index) => (
              <SidebarLink
                key={item.to ?? `${item.label}-${index}`}
                to={item.to}
                Icon={item.Icon}
                label={item.label}
                isOpen={isOpen}
                subTitle={item.subTitle}
              />
            ))}
          </motion.nav>
        </div>

        {/* Logout button */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex w-full items-center justify-between px-2 py-3 border-t-2 border-t-primary"
        >
          <div className="flex items-center justify-start gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-current bg-primary-light">
              <User className="w-5 h-5 text-primary" aria-hidden="true" />
            </div>
            <div className="flex flex-col items-start justify-center">
              <span className="font-semibold text-primary">User Name</span>
              <span className="text-xs -mt-[3px] text-primary font-light">
                Role
              </span>
            </div>
          </div>
          <LogOut
            className="w-5 h-5 text-danger cursor-pointer hover:scale-110 duration-75"
            aria-hidden="true"
          />
        </motion.div>
      </motion.aside>
    </div>
  );
}

function SidebarLink({ to, Icon, label, isOpen, subTitle }) {
  return (
    <motion.div
      variants={menuItemVariants}
      initial="rest"
      whileHover="hover"
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <NavLink
        to={to}
        title={!isOpen ? label : undefined}
        // className="flex min-h-10 items-center text-black gap-2 rounded-md px-2.5 py-2 no-underline transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
        className={({ isActive }) =>
          `flex min-h-10 items-center gap-2 rounded-md px-2.5 py-2 transition-colors ${
            isActive
              ? "bg-background border border-primary  text-primary font-bold"
              : "text-black hover:bg-white/10 "
          }`
        }
      >
        {Icon && <Icon className="w-5 h-5 text-primary" aria-hidden="true" />}
        {isOpen && (
          <div className="flex flex-col items-start justify-center">
            <motion.span
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="whitespace-nowrap text-sm"
            >
              {label}
            </motion.span>
            {subTitle && (
              <motion.span
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="whitespace-nowrap text-xs font-thin -mt-1"
              >
                {subTitle}
              </motion.span>
            )}
          </div>
        )}
      </NavLink>
    </motion.div>
  );
}
