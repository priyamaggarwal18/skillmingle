"use client";

import React, { createContext, useContext, useState } from "react";
import { motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import cn from "classnames";

// Context for Sidebar State
const SidebarContext = createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  open: false,
  setOpen: () => {},
});

// Custom hook to access the sidebar context
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

// Sidebar Provider
export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Sidebar Component
export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const { open, setOpen } = useSidebar();

  return (
    <motion.div
      className={cn(
        "h-screen bg-gray-200 dark:bg-gray-800 transition-all duration-300 flex-shrink-0",
        open ? "w-[30%]" : "w-[5%]"
      )}
      initial={{ width: "5%" }}
      animate={{ width: open ? "17%" : "5%" }}
    >
      {/* Sidebar Header */}
      <div className="p-4 flex items-center justify-between">
        {open && (
          <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            My Sidebar
          </h1>
        )}
        {!open && (
          <div className="p-2 bg-gray-700 rounded-full">
            <IconMenu2
              className="text-white cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
        )}
        {open && (
          <IconX
            className="text-gray-900 dark:text-gray-100 cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        )}
      </div>

      {/* Sidebar Links */}
      <div className="flex-1 p-4">{children}</div>
    </motion.div>
  );
};

// Sidebar Link Component
export const SidebarLink = ({
  link,
  onClick,
}: {
  link: { label: string; icon: React.ReactNode };
  onClick: () => void;
}) => {
  const { open } = useSidebar();

  return (
    <div
      className="flex items-center gap-4 p-2 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer rounded-md"
      onClick={onClick}
    >
      <span className="text-lg text-gray-700 dark:text-gray-200">{link.icon}</span>
      {open && <span className="text-md text-gray-700 dark:text-gray-200">{link.label}</span>}
    </div>
  );
};
