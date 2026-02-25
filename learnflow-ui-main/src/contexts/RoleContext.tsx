import React, { createContext, useContext, useState, useEffect } from "react";
import { UserRole } from "@/types/lms";

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentUserId: string;
}

const RoleContext = createContext<RoleContextType>({
  role: "student",
  setRole: () => {},
  currentUserId: "",
});

export const useRole = () => useContext(RoleContext);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load role from localStorage on start
  const [role, setRoleState] = useState<UserRole>(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        return JSON.parse(savedUser).role || "student";
      } catch {
        return "student";
      }
    }
    return "student";
  });

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);

    // Update localStorage user object
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      user.role = newRole;
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  const currentUserId = role === "student" ? "stu-1" : "inst-1";

  return (
    <RoleContext.Provider value={{ role, setRole, currentUserId }}>
      {children}
    </RoleContext.Provider>
  );
};