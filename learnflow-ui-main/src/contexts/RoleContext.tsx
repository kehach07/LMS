import React, { createContext, useContext, useState } from "react";
import { UserRole } from "@/types/lms";

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentUserId: string;
}

const RoleContext = createContext<RoleContextType>({
  role: "student",
  setRole: () => {},
  currentUserId: "stu-1",
});

export const useRole = () => useContext(RoleContext);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>("student");
  const currentUserId = role === "student" ? "stu-1" : "inst-1";

  return (
    <RoleContext.Provider value={{ role, setRole, currentUserId }}>
      {children}
    </RoleContext.Provider>
  );
};
