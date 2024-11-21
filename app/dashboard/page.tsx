"use client";
import React, { useState } from "react";
import { Sidebar, SidebarProvider, SidebarLink } from "@/components/ui/dashbaord/sidebar";
import { IconHome, IconUser, IconSettings, IconHelp } from "@tabler/icons-react";

const App = () => {
  const [activeComponent, setActiveComponent] = useState<string>("Home");

  // Dynamic Content Rendering
  const renderComponent = () => {
    switch (activeComponent) {
      case "Home":
        return <h1 className="text-2xl">Welcome to the Home Page</h1>;
      case "Profile":
        return <h1 className="text-2xl">This is your Profile</h1>;
      case "Settings":
        return <h1 className="text-2xl">Manage your Settings here</h1>;
      case "Help":
        return <h1 className="text-2xl">Need Help? Here's our support.</h1>;
      default:
        return <h1 className="text-2xl">Select a Section</h1>;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar>
          <SidebarLink
            link={{ label: "Home", icon: <IconHome /> }}
            onClick={() => setActiveComponent("Home")}
          />
          <SidebarLink
            link={{ label: "Profile", icon: <IconUser /> }}
            onClick={() => setActiveComponent("Profile")}
          />
          <SidebarLink
            link={{ label: "Settings", icon: <IconSettings /> }}
            onClick={() => setActiveComponent("Settings")}
          />
          <SidebarLink
            link={{ label: "Help", icon: <IconHelp /> }}
            onClick={() => setActiveComponent("Help")}
          />
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 overflow-y-auto">
          {renderComponent()}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default App;
